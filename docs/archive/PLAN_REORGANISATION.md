# 📁 Plan de Réorganisation du Site

## 🎯 Objectif
Créer une structure de dossiers claire et maintenable pour l'Académie des Sagesses Ésotériques.

---

## 📂 Nouvelle Structure Proposée

```
gematria-academy-deploy/
│
├── index.html                    # Page d'accueil principale
│
├── assets/                       # Ressources statiques
│   ├── css/                      # Tous les fichiers CSS
│   │   ├── main/
│   │   │   ├── style.css
│   │   │   ├── fix-contrast.css
│   │   │   └── cosmic-header-styles.css
│   │   ├── animations/
│   │   │   ├── animated-background.css
│   │   │   └── bleus-cosmiques.css
│   │   └── features/
│   │       ├── knowledge-validation.css
│   │       ├── student-dashboard.css
│   │       └── spaced-repetition.css
│   │
│   └── js/                       # Tous les fichiers JavaScript
│       ├── animations/
│       │   └── animated-background.js
│       ├── auth/
│       │   ├── auth-system.js
│       │   └── firebase-config.js
│       ├── progression/
│       │   ├── progression-system.js
│       │   └── user-progression-cloud.js
│       └── learning/
│           ├── knowledge-validation.js
│           ├── student-dashboard.js
│           └── spaced-repetition.js
│
├── pages/                        # Pages HTML par catégorie
│   ├── versions/
│   │   ├── index_enrichi.html
│   │   └── index_mega_enriched.html
│   ├── runes/
│   │   ├── runes-debutant.html
│   │   ├── runes-intermediaire.html
│   │   ├── runes-expert.html
│   │   ├── runes-parcours-complet.html
│   │   ├── runes-mythologie-nordique.html
│   │   ├── runes-divination.html
│   │   ├── runes-flashcards.html
│   │   ├── alphabet-runes.html
│   │   └── tirage-runes.html
│   ├── gematria/
│   │   ├── gematria-debutant.html
│   │   ├── gematria-intermediaire.html
│   │   ├── gematria-expert.html
│   │   ├── alphabet-hebreu.html
│   │   └── calculateur-gematria.html
│   ├── hieroglyphes/
│   │   ├── hieroglyphes-parcours-complet.html
│   │   ├── immersion-inscriptions-index.html
│   │   ├── hieroglyphes-exercices-phrases.html
│   │   ├── hieroglyphes-contexte-culturel.html
│   │   ├── hieroglyphes-jeux-interactifs.html
│   │   └── hieroglyphes-momification.html
│   ├── maya/
│   │   ├── glyphes-mayas-intro.html
│   │   ├── maya-intermediaire.html
│   │   └── maya-expert.html
│   ├── logique/
│   │   ├── logique-debutant.html
│   │   ├── logique-intermediaire.html
│   │   ├── logique-expert.html
│   │   ├── types-raisonnement.html
│   │   └── exercices-logique.html
│   ├── meditation/
│   │   ├── mandala.html
│   │   ├── mandala_anime.html
│   │   └── chakras.html
│   ├── user/
│   │   ├── login.html
│   │   └── profile.html
│   └── demo/
│       └── demo-quiz.html
│
└── docs/                         # Documentation
    ├── README.md                 # README principal
    ├── guides/
    │   ├── GUIDE_ETUDIANT.md
    │   └── COMPARAISON_VERSIONS.md
    ├── technical/
    │   ├── SYSTEME_VALIDATION_README.md
    │   ├── SYSTEME_REVISION_README.md
    │   └── SYSTEME_COMPLET_FINAL.md
    └── archive/
        ├── VERIFICATION_LIENS.md
        ├── README_COMPLET.md
        └── README_MEGA_ENRICHED.md
```

---

## 🔄 Actions à Effectuer

### 1. Créer les Dossiers
- [x] `assets/css/main/`
- [x] `assets/css/animations/`
- [x] `assets/css/features/`
- [x] `assets/js/animations/`
- [x] `assets/js/auth/`
- [x] `assets/js/progression/`
- [x] `assets/js/learning/`
- [x] `pages/versions/`
- [x] `pages/runes/`
- [x] `pages/gematria/`
- [x] `pages/hieroglyphes/`
- [x] `pages/maya/`
- [x] `pages/logique/`
- [x] `pages/meditation/`
- [x] `pages/user/`
- [x] `pages/demo/`
- [x] `docs/guides/`
- [x] `docs/technical/`
- [x] `docs/archive/`

