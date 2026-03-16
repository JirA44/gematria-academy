/**
 * Traduction automatique pour les pages existantes
 * Détecte le texte français et le traduit automatiquement
 */

// Dictionnaire de traductions automatiques
const autoTranslations = {
    en: {
        // Hiéroglyphes
        "Parcours Complet d'Apprentissage": "Complete Learning Path",
        "Apprenez à déchiffrer les hiéroglyphes comme un véritable égyptologue": "Learn to decipher hieroglyphs like a real Egyptologist",
        "Objectif Final": "Final Goal",
        "Les 4 Étapes du Parcours": "The 4 Steps of the Path",
        "Alphabet Complet": "Complete Alphabet",
        "Grammaire Niveau 1": "Grammar Level 1",
        "Exercices de Déchiffrage": "Decipherment Exercises",
        "Flashcards Interactives": "Interactive Flashcards",
        "Découvrez et mémorisez": "Discover and memorize",
        "Commencer cette étape": "Start this step",

        // Hébreu
        "Hébreu & Gematria": "Hebrew & Gematria",
        "Maîtrisez l'alphabet sacré": "Master the sacred alphabet",

        // Mayas
        "Glyphes Mayas": "Mayan Glyphs",
        "Déchiffrez l'écriture des anciens Mayas": "Decipher ancient Mayan writing",

        // Commun
        "heures": "hours",
        "Retour": "Back",
        "Suivant": "Next",
        "Précédent": "Previous",
        "Parcours Complet": "Complete Course",
        "Apprendre les Hiéroglyphes": "Learn Hieroglyphs",
        "Maîtriser l'Hébreu": "Master Hebrew",
        "Maîtriser les Glyphes Mayas": "Master Mayan Glyphs",
        "À la fin de ce parcours": "At the end of this course",
        "vous serez capable de": "you will be able to",
        "déchiffrer par vous-même": "decipher by yourself",
        "sans aide extérieure": "without external help",
        "Les 6 Étapes du Parcours": "The 6 Steps of the Path",
        "Les 5 Sections du Parcours": "The 5 Sections of the Path",
        "Étape": "Step",
        "Section": "Section",
        "Durée estimée": "Estimated duration",
        "Commencer": "Start",
        "Retour Accueil": "Back Home"
    },
    es: {
        // Hiéroglyphes
        "Parcours Complet d'Apprentissage": "Curso Completo de Aprendizaje",
        "Apprenez à déchiffrer les hiéroglyphes comme un véritable égyptologue": "Aprende a descifrar jeroglíficos como un verdadero egiptólogo",
        "Objectif Final": "Objetivo Final",
        "Les 4 Étapes du Parcours": "Los 4 Pasos del Curso",
        "Alphabet Complet": "Alfabeto Completo",
        "Grammaire Niveau 1": "Gramática Nivel 1",
        "Exercices de Déchiffrage": "Ejercicios de Descifrado",
        "Flashcards Interactives": "Tarjetas Interactivas",
        "Découvrez et mémorisez": "Descubre y memoriza",
        "Commencer cette étape": "Comenzar este paso",

        // Hébreu
        "Hébreu & Gematria": "Hebreo y Gematria",
        "Maîtrisez l'alphabet sacré": "Domina el alfabeto sagrado",

        // Mayas
        "Glyphes Mayas": "Glifos Mayas",
        "Déchiffrez l'écriture des anciens Mayas": "Descifra la escritura maya antigua",

        // Commun
        "heures": "horas",
        "Retour": "Volver",
        "Suivant": "Siguiente",
        "Précédent": "Anterior",
        "Parcours Complet": "Curso Completo",
        "Apprendre les Hiéroglyphes": "Aprender Jeroglíficos",
        "Maîtriser l'Hébreu": "Dominar el Hebreo",
        "Maîtriser les Glyphes Mayas": "Dominar los Glifos Mayas",
        "À la fin de ce parcours": "Al final de este curso",
        "vous serez capable de": "serás capaz de",
        "déchiffrer par vous-même": "descifrar por ti mismo",
        "sans aide extérieure": "sin ayuda externa",
        "Les 6 Étapes du Parcours": "Los 6 Pasos del Curso",
        "Les 5 Sections du Parcours": "Las 5 Secciones del Curso",
        "Étape": "Paso",
        "Section": "Sección",
        "Durée estimée": "Duración estimada",
        "Commencer": "Comenzar",
        "Retour Accueil": "Volver a Inicio"
    }
};

// Langue actuelle
let currentLang = localStorage.getItem('language') || 'fr';

/**
 * Traduit automatiquement le texte de la page
 */
function autoTranslate() {
    if (currentLang === 'fr') return; // Pas de traduction nécessaire

    const dict = autoTranslations[currentLang];
    if (!dict) return;

    // Parcourir tous les nœuds de texte
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    let node;
    const nodesToUpdate = [];

    while (node = walker.nextNode()) {
        const text = node.nodeValue.trim();
        if (text && dict[text]) {
            nodesToUpdate.push({node, newText: dict[text]});
        } else {
            // Chercher des correspondances partielles
            for (const [fr, translated] of Object.entries(dict)) {
                if (text.includes(fr)) {
                    const newText = node.nodeValue.replace(fr, translated);
                    nodesToUpdate.push({node, newText});
                    break;
                }
            }
        }
    }

    // Appliquer les traductions
    nodesToUpdate.forEach(({node, newText}) => {
        node.nodeValue = newText;
    });
}

/**
 * Change la langue
 */
function toggleLang() {
    // Cycle: fr -> en -> es -> fr
    if (currentLang === 'fr') {
        currentLang = 'en';
    } else if (currentLang === 'en') {
        currentLang = 'es';
    } else {
        currentLang = 'fr';
    }

    localStorage.setItem('language', currentLang);

    // Recharger la page pour appliquer la nouvelle langue
    location.reload();
}

/**
 * Met à jour le bouton de langue
 */
function updateLangButton() {
    const btn = document.querySelector('.lang-toggle');
    if (btn) {
        const labels = {
            'fr': '🌐 EN',
            'en': '🌐 ES',
            'es': '🌐 FR'
        };
        btn.textContent = labels[currentLang];
        btn.onclick = toggleLang;
    }
}

// Initialisation
window.addEventListener('DOMContentLoaded', () => {
    currentLang = localStorage.getItem('language') || 'fr';
    autoTranslate();
    updateLangButton();
});
