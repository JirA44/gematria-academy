// 🌐 Système de traduction multilingue complet pour Gematria Academy
// FR (Français) / EN (English) / ES (Español)

const i18n = {
    // ===== NAVIGATION & COMMUN =====
    nav: {
        fr: {
            langSwitch: '🌐 EN / ES',
            home: '🏠 Retour Accueil',
            backToParcours: '← Retour au parcours'
        },
        en: {
            langSwitch: '🌐 FR / ES',
            home: '🏠 Back Home',
            backToParcours: '← Back to course'
        },
        es: {
            langSwitch: '🌐 FR / EN',
            home: '🏠 Volver al Inicio',
            backToParcours: '← Volver al curso'
        }
    },

    // ===== PARCOURS HÉBREU GEMATRIA =====
    hebrew: {
        fr: {
            title: '✡️ Parcours Complet - Maîtriser l\'Hébreu & la Gematria',
            subtitle: 'Décodez les mystères numériques de la Torah et maîtrisez l\'alphabet sacré',
            heroTitle: 'Bienvenue dans l\'Univers Sacré de l\'Hébreu et de la Gematria',
            heroDesc: 'Ce parcours complet vous emmène des fondamentaux de l\'Aleph-Bet jusqu\'aux secrets les plus profonds de la Kabbale numérique. Apprenez à lire, écrire et décoder les textes sacrés.',
            duration: 'Durée totale estimée : 15-25 heures',
            step1Title: 'Alphabet Aleph-Bet',
            step1Desc: 'Maîtrisez les 22 lettres hébraïques, leur prononciation, leur forme et leur valeur numérique',
            step1Features: [
                '22 lettres avec audio natif',
                'Formes finales (כ ך, מ ם, נ ן, פ ף, צ ץ)',
                'Valeurs numérique 1 à 400',
                'Direction droite → gauche',
                'Nikud (voyelles) optionnel'
            ],
            step1Duration: '⏱️ 3-5 heures',
            step1Btn: '📖 Commencer l\'Alphabet',

            step2Title: 'Systèmes de Gematria',
            step2Desc: '9 méthodes de calcul des valeurs numériques des mots et phrases hébraïques',
            step2Features: [
                'Gematria Classique (מספר הכללי)',
                'Gematria Petite (מספר קטן)',
                'Gematria Grande (מספר גדול)',
                'Atbash (אתב״ש) - inversion',
                'Albam (אלב״ם) - substitution',
                'Mispar Siduri - valeurs ordinales',
                'Calculs automatiques en temps réel',
                'Base de données de 500+ correspondances',
                'Exercices pratiques guidés'
            ],
            step2Duration: '⏱️ 4-6 heures',
            step2Btn: '🔢 Explorer la Gematria',

            step3Title: 'Textes Bibliques Authentiques',
            step3Desc: 'Lisez et déchiffrez les passages originaux de la Torah avec traduction',
            step3Features: [
                'Genèse 1:1 (בראשית ברא)',
                'Shema Israël complet',
                '10 Commandements en hébreu',
                'Psaume 23 (מזמור כ״ג)',
                'Traduction mot à mot',
                'Analyse de Gematria intégrée',
                'Contexte historique et spirituel'
            ],
            step3Duration: '⏱️ 3-5 heures',
            step3Btn: '📜 Lire les Textes Sacrés',

            step4Title: 'Kabbale & 72 Noms de Dieu',
            step4Desc: 'Plongez dans l\'Arbre de Vie (עץ חיים) et les 72 combinaisons des Noms Divins',
            step4Features: [
                'Arbre de Vie - 10 Sefirot + 22 sentiers',
                '72 Noms de Dieu (שם בן ע״ב אותיות)',
                'Extraits d\'Exode 14:19-21',
                'Correspondances planétaires et angéliques',
                'Tetragrammaton יהוה (YHVH)',
                'Noms d\'anges (מיכאל, גבריאל, רפאל)',
                'Méditation guidée sur les Sefirot'
            ],
            step4Duration: '⏱️ 4-6 heures',
            step4Btn: '🌳 Découvrir la Kabbale',

            step5Title: 'Flashcards Interactives',
            step5Desc: 'Mémorisez efficacement avec 4 modes d\'apprentissage scientifiques',
            step5Features: [
                '📝 Mode Classique : Lettre → Nom + Valeur',
                '🔢 Mode Numérique : Valeur → Lettre',
                '🔊 Mode Audio : Écoute → Reconnaissance',
                '✍️ Mode Écriture : Nom → Forme',
                'Système de répétition espacée (SRS)',
                'Suivi de progression personnalisé',
                '500+ cartes (lettres, mots, phrases)'
            ],
            step5Duration: '⏱️ 2-4 heures',
            step5Btn: '🎯 Pratiquer avec Flashcards',

            methodologyTitle: '📚 Méthodologie Scientifique du Parcours',
            method1Title: '1️⃣ Apprentissage Progressif',
            method1Desc: 'Du simple au complexe : alphabet → gematria → textes → kabbale',
            method2Title: '2️⃣ Pratique Immédiate',
            method2Desc: 'Chaque concept est immédiatement appliqué avec des exercices',
            method3Title: '3️⃣ Multi-Sensoriel',
            method3Desc: 'Audio + Visuel + Écriture pour ancrer dans la mémoire',
            method4Title: '4️⃣ Répétition Espacée',
            method4Desc: 'Flashcards SRS pour mémorisation à long terme',

            ctaTitle: '🚀 Commencez Votre Voyage Maintenant',
            ctaText: 'Choisissez votre étape de départ selon votre niveau',
            ctaBtn: '✨ Débuter le Parcours Hébreu',

            footer: 'Ce parcours est conçu pour tous niveaux : débutants absolus aux étudiants avancés en hébreu biblique.'
        },
        en: {
            title: '✡️ Complete Course - Master Hebrew & Gematria',
            subtitle: 'Decode the numerical mysteries of the Torah and master the sacred alphabet',
            heroTitle: 'Welcome to the Sacred Universe of Hebrew and Gematria',
            heroDesc: 'This complete course takes you from Aleph-Bet fundamentals to the deepest secrets of numerical Kabbalah. Learn to read, write and decode sacred texts.',
            duration: 'Total estimated duration: 15-25 hours',
            step1Title: 'Aleph-Bet Alphabet',
            step1Desc: 'Master the 22 Hebrew letters, their pronunciation, form and numerical value',
            step1Features: [
                '22 letters with native audio',
                'Final forms (כ ך, מ ם, נ ן, פ ף, צ ץ)',
                'Numerical values 1 to 400',
                'Right → left direction',
                'Optional Nikud (vowels)'
            ],
            step1Duration: '⏱️ 3-5 hours',
            step1Btn: '📖 Start the Alphabet',

            step2Title: 'Gematria Systems',
            step2Desc: '9 methods to calculate numerical values of Hebrew words and phrases',
            step2Features: [
                'Classic Gematria (מספר הכללי)',
                'Small Gematria (מספר קטן)',
                'Large Gematria (מספר גדול)',
                'Atbash (אתב״ש) - reversal',
                'Albam (אלב״ם) - substitution',
                'Mispar Siduri - ordinal values',
                'Real-time automatic calculations',
                'Database of 500+ correspondences',
                'Guided practical exercises'
            ],
            step2Duration: '⏱️ 4-6 hours',
            step2Btn: '🔢 Explore Gematria',

            step3Title: 'Authentic Biblical Texts',
            step3Desc: 'Read and decipher original Torah passages with translation',
            step3Features: [
                'Genesis 1:1 (בראשית ברא)',
                'Complete Shema Israel',
                '10 Commandments in Hebrew',
                'Psalm 23 (מזמור כ״ג)',
                'Word-by-word translation',
                'Integrated Gematria analysis',
                'Historical and spiritual context'
            ],
            step3Duration: '⏱️ 3-5 hours',
            step3Btn: '📜 Read Sacred Texts',

            step4Title: 'Kabbalah & 72 Names of God',
            step4Desc: 'Dive into the Tree of Life (עץ חיים) and the 72 Divine Name combinations',
            step4Features: [
                'Tree of Life - 10 Sefirot + 22 paths',
                '72 Names of God (שם בן ע״ב אותיות)',
                'Exodus 14:19-21 excerpts',
                'Planetary and angelic correspondences',
                'Tetragrammaton יהוה (YHVH)',
                'Angel names (מיכאל, גבריאל, רפאל)',
                'Guided Sefirot meditation'
            ],
            step4Duration: '⏱️ 4-6 hours',
            step4Btn: '🌳 Discover Kabbalah',

            step5Title: 'Interactive Flashcards',
            step5Desc: 'Memorize effectively with 4 scientific learning modes',
            step5Features: [
                '📝 Classic Mode: Letter → Name + Value',
                '🔢 Number Mode: Value → Letter',
                '🔊 Audio Mode: Listen → Recognize',
                '✍️ Writing Mode: Name → Form',
                'Spaced Repetition System (SRS)',
                'Personalized progress tracking',
                '500+ cards (letters, words, phrases)'
            ],
            step5Duration: '⏱️ 2-4 hours',
            step5Btn: '🎯 Practice with Flashcards',

            methodologyTitle: '📚 Scientific Course Methodology',
            method1Title: '1️⃣ Progressive Learning',
            method1Desc: 'From simple to complex: alphabet → gematria → texts → kabbalah',
            method2Title: '2️⃣ Immediate Practice',
            method2Desc: 'Each concept is immediately applied with exercises',
            method3Title: '3️⃣ Multi-Sensory',
            method3Desc: 'Audio + Visual + Writing to anchor in memory',
            method4Title: '4️⃣ Spaced Repetition',
            method4Desc: 'SRS flashcards for long-term memorization',

            ctaTitle: '🚀 Start Your Journey Now',
            ctaText: 'Choose your starting step according to your level',
            ctaBtn: '✨ Begin Hebrew Course',

            footer: 'This course is designed for all levels: absolute beginners to advanced biblical Hebrew students.'
        },
        es: {
            title: '✡️ Curso Completo - Dominar el Hebreo y la Gematria',
            subtitle: 'Decodifica los misterios numéricos de la Torá y domina el alfabeto sagrado',
            heroTitle: 'Bienvenido al Universo Sagrado del Hebreo y la Gematria',
            heroDesc: 'Este curso completo te lleva desde los fundamentos del Aleph-Bet hasta los secretos más profundos de la Cábala numérica. Aprende a leer, escribir y decodificar textos sagrados.',
            duration: 'Duración total estimada: 15-25 horas',
            step1Title: 'Alfabeto Aleph-Bet',
            step1Desc: 'Domina las 22 letras hebreas, su pronunciación, forma y valor numérico',
            step1Features: [
                '22 letras con audio nativo',
                'Formas finales (כ ך, מ ם, נ ן, פ ף, צ ץ)',
                'Valores numéricos 1 a 400',
                'Dirección derecha → izquierda',
                'Nikud (vocales) opcional'
            ],
            step1Duration: '⏱️ 3-5 horas',
            step1Btn: '📖 Comenzar el Alfabeto',

            step2Title: 'Sistemas de Gematria',
            step2Desc: '9 métodos para calcular valores numéricos de palabras y frases hebreas',
            step2Features: [
                'Gematria Clásica (מספר הכללי)',
                'Gematria Pequeña (מספר קטן)',
                'Gematria Grande (מספר גדול)',
                'Atbash (אתב״ש) - inversión',
                'Albam (אלב״ם) - sustitución',
                'Mispar Siduri - valores ordinales',
                'Cálculos automáticos en tiempo real',
                'Base de datos de 500+ correspondencias',
                'Ejercicios prácticos guiados'
            ],
            step2Duration: '⏱️ 4-6 horas',
            step2Btn: '🔢 Explorar Gematria',

            step3Title: 'Textos Bíblicos Auténticos',
            step3Desc: 'Lee y descifra pasajes originales de la Torá con traducción',
            step3Features: [
                'Génesis 1:1 (בראשית ברא)',
                'Shema Israel completo',
                '10 Mandamientos en hebreo',
                'Salmo 23 (מזמור כ״ג)',
                'Traducción palabra por palabra',
                'Análisis de Gematria integrado',
                'Contexto histórico y espiritual'
            ],
            step3Duration: '⏱️ 3-5 horas',
            step3Btn: '📜 Leer Textos Sagrados',

            step4Title: 'Cábala y 72 Nombres de Dios',
            step4Desc: 'Sumérgete en el Árbol de la Vida (עץ חיים) y las 72 combinaciones de Nombres Divinos',
            step4Features: [
                'Árbol de la Vida - 10 Sefirot + 22 senderos',
                '72 Nombres de Dios (שם בן ע״ב אותיות)',
                'Extractos de Éxodo 14:19-21',
                'Correspondencias planetarias y angélicas',
                'Tetragrama יהוה (YHVH)',
                'Nombres de ángeles (מיכאל, גבריאל, רפאל)',
                'Meditación guiada sobre los Sefirot'
            ],
            step4Duration: '⏱️ 4-6 horas',
            step4Btn: '🌳 Descubrir Cábala',

            step5Title: 'Tarjetas Interactivas',
            step5Desc: 'Memoriza eficazmente con 4 modos de aprendizaje científicos',
            step5Features: [
                '📝 Modo Clásico: Letra → Nombre + Valor',
                '🔢 Modo Numérico: Valor → Letra',
                '🔊 Modo Audio: Escucha → Reconocimiento',
                '✍️ Modo Escritura: Nombre → Forma',
                'Sistema de repetición espaciada (SRS)',
                'Seguimiento de progreso personalizado',
                '500+ tarjetas (letras, palabras, frases)'
            ],
            step5Duration: '⏱️ 2-4 horas',
            step5Btn: '🎯 Practicar con Tarjetas',

            methodologyTitle: '📚 Metodología Científica del Curso',
            method1Title: '1️⃣ Aprendizaje Progresivo',
            method1Desc: 'De lo simple a lo complejo: alfabeto → gematria → textos → cábala',
            method2Title: '2️⃣ Práctica Inmediata',
            method2Desc: 'Cada concepto se aplica inmediatamente con ejercicios',
            method3Title: '3️⃣ Multi-Sensorial',
            method3Desc: 'Audio + Visual + Escritura para anclar en la memoria',
            method4Title: '4️⃣ Repetición Espaciada',
            method4Desc: 'Tarjetas SRS para memorización a largo plazo',

            ctaTitle: '🚀 Comienza tu Viaje Ahora',
            ctaText: 'Elige tu paso inicial según tu nivel',
            ctaBtn: '✨ Comenzar Curso de Hebreo',

            footer: 'Este curso está diseñado para todos los niveles: desde principiantes absolutos hasta estudiantes avanzados de hebreo bíblico.'
        }
    },

    // ===== PARCOURS GLYPHES MAYAS =====
    mayan: {
        fr: {
            title: '🏛️ Parcours Complet - Maîtriser les Glyphes Mayas',
            subtitle: 'Déchiffrez l\'écriture des rois et des dieux de Mésoamérique',
            heroTitle: 'Bienvenue dans l\'Univers des Glyphes Mayas',
            heroDesc: 'Découvrez le système d\'écriture le plus sophistiqué des Amériques anciennes. Apprenez à lire les stèles royales, les codex et les calendriers sacrés.',
            duration: 'Durée totale estimée: 20-30 heures',

            step1Title: 'Syllabaire & Logogrammes',
            step1Desc: 'Maîtrisez les 800+ glyphes syllabiques et logographiques',
            step1Features: [
                '500 syllabes phonétiques (ba, be, bi, bo, bu...)',
                '300+ logogrammes (idées complètes)',
                'Principe de complémentation phonétique',
                'Variantes allographiques (même son, formes différentes)',
                'Direction de lecture en blocs (2x2, 3x2)',
                'Exemples de Palenque, Tikal, Copán'
            ],
            step1Duration: '⏱️ 6-8 heures',
            step1Btn: '📖 Apprendre le Syllabaire',

            step2Title: 'Système Numérique Vigésimal',
            step2Desc: 'Décodez les chiffres mayas en base 20 avec le concept du zéro',
            step2Features: [
                'Points (1-4) et barres (5)',
                'Glyphe coquillage pour zéro 🐚',
                'Base 20 (position × 20ⁿ)',
                'Numération de tête (variantes)',
                'Calculs de dates du Compte Long',
                'Opérations arithmétiques mayas'
            ],
            step2Duration: '⏱️ 3-4 heures',
            step2Btn: '🔢 Maîtriser les Chiffres',

            step3Title: 'Calendriers Tzolk\'in & Haab',
            step3Desc: 'Comprenez les systèmes calendaires sacrés et solaires mayas',
            step3Features: [
                'Tzolk\'in : 13 chiffres × 20 noms = 260 jours',
                'Haab : 18 mois × 20 jours + 5 Wayeb = 365 jours',
                'Roue calendaire : cycle de 52 ans',
                'Compte Long : depuis 11 août 3114 av. J.-C.',
                'Seigneurs de la Nuit (9 divinités)',
                'Convertisseur Grégorien ↔ Maya'
            ],
            step3Duration: '⏱️ 4-6 heures',
            step3Btn: '📅 Explorer les Calendriers',

            step4Title: 'Noms Royaux & Divins',
            step4Desc: 'Lisez les noms des rois, reines et dieux mayas',
            step4Features: [
                'K\'inich Janaab Pakal (Pacal le Grand)',
                'K\'inich Kan B\'ahlam (Serpent-Jaguar)',
                'Yax Nuun Ahiin (Curl Snout)',
                'Dame Six Ciel (Wak Chan Ajaw)',
                'Itzamna, K\'awiil, Chaak, K\'inich Ajaw',
                'Titres royaux : K\'uhul Ajaw, Kaloomte\'',
                'Glyphes d\'emblème (villes)'
            ],
            step4Duration: '⏱️ 4-5 heures',
            step4Btn: '👑 Déchiffrer les Noms',

            step5Title: 'Stèles & Codex Authentiques',
            step5Desc: 'Lisez les inscriptions originales des monuments mayas',
            step5Features: [
                '20+ stèles de Palenque, Tikal, Copán',
                'Codex de Dresde (astronomie)',
                'Codex de Madrid (rituels)',
                'Codex de Paris (cérémonies)',
                'Escalier hiéroglyphique de Copán',
                'Temple des Inscriptions (Palenque)',
                'Traduction phrase par phrase',
                'Contexte historique et archéologique'
            ],
            step5Duration: '⏱️ 5-7 heures',
            step5Btn: '🗿 Lire les Stèles',

            step6Title: 'Flashcards Interactives',
            step6Desc: 'Mémorisez avec 4 modes d\'apprentissage',
            step6Features: [
                '📝 Mode Glyphe → Prononciation',
                '🔊 Mode Audio → Reconnaissance',
                '🔢 Mode Chiffres → Valeur',
                '👑 Mode Noms Royaux → Déchiffrage',
                'Système de répétition espacée',
                '1000+ cartes (syllabes, logos, noms)',
                'Suivi de progression'
            ],
            step6Duration: '⏱️ 3-5 heures',
            step6Btn: '🎯 Pratiquer',

            methodologyTitle: '📚 Méthodologie d\'Apprentissage',
            method1Title: '1️⃣ Progression Logique',
            method1Desc: 'Syllabes → Chiffres → Calendriers → Noms → Textes complets',
            method2Title: '2️⃣ Contexte Archéologique',
            method2Desc: 'Chaque glyphe dans son contexte historique et culturel',
            method3Title: '3️⃣ Exemples Authentiques',
            method3Desc: 'Stèles, codex et monuments réels des sites mayas',
            method4Title: '4️⃣ Pratique Active',
            method4Desc: 'Exercices de déchiffrage et flashcards interactives',

            ctaTitle: '🚀 Commencez Votre Voyage dans le Monde Maya',
            ctaText: 'Plongez dans la civilisation la plus avancée des Amériques anciennes',
            ctaBtn: '✨ Débuter le Parcours Maya',

            footer: 'Ce parcours utilise les dernières découvertes en épigraphie maya. Parfait pour débutants et étudiants avancés.'
        },
        en: {
            title: '🏛️ Complete Course - Master Mayan Glyphs',
            subtitle: 'Decipher the writing of kings and gods of Mesoamerica',
            heroTitle: 'Welcome to the Universe of Mayan Glyphs',
            heroDesc: 'Discover the most sophisticated writing system of ancient Americas. Learn to read royal stelae, codices and sacred calendars.',
            duration: 'Total estimated duration: 20-30 hours',

            step1Title: 'Syllabary & Logograms',
            step1Desc: 'Master the 800+ syllabic and logographic glyphs',
            step1Features: [
                '500 phonetic syllables (ba, be, bi, bo, bu...)',
                '300+ logograms (complete ideas)',
                'Phonetic complementation principle',
                'Allographic variants (same sound, different forms)',
                'Block reading direction (2x2, 3x2)',
                'Examples from Palenque, Tikal, Copán'
            ],
            step1Duration: '⏱️ 6-8 hours',
            step1Btn: '📖 Learn Syllabary',

            step2Title: 'Vigesimal Number System',
            step2Desc: 'Decode Mayan numbers in base 20 with zero concept',
            step2Features: [
                'Dots (1-4) and bars (5)',
                'Shell glyph for zero 🐚',
                'Base 20 (position × 20ⁿ)',
                'Head numeration (variants)',
                'Long Count date calculations',
                'Mayan arithmetic operations'
            ],
            step2Duration: '⏱️ 3-4 hours',
            step2Btn: '🔢 Master Numbers',

            step3Title: 'Tzolk\'in & Haab Calendars',
            step3Desc: 'Understand sacred and solar Mayan calendar systems',
            step3Features: [
                'Tzolk\'in: 13 numbers × 20 names = 260 days',
                'Haab: 18 months × 20 days + 5 Wayeb = 365 days',
                'Calendar Round: 52-year cycle',
                'Long Count: since August 11, 3114 BCE',
                'Lords of the Night (9 deities)',
                'Gregorian ↔ Maya converter'
            ],
            step3Duration: '⏱️ 4-6 hours',
            step3Btn: '📅 Explore Calendars',

            step4Title: 'Royal & Divine Names',
            step4Desc: 'Read names of Mayan kings, queens and gods',
            step4Features: [
                'K\'inich Janaab Pakal (Pakal the Great)',
                'K\'inich Kan B\'ahlam (Serpent-Jaguar)',
                'Yax Nuun Ahiin (Curl Snout)',
                'Lady Six Sky (Wak Chan Ajaw)',
                'Itzamna, K\'awiil, Chaak, K\'inich Ajaw',
                'Royal titles: K\'uhul Ajaw, Kaloomte\'',
                'Emblem glyphs (cities)'
            ],
            step4Duration: '⏱️ 4-5 hours',
            step4Btn: '👑 Decipher Names',

            step5Title: 'Authentic Stelae & Codices',
            step5Desc: 'Read original inscriptions from Mayan monuments',
            step5Features: [
                '20+ stelae from Palenque, Tikal, Copán',
                'Dresden Codex (astronomy)',
                'Madrid Codex (rituals)',
                'Paris Codex (ceremonies)',
                'Copán Hieroglyphic Stairway',
                'Temple of Inscriptions (Palenque)',
                'Sentence-by-sentence translation',
                'Historical and archaeological context'
            ],
            step5Duration: '⏱️ 5-7 hours',
            step5Btn: '🗿 Read Stelae',

            step6Title: 'Interactive Flashcards',
            step6Desc: 'Memorize with 4 learning modes',
            step6Features: [
                '📝 Mode Glyph → Pronunciation',
                '🔊 Audio Mode → Recognition',
                '🔢 Number Mode → Value',
                '👑 Royal Names Mode → Decipherment',
                'Spaced repetition system',
                '1000+ cards (syllables, logos, names)',
                'Progress tracking'
            ],
            step6Duration: '⏱️ 3-5 hours',
            step6Btn: '🎯 Practice',

            methodologyTitle: '📚 Learning Methodology',
            method1Title: '1️⃣ Logical Progression',
            method1Desc: 'Syllables → Numbers → Calendars → Names → Complete texts',
            method2Title: '2️⃣ Archaeological Context',
            method2Desc: 'Each glyph in its historical and cultural context',
            method3Title: '3️⃣ Authentic Examples',
            method3Desc: 'Real stelae, codices and monuments from Mayan sites',
            method4Title: '4️⃣ Active Practice',
            method4Desc: 'Decipherment exercises and interactive flashcards',

            ctaTitle: '🚀 Start Your Journey into the Mayan World',
            ctaText: 'Dive into the most advanced civilization of ancient Americas',
            ctaBtn: '✨ Begin Mayan Course',

            footer: 'This course uses the latest discoveries in Mayan epigraphy. Perfect for beginners and advanced students.'
        },
        es: {
            title: '🏛️ Curso Completo - Dominar los Glifos Mayas',
            subtitle: 'Descifra la escritura de reyes y dioses de Mesoamérica',
            heroTitle: 'Bienvenido al Universo de los Glifos Mayas',
            heroDesc: 'Descubre el sistema de escritura más sofisticado de las Américas antiguas. Aprende a leer estelas reales, códices y calendarios sagrados.',
            duration: 'Duración total estimada: 20-30 horas',

            step1Title: 'Silabario y Logogramas',
            step1Desc: 'Domina los 800+ glifos silábicos y logográficos',
            step1Features: [
                '500 sílabas fonéticas (ba, be, bi, bo, bu...)',
                '300+ logogramas (ideas completas)',
                'Principio de complementación fonética',
                'Variantes alográficas (mismo sonido, formas diferentes)',
                'Dirección de lectura en bloques (2x2, 3x2)',
                'Ejemplos de Palenque, Tikal, Copán'
            ],
            step1Duration: '⏱️ 6-8 horas',
            step1Btn: '📖 Aprender Silabario',

            step2Title: 'Sistema Numérico Vigesimal',
            step2Desc: 'Decodifica números mayas en base 20 con concepto de cero',
            step2Features: [
                'Puntos (1-4) y barras (5)',
                'Glifo concha para cero 🐚',
                'Base 20 (posición × 20ⁿ)',
                'Numeración de cabeza (variantes)',
                'Cálculos de fechas de Cuenta Larga',
                'Operaciones aritméticas mayas'
            ],
            step2Duration: '⏱️ 3-4 horas',
            step2Btn: '🔢 Dominar Números',

            step3Title: 'Calendarios Tzolk\'in y Haab',
            step3Desc: 'Comprende sistemas calendáricos sagrados y solares mayas',
            step3Features: [
                'Tzolk\'in: 13 números × 20 nombres = 260 días',
                'Haab: 18 meses × 20 días + 5 Wayeb = 365 días',
                'Rueda Calendárica: ciclo de 52 años',
                'Cuenta Larga: desde 11 agosto 3114 a.C.',
                'Señores de la Noche (9 deidades)',
                'Convertidor Gregoriano ↔ Maya'
            ],
            step3Duration: '⏱️ 4-6 horas',
            step3Btn: '📅 Explorar Calendarios',

            step4Title: 'Nombres Reales y Divinos',
            step4Desc: 'Lee nombres de reyes, reinas y dioses mayas',
            step4Features: [
                'K\'inich Janaab Pakal (Pacal el Grande)',
                'K\'inich Kan B\'ahlam (Serpiente-Jaguar)',
                'Yax Nuun Ahiin (Nariz Rizada)',
                'Dama Seis Cielo (Wak Chan Ajaw)',
                'Itzamna, K\'awiil, Chaak, K\'inich Ajaw',
                'Títulos reales: K\'uhul Ajaw, Kaloomte\'',
                'Glifos emblema (ciudades)'
            ],
            step4Duration: '⏱️ 4-5 horas',
            step4Btn: '👑 Descifrar Nombres',

            step5Title: 'Estelas y Códices Auténticos',
            step5Desc: 'Lee inscripciones originales de monumentos mayas',
            step5Features: [
                '20+ estelas de Palenque, Tikal, Copán',
                'Códice de Dresde (astronomía)',
                'Códice de Madrid (rituales)',
                'Códice de París (ceremonias)',
                'Escalinata Jeroglífica de Copán',
                'Templo de las Inscripciones (Palenque)',
                'Traducción frase por frase',
                'Contexto histórico y arqueológico'
            ],
            step5Duration: '⏱️ 5-7 horas',
            step5Btn: '🗿 Leer Estelas',

            step6Title: 'Tarjetas Interactivas',
            step6Desc: 'Memoriza con 4 modos de aprendizaje',
            step6Features: [
                '📝 Modo Glifo → Pronunciación',
                '🔊 Modo Audio → Reconocimiento',
                '🔢 Modo Números → Valor',
                '👑 Modo Nombres Reales → Desciframiento',
                'Sistema de repetición espaciada',
                '1000+ tarjetas (sílabas, logos, nombres)',
                'Seguimiento de progreso'
            ],
            step6Duration: '⏱️ 3-5 horas',
            step6Btn: '🎯 Practicar',

            methodologyTitle: '📚 Metodología de Aprendizaje',
            method1Title: '1️⃣ Progresión Lógica',
            method1Desc: 'Sílabas → Números → Calendarios → Nombres → Textos completos',
            method2Title: '2️⃣ Contexto Arqueológico',
            method2Desc: 'Cada glifo en su contexto histórico y cultural',
            method3Title: '3️⃣ Ejemplos Auténticos',
            method3Desc: 'Estelas, códices y monumentos reales de sitios mayas',
            method4Title: '4️⃣ Práctica Activa',
            method4Desc: 'Ejercicios de desciframiento y tarjetas interactivas',

            ctaTitle: '🚀 Comienza tu Viaje al Mundo Maya',
            ctaText: 'Sumérgete en la civilización más avanzada de las Américas antiguas',
            ctaBtn: '✨ Comenzar Curso Maya',

            footer: 'Este curso utiliza los últimos descubrimientos en epigrafía maya. Perfecto para principiantes y estudiantes avanzados.'
        }
    },

    // ===== PARCOURS HIÉROGLYPHES ÉGYPTIENS =====
    hieroglyphs: {
        fr: {
            title: '𓂀 Parcours Complet - Apprendre les Hiéroglyphes',
            subtitle: 'Déchiffrez l\'écriture sacrée des pharaons',
            heroTitle: 'Bienvenue dans l\'Univers des Hiéroglyphes',
            heroDesc: 'Découvrez l\'écriture des pharaons et apprenez à lire les inscriptions des temples et tombes égyptiennes.',
            duration: 'Durée totale estimée: 10-15 heures',

            step1Title: 'Alphabet Complet',
            step1Desc: 'Découvrez et mémorisez les 26 signes unilitères + déterminatifs essentiels',
            step1Features: [
                'Unilitères avec sons et noms',
                'Bilitères et trilitères fréquents',
                'Déterminatifs (signes muets)',
                'Système de numération décimal',
                'Recherche interactive et filtres'
            ],
            step1Duration: '⏱️ 2-3 heures',
            step1Btn: '📖 Commencer l\'Alphabet',

            step2Title: 'Grammaire Niveau 1',
            step2Desc: 'Apprenez les 4 règles fondamentales pour lire correctement',
            step2Features: [
                'Sens de lecture (gauche/droite/haut)',
                'Phonogrammes unilitères',
                'Rôle des déterminatifs',
                'Compléments phonétiques',
                'Quiz interactifs intégrés'
            ],
            step2Duration: '⏱️ 2-3 heures',
            step2Btn: '📚 Étudier la Grammaire',

            step3Title: 'Exercices de Déchiffrage',
            step3Desc: 'Pratiquez avec 15+ exercices progressifs',
            step3Features: [
                '5 niveaux de difficulté',
                'Correction instantanée',
                'Explications détaillées',
                'Système de scoring',
                'Suivi de progression'
            ],
            step3Duration: '⏱️ 3-4 heures',
            step3Btn: '✍️ Commencer les Exercices',

            step4Title: 'Flashcards Quotidiennes',
            step4Desc: 'Entraînez-vous quotidiennement à reconnaître les signes',
            step4Features: [
                '3 modes : Unilitères, Déterminatifs, Mixte',
                'Sessions de 20 cartes',
                'Animation flip 3D',
                'Statistiques détaillées',
                'Révision espacée'
            ],
            step4Duration: '⏱️ 2-3 heures',
            step4Btn: '🎴 Lancer les Flashcards',

            methodologyTitle: '🧠 Notre Méthodologie Pédagogique',
            method1Title: '📊 Évaluations Fréquentes',
            method1Desc: 'Après chaque concept appris, testez immédiatement vos connaissances',
            method2Title: '🔁 Répétition Espacée',
            method2Desc: 'Ancrez durablement les signes dans votre mémoire',
            method3Title: '🎯 Apprentissage Progressif',
            method3Desc: 'Du plus simple au plus complexe, chaque étape s\'appuie sur les précédentes',
            method4Title: '✍️ Pratique Intensive',
            method4Desc: 'Déchiffrez de vrais textes hiéroglyphiques dès le début',

            ctaTitle: '🚀 Prêt à Commencer ?',
            ctaText: 'Le parcours complet prend environ 6-8 heures à suivre en continu',
            ctaBtn: '📖 Commencer Maintenant l\'Étape 1',

            bonusTitle: '🎁 Bonus : 46 Inscriptions Authentiques',
            bonusText: 'Explorez 46 inscriptions authentiques des temples et tombes égyptiennes',
            bonusBtn: '📜 Voir les Inscriptions',

            footer: 'Parcours complet d\'apprentissage des hiéroglyphes pour tous niveaux'
        },
        en: {
            title: '𓂀 Complete Course - Learn Hieroglyphs',
            subtitle: 'Decipher the sacred writing of the pharaohs',
            heroTitle: 'Welcome to the World of Hieroglyphs',
            heroDesc: 'Discover the writing of pharaohs and learn to read inscriptions from Egyptian temples and tombs.',
            duration: 'Total estimated duration: 10-15 hours',

            step1Title: 'Complete Alphabet',
            step1Desc: 'Discover and memorize the 26 uniliteral signs + essential determinatives',
            step1Features: [
                'Uniliterals with sounds and names',
                'Frequent biliterals and triliterals',
                'Determinatives (silent signs)',
                'Decimal numeration system',
                'Interactive search and filters'
            ],
            step1Duration: '⏱️ 2-3 hours',
            step1Btn: '📖 Start the Alphabet',

            step2Title: 'Grammar Level 1',
            step2Desc: 'Learn the 4 fundamental rules to read correctly',
            step2Features: [
                'Reading direction (left/right/top)',
                'Uniliteral phonograms',
                'Role of determinatives',
                'Phonetic complements',
                'Integrated interactive quizzes'
            ],
            step2Duration: '⏱️ 2-3 hours',
            step2Btn: '📚 Study Grammar',

            step3Title: 'Decipherment Exercises',
            step3Desc: 'Practice with 15+ progressive exercises',
            step3Features: [
                '5 difficulty levels',
                'Instant correction',
                'Detailed explanations',
                'Scoring system',
                'Progress tracking'
            ],
            step3Duration: '⏱️ 3-4 hours',
            step3Btn: '✍️ Start Exercises',

            step4Title: 'Daily Flashcards',
            step4Desc: 'Train daily to recognize signs instantly',
            step4Features: [
                '3 modes: Uniliterals, Determinatives, Mixed',
                '20-card sessions',
                '3D flip animation',
                'Detailed statistics',
                'Spaced repetition'
            ],
            step4Duration: '⏱️ 2-3 hours',
            step4Btn: '🎴 Launch Flashcards',

            methodologyTitle: '🧠 Our Pedagogical Methodology',
            method1Title: '📊 Frequent Assessments',
            method1Desc: 'After each learned concept, immediately test your knowledge',
            method2Title: '🔁 Spaced Repetition',
            method2Desc: 'Anchor signs durably in your memory',
            method3Title: '🎯 Progressive Learning',
            method3Desc: 'From simple to complex, each step builds on previous ones',
            method4Title: '✍️ Intensive Practice',
            method4Desc: 'Decipher real hieroglyphic texts from the start',

            ctaTitle: '🚀 Ready to Start?',
            ctaText: 'The complete course takes about 6-8 hours to follow continuously',
            ctaBtn: '📖 Start Now - Step 1',

            bonusTitle: '🎁 Bonus: 46 Authentic Inscriptions',
            bonusText: 'Explore 46 authentic inscriptions from Egyptian temples and tombs',
            bonusBtn: '📜 View Inscriptions',

            footer: 'Complete hieroglyphs learning course for all levels'
        },
        es: {
            title: '𓂀 Curso Completo - Aprender Jeroglíficos',
            subtitle: 'Descifra la escritura sagrada de los faraones',
            heroTitle: 'Bienvenido al Mundo de los Jeroglíficos',
            heroDesc: 'Descubre la escritura de los faraones y aprende a leer inscripciones de templos y tumbas egipcias.',
            duration: 'Duración total estimada: 10-15 horas',

            step1Title: 'Alfabeto Completo',
            step1Desc: 'Descubre y memoriza los 26 signos unilíteros + determinativos esenciales',
            step1Features: [
                'Unilíteros con sonidos y nombres',
                'Bilíteros y trilíteros frecuentes',
                'Determinativos (signos mudos)',
                'Sistema de numeración decimal',
                'Búsqueda interactiva y filtros'
            ],
            step1Duration: '⏱️ 2-3 horas',
            step1Btn: '📖 Comenzar el Alfabeto',

            step2Title: 'Gramática Nivel 1',
            step2Desc: 'Aprende las 4 reglas fundamentales para leer correctamente',
            step2Features: [
                'Dirección de lectura (izquierda/derecha/arriba)',
                'Fonogramas unilíteros',
                'Papel de los determinativos',
                'Complementos fonéticos',
                'Cuestionarios interactivos integrados'
            ],
            step2Duration: '⏱️ 2-3 horas',
            step2Btn: '📚 Estudiar Gramática',

            step3Title: 'Ejercicios de Desciframiento',
            step3Desc: 'Practica con 15+ ejercicios progresivos',
            step3Features: [
                '5 niveles de dificultad',
                'Corrección instantánea',
                'Explicaciones detalladas',
                'Sistema de puntuación',
                'Seguimiento de progreso'
            ],
            step3Duration: '⏱️ 3-4 horas',
            step3Btn: '✍️ Comenzar Ejercicios',

            step4Title: 'Tarjetas Diarias',
            step4Desc: 'Entrena diariamente para reconocer signos al instante',
            step4Features: [
                '3 modos: Unilíteros, Determinativos, Mixto',
                'Sesiones de 20 tarjetas',
                'Animación 3D de volteo',
                'Estadísticas detalladas',
                'Repetición espaciada'
            ],
            step4Duration: '⏱️ 2-3 horas',
            step4Btn: '🎴 Lanzar Tarjetas',

            methodologyTitle: '🧠 Nuestra Metodología Pedagógica',
            method1Title: '📊 Evaluaciones Frecuentes',
            method1Desc: 'Después de cada concepto aprendido, prueba inmediatamente tus conocimientos',
            method2Title: '🔁 Repetición Espaciada',
            method2Desc: 'Ancla los signos duraderamente en tu memoria',
            method3Title: '🎯 Aprendizaje Progresivo',
            method3Desc: 'De lo simple a lo complejo, cada paso se basa en los anteriores',
            method4Title: '✍️ Práctica Intensiva',
            method4Desc: 'Descifra textos jeroglíficos reales desde el principio',

            ctaTitle: '🚀 ¿Listo para Comenzar?',
            ctaText: 'El curso completo toma aproximadamente 6-8 horas seguir continuamente',
            ctaBtn: '📖 Comenzar Ahora - Paso 1',

            bonusTitle: '🎁 Bonus: 46 Inscripciones Auténticas',
            bonusText: 'Explora 46 inscripciones auténticas de templos y tumbas egipcias',
            bonusBtn: '📜 Ver Inscripciones',

            footer: 'Curso completo de aprendizaje de jeroglíficos para todos los niveles'
        }
    },

    // ===== COMMUN POUR TOUS LES PARCOURS =====
    common: {
        fr: {
            startBtn: '🚀 Commencer',
            continueBtn: '▶️ Continuer',
            completeBtn: '✅ Terminer',
            backBtn: '← Retour',
            nextBtn: 'Suivant →',
            prevBtn: '← Précédent',
            loading: 'Chargement...',
            error: 'Erreur',
            success: 'Succès !',
            progress: 'Progression',
            level: 'Niveau',
            beginner: 'Débutant',
            intermediate: 'Intermédiaire',
            advanced: 'Avancé',
            expert: 'Expert'
        },
        en: {
            startBtn: '🚀 Start',
            continueBtn: '▶️ Continue',
            completeBtn: '✅ Complete',
            backBtn: '← Back',
            nextBtn: 'Next →',
            prevBtn: '← Previous',
            loading: 'Loading...',
            error: 'Error',
            success: 'Success!',
            progress: 'Progress',
            level: 'Level',
            beginner: 'Beginner',
            intermediate: 'Intermediate',
            advanced: 'Advanced',
            expert: 'Expert'
        },
        es: {
            startBtn: '🚀 Comenzar',
            continueBtn: '▶️ Continuar',
            completeBtn: '✅ Completar',
            backBtn: '← Volver',
            nextBtn: 'Siguiente →',
            prevBtn: '← Anterior',
            loading: 'Cargando...',
            error: 'Error',
            success: '¡Éxito!',
            progress: 'Progreso',
            level: 'Nivel',
            beginner: 'Principiante',
            intermediate: 'Intermedio',
            advanced: 'Avanzado',
            expert: 'Experto'
        }
    }
};

