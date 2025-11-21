# 🔮 Académie des Sagesses Ésotériques

Plateforme d'apprentissage complète des sagesses anciennes : Runes Nordiques, Gématrie Hébraïque, Hiéroglyphes, Glyphes Mayas, et bien plus.

---

## 📂 Structure du Projet

```
gematria-academy-deploy/
│
├── index.html                          # Page d'accueil principale
│
├── assets/                             # Ressources statiques
│   ├── css/                            # Feuilles de style
│   │   ├── main/                       # Styles principaux
│   │   │   ├── style.css              # Style global
│   │   │   ├── fix-contrast.css       # Corrections de contraste
│   │   │   └── cosmic-header-styles.css # Header cosmique
│   │   ├── animations/                # Animations et effets
│   │   │   ├── animated-background.css
│   │   │   └── bleus-cosmiques.css
│   │   └── features/                  # Fonctionnalités spécifiques
│   │       ├── knowledge-validation.css
│   │       ├── student-dashboard.css
│   │       └── spaced-repetition.css
│   │
│   └── js/                            # Scripts JavaScript
│       ├── animations/                # Scripts d'animation
│       │   └── animated-background.js
│       ├── auth/                      # Authentification
│       │   ├── auth-system.js
│       │   └── firebase-config.js
│       ├── progression/               # Système de progression
│       │   ├── progression-system.js
│       │   └── user-progression-cloud.js
│       └── learning/                  # Systèmes d'apprentissage
│           ├── knowledge-validation.js   # Quiz de validation
│           ├── student-dashboard.js      # Tableau de bord étudiant
│           └── spaced-repetition.js      # Révision espacée (SM-2)
│
├── pages/                             # Pages HTML organisées par catégorie
│   ├── versions/                      # Différentes versions du site
│   │   ├── index_enrichi.html         # Version enrichie (150+ leçons)
│   │   └── index_mega_enriched.html   # Version MEGA (500+ leçons + systèmes de validation)
│   ├── runes/                         # Runes Nordiques (10 pages)
│   │   ├── runes-debutant.html
│   │   ├── runes-intermediaire.html
│   │   ├── runes-expert.html
│   │   ├── runes-parcours-complet.html
│   │   ├── runes-mythologie-nordique.html
│   │   ├── runes-divination.html
│   │   ├── runes-flashcards.html
│   │   ├── alphabet-runes.html
│   │   └── tirage-runes.html
│   ├── gematria/                      # Gématrie Hébraïque (5 pages)
│   │   ├── gematria-debutant.html
│   │   ├── gematria-intermediaire.html
│   │   ├── gematria-expert.html
│   │   ├── alphabet-hebreu.html
│   │   └── calculateur-gematria.html
│   ├── hieroglyphes/                  # Hiéroglyphes Égyptiens (6 pages)
│   │   ├── hieroglyphes-parcours-complet.html
│   │   ├── immersion-inscriptions-index.html
│   │   ├── hieroglyphes-exercices-phrases.html
│   │   ├── hieroglyphes-contexte-culturel.html
│   │   ├── hieroglyphes-jeux-interactifs.html
│   │   └── hieroglyphes-momification.html
│   ├── maya/                          # Glyphes Mayas (3 pages)
│   │   ├── glyphes-mayas-intro.html
│   │   ├── maya-intermediaire.html
│   │   └── maya-expert.html
│   ├── logique/                       # Logique & Raisonnement (5 pages)
│   │   ├── logique-debutant.html
│   │   ├── logique-intermediaire.html
│   │   ├── logique-expert.html
│   │   ├── types-raisonnement.html
│   │   └── exercices-logique.html
│   ├── meditation/                    # Méditation & Spiritualité (3 pages)
│   │   ├── mandala.html
│   │   ├── mandala_anime.html
│   │   └── chakras.html
│   ├── user/                          # Gestion utilisateur (2 pages)
│   │   ├── login.html
│   │   └── profile.html
│   └── demo/                          # Démonstrations (1 page)
│       └── demo-quiz.html             # Démo du système de quiz
│
└── docs/                              # Documentation
    ├── guides/                        # Guides utilisateur
    │   ├── GUIDE_ETUDIANT.md          # Guide complet pour les étudiants
    │   └── COMPARAISON_VERSIONS.md    # Comparaison des 3 versions
    ├── technical/                     # Documentation technique
    │   ├── SYSTEME_VALIDATION_README.md      # Système de validation des connaissances
    │   ├── SYSTEME_REVISION_README.md        # Système de révision espacée
    │   ├── SYSTEME_COMPLET_FINAL.md          # Vue d'ensemble complète
    │   └── SYSTEME_VALIDATION_COMPLET.md     # Détails validation
    └── archive/                       # Documentation archivée
        ├── VERIFICATION_LIENS.md
        ├── README_COMPLET.md
        ├── README_MEGA_ENRICHED.md
        └── PLAN_REORGANISATION.md
```

