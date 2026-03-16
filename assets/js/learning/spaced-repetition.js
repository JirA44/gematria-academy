/**
 * Système de Révision Espacée (Spaced Repetition)
 * Renforce les connaissances déjà acquises selon l'algorithme SM-2
 */

class SpacedRepetitionSystem {
    constructor() {
        this.reviewSchedule = this.loadReviewSchedule();
        this.reviewHistory = this.loadReviewHistory();
        this.dailyGoal = 10; // Questions à réviser par jour
    }

    // Charger le planning de révision
    loadReviewSchedule() {
        return JSON.parse(localStorage.getItem('review_schedule') || '{}');
    }

    // Charger l'historique de révision
    loadReviewHistory() {
        return JSON.parse(localStorage.getItem('review_history') || '[]');
    }

    // Sauvegarder le planning
    saveReviewSchedule() {
        localStorage.setItem('review_schedule', JSON.stringify(this.reviewSchedule));
    }

    // Sauvegarder l'historique
    saveReviewHistory() {
        localStorage.setItem('review_history', JSON.stringify(this.reviewHistory));
    }

    // Ajouter une leçon au planning de révision
    addToReviewSchedule(lessonId, questionIndex) {
        const key = `${lessonId}_q${questionIndex}`;

        if (!this.reviewSchedule[key]) {
            this.reviewSchedule[key] = {
                lessonId,
                questionIndex,
                interval: 1, // Jours avant prochaine révision
                repetitions: 0,
                easeFactor: 2.5, // Facteur de facilité (SM-2)
                nextReview: new Date().toISOString(),
                lastReview: null,
                correctStreak: 0,
                totalReviews: 0,
                correctReviews: 0
            };
        }

        this.saveReviewSchedule();
    }

    // Calculer la prochaine date de révision selon SM-2
    calculateNextReview(item, quality) {
        // quality: 0-5 (0=échec total, 5=parfait)

        if (quality < 3) {
            // Réponse incorrecte - recommencer
            item.interval = 1;
            item.repetitions = 0;
            item.correctStreak = 0;
        } else {
            // Réponse correcte
            item.correctStreak++;

            if (item.repetitions === 0) {
                item.interval = 1;
            } else if (item.repetitions === 1) {
                item.interval = 6;
            } else {
                item.interval = Math.round(item.interval * item.easeFactor);
            }

            item.repetitions++;

            // Ajuster le facteur de facilité
            item.easeFactor = item.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
            item.easeFactor = Math.max(1.3, item.easeFactor);
        }

        // Calculer la prochaine date
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + item.interval);
        item.nextReview = nextDate.toISOString();
        item.lastReview = new Date().toISOString();