// ===== FONCTIONS D'INITIALISATION =====

// Langue actuelle (sauvegardée dans localStorage)
let currentLang = localStorage.getItem('preferredLang') || 'fr';

// Fonction pour changer de langue
function switchLanguage() {
    const langs = ['fr', 'en', 'es'];
    const currentIndex = langs.indexOf(currentLang);
    currentLang = langs[(currentIndex + 1) % 3];
    localStorage.setItem('preferredLang', currentLang);
    updatePageLanguage();
}

// Fonction pour obtenir une traduction
function t(category, key, fallback = '') {
    try {
        return i18n[category][currentLang][key] || fallback || key;
    } catch(e) {
        console.warn(`Missing translation: ${category}.${currentLang}.${key}`);
        return fallback || key;
    }
}

// Fonction pour mettre à jour toute la page
function updatePageLanguage() {
    // Mettre à jour tous les éléments avec attribut data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const keys = el.getAttribute('data-i18n').split('.');
        if (keys.length === 2) {
            const [category, key] = keys;
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = t(category, key);
            } else {
                el.textContent = t(category, key);
            }
        }
    });

    // Mettre à jour l'attribut lang de la page
    document.documentElement.lang = currentLang;

    // Sauvegarder dans localStorage
    localStorage.setItem('preferredLang', currentLang);
}

// Initialiser au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    updatePageLanguage();

    // Ajouter event listeners pour les boutons de langue
    document.querySelectorAll('.lang-switch-btn').forEach(btn => {
        btn.addEventListener('click', switchLanguage);
    });
});

// Export pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { i18n, t, switchLanguage, updatePageLanguage };
}
