/**
 * SYSTÈME DE PROGRESSION CLOUD - Académie Gématria
 * Synchronise progression entre localStorage et Firestore
 * Ajoute système de badges et XP
 */

const UserProgressionSystem = {
    /**
     * Sauvegarder progression (localStorage + Cloud si connecté)
     */
    async sauvegarderResultat(domaine, niveau, exerciceId, score) {
        // Sauvegarder localement (système existant)
        const localData = ProgressionSystem.sauvegarderResultat(domaine, niveau, exerciceId, score);

        // Si utilisateur connecté, sauvegarder aussi dans Firestore
        if (AuthSystem.isLoggedIn()) {
            await this.saveToCloud(domaine, niveau, exerciceId, score, localData);

            // Calculer et sauvegarder XP gagné
            const xpGained = this.calculateXP(score, niveau);
            await this.addXP(xpGained);

            // Vérifier nouveaux badges
            await this.checkBadges(domaine, niveau, localData);
        }

        return localData;
    },

    /**
     * Sauvegarder dans Firestore
     */
    async saveToCloud(domaine, niveau, exerciceId, score, localData) {
        try {
            const { doc, setDoc, serverTimestamp } = await import(
                'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
            );

            const user = AuthSystem.getCurrentUser();
            const progressRef = doc(
                window.firebaseDB,
                'users',
                user.uid,
                'progression',
                `${domaine}_${niveau}`
            );

            await setDoc(progressRef, {
                domaine,
                niveau,
                exercices: localData.exercices,
                scoreMoyen: localData.scoreMoyen,
                nombreExercices: localData.nombreExercices,
                meilleurScore: localData.meilleurScore,
                maitrise: localData.maitrise,
                lastUpdated: serverTimestamp()
            }, { merge: true });

            console.log(`✅ Progression sauvegardée: ${domaine}/${niveau}`);
        } catch (error) {
            console.error('❌ Erreur sauvegarde cloud:', error);
        }
    },

    /**
     * Charger progression depuis Firestore
     */
    async loadFromCloud(domaine, niveau) {
        if (!AuthSystem.isLoggedIn()) {
            return ProgressionSystem.chargerProgression(domaine, niveau);
        }

        try {
            const { doc, getDoc } = await import(
                'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
            );

            const user = AuthSystem.getCurrentUser();
            const progressRef = doc(
                window.firebaseDB,
                'users',
                user.uid,
                'progression',
                `${domaine}_${niveau}`
            );

            const docSnap = await getDoc(progressRef);

            if (docSnap.exists()) {
                const cloudData = docSnap.data();

                // Fusionner avec données locales (prendre le plus récent)
                const localData = ProgressionSystem.chargerProgression(domaine, niveau);

                // Comparer et prendre les meilleures données
                const merged = this.mergeProgression(localData, cloudData);

                // Sauvegarder le merge localement
                localStorage.setItem(`progression_${domaine}_${niveau}`, JSON.stringify(merged));

                return merged;
            } else {
                return ProgressionSystem.chargerProgression(domaine, niveau);
            }
        } catch (error) {
            console.error('❌ Erreur chargement cloud:', error);
            return ProgressionSystem.chargerProgression(domaine, niveau);
        }
    },

    /**
     * Fusionner progression locale et cloud
     */
    mergeProgression(local, cloud) {
        // Fusionner les exercices (garder meilleurs scores)
        const mergedExercices = { ...local.exercices };

        for (const [exId, cloudTentatives] of Object.entries(cloud.exercices || {})) {
            if (!mergedExercices[exId]) {
                mergedExercices[exId] = cloudTentatives;
            } else {
                // Fusionner tentatives et trier
                mergedExercices[exId] = [...mergedExercices[exId], ...cloudTentatives]
                    .sort((a, b) => b.timestamp - a.timestamp);
            }
        }

        return {
            ...local,
            exercices: mergedExercices,
            scoreMoyen: Math.max(local.scoreMoyen || 0, cloud.scoreMoyen || 0),
            meilleurScore: Math.max(local.meilleurScore || 0, cloud.meilleurScore || 0),
            nombreExercices: Object.keys(mergedExercices).length
        };
    },

    /**
     * Synchroniser TOUTE la progression locale vers cloud
     */
    async syncToCloud() {
        if (!AuthSystem.isLoggedIn()) return;

        console.log('🔄 Synchronisation progression vers cloud...');

        const domaines = ['hieroglyphes', 'maya', 'runes', 'gematria', 'logique'];
        const niveaux = ['debutant', 'intermediaire', 'expert'];

        for (const domaine of domaines) {
            for (const niveau of niveaux) {
                const key = `progression_${domaine}_${niveau}`;
                const stored = localStorage.getItem(key);

                if (stored) {
                    const data = JSON.parse(stored);
                    if (data.nombreExercices > 0) {
                        await this.saveToCloud(domaine, niveau, null, null, data);
                    }
                }
            }
        }

        console.log('✅ Synchronisation terminée');
    },

    /**
     * Calculer XP gagné selon score et niveau
     */
    calculateXP(score, niveau) {
        const baseXP = {
            'debutant': 10,
            'intermediaire': 20,
            'expert': 30
        };

        const base = baseXP[niveau] || 10;
        const multiplier = score / 100; // 0-1
        const bonus = score === 100 ? 10 : 0; // Bonus perfect score

        return Math.floor(base * multiplier) + bonus;
    },

    /**
     * Ajouter XP au joueur
     */
    async addXP(xp) {
        if (!AuthSystem.isLoggedIn()) return;

        try {
            const { doc, updateDoc, getDoc, increment, serverTimestamp } = await import(
                'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
            );

            const user = AuthSystem.getCurrentUser();
            const userRef = doc(window.firebaseDB, 'users', user.uid);

            // Récupérer XP actuel
            const userDoc = await getDoc(userRef);
            const currentXP = userDoc.exists() ? (userDoc.data().totalXP || 0) : 0;
            const newTotalXP = currentXP + xp;

            // Calculer nouveau niveau
            const newLevel = this.calculateLevel(newTotalXP);
            const oldLevel = this.calculateLevel(currentXP);

            // Mettre à jour
            await updateDoc(userRef, {
                totalXP: increment(xp),
                level: newLevel,
                lastActivity: serverTimestamp()
            });

            // Si montée de niveau
            if (newLevel > oldLevel) {
                this.showLevelUpNotification(newLevel);
            }

            // Afficher XP gagné
            this.showXPNotification(xp);

            console.log(`✨ +${xp} XP | Total: ${newTotalXP} | Niveau: ${newLevel}`);
        } catch (error) {
            console.error('❌ Erreur ajout XP:', error);
        }
    },

    /**
     * Calculer niveau selon XP total
     * Formule: level = floor(sqrt(totalXP / 100)) + 1
     */
    calculateLevel(totalXP) {
        return Math.floor(Math.sqrt(totalXP / 100)) + 1;
    },

    /**
     * XP nécessaire pour niveau suivant
     */
    xpForNextLevel(currentLevel) {
        return Math.pow(currentLevel, 2) * 100;
    },

    /**
     * Vérifier et débloquer nouveaux badges
     */
    async checkBadges(domaine, niveau, progression) {
        if (!AuthSystem.isLoggedIn()) return;

        const newBadges = [];

        // Badge: Premier exercice complété
        if (progression.nombreExercices === 1) {
            newBadges.push({
                id: 'first_exercise',
                name: 'Premiers Pas',
                description: 'Compléter votre premier exercice',
                icon: '🎯'
            });
        }

        // Badge: 10 exercices complétés
        if (progression.nombreExercices === 10) {
            newBadges.push({
                id: 'exercices_10',
                name: 'Dévoué',
                description: 'Compléter 10 exercices',
                icon: '📚'
            });
        }

        // Badge: Score parfait
        if (progression.meilleurScore === 100) {
            newBadges.push({
                id: `perfect_${domaine}`,
                name: `Perfection ${domaine}`,
                description: `Score parfait en ${domaine}`,
                icon: '⭐'
            });
        }

        // Badge: Niveau maîtrisé
        if (progression.maitrise) {
            newBadges.push({
                id: `master_${domaine}_${niveau}`,
                name: `Maître ${niveau}`,
                description: `Maîtriser ${domaine} niveau ${niveau}`,
                icon: '🏆'
            });
        }

        // Sauvegarder nouveaux badges
        for (const badge of newBadges) {
            await this.unlockBadge(badge);
        }
    },

    /**
     * Débloquer un badge
     */
    async unlockBadge(badge) {
        if (!AuthSystem.isLoggedIn()) return;

        try {
            const { doc, getDoc, updateDoc, arrayUnion, serverTimestamp } = await import(
                'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
            );

            const user = AuthSystem.getCurrentUser();
            const userRef = doc(window.firebaseDB, 'users', user.uid);

            // Vérifier si badge déjà obtenu
            const userDoc = await getDoc(userRef);
            const currentBadges = userDoc.exists() ? (userDoc.data().badges || []) : [];

            if (!currentBadges.some(b => b.id === badge.id)) {
                // Ajouter badge
                await updateDoc(userRef, {
                    badges: arrayUnion({
                        ...badge,
                        unlockedAt: new Date().toISOString()
                    }),
                    lastActivity: serverTimestamp()
                });

                // Afficher notification
                this.showBadgeNotification(badge);

                console.log(`🏆 Badge débloqué: ${badge.name}`);
            }
        } catch (error) {
            console.error('❌ Erreur déblocage badge:', error);
        }
    },

    /**
     * Notifications visuelles
     */
    showXPNotification(xp) {
        this.showToast(`✨ +${xp} XP`, 'success');
    },

    showLevelUpNotification(level) {
        this.showToast(`🎉 Niveau ${level} atteint !`, 'levelup', 3000);
    },

    showBadgeNotification(badge) {
        this.showToast(`${badge.icon} Badge débloqué: ${badge.name}`, 'badge', 4000);
    },

    showToast(message, type = 'info', duration = 2000) {
        // Créer toast temporaire
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: linear-gradient(135deg, #8a2be2, #da70d6);
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(138, 43, 226, 0.5);
            font-size: 1.1rem;
            font-weight: bold;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;

        if (type === 'levelup') {
            toast.style.background = 'linear-gradient(135deg, #ffd700, #ff8c00)';
            toast.style.fontSize = '1.3rem';
        } else if (type === 'badge') {
            toast.style.background = 'linear-gradient(135deg, #ff6b6b, #ee5a6f)';
        }

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
};

// Ajouter animations CSS
const style = document.createElement('style');
style.textContent = `
@keyframes slideIn {
    from { transform: translateX(400px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}
@keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(400px); opacity: 0; }
}
`;
document.head.appendChild(style);

// Exporter globalement
window.UserProgressionSystem = UserProgressionSystem;
