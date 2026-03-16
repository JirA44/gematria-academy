/**
 * Système de Validation des Connaissances
 * Vérifie que l'étudiant a bien intégré chaque leçon avant de progresser
 */

// Base de données des quiz par leçon
const knowledgeQuizzes = {
    // Runes
    'rune-fehu': {
        title: 'Validation Rune Fehu',
        requiredScore: 80,
        questions: [
            {
                question: 'Quelle est la signification principale de Fehu ?',
                options: ['Richesse et bétail', 'Force et courage', 'Sagesse', 'Protection'],
                correct: 0,
                explanation: 'Fehu représente la richesse matérielle, le bétail et l\'abondance.'
            },
            {
                question: 'Fehu est associée à quel élément ?',
                options: ['Feu', 'Eau', 'Terre', 'Air'],
                correct: 2,
                explanation: 'Fehu est liée à la Terre, symbolisant les possessions matérielles.'
            },
            {
                question: 'Dans un tirage, Fehu renversée peut indiquer :',
                options: ['Gains financiers', 'Pertes matérielles', 'Amour', 'Voyage'],
                correct: 1,
                explanation: 'Fehu renversée met en garde contre les pertes ou la mauvaise gestion.'
            },
            {
                question: 'Fehu est la première rune de quel Aett ?',
                options: ['Aett de Freyja', 'Aett de Heimdall', 'Aett de Tyr', 'Aett d\'Odin'],
                correct: 0,
                explanation: 'Fehu ouvre l\'Aett de Freyja, déesse de la fertilité et de la prospérité.'
            }
        ]
    },
    'rune-uruz': {
        title: 'Validation Rune Uruz',
        requiredScore: 80,
        questions: [
            {
                question: 'Uruz symbolise principalement :',
                options: ['La force vitale et l\'énergie brute', 'La sagesse', 'L\'amour', 'Le voyage'],
                correct: 0,
                explanation: 'Uruz représente la force primordiale, l\'énergie vitale et la santé.'
            },
            {
                question: 'L\'animal associé à Uruz est :',
                options: ['Le loup', 'L\'aurochs (bœuf sauvage)', 'Le corbeau', 'Le dragon'],
                correct: 1,
                explanation: 'Uruz tire son nom de l\'aurochs, symbole de force et de puissance.'
            },
            {
                question: 'Uruz en tirage suggère :',
                options: ['Faiblesse', 'Vitalité et nouvelles opportunités', 'Fin', 'Tristesse'],
                correct: 1,
                explanation: 'Uruz annonce une période de force, de santé et de nouvelles possibilités.'
            },
            {
                question: 'La couleur traditionnelle d\'Uruz est :',
                options: ['Rouge', 'Vert', 'Bleu', 'Noir'],
                correct: 0,
                explanation: 'Le rouge symbolise la vitalité et l\'énergie ardente d\'Uruz.'
            }
        ]
    },
    // Astrologie
    'astro-belier': {
        title: 'Validation Bélier ♈',
        requiredScore: 80,
        questions: [
            {
                question: 'Le Bélier est gouverné par quelle planète ?',
                options: ['Mars', 'Vénus', 'Mercure', 'Jupiter'],
                correct: 0,
                explanation: 'Mars, planète de l\'action et du courage, gouverne le Bélier.'
            },
            {
                question: 'L\'élément du Bélier est :',
                options: ['Terre', 'Air', 'Feu', 'Eau'],
                correct: 2,
                explanation: 'Le Bélier est un signe de Feu, symbolisant passion et initiative.'
            },
            {
                question: 'La qualité principale du Bélier est :',
                options: ['Leadership et initiative', 'Stabilité', 'Compassion', 'Analyse'],
                correct: 0,
                explanation: 'Le Bélier est pionnier, courageux et aime prendre des initiatives.'
            },
            {
                question: 'La maison naturelle du Bélier est :',
                options: ['Maison 1 (Identité)', 'Maison 7', 'Maison 10', 'Maison 4'],
                correct: 0,
                explanation: 'La Maison 1 représente l\'identité et l\'apparence, domaines du Bélier.'
            }
        ]
    },
    // Gématrie
    'gematrie-bases': {
        title: 'Validation Bases de la Gématrie',
        requiredScore: 80,
        questions: [
            {
                question: 'La gématrie hébraïque attribue des valeurs à :',
                options: ['Des lettres', 'Des nombres', 'Des couleurs', 'Des planètes'],
                correct: 0,
                explanation: 'Chaque lettre hébraïque possède une valeur numérique spécifique.'
            },
            {
                question: 'La valeur de Aleph (א) est :',
                options: ['1', '2', '10', '100'],
                correct: 0,
                explanation: 'Aleph, première lettre, vaut 1 et symbolise l\'unité divine.'
            },
            {
                question: 'La gématrie permet de :',
                options: ['Trouver des liens cachés entre les mots', 'Prédire l\'avenir', 'Guérir', 'Voyager'],
                correct: 0,
                explanation: 'La gématrie révèle des connexions mystiques entre mots de même valeur.'
            },
            {
                question: 'Le Tetragramme YHVH (יהוה) a pour valeur :',
                options: ['26', '10', '72', '100'],
                correct: 0,
                explanation: 'Y(10) + H(5) + V(6) + H(5) = 26, nombre sacré du Nom divin.'
            }
        ]
    },
    // Tarot
    'tarot-bateleur': {
        title: 'Validation Le Bateleur (I)',
        requiredScore: 80,
        questions: [
            {
                question: 'Le Bateleur est l\'arcane numéro :',
                options: ['I (1)', '0 (Le Mat)', 'II', 'XXI'],
                correct: 0,
                explanation: 'Le Bateleur est l\'arcane I, symbolisant le commencement.'
            },
            {
                question: 'Le Bateleur représente :',
                options: ['La fin', 'Le potentiel et le commencement', 'La mort', 'La justice'],
                correct: 1,
                explanation: 'Il symbolise le début, la créativité et toutes les possibilités.'
            },
            {
                question: 'Sur sa table, le Bateleur a :',
                options: ['Les 4 symboles des arcanes mineurs', 'Des livres', 'Des armes', 'Rien'],
                correct: 0,
                explanation: 'Coupe, Épée, Bâton et Denier représentent tous les outils disponibles.'
            },
            {
                question: 'Le Bateleur symbolise quelle étape du voyage :',
                options: ['Le début du parcours initiatique', 'La fin', 'Le milieu', 'L\'arrêt'],
                correct: 0,
                explanation: 'C\'est le premier pas du Fou dans son voyage de transformation.'
            }
        ]
    }
};