        return item;
    }

    // Obtenir les questions à réviser aujourd'hui
    getDueReviews() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const dueReviews = [];

        for (const [key, item] of Object.entries(this.reviewSchedule)) {
            const nextReview = new Date(item.nextReview);
            nextReview.setHours(0, 0, 0, 0);

            if (nextReview <= today) {
                dueReviews.push({ key, ...item });
            }
        }

        // Trier par priorité (plus anciennes en premier)
        dueReviews.sort((a, b) => new Date(a.nextReview) - new Date(b.nextReview));

        return dueReviews;
    }

    // Enregistrer une révision
    recordReview(key, wasCorrect, timeSpent) {
        const item = this.reviewSchedule[key];
        if (!item) return;

        item.totalReviews++;
        if (wasCorrect) {
            item.correctReviews++;
        }

        // Quality: 3-5 si correct, 0-2 si incorrect
        const quality = wasCorrect ? 4 : 1;

        // Calculer la prochaine révision
        this.calculateNextReview(item, quality);

        // Enregistrer dans l'historique
        this.reviewHistory.push({
            key,
            lessonId: item.lessonId,
            questionIndex: item.questionIndex,
            wasCorrect,
            timeSpent,
            date: new Date().toISOString(),
            interval: item.interval
        });

        // Limiter l'historique à 1000 entrées
        if (this.reviewHistory.length > 1000) {
            this.reviewHistory = this.reviewHistory.slice(-1000);
        }

        this.saveReviewSchedule();
        this.saveReviewHistory();
    }

    // Obtenir les statistiques de révision
    getReviewStats() {
        const dueToday = this.getDueReviews();
        const totalCards = Object.keys(this.reviewSchedule).length;

        // Calculer les révisions des 7 derniers jours
        const last7Days = new Date();
        last7Days.setDate(last7Days.getDate() - 7);

        const recentReviews = this.reviewHistory.filter(r =>
            new Date(r.date) >= last7Days
        );

        const correctReviews = recentReviews.filter(r => r.wasCorrect).length;

        // Calculer le taux de rétention global
        let totalRetention = 0;
        let itemsWithReviews = 0;

        for (const item of Object.values(this.reviewSchedule)) {
            if (item.totalReviews > 0) {
                totalRetention += (item.correctReviews / item.totalReviews) * 100;
                itemsWithReviews++;
            }
        }

        const averageRetention = itemsWithReviews > 0
            ? totalRetention / itemsWithReviews
            : 0;

        return {
            totalCards,
            dueToday: dueToday.length,
            reviewedLast7Days: recentReviews.length,
            accuracyLast7Days: recentReviews.length > 0
                ? (correctReviews / recentReviews.length) * 100
                : 0,
            averageRetention: Math.round(averageRetention),
            currentStreak: this.calculateCurrentStreak(),
            longestStreak: this.calculateLongestStreak()
        };
    }

    // Calculer la série actuelle (jours consécutifs)
    calculateCurrentStreak() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let streak = 0;
        let checkDate = new Date(today);

        while (true) {
            const dayReviews = this.reviewHistory.filter(r => {
                const reviewDate = new Date(r.date);
                reviewDate.setHours(0, 0, 0, 0);
                return reviewDate.getTime() === checkDate.getTime();
            });

            if (dayReviews.length === 0) break;

            streak++;
            checkDate.setDate(checkDate.getDate() - 1);
        }

        return streak;
    }

    // Calculer la plus longue série
    calculateLongestStreak() {
        const dates = new Set();
        this.reviewHistory.forEach(r => {
            const date = new Date(r.date);
            date.setHours(0, 0, 0, 0);
            dates.add(date.getTime());
        });

        const sortedDates = Array.from(dates).sort((a, b) => a - b);

        let maxStreak = 0;
        let currentStreak = 0;
        let lastDate = null;

        for (const dateTime of sortedDates) {
            const date = new Date(dateTime);

            if (lastDate === null) {
                currentStreak = 1;
            } else {
                const diffDays = Math.floor((date - lastDate) / (1000 * 60 * 60 * 24));
                if (diffDays === 1) {
                    currentStreak++;
                } else {
                    maxStreak = Math.max(maxStreak, currentStreak);
                    currentStreak = 1;
                }
            }

            lastDate = date;
        }

        return Math.max(maxStreak, currentStreak);
    }

    // Démarrer une session de révision
    startReviewSession() {
        const dueReviews = this.getDueReviews();

        if (dueReviews.length === 0) {
            return null;
        }

        // Prendre jusqu'à 10 questions
        const sessionReviews = dueReviews.slice(0, this.dailyGoal);

        return new ReviewSession(sessionReviews, this);
    }

    // Initialiser le système pour une leçon validée
    initializeForLesson(lessonId) {
        const quiz = knowledgeQuizzes[lessonId];
        if (!quiz) return;

        // Ajouter chaque question au planning de révision
        quiz.questions.forEach((q, index) => {
            this.addToReviewSchedule(lessonId, index);
        });
    }
}

// Classe pour gérer une session de révision
class ReviewSession {
    constructor(reviews, spacedRepSystem) {
        this.reviews = reviews;
        this.spacedRepSystem = spacedRepSystem;
        this.currentIndex = 0;
        this.sessionStartTime = Date.now();
        this.questionStartTime = Date.now();
        this.results = [];
    }

