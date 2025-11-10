/**
 * Système de traduction global pour l'Académie des Runes & Gematria
 * Ce script gère la langue sur toutes les pages du site
 */

// Langue par défaut
let currentLang = localStorage.getItem('language') || 'fr';

/**
 * Applique les traductions sur la page actuelle
 */
function applyTranslations() {
    const pageName = document.body.dataset.page || 'default';

    // Récupérer les traductions pour cette page
    if (typeof translations !== 'undefined' && translations[currentLang]) {
        const t = translations[currentLang];

        // Traduire tous les éléments avec data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (t[key]) {
                // Gérer les cas spéciaux (placeholder, title, etc.)
                if (element.hasAttribute('placeholder')) {
                    element.placeholder = t[key];
                } else if (element.hasAttribute('title')) {
                    element.title = t[key];
                } else {
                    element.textContent = t[key];
                }
            }
        });
    }

    // Mettre à jour la langue du document
    document.documentElement.lang = currentLang;
}

/**
 * Change la langue et sauvegarde la préférence
 */
function toggleLanguage() {
    // Cycle entre fr, en, es
    if (currentLang === 'fr') {
        currentLang = 'en';
    } else if (currentLang === 'en') {
        currentLang = 'es';
    } else {
        currentLang = 'fr';
    }

    localStorage.setItem('language', currentLang);
    applyTranslations();
    updateLanguageButton();
}

/**
 * Met à jour le texte du bouton de langue
 */
function updateLanguageButton() {
    const btn = document.querySelector('.lang-toggle');
    if (btn) {
        const labels = {
            'fr': '🌐 EN',
            'en': '🌐 ES',
            'es': '🌐 FR'
        };
        btn.textContent = labels[currentLang] || '🌐 EN';
    }
}

/**
 * Initialisation au chargement de la page
 */
window.addEventListener('DOMContentLoaded', () => {
    // Charger la langue sauvegardée
    currentLang = localStorage.getItem('language') || 'fr';

    // Appliquer les traductions
    applyTranslations();

    // Mettre à jour le bouton de langue
    updateLanguageButton();

    // Attacher l'événement au bouton de langue s'il existe
    const langBtn = document.querySelector('.lang-toggle');
    if (langBtn) {
        langBtn.addEventListener('click', toggleLanguage);
    }
});

/**
 * Permet d'accéder aux fonctions depuis l'extérieur
 */
window.i18n = {
    getCurrentLang: () => currentLang,
    setLang: (lang) => {
        if (['fr', 'en', 'es'].includes(lang)) {
            currentLang = lang;
            localStorage.setItem('language', currentLang);
            applyTranslations();
            updateLanguageButton();
        }
    },
    toggleLanguage,
    applyTranslations
};
