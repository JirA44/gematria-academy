/**
 * Tableau de Bord de Progression de l'Étudiant
 * Affiche les statistiques, badges, certifications et progression globale
 */

class StudentDashboard {
    constructor() {
        this.validations = this.loadValidations();
        this.totalLessons = Object.keys(knowledgeQuizzes || {}).length;
    }

    // Charger les validations
    loadValidations() {
        return JSON.parse(localStorage.getItem('lesson_validations') || '{}');
    }

    // Calculer les statistiques globales
    calculateStats() {
        const validatedCount = Object.values(this.validations).filter(v => v.passed).length;
        const totalScore = Object.values(this.validations).reduce((sum, v) => sum + (v.score || 0), 0);
        const averageScore = validatedCount > 0 ? totalScore / validatedCount : 0;

        // Calculer le niveau
        const level = this.calculateLevel(validatedCount);

        // Points d'expérience
        const xp = this.calculateXP();

        return {
            validatedCount,
            totalLessons: this.totalLessons,
            completionRate: this.totalLessons > 0 ? (validatedCount / this.totalLessons) * 100 : 0,
            averageScore: Math.round(averageScore),
            level,
            xp,
            badges: this.calculateBadges(validatedCount, averageScore)
        };
    }

    // Calculer le niveau de l'étudiant
    calculateLevel(validatedCount) {
        if (validatedCount >= 50) return { number: 10, name: 'Maître Ésotérique', icon: '🌟' };
        if (validatedCount >= 40) return { number: 9, name: 'Sage Accompli', icon: '🔮' };
        if (validatedCount >= 30) return { number: 8, name: 'Érudit Avancé', icon: '📚' };
        if (validatedCount >= 25) return { number: 7, name: 'Chercheur Expert', icon: '🎓' };
        if (validatedCount >= 20) return { number: 6, name: 'Initié Confirmé', icon: '✨' };
        if (validatedCount >= 15) return { number: 5, name: 'Apprenti Avancé', icon: '⭐' };
        if (validatedCount >= 10) return { number: 4, name: 'Étudiant Appliqué', icon: '📖' };
        if (validatedCount >= 5) return { number: 3, name: 'Novice Déterminé', icon: '🌱' };
        if (validatedCount >= 2) return { number: 2, name: 'Débutant Curieux', icon: '👁️' };
        return { number: 1, name: 'Nouvel Initié', icon: '🔰' };
    }

    // Calculer l'XP
    calculateXP() {
        let totalXP = 0;
        Object.values(this.validations).forEach(v => {
            if (v.passed) {
                totalXP += v.score; // 1 point XP par % de score
            }
        });
        return Math.round(totalXP);
    }

    // Calculer les badges obtenus
    calculateBadges(validatedCount, averageScore) {
        const badges = [];

        // Badges de progression
        if (validatedCount >= 1) badges.push({ name: 'Premier Pas', icon: '👣', desc: 'Première leçon validée' });
        if (validatedCount >= 5) badges.push({ name: 'Explorateur', icon: '🗺️', desc: '5 leçons validées' });
        if (validatedCount >= 10) badges.push({ name: 'Dévoué', icon: '💪', desc: '10 leçons validées' });
        if (validatedCount >= 20) badges.push({ name: 'Assidu', icon: '📚', desc: '20 leçons validées' });
        if (validatedCount >= 30) badges.push({ name: 'Expert', icon: '🎓', desc: '30 leçons validées' });
        if (validatedCount >= 50) badges.push({ name: 'Maître', icon: '🏆', desc: 'Toutes les leçons validées' });

        // Badges de performance
        if (averageScore >= 95) badges.push({ name: 'Excellence', icon: '⭐', desc: 'Moyenne ≥ 95%' });
        if (averageScore >= 90) badges.push({ name: 'Brillant', icon: '✨', desc: 'Moyenne ≥ 90%' });
        if (averageScore >= 85) badges.push({ name: 'Remarquable', icon: '🌟', desc: 'Moyenne ≥ 85%' });

        // Badges spéciaux
        const perfectScores = Object.values(this.validations).filter(v => v.score === 100).length;
        if (perfectScores >= 5) badges.push({ name: 'Perfectionniste', icon: '💯', desc: '5 scores parfaits' });
        if (perfectScores >= 10) badges.push({ name: 'Impeccable', icon: '🏅', desc: '10 scores parfaits' });

        // Badge de rapidité (si les leçons ont été validées rapidement)
        const recentValidations = Object.values(this.validations).filter(v => {
            const date = new Date(v.date);
            const now = new Date();
            const daysDiff = (now - date) / (1000 * 60 * 60 * 24);
            return daysDiff <= 7;
        }).length;
        if (recentValidations >= 7) badges.push({ name: 'Sprint Mystique', icon: '⚡', desc: '7 leçons en 7 jours' });

        return badges;
    }

