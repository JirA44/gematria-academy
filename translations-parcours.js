// Système de traduction centralisé pour tous les parcours
const translations = {
    fr: {
        // Boutons communs
        lang_button: "🌐 EN / ES",
        back_home: "🏠 Retour Accueil",

        // Parcours Hébreu Gematria
        hebrew_title: "✡️ Parcours Complet Hébreu & Gematria",
        hebrew_subtitle: "Maîtrisez l'alphabet sacré et décodez les mystères numériques de la Torah",
        hebrew_goal_title: "🎯 Objectif Final",
        hebrew_goal_text1: "À la fin de ce parcours, vous serez capable de lire l'hébreu biblique, calculer la gematria de n'importe quel mot et décoder les correspondances mystiques entre les lettres, les nombres et les concepts spirituels.",
        hebrew_goal_text2: "Vous maîtriserez les 22 lettres de l'Aleph-Bet, les systèmes de gematria classique et avancée, et vous aurez exploré les textes sacrés de la Kabbale.",
        hebrew_steps_title: "📖 Les 5 Étapes du Parcours",

        hebrew_step1_title: "Alphabet Hébreu Complet",
        hebrew_step1_desc: "Apprenez les 22 lettres de l'Aleph-Bet avec leurs formes, prononciations, valeurs numériques et significations mystiques.",
        hebrew_step1_feat1: "22 lettres avec audio de prononciation",
        hebrew_step1_feat2: "Formes finales (Kaf, Mem, Nun, Peh, Tzadik)",
        hebrew_step1_feat3: "Valeurs numériques (1 à 400)",
        hebrew_step1_feat4: "Significations symboliques profondes",
        hebrew_step1_feat5: "Exercices de tracé et reconnaissance",

        hebrew_step2_title: "Gematria Classique",
        hebrew_step2_desc: "Découvrez le système de numérologie hébraïque où chaque lettre possède une valeur numérique révélant des connexions cachées.",
        hebrew_step2_feat1: "Système de calcul standard (Mispar Hechrachi)",
        hebrew_step2_feat2: "Calcul de mots et phrases bibliques",
        hebrew_step2_feat3: "Correspondances entre mots de même valeur",
        hebrew_step2_feat4: "Exercices progressifs avec correction",
        hebrew_step2_feat5: "Base de données de 100+ mots sacrés",

        hebrew_step3_title: "Lecture de Textes Sacrés",
        hebrew_step3_desc: "Pratiquez la lecture de passages bibliques, de prières traditionnelles et de textes kabbalistiques avec traduction mot-à-mot.",
        hebrew_step3_feat1: "15+ textes authentiques progressifs",
        hebrew_step3_feat2: "Shema Yisrael, Kaddish, Psaumes",
        hebrew_step3_feat3: "Traduction littérale et phonétique",
        hebrew_step3_feat4: "Analyse grammaticale de base",
        hebrew_step3_feat5: "Audio de lecture correcte",

        hebrew_step4_title: "Kabbale & Arbre de Vie",
        hebrew_step4_desc: "Explorez les 10 Sephiroth de l'Arbre de Vie, les correspondances avec les lettres hébraïques et les 72 Noms de Dieu.",
        hebrew_step4_feat1: "Les 10 Sephiroth et leurs attributs",
        hebrew_step4_feat2: "Les 22 chemins de l'Arbre de Vie",
        hebrew_step4_feat3: "Les 72 Noms de Dieu (Shemhamphorash)",
        hebrew_step4_feat4: "Méditations kabbalistiques guidées",
        hebrew_step4_feat5: "Diagrammes interactifs",

        hebrew_step5_title: "Flashcards & Maîtrise",
        hebrew_step5_desc: "Entraînement quotidien intensif avec flashcards pour mémoriser instantanément les lettres, valeurs et mots courants.",
        hebrew_step5_feat1: "4 modes : Lettres, Valeurs, Mots, Gematria",
        hebrew_step5_feat2: "Sessions de 20-30 cartes",
        hebrew_step5_feat3: "Répétition espacée intelligente",
        hebrew_step5_feat4: "Statistiques de progression détaillées",
        hebrew_step5_feat5: "Révision personnalisée des erreurs",

        hebrew_step6_title: "Gematria Avancée",
        hebrew_step6_desc: "Explorez les systèmes avancés : Mispar Gadol, Mispar Katan, Atbash, Notarikon et Temurah pour des analyses approfondies.",
        hebrew_step6_feat1: "8 systèmes de gematria différents",
        hebrew_step6_feat2: "Atbash (substitution inversée)",
        hebrew_step6_feat3: "Notarikon (acronymes mystiques)",
        hebrew_step6_feat4: "Temurah (permutations de lettres)",
        hebrew_step6_feat5: "Analyses de passages bibliques",

        methodology_title: "🧠 Notre Méthodologie Pédagogique",
        method1_title: "📊 Immersion Progressive",
        method1_text: "Commencez par les bases (alphabet) et progressez vers les concepts avancés (Kabbale) de manière naturelle et structurée.",
        method2_title: "🔁 Pratique Quotidienne",
        method2_text: "Les flashcards et exercices réguliers ancrent durablement les lettres, valeurs et mots dans votre mémoire à long terme.",
        method3_title: "🎯 Contexte Spirituel",
        method3_text: "Chaque lettre est présentée avec sa dimension symbolique, mythologique et mystique pour une compréhension profonde.",
        method4_title: "✍️ Textes Authentiques",
        method4_text: "Vous pratiquez avec de vrais textes bibliques et kabbalistiques dès le début pour une immersion totale dans la langue sacrée.",

        cta_title: "🚀 Prêt à Commencer ?",
        cta_text: "Le parcours complet prend environ 8-10 heures à suivre en continu, mais vous pouvez le faire à votre rythme sur plusieurs semaines.",
        cta_welcome: "Shalom et bienvenue dans la sagesse ancestrale !",
        cta_button: "א Commencer Maintenant l'Étape 1",

        bonus_title: "🎁 Bonus : Les Noms Divins",
        bonus_text: "Explorez les 72 Noms de Dieu (Shemhamphorash) avec leurs gematria, significations et méditations associées.",
        bonus_button: "✨ Découvrir les 72 Noms de Dieu",

        btn_start: "Commencer →",
        btn_explore: "Explorer →",
        btn_deepen: "Approfondir →",
    },

    en: {
        // Common buttons
        lang_button: "🌐 FR / ES",
        back_home: "🏠 Back Home",

        // Hebrew Gematria Course
        hebrew_title: "✡️ Complete Hebrew & Gematria Course",
        hebrew_subtitle: "Master the sacred alphabet and decode the numerical mysteries of the Torah",
        hebrew_goal_title: "🎯 Final Objective",
        hebrew_goal_text1: "By the end of this course, you will be able to read Biblical Hebrew, calculate the gematria of any word, and decode the mystical correspondences between letters, numbers, and spiritual concepts.",
        hebrew_goal_text2: "You will master the 22 letters of the Aleph-Bet, classical and advanced gematria systems, and will have explored the sacred texts of Kabbalah.",
        hebrew_steps_title: "📖 The 5 Course Steps",

        hebrew_step1_title: "Complete Hebrew Alphabet",
        hebrew_step1_desc: "Learn the 22 letters of the Aleph-Bet with their forms, pronunciations, numerical values, and mystical meanings.",
        hebrew_step1_feat1: "22 letters with audio pronunciation",
        hebrew_step1_feat2: "Final forms (Kaf, Mem, Nun, Peh, Tzadik)",
        hebrew_step1_feat3: "Numerical values (1 to 400)",
        hebrew_step1_feat4: "Deep symbolic meanings",
        hebrew_step1_feat5: "Tracing and recognition exercises",

        hebrew_step2_title: "Classical Gematria",
        hebrew_step2_desc: "Discover the Hebrew numerology system where each letter has a numerical value revealing hidden connections.",
        hebrew_step2_feat1: "Standard calculation system (Mispar Hechrachi)",
        hebrew_step2_feat2: "Calculation of biblical words and phrases",
        hebrew_step2_feat3: "Correspondences between words of same value",
        hebrew_step2_feat4: "Progressive exercises with corrections",
        hebrew_step2_feat5: "Database of 100+ sacred words",

        hebrew_step3_title: "Reading Sacred Texts",
        hebrew_step3_desc: "Practice reading biblical passages, traditional prayers, and kabbalistic texts with word-by-word translation.",
        hebrew_step3_feat1: "15+ progressive authentic texts",
        hebrew_step3_feat2: "Shema Yisrael, Kaddish, Psalms",
        hebrew_step3_feat3: "Literal and phonetic translation",
        hebrew_step3_feat4: "Basic grammatical analysis",
        hebrew_step3_feat5: "Correct reading audio",

        hebrew_step4_title: "Kabbalah & Tree of Life",
        hebrew_step4_desc: "Explore the 10 Sephiroth of the Tree of Life, correspondences with Hebrew letters, and the 72 Names of God.",
        hebrew_step4_feat1: "The 10 Sephiroth and their attributes",
        hebrew_step4_feat2: "The 22 paths of the Tree of Life",
        hebrew_step4_feat3: "The 72 Names of God (Shemhamphorash)",
        hebrew_step4_feat4: "Guided kabbalistic meditations",
        hebrew_step4_feat5: "Interactive diagrams",

        hebrew_step5_title: "Flashcards & Mastery",
        hebrew_step5_desc: "Intensive daily training with flashcards to instantly memorize letters, values, and common words.",
        hebrew_step5_feat1: "4 modes: Letters, Values, Words, Gematria",
        hebrew_step5_feat2: "20-30 card sessions",
        hebrew_step5_feat3: "Intelligent spaced repetition",
        hebrew_step5_feat4: "Detailed progress statistics",
        hebrew_step5_feat5: "Personalized error review",

        hebrew_step6_title: "Advanced Gematria",
        hebrew_step6_desc: "Explore advanced systems: Mispar Gadol, Mispar Katan, Atbash, Notarikon, and Temurah for in-depth analysis.",
        hebrew_step6_feat1: "8 different gematria systems",
        hebrew_step6_feat2: "Atbash (reverse substitution)",
        hebrew_step6_feat3: "Notarikon (mystical acronyms)",
        hebrew_step6_feat4: "Temurah (letter permutations)",
        hebrew_step6_feat5: "Biblical passage analysis",

        methodology_title: "🧠 Our Teaching Methodology",
        method1_title: "📊 Progressive Immersion",
        method1_text: "Start with basics (alphabet) and progress toward advanced concepts (Kabbalah) in a natural and structured way.",
        method2_title: "🔁 Daily Practice",
        method2_text: "Flashcards and regular exercises durably anchor letters, values, and words in your long-term memory.",
        method3_title: "🎯 Spiritual Context",
        method3_text: "Each letter is presented with its symbolic, mythological, and mystical dimension for deep understanding.",
        method4_title: "✍️ Authentic Texts",
        method4_text: "You practice with real biblical and kabbalistic texts from the start for total immersion in the sacred language.",

        cta_title: "🚀 Ready to Start?",
        cta_text: "The complete course takes approximately 8-10 hours to complete continuously, but you can do it at your own pace over several weeks.",
        cta_welcome: "Shalom and welcome to ancient wisdom!",
        cta_button: "א Start Step 1 Now",

        bonus_title: "🎁 Bonus: The Divine Names",
        bonus_text: "Explore the 72 Names of God (Shemhamphorash) with their gematria, meanings, and associated meditations.",
        bonus_button: "✨ Discover the 72 Names of God",

        btn_start: "Start →",
        btn_explore: "Explore →",
        btn_deepen: "Deepen →",
    },

    es: {
        // Botones comunes
        lang_button: "🌐 FR / EN",
        back_home: "🏠 Volver al Inicio",

        // Curso Hebreo Gematria
        hebrew_title: "✡️ Curso Completo Hebreo & Gematria",
        hebrew_subtitle: "Domina el alfabeto sagrado y descifra los misterios numéricos de la Torá",
        hebrew_goal_title: "🎯 Objetivo Final",
        hebrew_goal_text1: "Al final de este curso, podrás leer hebreo bíblico, calcular la gematria de cualquier palabra y descifrar las correspondencias místicas entre letras, números y conceptos espirituales.",
        hebrew_goal_text2: "Dominarás las 22 letras del Alef-Bet, los sistemas de gematria clásica y avanzada, y habrás explorado los textos sagrados de la Cábala.",
        hebrew_steps_title: "📖 Las 5 Etapas del Curso",

        hebrew_step1_title: "Alfabeto Hebreo Completo",
        hebrew_step1_desc: "Aprende las 22 letras del Alef-Bet con sus formas, pronunciaciones, valores numéricos y significados místicos.",
        hebrew_step1_feat1: "22 letras con audio de pronunciación",
        hebrew_step1_feat2: "Formas finales (Kaf, Mem, Nun, Peh, Tzadik)",
        hebrew_step1_feat3: "Valores numéricos (1 a 400)",
        hebrew_step1_feat4: "Significados simbólicos profundos",
        hebrew_step1_feat5: "Ejercicios de trazado y reconocimiento",

        hebrew_step2_title: "Gematria Clásica",
        hebrew_step2_desc: "Descubre el sistema de numerología hebrea donde cada letra tiene un valor numérico que revela conexiones ocultas.",
        hebrew_step2_feat1: "Sistema de cálculo estándar (Mispar Hechrachi)",
        hebrew_step2_feat2: "Cálculo de palabras y frases bíblicas",
        hebrew_step2_feat3: "Correspondencias entre palabras del mismo valor",
        hebrew_step2_feat4: "Ejercicios progresivos con corrección",
        hebrew_step2_feat5: "Base de datos de 100+ palabras sagradas",

        hebrew_step3_title: "Lectura de Textos Sagrados",
        hebrew_step3_desc: "Practica la lectura de pasajes bíblicos, oraciones tradicionales y textos cabalísticos con traducción palabra por palabra.",
        hebrew_step3_feat1: "15+ textos auténticos progresivos",
        hebrew_step3_feat2: "Shema Yisrael, Kaddish, Salmos",
        hebrew_step3_feat3: "Traducción literal y fonética",
        hebrew_step3_feat4: "Análisis gramatical básico",
        hebrew_step3_feat5: "Audio de lectura correcta",

        hebrew_step4_title: "Cábala & Árbol de la Vida",
        hebrew_step4_desc: "Explora las 10 Sefirot del Árbol de la Vida, las correspondencias con las letras hebreas y los 72 Nombres de Dios.",
        hebrew_step4_feat1: "Las 10 Sefirot y sus atributos",
        hebrew_step4_feat2: "Los 22 caminos del Árbol de la Vida",
        hebrew_step4_feat3: "Los 72 Nombres de Dios (Shemhamphorash)",
        hebrew_step4_feat4: "Meditaciones cabalísticas guiadas",
        hebrew_step4_feat5: "Diagramas interactivos",

        hebrew_step5_title: "Flashcards & Maestría",
        hebrew_step5_desc: "Entrenamiento diario intensivo con flashcards para memorizar instantáneamente letras, valores y palabras comunes.",
        hebrew_step5_feat1: "4 modos: Letras, Valores, Palabras, Gematria",
        hebrew_step5_feat2: "Sesiones de 20-30 tarjetas",
        hebrew_step5_feat3: "Repetición espaciada inteligente",
        hebrew_step5_feat4: "Estadísticas detalladas de progreso",
        hebrew_step5_feat5: "Revisión personalizada de errores",

        hebrew_step6_title: "Gematria Avanzada",
        hebrew_step6_desc: "Explora sistemas avanzados: Mispar Gadol, Mispar Katan, Atbash, Notarikon y Temurah para análisis profundos.",
        hebrew_step6_feat1: "8 sistemas diferentes de gematria",
        hebrew_step6_feat2: "Atbash (sustitución inversa)",
        hebrew_step6_feat3: "Notarikon (acrónimos místicos)",
        hebrew_step6_feat4: "Temurah (permutaciones de letras)",
        hebrew_step6_feat5: "Análisis de pasajes bíblicos",

        methodology_title: "🧠 Nuestra Metodología Pedagógica",
        method1_title: "📊 Inmersión Progresiva",
        method1_text: "Comienza con lo básico (alfabeto) y progresa hacia conceptos avanzados (Cábala) de manera natural y estructurada.",
        method2_title: "🔁 Práctica Diaria",
        method2_text: "Las flashcards y ejercicios regulares anclan duraderamente las letras, valores y palabras en tu memoria a largo plazo.",
        method3_title: "🎯 Contexto Espiritual",
        method3_text: "Cada letra se presenta con su dimensión simbólica, mitológica y mística para una comprensión profunda.",
        method4_title: "✍️ Textos Auténticos",
        method4_text: "Practicas con textos bíblicos y cabalísticos reales desde el principio para una inmersión total en el idioma sagrado.",

        cta_title: "🚀 ¿Listo para Empezar?",
        cta_text: "El curso completo toma aproximadamente 8-10 horas para completarse de forma continua, pero puedes hacerlo a tu propio ritmo durante varias semanas.",
        cta_welcome: "¡Shalom y bienvenido a la sabiduría ancestral!",
        cta_button: "א Comenzar Ahora la Etapa 1",

        bonus_title: "🎁 Bonus: Los Nombres Divinos",
        bonus_text: "Explora los 72 Nombres de Dios (Shemhamphorash) con sus gematria, significados y meditaciones asociadas.",
        bonus_button: "✨ Descubrir los 72 Nombres de Dios",

        btn_start: "Comenzar →",
        btn_explore: "Explorar →",
        btn_deepen: "Profundizar →",
    }
};

// Fonction pour changer de langue
let currentLang = localStorage.getItem('language') || 'fr';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    applyTranslations();
    updateLanguageButton();
}

function toggleLanguage() {
    const langs = ['fr', 'en', 'es'];
    const currentIndex = langs.indexOf(currentLang);
    const nextIndex = (currentIndex + 1) % langs.length;
    setLanguage(langs[nextIndex]);
}

function applyTranslations() {
    const t = translations[currentLang];

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (t[key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = t[key];
            } else {
                element.textContent = t[key];
            }
        }
    });
}

function updateLanguageButton() {
    const btn = document.querySelector('.lang-toggle');
    if (btn) {
        const langMap = {
            'fr': '🌐 EN / ES',
            'en': '🌐 FR / ES',
            'es': '🌐 FR / EN'
        };
        btn.textContent = langMap[currentLang];
    }
}

// Initialisation au chargement
document.addEventListener('DOMContentLoaded', () => {
    applyTranslations();
    updateLanguageButton();
});