---

## 🚀 Versions Disponibles

### 1. Version Classique (index.html)
- 📿 Runes Nordiques (3 niveaux)
- ✡️ Gématrie Hébraïque (3 niveaux)
- 𓂀 Hiéroglyphes Égyptiens
- 🌞 Glyphes Mayas
- 🧠 Logique & Raisonnement
- 🕉️ Mandalas & Chakras

### 2. Version Enrichie (pages/versions/index_enrichi.html)
- ✅ Tout le contenu de la version classique
- ➕ 150+ leçons ultra-détaillées
- ➕ Parcours complets structurés
- ➕ Exercices interactifs avancés
- ➕ Mythologie et contexte culturel

### 3. Version MEGA ENRICHED (pages/versions/index_mega_enriched.html)
- ✅ Tout le contenu de la version enrichie
- ➕ 500+ leçons interactives
- ➕ 12 systèmes sacrés (Tarot, Astrologie, Alchimie, I-Ching, etc.)
- ➕ **Système de validation des connaissances**
  - Quiz interactifs (4 questions par leçon)
  - Score minimum 80% pour valider
  - Progression verrouillée/débloquée
  - 10 niveaux (🔰 Novice → 🌟 Maître)
  - 12+ badges de réussite
  - 4 certificats officiels
- ➕ **Système de révision espacée (SM-2)**
  - Algorithme scientifique de mémorisation
  - 10 révisions quotidiennes (5-10 min)
  - Rétention à long terme (80%+ après 1 an)
  - Statistiques détaillées
  - Série de jours consécutifs
- ➕ **Tableau de bord complet**
  - Statistiques de progression
  - Historique d'activité
  - Export de données (JSON)

---

## 🎓 Systèmes Pédagogiques

### Validation des Connaissances
- 📝 Quiz interactifs avec feedback immédiat
- ✅ Validation à 80% minimum
- 🔓 Débloquage progressif des leçons
- 📊 Suivi détaillé de la progression

**Documentation** : `docs/technical/SYSTEME_VALIDATION_README.md`

### Révision Espacée
- 🧠 Algorithme SM-2 (SuperMemo 2)
- 📅 Planning adaptatif automatique
- ⏰ Révisions au moment optimal
- 📈 Statistiques de rétention

**Documentation** : `docs/technical/SYSTEME_REVISION_README.md`

---

## 📊 Statistiques du Projet

- **Pages HTML** : 35+ pages
- **Fichiers CSS** : 8 fichiers (organisés en 3 catégories)
- **Fichiers JavaScript** : 8 fichiers (organisés en 4 catégories)
- **Documentation** : 10+ fichiers markdown
- **Lignes de code** : ~10,000 lignes
- **Quiz disponibles** : 5 quiz (extensible à 50+)

---

## 🔗 Liens Principaux

### Pages d'Accueil
- 🏠 **Version Classique** : `/index.html`
- ✨ **Version Enrichie** : `/pages/versions/index_enrichi.html`
- 🔮 **Version MEGA** : `/pages/versions/index_mega_enriched.html`

### Démonstrations
- 🧪 **Démo Quiz** : `/pages/demo/demo-quiz.html`

### Documentation
- 📚 **Guide Étudiant** : `/docs/guides/GUIDE_ETUDIANT.md`
- 📖 **Doc Technique** : `/docs/technical/`

---

## 🛠️ Technologies Utilisées

- **Frontend** : HTML5, CSS3, JavaScript (Vanilla)
- **Animations** : CSS Animations, Canvas API
- **Stockage** : localStorage (données utilisateur)
- **Authentification** : Firebase (optionnel)
- **Déploiement** : Cloudflare Pages

---

## 🎨 Thème Visuel

- **Palette principale** : Violets cosmiques (#8a2be2, #6a1b9a)
- **Animations** : Particules, étoiles scintillantes, nébuleuses
- **Responsive** : Desktop, tablette, mobile
- **Mode sombre** : Activé par défaut

---

## 📱 Responsive Design

Le site est entièrement responsive avec 3 breakpoints :

- **Desktop** : 1200px+
- **Tablette** : 768px - 1199px
- **Mobile** : < 768px

---

## 🚀 Déploiement

Le site est déployé sur Cloudflare Pages :
- **URL principale** : https://master.gematria-academy.pages.dev
- **Auto-déploiement** : Chaque push sur la branche master

---

## 📄 Licence

© 2025 Académie des Sagesses Ésotériques
Tous droits réservés.

---

## 🤝 Contribution

Pour toute question ou suggestion :
1. Consultez la documentation dans `/docs/`
2. Vérifiez la structure dans ce README
3. Respectez l'organisation des dossiers

---

**🔮 Que la Sagesse Vous Guide ! ✨**