// Système de validation des connaissances
class KnowledgeValidator {
    constructor() {
        this.currentQuiz = null;
        this.currentQuestion = 0;
        this.score = 0;
        this.answers = [];
        this.lessonId = null;
    }

    // Démarrer un quiz pour une leçon
    startQuiz(lessonId) {
        if (!knowledgeQuizzes[lessonId]) {
            console.error(`Pas de quiz pour la leçon: ${lessonId}`);
            return false;
        }

        this.lessonId = lessonId;
        this.currentQuiz = knowledgeQuizzes[lessonId];
        this.currentQuestion = 0;
        this.score = 0;
        this.answers = [];

        this.showQuizInterface();
        return true;
    }

    // Afficher l'interface de quiz
    showQuizInterface() {
        const quizHTML = `
            <div id="knowledge-quiz-overlay" class="quiz-overlay">
                <div class="quiz-container">
                    <div class="quiz-header">
                        <h2>📚 ${this.currentQuiz.title}</h2>
                        <p>Validez vos connaissances pour débloquer la prochaine leçon</p>
                        <div class="quiz-progress">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 0%"></div>
                            </div>
                            <span class="progress-text">Question 1/${this.currentQuiz.questions.length}</span>
                        </div>
                    </div>
                    <div id="quiz-content" class="quiz-content">
                        ${this.renderQuestion()}
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', quizHTML);
        this.attachEventListeners();
    }

    // Afficher une question
    renderQuestion() {
        const q = this.currentQuiz.questions[this.currentQuestion];
        const questionNumber = this.currentQuestion + 1;

        return `
            <div class="quiz-question">
                <h3>Question ${questionNumber}</h3>
                <p class="question-text">${q.question}</p>
                <div class="quiz-options">
                    ${q.options.map((option, index) => `
                        <button class="quiz-option" data-index="${index}">
                            <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                            <span class="option-text">${option}</span>
                        </button>
                    `).join('')}
                </div>
                <div id="question-feedback" class="question-feedback"></div>
            </div>
        `;
    }

    // Attacher les événements
    attachEventListeners() {
        const options = document.querySelectorAll('.quiz-option');
        options.forEach(option => {
            option.addEventListener('click', (e) => {
                this.selectAnswer(e.currentTarget);
            });
        });
    }

    // Sélectionner une réponse
    selectAnswer(optionElement) {
        const index = parseInt(optionElement.dataset.index);
        const q = this.currentQuiz.questions[this.currentQuestion];
        const isCorrect = index === q.correct;

        // Désactiver tous les boutons
        document.querySelectorAll('.quiz-option').forEach(opt => {
            opt.disabled = true;
            opt.classList.remove('selected');
        });

        // Marquer la réponse
        optionElement.classList.add('selected');

        // Afficher le feedback
        this.showFeedback(isCorrect, q.explanation, index, q.correct);

        // Enregistrer la réponse
        this.answers.push({
            question: this.currentQuestion,
            answer: index,
            correct: isCorrect
        });

        if (isCorrect) {
            this.score += 100 / this.currentQuiz.questions.length;
        }

        // Bouton suivant
        setTimeout(() => {
            this.showNextButton();
        }, 1500);
    }

    // Afficher le feedback
    showFeedback(isCorrect, explanation, selectedIndex, correctIndex) {
        const feedback = document.getElementById('question-feedback');
        const options = document.querySelectorAll('.quiz-option');

        if (isCorrect) {
            options[selectedIndex].classList.add('correct');
            feedback.innerHTML = `
                <div class="feedback-correct">
                    <span class="feedback-icon">✅</span>
                    <div>
                        <strong>Excellente réponse !</strong>
                        <p>${explanation}</p>
                    </div>
                </div>
            `;
        } else {
            options[selectedIndex].classList.add('incorrect');
            options[correctIndex].classList.add('correct');
            feedback.innerHTML = `
                <div class="feedback-incorrect">
                    <span class="feedback-icon">❌</span>
                    <div>
                        <strong>Pas tout à fait...</strong>
                        <p>${explanation}</p>
                    </div>
                </div>
            `;
        }
    }

    // Afficher le bouton suivant
    showNextButton() {
        const feedback = document.getElementById('question-feedback');
        const isLastQuestion = this.currentQuestion === this.currentQuiz.questions.length - 1;

        const buttonText = isLastQuestion ? 'Voir les résultats 🎯' : 'Question suivante →';
        const button = `
            <button class="quiz-next-btn" onclick="validator.nextQuestion()">
                ${buttonText}
            </button>
        `;

        feedback.insertAdjacentHTML('beforeend', button);
    }

    // Question suivante
    nextQuestion() {
        this.currentQuestion++;

        if (this.currentQuestion >= this.currentQuiz.questions.length) {
            this.showResults();
        } else {
            this.updateProgress();
            document.getElementById('quiz-content').innerHTML = this.renderQuestion();
            this.attachEventListeners();
        }
    }

    // Mettre à jour la progression
    updateProgress() {
        const progress = ((this.currentQuestion + 1) / this.currentQuiz.questions.length) * 100;
        document.querySelector('.progress-fill').style.width = `${progress}%`;
        document.querySelector('.progress-text').textContent =
            `Question ${this.currentQuestion + 1}/${this.currentQuiz.questions.length}`;
    }

    // Afficher les résultats
    showResults() {
        const passed = this.score >= this.currentQuiz.requiredScore;
        const grade = this.getGrade(this.score);

        const resultsHTML = `
            <div class="quiz-results">
                <div class="results-header ${passed ? 'passed' : 'failed'}">
                    <div class="results-icon">${passed ? '🎉' : '📚'}</div>
                    <h2>${passed ? 'Félicitations !' : 'Continuez vos efforts'}</h2>
                    <div class="score-display">
                        <div class="score-circle">
                            <svg viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(138, 43, 226, 0.2)" stroke-width="8"/>
                                <circle cx="50" cy="50" r="45" fill="none" stroke="#8a2be2" stroke-width="8"
                                    stroke-dasharray="${this.score * 2.827} 282.7"
                                    stroke-linecap="round"
                                    transform="rotate(-90 50 50)"/>
                            </svg>
                            <div class="score-text">
                                <span class="score-number">${Math.round(this.score)}%</span>
                                <span class="score-grade">${grade}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="results-details">
                    <h3>📊 Détails de votre évaluation</h3>
                    <div class="results-stats">
                        <div class="stat-item">
                            <span class="stat-icon">✅</span>
                            <span class="stat-label">Bonnes réponses</span>
                            <span class="stat-value">${this.answers.filter(a => a.correct).length}/${this.currentQuiz.questions.length}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-icon">⭐</span>
                            <span class="stat-label">Note requise</span>
                            <span class="stat-value">${this.currentQuiz.requiredScore}%</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-icon">${passed ? '🏆' : '📖'}</span>
                            <span class="stat-label">Statut</span>
                            <span class="stat-value">${passed ? 'Validé' : 'À réviser'}</span>
                        </div>
                    </div>

                    ${passed ? `
                        <div class="results-success">
                            <p>🎓 Vous avez validé cette leçon avec succès !</p>
                            <p>✨ La prochaine leçon est maintenant débloquée</p>
                        </div>
                    ` : `
                        <div class="results-retry">
                            <p>📚 Score insuffisant pour valider la leçon</p>
                            <p>💡 Relisez le contenu et réessayez pour débloquer la suite</p>
                        </div>
                    `}
                </div>

                <div class="results-actions">
                    ${passed ? `
                        <button class="btn-primary" onclick="validator.completeLesson()">
                            Continuer vers la prochaine leçon →
                        </button>
                    ` : `
                        <button class="btn-secondary" onclick="validator.retryQuiz()">
                            Réviser et Réessayer 🔄
                        </button>
                    `}
                    <button class="btn-outline" onclick="validator.reviewAnswers()">
                        Voir mes réponses 📋
                    </button>
                </div>
            </div>
        `;

        document.getElementById('quiz-content').innerHTML = resultsHTML;

        // Enregistrer le résultat
        if (passed) {
            this.saveValidation();
        }
    }

    // Calculer la note
    getGrade(score) {
        if (score >= 95) return 'A+';
        if (score >= 90) return 'A';
        if (score >= 85) return 'B+';
        if (score >= 80) return 'B';
        if (score >= 75) return 'C+';
        if (score >= 70) return 'C';
        return 'D';
    }

    // Sauvegarder la validation
    saveValidation() {
        const validation = {
            lessonId: this.lessonId,
            score: this.score,
            answers: this.answers,
            date: new Date().toISOString(),
            passed: true
        };

        // Récupérer les validations existantes
        const validations = JSON.parse(localStorage.getItem('lesson_validations') || '{}');
        validations[this.lessonId] = validation;
        localStorage.setItem('lesson_validations', JSON.stringify(validations));

        // Débloquer la prochaine leçon
        this.unlockNextLesson();

        // Déclencher un événement
        window.dispatchEvent(new CustomEvent('lessonValidated', {
            detail: { lessonId: this.lessonId, score: this.score }
        }));
    }

    // Débloquer la leçon suivante
    unlockNextLesson() {
        const unlockedLessons = JSON.parse(localStorage.getItem('unlocked_lessons') || '[]');
        const nextLesson = this.getNextLessonId(this.lessonId);

        if (nextLesson && !unlockedLessons.includes(nextLesson)) {
            unlockedLessons.push(nextLesson);
            localStorage.setItem('unlocked_lessons', JSON.stringify(unlockedLessons));
        }
    }

    // Obtenir l'ID de la prochaine leçon
    getNextLessonId(currentId) {
        // Logique pour déterminer la prochaine leçon
        const lessonOrder = Object.keys(knowledgeQuizzes);
        const currentIndex = lessonOrder.indexOf(currentId);
        return lessonOrder[currentIndex + 1] || null;
    }

    // Réessayer le quiz
    retryQuiz() {
        this.currentQuestion = 0;
        this.score = 0;
        this.answers = [];
        document.getElementById('quiz-content').innerHTML = this.renderQuestion();
        this.updateProgress();
        this.attachEventListeners();
    }

    // Réviser les réponses
    reviewAnswers() {
        const reviewHTML = `
            <div class="quiz-review">
                <h3>📋 Révision de vos réponses</h3>
                ${this.currentQuiz.questions.map((q, index) => {
                    const userAnswer = this.answers.find(a => a.question === index);
                    const isCorrect = userAnswer && userAnswer.correct;

                    return `
                        <div class="review-item ${isCorrect ? 'review-correct' : 'review-incorrect'}">
                            <div class="review-header">
                                <span class="review-number">Question ${index + 1}</span>
                                <span class="review-status">${isCorrect ? '✅ Correct' : '❌ Incorrect'}</span>
                            </div>
                            <p class="review-question">${q.question}</p>
                            <div class="review-answers">
                                <p class="user-answer">Votre réponse: <strong>${q.options[userAnswer.answer]}</strong></p>
                                ${!isCorrect ? `<p class="correct-answer">Bonne réponse: <strong>${q.options[q.correct]}</strong></p>` : ''}
                            </div>
                            <p class="review-explanation">${q.explanation}</p>
                        </div>
                    `;
                }).join('')}
                <button class="btn-primary" onclick="validator.closeQuiz()">Retour au cours</button>
            </div>
        `;

        document.getElementById('quiz-content').innerHTML = reviewHTML;
    }

    // Terminer la leçon et continuer
    completeLesson() {
        this.closeQuiz();
        // Ici on pourrait rediriger vers la prochaine leçon
        window.dispatchEvent(new CustomEvent('proceedToNextLesson', {
            detail: { completedLesson: this.lessonId }
        }));
    }

    // Fermer le quiz
    closeQuiz() {
        const overlay = document.getElementById('knowledge-quiz-overlay');
        if (overlay) {
            overlay.remove();
        }
    }
}

// Créer une instance globale
const validator = new KnowledgeValidator();

// Vérifier si une leçon est débloquée
function isLessonUnlocked(lessonId) {
    const unlockedLessons = JSON.parse(localStorage.getItem('unlocked_lessons') || '["rune-fehu", "astro-belier", "gematrie-bases", "tarot-bateleur"]');
    return unlockedLessons.includes(lessonId);
}

// Vérifier si une leçon est validée
function isLessonValidated(lessonId) {
    const validations = JSON.parse(localStorage.getItem('lesson_validations') || '{}');
    return validations[lessonId] && validations[lessonId].passed;
}

// Ajouter des badges visuels sur les cartes de leçons
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.lesson-card').forEach(card => {
        const lessonId = card.dataset.lessonId;
        if (!lessonId) return;

        const isValidated = isLessonValidated(lessonId);
        const isUnlocked = isLessonUnlocked(lessonId);

        if (isValidated) {
            card.classList.add('lesson-validated');
            card.insertAdjacentHTML('afterbegin', '<span class="lesson-badge validated">✅ Validé</span>');
        } else if (!isUnlocked) {
            card.classList.add('lesson-locked');
            card.insertAdjacentHTML('afterbegin', '<span class="lesson-badge locked">🔒 Verrouillé</span>');
        }
    });
});

console.log('🎓 Système de validation des connaissances chargé');