### 2. Déplacer les Fichiers CSS
```
style.css                    → assets/css/main/style.css
fix-contrast.css             → assets/css/main/fix-contrast.css
cosmic-header-styles.css     → assets/css/main/cosmic-header-styles.css
animated-background.css      → assets/css/animations/animated-background.css
bleus-cosmiques.css          → assets/css/animations/bleus-cosmiques.css
knowledge-validation.css     → assets/css/features/knowledge-validation.css
student-dashboard.css        → assets/css/features/student-dashboard.css
spaced-repetition.css        → assets/css/features/spaced-repetition.css
```

### 3. Déplacer les Fichiers JavaScript
```
animated-background.js       → assets/js/animations/animated-background.js
auth-system.js               → assets/js/auth/auth-system.js
firebase-config.js           → assets/js/auth/firebase-config.js
progression-system.js        → assets/js/progression/progression-system.js
user-progression-cloud.js    → assets/js/progression/user-progression-cloud.js
knowledge-validation.js      → assets/js/learning/knowledge-validation.js
student-dashboard.js         → assets/js/learning/student-dashboard.js
spaced-repetition.js         → assets/js/learning/spaced-repetition.js
```

### 4. Déplacer les Pages HTML
```
# Versions
index_enrichi.html           → pages/versions/index_enrichi.html
index_mega_enriched.html     → pages/versions/index_mega_enriched.html

# Runes (10 pages)
runes-*.html                 → pages/runes/
alphabet-runes.html          → pages/runes/
tirage-runes.html            → pages/runes/

# Gématrie (5 pages)
gematria-*.html              → pages/gematria/
alphabet-hebreu.html         → pages/gematria/
calculateur-gematria.html    → pages/gematria/

# Hiéroglyphes (6 pages)
hieroglyphes-*.html          → pages/hieroglyphes/
immersion-inscriptions-index.html → pages/hieroglyphes/

# Maya (3 pages)
glyphes-mayas-intro.html     → pages/maya/
maya-*.html                  → pages/maya/

# Logique (5 pages)
logique-*.html               → pages/logique/
types-raisonnement.html      → pages/logique/
exercices-logique.html       → pages/logique/

# Méditation (3 pages)
mandala.html                 → pages/meditation/
mandala_anime.html           → pages/meditation/
chakras.html                 → pages/meditation/

# User (2 pages)
login.html                   → pages/user/
profile.html                 → pages/user/

# Demo (1 page)
demo-quiz.html               → pages/demo/
```

### 5. Déplacer la Documentation
```
GUIDE_ETUDIANT.md            → docs/guides/
COMPARAISON_VERSIONS.md      → docs/guides/

SYSTEME_VALIDATION_README.md → docs/technical/
SYSTEME_REVISION_README.md   → docs/technical/
SYSTEME_COMPLET_FINAL.md     → docs/technical/

VERIFICATION_LIENS.md        → docs/archive/
README_COMPLET.md            → docs/archive/
README_MEGA_ENRICHED.md      → docs/archive/
```

### 6. Créer Nouveaux Fichiers
- `README.md` - Documentation principale
- `.gitignore` - Ignorer fichiers inutiles
- `docs/README.md` - Index de la documentation

---

## 📝 Mise à Jour des Liens

### Dans index.html
```html
<!-- Avant -->
<link rel="stylesheet" href="style.css">
<script src="auth-system.js"></script>

<!-- Après -->
<link rel="stylesheet" href="assets/css/main/style.css">
<script src="assets/js/auth/auth-system.js"></script>
```

### Dans pages/versions/index_mega_enriched.html
```html
<!-- Avant -->
<link rel="stylesheet" href="knowledge-validation.css">
<script src="knowledge-validation.js"></script>

<!-- Après -->
<link rel="stylesheet" href="../../assets/css/features/knowledge-validation.css">
<script src="../../assets/js/learning/knowledge-validation.js"></script>
```

### Dans pages/runes/runes-debutant.html
```html
<!-- Avant -->
<link rel="stylesheet" href="style.css">
<a href="index.html">Retour</a>

<!-- Après -->
<link rel="stylesheet" href="../../assets/css/main/style.css">
<a href="../../index.html">Retour</a>
```

---

## ✅ Avantages de cette Organisation

1. **Clarté** : Chaque type de fichier a son dossier
2. **Maintenabilité** : Facile de trouver et modifier
3. **Scalabilité** : Ajout de nouvelles pages simple
4. **Performance** : Séparation logique des ressources
5. **Collaboration** : Structure standard et professionnelle

---

## 🚀 Ordre d'Exécution

1. ✅ Créer tous les dossiers
2. ✅ Déplacer les fichiers CSS
3. ✅ Déplacer les fichiers JS
4. ✅ Déplacer les pages HTML
5. ✅ Déplacer la documentation
6. ✅ Mettre à jour tous les liens
7. ✅ Tester le site localement
8. ✅ Déployer sur Cloudflare

---

**Cette réorganisation rendra le site beaucoup plus professionnel et facile à maintenir ! 🎯**
