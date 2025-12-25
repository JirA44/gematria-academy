/**
 * Gematria Academy - Système de Gamification
 * Badges, XP, Niveaux et Achievements
 */

const GamificationSystem = {
    // Configuration des niveaux
    levels: [
        { level: 1, name: "Néophyte", xpRequired: 0, icon: "🌱" },
        { level: 2, name: "Apprenti", xpRequired: 100, icon: "📚" },
        { level: 3, name: "Initié", xpRequired: 300, icon: "🔮" },
        { level: 4, name: "Adepte", xpRequired: 600, icon: "⭐" },
        { level: 5, name: "Disciple", xpRequired: 1000, icon: "🌟" },
        { level: 6, name: "Érudit", xpRequired: 1500, icon: "📖" },
        { level: 7, name: "Sage", xpRequired: 2200, icon: "🧙" },
        { level: 8, name: "Maître", xpRequired: 3000, icon: "👑" },
        { level: 9, name: "Grand Maître", xpRequired: 4000, icon: "🏆" },
        { level: 10, name: "Illuminé", xpRequired: 5500, icon: "✨" },
        { level: 11, name: "Archonte", xpRequired: 7500, icon: "🌌" },
        { level: 12, name: "Ascendé", xpRequired: 10000, icon: "🔱" }
    ],

    // Définition des badges
    badges: {
        // Badges de progression
        first_lesson: { name: "Premier Pas", desc: "Compléter votre première leçon", icon: "👣", xp: 10 },
        five_lessons: { name: "Étudiant Assidu", desc: "Compléter 5 leçons", icon: "📝", xp: 25 },
        ten_lessons: { name: "Chercheur de Savoir", desc: "Compléter 10 leçons", icon: "🎯", xp: 50 },
        twenty_lessons: { name: "Érudit Dévoué", desc: "Compléter 20 leçons", icon: "🏅", xp: 100 },
        fifty_lessons: { name: "Maître du Savoir", desc: "Compléter 50 leçons", icon: "🎖️", xp: 250 },

        // Badges de quiz
        first_quiz: { name: "Testeur", desc: "Compléter votre premier quiz", icon: "❓", xp: 10 },
        perfect_quiz: { name: "Perfection", desc: "Obtenir 100% à un quiz", icon: "💯", xp: 30 },
        ten_quizzes: { name: "Quiz Master", desc: "Compléter 10 quiz", icon: "🧠", xp: 75 },

        // Badges par discipline
        runes_initiate: { name: "Initié Runique", desc: "Compléter le cours débutant de runes", icon: "ᚠ", xp: 40 },
        runes_master: { name: "Maître des Runes", desc: "Compléter tous les cours de runes", icon: "ᛟ", xp: 150 },

        gematria_initiate: { name: "Initié Gematria", desc: "Compléter le cours débutant de gematria", icon: "א", xp: 40 },
        gematria_master: { name: "Maître de la Gematria", desc: "Compléter tous les cours de gematria", icon: "🔯", xp: 150 },

        hieroglyphs_initiate: { name: "Scribe Junior", desc: "Commencer les hiéroglyphes", icon: "𓂀", xp: 40 },
        hieroglyphs_master: { name: "Maître Scribe", desc: "Maîtriser les hiéroglyphes", icon: "𓊹", xp: 150 },

        maya_initiate: { name: "Explorateur Maya", desc: "Découvrir les glyphes mayas", icon: "🌞", xp: 40 },
        maya_master: { name: "Sage Maya", desc: "Maîtriser l'écriture maya", icon: "🗿", xp: 150 },

        numerology_initiate: { name: "Numérologue", desc: "Apprendre les bases de la numérologie", icon: "🔢", xp: 40 },
        numerology_master: { name: "Maître des Nombres", desc: "Maîtriser la numérologie", icon: "♾️", xp: 150 },

        tarot_initiate: { name: "Lecteur de Cartes", desc: "Découvrir les arcanes majeurs", icon: "🎴", xp: 40 },
        tarot_master: { name: "Oracle", desc: "Maîtriser le Tarot", icon: "🔮", xp: 150 },

        astrology_initiate: { name: "Observateur Céleste", desc: "Apprendre les signes du zodiaque", icon: "⭐", xp: 40 },
        astrology_master: { name: "Astrologue", desc: "Maîtriser l'astrologie", icon: "🌌", xp: 150 },

        alchemy_initiate: { name: "Apprenti Alchimiste", desc: "Découvrir l'alchimie", icon: "⚗️", xp: 40 },
        alchemy_master: { name: "Maître Alchimiste", desc: "Maîtriser le Grand Œuvre", icon: "🜍", xp: 150 },

        kabbale_initiate: { name: "Étudiant Kabbale", desc: "Explorer l'Arbre de Vie", icon: "🌳", xp: 40 },
        kabbale_master: { name: "Kabbaliste", desc: "Maîtriser la Kabbale", icon: "✡️", xp: 150 },

        // Badges spéciaux
        daily_streak_7: { name: "Assidu", desc: "7 jours consécutifs d'étude", icon: "🔥", xp: 50 },
        daily_streak_30: { name: "Dévoué", desc: "30 jours consécutifs d'étude", icon: "💪", xp: 200 },
        night_owl: { name: "Oiseau de Nuit", desc: "Étudier après minuit", icon: "🦉", xp: 15 },
        early_bird: { name: "Lève-tôt", desc: "Étudier avant 6h du matin", icon: "🐦", xp: 15 },
        polymath: { name: "Polymathe", desc: "Étudier 5 disciplines différentes", icon: "🎓", xp: 100 },
        completionist: { name: "Complétionniste", desc: "Obtenir tous les badges de maîtrise", icon: "👑", xp: 500 },

        // Badges d'outils
        calculator_user: { name: "Calculateur", desc: "Utiliser un calculateur 10 fois", icon: "🧮", xp: 20 },
        tarot_reader: { name: "Cartomancien", desc: "Faire 10 tirages de tarot", icon: "🃏", xp: 20 },
        flashcard_pro: { name: "Mnémoniste", desc: "Réviser 100 flashcards", icon: "🗂️", xp: 30 }
    },

    // Données utilisateur (stockées localement)
    userData: {
        xp: 0,
        level: 1,
        badges: [],
        lessonsCompleted: [],
        quizzesCompleted: [],
        toolsUsage: {},
        dailyStreak: 0,
        lastVisit: null,
        totalTimeSpent: 0,
        disciplinesStudied: []
    },

    // Initialisation
    async init() {
        await this.loadUserData();
        this.checkDailyStreak();
        this.checkTimeBasedBadges();
        this.updateUI();

        // Écouter les changements d'auth pour sync
        if (window.gematriaAuth) {
            window.gematriaAuth.onAuthStateChanged((user) => {
                if (user) {
                    this.syncFromCloud();
                }
            });
        }
    },

    // Charger les données (Firestore si connecté, sinon localStorage)
    async loadUserData() {
        // Toujours charger localStorage d'abord (cache local)
        const saved = localStorage.getItem('gematria_academy_user');
        if (saved) {
            this.userData = { ...this.userData, ...JSON.parse(saved) };
        }

        // Si utilisateur connecté, charger depuis Firestore
        if (window.gematriaAuth && window.gematriaAuth.isLoggedIn) {
            await this.syncFromCloud();
        }
    },

    // Synchroniser depuis Firestore
    async syncFromCloud() {
        try {
            if (!window.gematriaAuth || !window.gematriaAuth.currentUser) return;

            const uid = window.gematriaAuth.currentUser.uid;
            const cloudData = await window.gematriaAuth.loadUserData(uid);

            if (cloudData && cloudData.gamification) {
                // Fusionner les données cloud avec les locales (cloud prioritaire)
                this.userData = { ...this.userData, ...cloudData.gamification };
                // Mettre à jour le cache local
                localStorage.setItem('gematria_academy_user', JSON.stringify(this.userData));
                this.updateUI();
            }
        } catch (error) {
            console.warn('Erreur sync cloud gamification:', error);
        }
    },

    // Sauvegarder les données (Firestore si connecté + localStorage)
    async saveUserData() {
        // Toujours sauvegarder en localStorage (cache)
        localStorage.setItem('gematria_academy_user', JSON.stringify(this.userData));

        // Si utilisateur connecté, sauvegarder aussi dans Firestore
        if (window.gematriaAuth && window.gematriaAuth.isLoggedIn && window.gematriaAuth.currentUser) {
            try {
                const uid = window.gematriaAuth.currentUser.uid;
                await window.gematriaAuth.saveUserData(uid, {
                    gamification: this.userData
                });
            } catch (error) {
                console.warn('Erreur sauvegarde cloud gamification:', error);
            }
        }
    },

    // Gagner de l'XP
    gainXP(amount, reason = "") {
        this.userData.xp += amount;
        this.checkLevelUp();
        this.saveUserData();

        // Afficher notification
        this.showNotification(`+${amount} XP${reason ? ` - ${reason}` : ''}`, 'xp');

        return amount;
    },

    // Vérifier montée de niveau
    checkLevelUp() {
        const currentLevel = this.userData.level;
        let newLevel = 1;

        for (const lvl of this.levels) {
            if (this.userData.xp >= lvl.xpRequired) {
                newLevel = lvl.level;
            }
        }

        if (newLevel > currentLevel) {
            this.userData.level = newLevel;
            const levelData = this.levels.find(l => l.level === newLevel);
            this.showNotification(`🎉 Niveau ${newLevel} atteint ! Vous êtes maintenant ${levelData.name}`, 'level');
        }
    },

    // Débloquer un badge
    unlockBadge(badgeId) {
        if (this.userData.badges.includes(badgeId)) return false;

        const badge = this.badges[badgeId];
        if (!badge) return false;

        this.userData.badges.push(badgeId);
        this.gainXP(badge.xp, badge.name);
        this.showNotification(`🏆 Badge débloqué : ${badge.icon} ${badge.name}`, 'badge');
        this.saveUserData();

        return true;
    },

    // Compléter une leçon
    completeLesson(lessonId, discipline) {
        if (this.userData.lessonsCompleted.includes(lessonId)) return;

        this.userData.lessonsCompleted.push(lessonId);
        this.gainXP(20, "Leçon complétée");

        // Ajouter la discipline
        if (!this.userData.disciplinesStudied.includes(discipline)) {
            this.userData.disciplinesStudied.push(discipline);
        }

        // Vérifier badges
        const count = this.userData.lessonsCompleted.length;
        if (count === 1) this.unlockBadge('first_lesson');
        if (count === 5) this.unlockBadge('five_lessons');
        if (count === 10) this.unlockBadge('ten_lessons');
        if (count === 20) this.unlockBadge('twenty_lessons');
        if (count === 50) this.unlockBadge('fifty_lessons');

        // Badge polymathe
        if (this.userData.disciplinesStudied.length >= 5) {
            this.unlockBadge('polymath');
        }

        this.saveUserData();
    },

    // Compléter un quiz
    completeQuiz(quizId, score, maxScore) {
        this.userData.quizzesCompleted.push({ id: quizId, score, maxScore, date: new Date() });

        const percentage = (score / maxScore) * 100;
        const xpGained = Math.round(10 + (percentage / 10));
        this.gainXP(xpGained, `Quiz ${Math.round(percentage)}%`);

        // Vérifier badges
        const count = this.userData.quizzesCompleted.length;
        if (count === 1) this.unlockBadge('first_quiz');
        if (count === 10) this.unlockBadge('ten_quizzes');
        if (percentage === 100) this.unlockBadge('perfect_quiz');

        this.saveUserData();
    },

    // Utiliser un outil
    useCalculator(toolName) {
        if (!this.userData.toolsUsage[toolName]) {
            this.userData.toolsUsage[toolName] = 0;
        }
        this.userData.toolsUsage[toolName]++;

        // Vérifier badges
        if (toolName.includes('calculator') && this.userData.toolsUsage[toolName] === 10) {
            this.unlockBadge('calculator_user');
        }
        if (toolName === 'tarot_tirage' && this.userData.toolsUsage[toolName] === 10) {
            this.unlockBadge('tarot_reader');
        }

        this.saveUserData();
    },

    // Vérifier streak quotidien
    checkDailyStreak() {
        const today = new Date().toDateString();
        const lastVisit = this.userData.lastVisit;

        if (lastVisit) {
            const lastDate = new Date(lastVisit);
            const daysDiff = Math.floor((new Date(today) - lastDate) / (1000 * 60 * 60 * 24));

            if (daysDiff === 1) {
                this.userData.dailyStreak++;
                if (this.userData.dailyStreak === 7) this.unlockBadge('daily_streak_7');
                if (this.userData.dailyStreak === 30) this.unlockBadge('daily_streak_30');
            } else if (daysDiff > 1) {
                this.userData.dailyStreak = 1;
            }
        } else {
            this.userData.dailyStreak = 1;
        }

        this.userData.lastVisit = today;
        this.saveUserData();
    },

    // Vérifier badges liés à l'heure
    checkTimeBasedBadges() {
        const hour = new Date().getHours();
        if (hour >= 0 && hour < 5) this.unlockBadge('night_owl');
        if (hour >= 4 && hour < 6) this.unlockBadge('early_bird');
    },

    // Obtenir le niveau actuel
    getCurrentLevel() {
        return this.levels.find(l => l.level === this.userData.level);
    },

    // Obtenir le prochain niveau
    getNextLevel() {
        return this.levels.find(l => l.level === this.userData.level + 1);
    },

    // Calculer la progression vers le prochain niveau
    getLevelProgress() {
        const current = this.getCurrentLevel();
        const next = this.getNextLevel();

        if (!next) return 100;

        const xpInLevel = this.userData.xp - current.xpRequired;
        const xpNeeded = next.xpRequired - current.xpRequired;

        return Math.round((xpInLevel / xpNeeded) * 100);
    },

    // Afficher une notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `ga-notification ga-notification-${type}`;
        notification.innerHTML = message;

        // Styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 10px;
            background: ${type === 'xp' ? 'linear-gradient(135deg, #22c55e, #16a34a)' :
                         type === 'level' ? 'linear-gradient(135deg, #8b5cf6, #a855f7)' :
                         type === 'badge' ? 'linear-gradient(135deg, #f59e0b, #d97706)' :
                         'linear-gradient(135deg, #3b82f6, #2563eb)'};
            color: white;
            font-weight: bold;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
            max-width: 300px;
        `;

        document.body.appendChild(notification);

        setTimeout(() => notification.remove(), 3000);
    },

    // Mettre à jour l'interface
    updateUI() {
        // Mettre à jour la barre XP si elle existe
        const xpBar = document.getElementById('ga-xp-bar');
        const xpText = document.getElementById('ga-xp-text');
        const levelText = document.getElementById('ga-level');

        if (xpBar) {
            xpBar.style.width = `${this.getLevelProgress()}%`;
        }
        if (xpText) {
            const next = this.getNextLevel();
            xpText.textContent = next ?
                `${this.userData.xp} / ${next.xpRequired} XP` :
                `${this.userData.xp} XP (MAX)`;
        }
        if (levelText) {
            const current = this.getCurrentLevel();
            levelText.textContent = `${current.icon} Niveau ${current.level} - ${current.name}`;
        }
    },

    // Générer le widget de profil
    generateProfileWidget() {
        const current = this.getCurrentLevel();
        const next = this.getNextLevel();
        const progress = this.getLevelProgress();

        return `
            <div class="ga-profile-widget">
                <div class="ga-level-info">
                    <span class="ga-level-icon">${current.icon}</span>
                    <div class="ga-level-details">
                        <div class="ga-level-name">Niveau ${current.level} - ${current.name}</div>
                        <div class="ga-xp-bar-container">
                            <div class="ga-xp-bar-fill" style="width: ${progress}%"></div>
                        </div>
                        <div class="ga-xp-text">${this.userData.xp}${next ? ` / ${next.xpRequired}` : ''} XP</div>
                    </div>
                </div>
                <div class="ga-stats">
                    <div class="ga-stat">
                        <span class="ga-stat-value">${this.userData.lessonsCompleted.length}</span>
                        <span class="ga-stat-label">Leçons</span>
                    </div>
                    <div class="ga-stat">
                        <span class="ga-stat-value">${this.userData.badges.length}</span>
                        <span class="ga-stat-label">Badges</span>
                    </div>
                    <div class="ga-stat">
                        <span class="ga-stat-value">${this.userData.dailyStreak}🔥</span>
                        <span class="ga-stat-label">Streak</span>
                    </div>
                </div>
            </div>
        `;
    },

    // Générer la liste des badges
    generateBadgesList() {
        return Object.entries(this.badges).map(([id, badge]) => {
            const unlocked = this.userData.badges.includes(id);
            return `
                <div class="ga-badge ${unlocked ? 'unlocked' : 'locked'}">
                    <span class="ga-badge-icon">${badge.icon}</span>
                    <div class="ga-badge-info">
                        <div class="ga-badge-name">${badge.name}</div>
                        <div class="ga-badge-desc">${badge.desc}</div>
                        <div class="ga-badge-xp">+${badge.xp} XP</div>
                    </div>
                </div>
            `;
        }).join('');
    }
};

// Styles CSS injectés
const gaStyles = document.createElement('style');
gaStyles.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes fadeOut {
        to { opacity: 0; transform: translateY(-20px); }
    }

    .ga-profile-widget {
        background: linear-gradient(145deg, rgba(139, 92, 246, 0.2), rgba(0,0,0,0.3));
        border-radius: 15px;
        padding: 20px;
        border: 2px solid rgba(139, 92, 246, 0.3);
    }

    .ga-level-info {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 20px;
    }

    .ga-level-icon {
        font-size: 3em;
    }

    .ga-level-name {
        font-size: 1.2em;
        font-weight: bold;
        color: #a855f7;
        margin-bottom: 8px;
    }

    .ga-xp-bar-container {
        width: 200px;
        height: 10px;
        background: rgba(0,0,0,0.3);
        border-radius: 5px;
        overflow: hidden;
    }

    .ga-xp-bar-fill {
        height: 100%;
        background: linear-gradient(90deg, #8b5cf6, #d946ef);
        transition: width 0.5s ease;
    }

    .ga-xp-text {
        font-size: 0.85em;
        opacity: 0.7;
        margin-top: 5px;
    }

    .ga-stats {
        display: flex;
        gap: 20px;
        justify-content: center;
    }

    .ga-stat {
        text-align: center;
    }

    .ga-stat-value {
        display: block;
        font-size: 1.5em;
        font-weight: bold;
        color: #a855f7;
    }

    .ga-stat-label {
        font-size: 0.8em;
        opacity: 0.7;
    }

    .ga-badge {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 15px;
        background: rgba(0,0,0,0.2);
        border-radius: 10px;
        margin-bottom: 10px;
        transition: all 0.3s ease;
    }

    .ga-badge.locked {
        opacity: 0.5;
        filter: grayscale(100%);
    }

    .ga-badge.unlocked {
        border-left: 4px solid #22c55e;
    }

    .ga-badge-icon {
        font-size: 2em;
    }

    .ga-badge-name {
        font-weight: bold;
        color: #f4d03f;
    }

    .ga-badge-desc {
        font-size: 0.85em;
        opacity: 0.7;
    }

    .ga-badge-xp {
        font-size: 0.8em;
        color: #22c55e;
    }
`;
document.head.appendChild(gaStyles);

// Initialiser au chargement
document.addEventListener('DOMContentLoaded', () => {
    GamificationSystem.init();
});

// Export pour utilisation dans d'autres scripts
window.GamificationSystem = GamificationSystem;