    // Obtenir la question actuelle
    getCurrentQuestion() {
        if (this.currentIndex >= this.reviews.length) {
            return null;
        }

        const review = this.reviews[this.currentIndex];
        const quiz = knowledgeQuizzes[review.lessonId];

        if (!quiz) return null;

        const question = quiz.questions[review.questionIndex];

        return {
            lessonId: review.lessonId,
            lessonTitle: quiz.title,
            questionIndex: review.questionIndex,
            question: question.question,
            options: question.options,
            correct: question.correct,
            explanation: question.explanation,
            reviewData: review
        };
    }

    // Enregistrer une réponse
    submitAnswer(selectedIndex) {
        const current = this.getCurrentQuestion();
        if (!current) return null;

        const isCorrect = selectedIndex === current.correct;
        const timeSpent = Math.round((Date.now() - this.questionStartTime) / 1000);

        // Enregistrer dans le système de révision
        this.spacedRepSystem.recordReview(
            this.reviews[this.currentIndex].key,
            isCorrect,
            timeSpent
        );

        // Enregistrer dans la session
        this.results.push({
            lessonId: current.lessonId,
            questionIndex: current.questionIndex,
            isCorrect,
            timeSpent
        });

        return {
            isCorrect,
            explanation: current.explanation,
            correctAnswer: current.options[current.correct],
            selectedAnswer: current.options[selectedIndex]
        };
    }

    // Passer à la question suivante
    nextQuestion() {
        this.currentIndex++;
        this.questionStartTime = Date.now();
        return this.getCurrentQuestion();
    }

    // Obtenir les résultats de la session
    getSessionResults() {
        const totalQuestions = this.results.length;
        const correctAnswers = this.results.filter(r => r.isCorrect).length;
        const totalTime = Math.round((Date.now() - this.sessionStartTime) / 1000);

        return {
            totalQuestions,
            correctAnswers,
            accuracy: totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0,
            totalTime,
            averageTimePerQuestion: totalQuestions > 0 ? totalTime / totalQuestions : 0,
            results: this.results
        };
    }
}

// Interface UI pour le système de révision
class ReviewUI {
    constructor() {
        this.currentSession = null;
    }

