/**
 * Traductions éditoriales disponibles et synchronisation avec le sélecteur global.
 * Les traductions de page existantes couvrent encore seulement certaines clés FR/EN/ES;
 * le Worker Pages traduit le reste du contenu à la demande.
 */
const supportedLanguages = ['fr', 'en', 'zh', 'hi', 'es', 'ar', 'bn', 'pt', 'ru', 'ur'];
let currentLang = supportedLanguages.includes(localStorage.getItem('language'))
    ? localStorage.getItem('language')
    : 'fr';

function applyTranslations() {
    const dictionary = typeof translations !== 'undefined' ? translations[currentLang] : null;
    if (dictionary) {
        document.querySelectorAll('[data-i18n]').forEach((element) => {
            const key = element.getAttribute('data-i18n');
            if (!Object.prototype.hasOwnProperty.call(dictionary, key)) return;
            if (element.hasAttribute('placeholder')) element.placeholder = dictionary[key];
            else if (element.hasAttribute('title')) element.title = dictionary[key];
            else element.textContent = dictionary[key];
        });
    }
    document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : currentLang;
    document.documentElement.dir = ['ar', 'ur'].includes(currentLang) ? 'rtl' : 'ltr';
}

function updateLanguageButton() {
    const button = document.querySelector('.lang-toggle');
    if (!button) return;
    const labels = {
        fr: '🌐 EN', en: '🌐 中文', zh: '🌐 हिन्दी', hi: '🌐 ES', es: '🌐 العربية',
        ar: '🌐 বাংলা', bn: '🌐 PT', pt: '🌐 RU', ru: '🌐 اردو', ur: '🌐 FR'
    };
    button.textContent = labels[currentLang] || '🌐 EN';
}

function setLanguage(language) {
    if (!supportedLanguages.includes(language)) return;
    currentLang = language;
    localStorage.setItem('language', language);
    applyTranslations();
    updateLanguageButton();
    window.siteLanguage?.set(language);
}

function toggleLanguage() {
    const index = supportedLanguages.indexOf(currentLang);
    setLanguage(supportedLanguages[(index + 1) % supportedLanguages.length]);
}

window.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('language');
    if (supportedLanguages.includes(saved)) currentLang = saved;
    applyTranslations();
    updateLanguageButton();
    document.querySelector('.lang-toggle')?.addEventListener('click', toggleLanguage);
});

window.i18n = {
    getCurrentLang: () => currentLang,
    setLang: setLanguage,
    toggleLanguage,
    applyTranslations
};
