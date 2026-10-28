/**
 * Système de traduction global pour l'Académie des Runes & Gematria
 * Ce script gère la langue sur toutes les pages du site
 */

// Langue par défaut
const supportedLanguages = ['fr', 'en', 'zh', 'hi', 'es', 'ar', 'bn', 'pt', 'ru', 'ur'];
let currentLang = supportedLanguages.includes(localStorage.getItem('language')) ? localStorage.getItem('language') : 'fr';

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
    const index = supportedLanguages.indexOf(currentLang);
    currentLang = supportedLanguages[(index + 1) % supportedLanguages.length];
    localStorage.setItem('language', currentLang);
    applyTranslations();
    updateLanguageButton();
    window.siteLanguage?.set(currentLang);
}

function updateLanguageButton() {
    const btn = document.querySelector('.lang-toggle');
    if (btn) {
        const labels = {
            fr: '🌐 EN', en: '🌐 中文', zh: '🌐 हिन्दी', hi: '🌐 ES', es: '🌐 العربية',
            ar: '🌐 বাংলা', bn: '🌐 PT', pt: '🌐 RU', ru: '🌐 اردو', ur: '🌐 FR'
        };
        btn.textContent = labels[currentLang] || '🌐 EN';
    }
}