    // Afficher le panneau de révision
    showReviewPanel() {
        const stats = spacedRepetition.getReviewStats();

        const panelHTML = `
            <div id="review-panel-overlay" class="review-overlay">
                <div class="review-container">
                    <div class="review-header">
                        <h2>🔄 Révision Espacée</h2>
                        <p>Renforcez vos connaissances avec un système scientifique de mémorisation</p>
                        <button class="close-review" onclick="reviewUI.closePanel()">✕</button>
                    </div>

                    <div class="review-stats-grid">
                        <div class="review-stat-card">
                            <div class="stat-icon">📚</div>
                            <div class="stat-value">${stats.totalCards}</div>
                            <div class="stat-label">Cartes au total</div>
                        </div>

                        <div class="review-stat-card ${stats.dueToday > 0 ? 'stat-highlight' : ''}">
                            <div class="stat-icon">🎯</div>
                            <div class="stat-value">${stats.dueToday}</div>
                            <div class="stat-label">À réviser aujourd'hui</div>
                        </div>

                        <div class="review-stat-card">
                            <div class="stat-icon">📊</div>
                            <div class="stat-value">${Math.round(stats.averageRetention)}%</div>
                            <div class="stat-label">Taux de rétention</div>
                        </div>

                        <div class="review-stat-card">
                            <div class="stat-icon">🔥</div>
                            <div class="stat-value">${stats.currentStreak}</div>
                            <div class="stat-label">Série actuelle (jours)</div>
                        </div>
                    </div>

                    ${stats.dueToday > 0 ? `
                        <div class="review-cta">
                            <p class="review-message">
                                🎯 <strong>${stats.dueToday} questions</strong> attendent votre révision aujourd'hui !
                            </p>
                            <button class="btn-start-review" onclick="reviewUI.startSession()">
                                🚀 Commencer la révision
                            </button>
                        </div>
                    ` : `
                        <div class="review-complete">
                            <div class="complete-icon">✅</div>
                            <h3>Félicitations !</h3>
                            <p>Toutes vos révisions sont à jour !</p>
                            <p class="next-review">Revenez demain pour de nouvelles révisions.</p>
                        </div>
                    `}

                    <div class="review-info">
                        <h3>📖 Comment fonctionne la révision espacée ?</h3>
                        <div class="info-grid">
                            <div class="info-item">
                                <div class="info-icon">🧠</div>
                                <h4>Mémorisation optimale</h4>
                                <p>Les questions reviennent juste avant que vous ne les oubliiez</p>
                            </div>
                            <div class="info-item">
                                <div class="info-icon">📅</div>
                                <h4>Intervalles adaptatifs</h4>
                                <p>Plus vous réussissez, plus les intervalles s'allongent</p>
                            </div>
                            <div class="info-item">
                                <div class="info-icon">⚡</div>
                                <h4>Révision rapide</h4>
                                <p>10 questions par jour suffisent pour tout retenir</p>
                            </div>
                        </div>
                    </div>

                    <div class="review-history">
                        <h3>📊 Statistiques sur 7 jours</h3>
                        <div class="history-stats">
                            <div class="history-item">
                                <span>Questions révisées</span>
                                <strong>${stats.reviewedLast7Days}</strong>
                            </div>
                            <div class="history-item">
                                <span>Précision</span>
                                <strong>${Math.round(stats.accuracyLast7Days)}%</strong>
                            </div>
                            <div class="history-item">
                                <span>Plus longue série</span>
                                <strong>${stats.longestStreak} jours 🔥</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', panelHTML);
    }

    // Démarrer une session
    startSession() {
        this.currentSession = spacedRepetition.startReviewSession();

        if (!this.currentSession) {
            alert('Aucune révision disponible pour le moment.');
            return;
        }

        this.closePanel();
        this.showQuestion();
    }

    // Afficher une question
    showQuestion() {
        const question = this.currentSession.getCurrentQuestion();

        if (!question) {
            this.showSessionResults();
            return;
        }

        const progress = ((this.currentSession.currentIndex + 1) / this.currentSession.reviews.length) * 100;

        const questionHTML = `
            <div id="review-question-overlay" class="review-overlay">
                <div class="review-quiz-container">
                    <div class="review-quiz-header">
                        <h3>🔄 Révision - ${question.lessonTitle}</h3>
                        <div class="review-progress">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${progress}%"></div>
                            </div>
                            <span>${this.currentSession.currentIndex + 1}/${this.currentSession.reviews.length}</span>
                        </div>
                    </div>

                    <div class="review-question-content">
                        <p class="question-text">${question.question}</p>
                        <div class="review-options">
                            ${question.options.map((option, index) => `
                                <button class="review-option" onclick="reviewUI.selectAnswer(${index})">
                                    <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                                    <span class="option-text">${option}</span>
                                </button>
                            `).join('')}
                        </div>
                        <div id="review-feedback"></div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', questionHTML);
    }

    // Sélectionner une réponse
    selectAnswer(index) {
        const result = this.currentSession.submitAnswer(index);

        // Désactiver les options
        document.querySelectorAll('.review-option').forEach(opt => {
            opt.disabled = true;
        });

        // Marquer la réponse
        const options = document.querySelectorAll('.review-option');
        const currentQuestion = this.currentSession.getCurrentQuestion();

        options[index].classList.add('selected');
        options[currentQuestion.correct].classList.add('correct');

        if (!result.isCorrect) {
            options[index].classList.add('incorrect');
        }

        // Afficher le feedback
        const feedback = document.getElementById('review-feedback');
        feedback.innerHTML = `
            <div class="review-feedback ${result.isCorrect ? 'correct' : 'incorrect'}">
                <span class="feedback-icon">${result.isCorrect ? '✅' : '❌'}</span>
                <div>
                    <strong>${result.isCorrect ? 'Correct !' : 'Pas tout à fait...'}</strong>
                    <p>${result.explanation}</p>
                    ${!result.isCorrect ? `<p><strong>Bonne réponse :</strong> ${result.correctAnswer}</p>` : ''}
                </div>
            </div>
            <button class="btn-next-review" onclick="reviewUI.nextQuestion()">
                Question suivante →
            </button>
        `;
    }