    // Afficher le tableau de bord
    show() {
        const stats = this.calculateStats();

        const dashboardHTML = `
            <div id="student-dashboard-overlay" class="dashboard-overlay">
                <div class="dashboard-container">
                    <!-- Header -->
                    <div class="dashboard-header">
                        <h1>📊 Mon Tableau de Bord</h1>
                        <button class="close-dashboard" onclick="studentDashboard.close()">✕</button>
                    </div>

                    <!-- Carte de profil -->
                    <div class="profile-card">
                        <div class="profile-level">
                            <div class="level-icon">${stats.level.icon}</div>
                            <div class="level-info">
                                <h2>Niveau ${stats.level.number}</h2>
                                <p>${stats.level.name}</p>
                            </div>
                        </div>
                        <div class="profile-xp">
                            <div class="xp-label">Points d'Expérience</div>
                            <div class="xp-value">${stats.xp} XP</div>
                        </div>
                    </div>

                    <!-- Statistiques principales -->
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-icon">📚</div>
                            <div class="stat-value">${stats.validatedCount}/${stats.totalLessons}</div>
                            <div class="stat-label">Leçons Validées</div>
                            <div class="stat-bar">
                                <div class="stat-bar-fill" style="width: ${stats.completionRate}%"></div>
                            </div>
                        </div>

                        <div class="stat-card">
                            <div class="stat-icon">🎯</div>
                            <div class="stat-value">${Math.round(stats.completionRate)}%</div>
                            <div class="stat-label">Progression Globale</div>
                            <div class="stat-bar">
                                <div class="stat-bar-fill" style="width: ${stats.completionRate}%"></div>
                            </div>
                        </div>

                        <div class="stat-card">
                            <div class="stat-icon">⭐</div>
                            <div class="stat-value">${stats.averageScore}%</div>
                            <div class="stat-label">Moyenne Générale</div>
                            <div class="stat-bar">
                                <div class="stat-bar-fill" style="width: ${stats.averageScore}%"></div>
                            </div>
                        </div>

                        <div class="stat-card">
                            <div class="stat-icon">🏆</div>
                            <div class="stat-value">${stats.badges.length}</div>
                            <div class="stat-label">Badges Obtenus</div>
                        </div>
                    </div>

                    <!-- Badges -->
                    ${stats.badges.length > 0 ? `
                        <div class="badges-section">
                            <h3>🏅 Vos Badges</h3>
                            <div class="badges-grid">
                                ${stats.badges.map(badge => `
                                    <div class="badge-item" title="${badge.desc}">
                                        <div class="badge-icon">${badge.icon}</div>
                                        <div class="badge-name">${badge.name}</div>
                                        <div class="badge-desc">${badge.desc}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}

                    <!-- Progression par catégorie -->
                    <div class="category-progress">
                        <h3>📈 Progression par Système</h3>
                        ${this.renderCategoryProgress()}
                    </div>

                    <!-- Historique récent -->
                    <div class="recent-activity">
                        <h3>📅 Activité Récente</h3>
                        ${this.renderRecentActivity()}
                    </div>

                    <!-- Certificats disponibles -->
                    <div class="certificates-section">
                        <h3>🎓 Certificats & Diplômes</h3>
                        ${this.renderCertificates(stats)}
                    </div>

                    <!-- Actions -->
                    <div class="dashboard-actions">
                        <button class="btn-primary" onclick="studentDashboard.exportProgress()">
                            📥 Exporter ma Progression
                        </button>
                        <button class="btn-outline" onclick="studentDashboard.resetProgress()">
                            🔄 Réinitialiser (Attention!)
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', dashboardHTML);
    }

    // Afficher la progression par catégorie
    renderCategoryProgress() {
        const categories = {
            'Runes': ['rune-fehu', 'rune-uruz'],
            'Astrologie': ['astro-belier'],
            'Gématrie': ['gematrie-bases'],
            'Tarot': ['tarot-bateleur']
        };

        let html = '<div class="categories-list">';

        for (const [category, lessons] of Object.entries(categories)) {
            const validatedInCategory = lessons.filter(l => this.validations[l]?.passed).length;
            const percentage = lessons.length > 0 ? (validatedInCategory / lessons.length) * 100 : 0;

            html += `
                <div class="category-item">
                    <div class="category-header">
                        <span class="category-name">${category}</span>
                        <span class="category-count">${validatedInCategory}/${lessons.length}</span>
                    </div>
                    <div class="category-bar">
                        <div class="category-bar-fill" style="width: ${percentage}%"></div>
                    </div>
                </div>
            `;
        }

        html += '</div>';
        return html;
    }

    // Afficher l'activité récente
    renderRecentActivity() {
        const recent = Object.entries(this.validations)
            .sort((a, b) => new Date(b[1].date) - new Date(a[1].date))
            .slice(0, 5);

        if (recent.length === 0) {
            return '<p class="no-activity">Aucune activité récente</p>';
        }

        let html = '<div class="activity-list">';

        recent.forEach(([lessonId, data]) => {
            const date = new Date(data.date);
            const dateStr = date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });

            html += `
                <div class="activity-item">
                    <div class="activity-icon">${data.passed ? '✅' : '❌'}</div>
                    <div class="activity-details">
                        <div class="activity-title">${this.getLessonTitle(lessonId)}</div>
                        <div class="activity-meta">
                            <span>${dateStr}</span>
                            <span class="activity-score">Score: ${Math.round(data.score)}%</span>
                        </div>
                    </div>
                </div>
            `;
        });

        html += '</div>';
        return html;
    }

    // Obtenir le titre d'une leçon
    getLessonTitle(lessonId) {
        const titles = {
            'rune-fehu': 'Rune Fehu',
            'rune-uruz': 'Rune Uruz',
            'astro-belier': 'Bélier ♈',
            'gematrie-bases': 'Bases de la Gématrie',
            'tarot-bateleur': 'Le Bateleur (I)'
        };
        return titles[lessonId] || lessonId;
    }

    // Afficher les certificats disponibles
    renderCertificates(stats) {
        const certificates = [
            {
                name: 'Certificat de Runes Nordiques',
                icon: '📿',
                requirement: 'Valider toutes les leçons de Runes',
                unlocked: false
            },
            {
                name: 'Certificat d\'Astrologie',
                icon: '♈',
                requirement: 'Valider toutes les leçons d\'Astrologie',
                unlocked: false
            },
            {
                name: 'Diplôme de Maître Ésotérique',
                icon: '🎓',
                requirement: 'Atteindre le niveau 10',
                unlocked: stats.level.number >= 10
            },
            {
                name: 'Certificat d\'Excellence',
                icon: '🏆',
                requirement: 'Moyenne générale ≥ 95%',
                unlocked: stats.averageScore >= 95
            }
        ];

        let html = '<div class="certificates-grid">';

        certificates.forEach(cert => {
            html += `
                <div class="certificate-card ${cert.unlocked ? 'unlocked' : 'locked'}">
                    <div class="certificate-icon">${cert.icon}</div>
                    <div class="certificate-name">${cert.name}</div>
                    <div class="certificate-requirement">${cert.requirement}</div>
                    ${cert.unlocked ? `
                        <button class="btn-download" onclick="studentDashboard.downloadCertificate('${cert.name}')">
                            📥 Télécharger
                        </button>
                    ` : `
                        <div class="certificate-locked">🔒 Non débloqué</div>
                    `}
                </div>
            `;
        });

        html += '</div>';
        return html;
    }

    // Télécharger un certificat
    downloadCertificate(certName) {
        alert(`🎉 Félicitations ! Le certificat "${certName}" sera bientôt disponible au téléchargement.`);
        // TODO: Implémenter la génération de PDF du certificat
    }

    // Exporter la progression
    exportProgress() {
        const stats = this.calculateStats();
        const exportData = {
            stats,
            validations: this.validations,
            exportDate: new Date().toISOString()
        };

        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `progression_academie_${new Date().toISOString().split('T')[0]}.json`;
        link.click();

        URL.revokeObjectURL(url);
    }

    // Réinitialiser la progression
    resetProgress() {
        if (confirm('⚠️ Êtes-vous sûr de vouloir réinitialiser toute votre progression ? Cette action est irréversible !')) {
            if (confirm('🚨 DERNIÈRE CONFIRMATION : Toutes vos données seront perdues. Continuer ?')) {
                localStorage.removeItem('lesson_validations');
                localStorage.removeItem('unlocked_lessons');
                this.validations = {};
                alert('✅ Progression réinitialisée avec succès.');
                this.close();
                location.reload();
            }
        }
    }

    // Fermer le tableau de bord
    close() {
        const overlay = document.getElementById('student-dashboard-overlay');
        if (overlay) {
            overlay.remove();
        }
    }
}

// Créer l'instance globale
const studentDashboard = new StudentDashboard();

// Ajouter un bouton pour ouvrir le tableau de bord
document.addEventListener('DOMContentLoaded', () => {
    // Ajouter un bouton flottant pour ouvrir le dashboard
    const dashboardButton = document.createElement('button');
    dashboardButton.id = 'open-dashboard-btn';
    dashboardButton.className = 'floating-dashboard-btn';
    dashboardButton.innerHTML = '📊<span>Mon Tableau de Bord</span>';
    dashboardButton.onclick = () => studentDashboard.show();
    document.body.appendChild(dashboardButton);
});

console.log('📊 Tableau de bord de progression chargé');
