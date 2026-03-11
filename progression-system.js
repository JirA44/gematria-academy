/**
 * SYSTÈME DE PROGRESSION PÉDAGOGIQUE
 * Permet une progression débutant → intermédiaire → expert
 * avec validation de maîtrise à chaque niveau
 */

const ProgressionSystem = {
    // Seuils de maîtrise requis pour débloquer le niveau suivant
    SEUILS: {
        debutant: 70,      // 70% pour débloquer intermédiaire
        intermediaire: 75,  // 75% pour débloquer expert
        expert: 80         // 80% pour maîtrise complète
    },

    // Nombre minimum d'exercices à compléter par niveau
    MIN_EXERCICES: {
        debutant: 3,
        intermediaire: 3,
        expert: 3
    },

    /**
     * Sauvegarder le résultat d'un exercice
     * @param {string} domaine - hieroglyphes, maya, runes, gematria, logique
     * @param {string} niveau - debutant, intermediaire, expert
     * @param {string} exerciceId - Identifiant de l'exercice
     * @param {number} score - Score obtenu (0-100)
     */
    sauvegarderResultat(domaine, niveau, exerciceId, score) {
        const key = `progression_${domaine}_${niveau}`;
        let data = this.chargerProgression(domaine, niveau);

        // Ajouter le résultat
        if (!data.exercices[exerciceId]) {
            data.exercices[exerciceId] = [];
        }

        data.exercices[exerciceId].push({
            score: score,
            date: new Date().toISOString(),
            timestamp: Date.now()
        });

        // Calculer la moyenne
        data.scoreMoyen = this.calculerScoreMoyen(data.exercices);
        data.nombreExercices = Object.keys(data.exercices).length;
        data.nombreTentatives = Object.values(data.exercices).reduce((sum, arr) => sum + arr.length, 0);
        data.meilleurScore = Math.max(...Object.values(data.exercices).map(arr => Math.max(...arr.map(r => r.score))));
        data.dernierAcces = new Date().toISOString();

        // Vérifier si le niveau est maîtrisé
        data.maitrise = this.verifierMaitrise(domaine, niveau, data);
        data.niveauDebloque = this.niveauSuivantDebloque(domaine, niveau, data);

        localStorage.setItem(key, JSON.stringify(data));

        // Mettre à jour la progression globale
        this.mettreAJourProgressionGlobale(domaine);

        return data;
    },

    /**
     * Charger la progression d'un niveau
     */
    chargerProgression(domaine, niveau) {
        const key = `progression_${domaine}_${niveau}`;
        const stored = localStorage.getItem(key);

        if (stored) {
            return JSON.parse(stored);
        }

        // Initialiser nouvelle progression
        return {
            domaine: domaine,
            niveau: niveau,
            exercices: {},
            scoreMoyen: 0,
            nombreExercices: 0,
            nombreTentatives: 0,
            meilleurScore: 0,
            maitrise: false,
            niveauDebloque: false,
            premierAcces: new Date().toISOString(),
            dernierAcces: new Date().toISOString()
        };
    },

    /**
     * Calculer le score moyen de tous les exercices
     */
    calculerScoreMoyen(exercices) {
        const exerciceIds = Object.keys(exercices);
        if (exerciceIds.length === 0) return 0;

        // Pour chaque exercice, prendre le meilleur score
        const meilleursScores = exerciceIds.map(id => {
            const tentatives = exercices[id];
            return Math.max(...tentatives.map(t => t.score));
        });

        return Math.round(meilleursScores.reduce((sum, s) => sum + s, 0) / meilleursScores.length);
    },

    /**
     * Vérifier si un niveau est maîtrisé
     */
    verifierMaitrise(domaine, niveau, data) {
        const seuil = this.SEUILS[niveau];
        const minExercices = this.MIN_EXERCICES[niveau];

        return data.scoreMoyen >= seuil && data.nombreExercices >= minExercices;
    },

    /**
     * Vérifier si le niveau suivant est débloqué
     */
    niveauSuivantDebloque(domaine, niveau, data) {
        if (niveau === 'expert') return true; // Déjà au max

        return this.verifierMaitrise(domaine, niveau, data);
    },

    /**
     * Obtenir le niveau accessible
     */
    obtenirNiveauAccessible(domaine) {
        // Vérifier débutant
        const debutant = this.chargerProgression(domaine, 'debutant');
        if (!debutant.niveauDebloque) {
            return 'debutant';
        }

        // Vérifier intermédiaire
        const intermediaire = this.chargerProgression(domaine, 'intermediaire');
        if (!intermediaire.niveauDebloque) {
            return 'intermediaire';
        }

        return 'expert';
    },

    /**
     * Vérifier si un niveau est accessible
     */
    estNiveauAccessible(domaine, niveau) {
        if (niveau === 'debutant') return true;

        if (niveau === 'intermediaire') {
            const debutant = this.chargerProgression(domaine, 'debutant');
            return debutant.niveauDebloque;
        }

        if (niveau === 'expert') {
            const intermediaire = this.chargerProgression(domaine, 'intermediaire');
            return intermediaire.niveauDebloque;
        }

        return false;
    },

    /**
     * Mettre à jour la progression globale du domaine
     */
    mettreAJourProgressionGlobale(domaine) {
        const niveaux = ['debutant', 'intermediaire', 'expert'];
        const progressions = niveaux.map(n => this.chargerProgression(domaine, n));

        const global = {
            domaine: domaine,
            niveauxMaitrises: progressions.filter(p => p.maitrise).length,
            scoreGlobalMoyen: Math.round(progressions.reduce((sum, p) => sum + p.scoreMoyen, 0) / 3),
            totalExercices: progressions.reduce((sum, p) => sum + p.nombreExercices, 0),
            totalTentatives: progressions.reduce((sum, p) => sum + p.nombreTentatives, 0),
            niveauActuel: this.obtenirNiveauAccessible(domaine),
            maitrise: progressions.every(p => p.maitrise),
            dernierAcces: new Date().toISOString()
        };

        localStorage.setItem(`progression_${domaine}_global`, JSON.stringify(global));
    },

    /**
     * Obtenir la progression globale de tous les domaines
     */
    obtenirProgressionComplete() {
        const domaines = ['hieroglyphes', 'maya', 'runes', 'gematria', 'logique'];
        const progressions = {};

        domaines.forEach(domaine => {
            const stored = localStorage.getItem(`progression_${domaine}_global`);
            if (stored) {
                progressions[domaine] = JSON.parse(stored);
            } else {
                progressions[domaine] = {
                    domaine: domaine,
                    niveauxMaitrises: 0,
                    scoreGlobalMoyen: 0,
                    totalExercices: 0,
                    totalTentatives: 0,
                    niveauActuel: 'debutant',
                    maitrise: false
                };
            }
        });

        return progressions;
    },

    /**
     * Obtenir les statistiques globales
     */
    obtenirStatistiquesGlobales() {
        const progressions = this.obtenirProgressionComplete();
        const domaines = Object.values(progressions);

        return {
            totalDomainesMaitrises: domaines.filter(d => d.maitrise).length,
            totalNiveauxMaitrises: domaines.reduce((sum, d) => sum + d.niveauxMaitrises, 0),
            scoreMoyenGlobal: Math.round(domaines.reduce((sum, d) => sum + d.scoreGlobalMoyen, 0) / domaines.length),
            totalExercices: domaines.reduce((sum, d) => sum + d.totalExercices, 0),
            totalTentatives: domaines.reduce((sum, d) => sum + d.totalTentatives, 0),
            progression: Math.round(domaines.reduce((sum, d) => sum + d.niveauxMaitrises, 0) / 15 * 100)
        };
    },

    /**
     * Afficher un message de déblocage
     */
    afficherDeblocage(domaine, niveau) {
        const niveauSuivant = niveau === 'debutant' ? 'intermédiaire' : 'expert';

        const modal = document.createElement('div');
        modal.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 99999;
                animation: fadeIn 0.5s ease;
            ">
                <div style="
                    background: linear-gradient(135deg, #1a1a2e, #2d2d44);
                    padding: 3rem;
                    border-radius: 20px;
                    border: 3px solid #8a2be2;
                    text-align: center;
                    max-width: 500px;
                    box-shadow: 0 0 50px rgba(138, 43, 226, 0.5);
                    animation: scaleIn 0.5s ease;
                ">
                    <div style="font-size: 5rem; margin-bottom: 1rem;">🎉</div>
                    <h2 style="color: #ffd700; font-size: 2rem; margin-bottom: 1rem;">
                        NIVEAU DÉBLOQUÉ !
                    </h2>
                    <p style="color: #e0e0e0; font-size: 1.3rem; margin-bottom: 2rem;">
                        Vous avez maîtrisé le niveau <strong>${niveau}</strong> !<br>
                        Le niveau <strong>${niveauSuivant}</strong> est maintenant accessible.
                    </p>
                    <button onclick="this.closest('div').remove()" style="
                        background: linear-gradient(135deg, #9b59b6, #8e44ad);
                        color: white;
                        border: none;
                        padding: 1rem 2rem;
                        font-size: 1.2rem;
                        border-radius: 50px;
                        cursor: pointer;
                        box-shadow: 0 5px 20px rgba(155, 89, 182, 0.5);
                    ">
                        Continuer
                    </button>
                </div>
            </div>
            <style>
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleIn {
                    from { transform: scale(0.8); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            </style>
        `;
        document.body.appendChild(modal);
    },

    /**
     * Bloquer l'accès à un niveau non débloqué
     */
    bloquerAcces(domaine, niveau) {
        const niveauPrecedent = niveau === 'intermediaire' ? 'débutant' : 'intermédiaire';

        const modal = document.createElement('div');
        modal.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0, 0, 0, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 99999;
            ">
                <div style="
                    background: linear-gradient(135deg, #1a1a2e, #2d2d44);
                    padding: 3rem;
                    border-radius: 20px;
                    border: 3px solid #e74c3c;
                    text-align: center;
                    max-width: 500px;
                ">
                    <div style="font-size: 5rem; margin-bottom: 1rem;">🔒</div>
                    <h2 style="color: #e74c3c; font-size: 2rem; margin-bottom: 1rem;">
                        NIVEAU VERROUILLÉ
                    </h2>
                    <p style="color: #e0e0e0; font-size: 1.2rem; margin-bottom: 2rem;">
                        Vous devez d'abord maîtriser le niveau <strong>${niveauPrecedent}</strong><br>
                        avec un score d'au moins <strong>${this.SEUILS[niveauPrecedent === 'débutant' ? 'debutant' : 'intermediaire']}%</strong>.
                    </p>
                    <button onclick="window.location.href='${domaine}-${niveauPrecedent}.html'" style="
                        background: linear-gradient(135deg, #3498db, #2980b9);
                        color: white;
                        border: none;
                        padding: 1rem 2rem;
                        font-size: 1.2rem;
                        border-radius: 50px;
                        cursor: pointer;
                        margin-right: 1rem;
                    ">
                        Retour au niveau ${niveauPrecedent}
                    </button>
                    <button onclick="window.location.href='index_COMPLET.html'" style="
                        background: rgba(255, 255, 255, 0.1);
                        color: white;
                        border: 2px solid white;
                        padding: 1rem 2rem;
                        font-size: 1.2rem;
                        border-radius: 50px;
                        cursor: pointer;
                    ">
                        Retour accueil
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    },

    /**
     * Réinitialiser la progression d'un domaine
     */
    reinitialiserDomaine(domaine) {
        ['debutant', 'intermediaire', 'expert'].forEach(niveau => {
            localStorage.removeItem(`progression_${domaine}_${niveau}`);
        });
        localStorage.removeItem(`progression_${domaine}_global`);
    },

    /**
     * Réinitialiser toute la progression
     */
    reinitialiserTout() {
        ['hieroglyphes', 'maya', 'runes', 'gematria', 'logique'].forEach(domaine => {
            this.reinitialiserDomaine(domaine);
        });
    }
};

// Export global
window.ProgressionSystem = ProgressionSystem;