    // Question suivante
    nextQuestion() {
        document.getElementById('review-question-overlay')?.remove();

        if (this.currentSession.nextQuestion()) {
            this.showQuestion();
        } else {
            this.showSessionResults();
        }
    }

    // Afficher les résultats de la session
    showSessionResults() {
        const results = this.currentSession.getSessionResults();

        const resultsHTML = `
            <div id="review-results-overlay" class="review-overlay">
                <div class="review-results-container">
                    <div class="results-header">
                        <div class="results-icon">${results.accuracy >= 80 ? '🎉' : '📚'}</div>
                        <h2>Session terminée !</h2>
                    </div>

                    <div class="results-score-circle">
                        <svg viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(138, 43, 226, 0.2)" stroke-width="8"/>
                            <circle cx="50" cy="50" r="45" fill="none" stroke="#8a2be2" stroke-width="8"
                                stroke-dasharray="${results.accuracy * 2.827} 282.7"
                                stroke-linecap="round"
                                transform="rotate(-90 50 50)"/>
                        </svg>
                        <div class="score-text">
                            <span class="score-number">${Math.round(results.accuracy)}%</span>
                            <span class="score-label">Précision</span>
                        </div>
                    </div>

                    <div class="results-stats">
                        <div class="result-stat">
                            <span class="stat-icon">✅</span>
                            <span class="stat-value">${results.correctAnswers}/${results.totalQuestions}</span>
                            <span class="stat-label">Réponses correctes</span>
                        </div>
                        <div class="result-stat">
                            <span class="stat-icon">⏱️</span>
                            <span class="stat-value">${Math.round(results.averageTimePerQuestion)}s</span>
                            <span class="stat-label">Par question</span>
                        </div>
                        <div class="result-stat">
                            <span class="stat-icon">🎯</span>
                            <span class="stat-value">${Math.round(results.totalTime / 60)}min</span>
                            <span class="stat-label">Temps total</span>
                        </div>
                    </div>

                    <div class="results-message">
                        ${results.accuracy >= 80 ? `
                            <p>🌟 <strong>Excellente mémoire !</strong> Vos connaissances sont bien ancrées.</p>
                        ` : `
                            <p>📚 <strong>Continuez à réviser !</strong> Ces questions reviendront bientôt.</p>
                        `}
                        <p>Revenez demain pour de nouvelles révisions !</p>
                    </div>

                    <button class="btn-close-results" onclick="reviewUI.closeResults()">
                        Terminer
                    </button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', resultsHTML);
        this.currentSession = null;
    }

    // Fermer le panneau
    closePanel() {
        document.getElementById('review-panel-overlay')?.remove();
    }

    // Fermer les résultats
    closeResults() {
        document.getElementById('review-results-overlay')?.remove();
    }
}

// Instances globales
const spacedRepetition = new SpacedRepetitionSystem();
const reviewUI = new ReviewUI();

// Initialiser automatiquement les leçons validées
window.addEventListener('lessonValidated', (e) => {
    spacedRepetition.initializeForLesson(e.detail.lessonId);
});

// Ajouter un bouton pour ouvrir la révision
document.addEventListener('DOMContentLoaded', () => {
    const reviewButton = document.createElement('button');
    reviewButton.id = 'open-review-btn';
    reviewButton.className = 'floating-review-btn';
    reviewButton.innerHTML = '🔄<span>Révision</span>';
    reviewButton.onclick = () => reviewUI.showReviewPanel();
    document.body.appendChild(reviewButton);
});

console.log('🔄 Système de révision espacée chargé');
