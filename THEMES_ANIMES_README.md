# 🎨 Fonds Animés Thématiques - Gematria Academy

## 📋 Vue d'ensemble

Ce projet ajoute des fonds d'écran animés thématiques pour chaque section principale du site Gematria Academy, créant une expérience immersive et visuellement captivante pour l'apprentissage.

## 🌟 Thèmes Créés

### 1. 🌙 Hiéroglyphes Égyptiens - Nuit Étoilée
**Fichier:** `hieroglyphes-animated-bg.css`
**Pages affectées:** 50+ pages

**Éléments visuels:**
- Ciel nocturne avec dégradé bleu-violet profond
- Champ d'étoiles animées (7 couches de radial gradients)
- Étoiles scintillantes avec animation `twinkle` (3s)
- Constellation d'Orion stylisée avec effet de luminescence
- Lune égyptienne dorée avec pulsation douce (6s)
- Voie lactée subtile en dérive (180s)
- Silhouettes de pyramides au premier plan

**Palette de couleurs:**
- Fond: `#0a0e27` → `#2d1b3d`
- Accents: Or `#ffd700`, `#fdcb6e`
- Lune: `#ffeaa7` → `#e17055`

---

### 2. 🌴 Maya - Jungle Tropicale
**Fichier:** `maya-animated-bg.css`
**Pages affectées:** 3 pages

**Éléments visuels:**
- Jungle luxuriante avec dégradé vert foncé
- Ciel crépusculaire orangé animé
- Feuillage en premier plan avec balancement doux
- Pyramides mayas en silhouette avec détails architecturaux
- Oiseaux tropicaux volant (3 instances)
- 5 lucioles flottantes avec effet lumineux
- Brume de jungle mystique
- Soleil/Lune maya avec aura dorée
- Glyphes mayas flottants en arrière-plan

**Palette de couleurs:**
- Fond: `#1a3a2e` → `#0d2818`
- Crépuscule: `rgba(255, 140, 0, 0.15)`
- Lucioles: `rgba(255, 255, 150, 0.9)`

**Animations principales:**
- Oiseaux: 35-50s traversée d'écran
- Lucioles: 6-9s flottement vertical
- Brume: 25s dérive latérale

---

### 3. ❄️ Runes Nordiques - Aurore Boréale
**Fichier:** `runes-animated-bg.css`
**Pages affectées:** 3 pages

**Éléments visuels:**
- Aurore boréale multicolore (vert, bleu, violet)
- Flocons de neige tombants (animation 25s)
- Montagnes enneigées en dégradé
- Forêt de sapins en silhouette
- Étoiles nordiques scintillantes
- Runes mystiques flottantes (ᚠ ᚢ ᚦ ᚨ ᚱ)
- Brume glacée au sol
- Lune nordique argentée avec halo

**Palette de couleurs:**
- Fond: `#2c3e50` → `#3d5a75`
- Aurore: `rgba(52, 235, 143, 0.15)` → `rgba(142, 68, 235, 0.15)`
- Lune: `#ffffff` → `#d0e8f2`

**Animations principales:**
- Aurore: 20s ondulation
- Flocons: 25s chute verticale
- Runes: 45-55s dérive rotative

---

### 4. ✡️ Gematria Hébraïque - Mystique Sacré
**Fichier:** `gematria-animated-bg.css`
**Pages affectées:** 4 pages

**Éléments visuels:**
- Lumière divine descendante (effet radial doré)
- Particules de lumière sacrée (8s pulse)
- Étoile de David géométrique en rotation (60s)
- Lettres hébraïques flottantes (א ב ג ד)
- Cercles de sagesse kabbalistique (3 instances)
- Arbre de vie stylisé en fond
- Menorah (chandelier à 7 branches) avec flammes scintillantes
- Étoiles mystiques dorées

**Palette de couleurs:**
- Fond: `#1a1a2e` → `#0f3460`
- Lumière divine: `rgba(255, 215, 0, 0.15)`
- Accents: `#ffd700`, `#ffeb3b`

**Animations principales:**
- Lumière divine: 12s pulsation
- Étoile de David: 60s rotation complète
- Menorah: 6s scintillement de flammes
- Lettres hébraïques: 40-50s flottement

---

## 🔧 Fichiers Techniques

### JavaScript Principal
**Fichier:** `theme-backgrounds.js`

**Fonctionnalités:**
- Détection automatique du type de page (via pathname)
- Application de la classe CSS appropriée (`hieroglyphes-theme`, `maya-theme`, etc.)
- Création dynamique des éléments HTML animés (étoiles, oiseaux, lucioles, etc.)
- Initialisation au chargement de la page (DOMContentLoaded)

**Logique de détection:**
```javascript
if (currentPage.includes('hieroglyphes')) → hieroglyphes-theme
if (currentPage.includes('maya')) → maya-theme
if (currentPage.includes('runes')) → runes-theme
if (currentPage.includes('gematria')) → gematria-theme
```

---

### Script d'Application Automatique
**Fichier:** `apply_themes.py`

**Utilisation:**
```bash
python apply_themes.py
```

**Actions:**
1. Parcourt tous les fichiers HTML correspondants
2. Ajoute le lien vers le CSS thématique approprié
3. Insère le script JavaScript `theme-backgrounds.js`
4. Affiche un rapport de progression

**Résultats:**
- 50 fichiers hiéroglyphes traités ✓
- 3 fichiers maya traités ✓
- 3 fichiers runes traités ✓
- 4 fichiers gematria traités ✓

---

## 📊 Statistiques

| Thème | Fichiers CSS | Lignes CSS | Pages | Animations |
|-------|--------------|------------|-------|------------|
| Hiéroglyphes | 1 | ~300 | 50+ | 6 |
| Maya | 1 | ~450 | 3 | 8 |
| Runes | 1 | ~380 | 3 | 7 |
| Gematria | 1 | ~420 | 4 | 9 |
| **Total** | **4** | **~1550** | **60+** | **30** |

---

## 🚀 Déploiement

### URL de production
**Site:** https://gematria-academy.pages.dev

### Vérification des fichiers déployés:
- ✅ https://gematria-academy.pages.dev/hieroglyphes-animated-bg.css
- ✅ https://gematria-academy.pages.dev/maya-animated-bg.css
- ✅ https://gematria-academy.pages.dev/runes-animated-bg.css
- ✅ https://gematria-academy.pages.dev/gematria-animated-bg.css
- ✅ https://gematria-academy.pages.dev/theme-backgrounds.js

### Pages exemples:
- 🌙 [Hiéroglyphes Débutant](https://gematria-academy.pages.dev/hieroglyphes-debutant.html)
- 🌴 [Maya Débutant](https://gematria-academy.pages.dev/maya-debutant.html)
- ❄️ [Runes Débutant](https://gematria-academy.pages.dev/runes-debutant.html)
- ✡️ [Gematria Débutant](https://gematria-academy.pages.dev/gematria-debutant.html)

---

## 🎨 Principes de Design

### Performance
- Utilisation de CSS purs (pas de bibliothèques externes)
- Animations GPU-accelerated (`transform`, `opacity`)
- Éléments en `position: fixed` pour optimisation
- `pointer-events: none` sur les éléments de décor

### Accessibilité
- Pas d'animations trop rapides ou clignotantes
- Opacité réduite pour les éléments de fond (0.05-0.3)
- Container principal avec `z-index: 10` pour garantir la lisibilité
- Backdrop-filter: blur pour améliorer le contraste

### Responsive
- Toutes les animations s'adaptent à la taille d'écran
- Utilisation de pourcentages et unités relatives
- Éléments SVG redimensionnables

---

## 🔄 Git & Versioning

### Commits principaux:
1. **a840b16** - Ajout des fonds animés thématiques (HTML + JS + Python)
2. Fichiers CSS déjà présents dans le dépôt

### Structure des fichiers:
```
D:/Apprentissage_Runes_Gematria/
├── hieroglyphes-animated-bg.css
├── maya-animated-bg.css
├── runes-animated-bg.css
├── gematria-animated-bg.css
├── theme-backgrounds.js
├── apply_themes.py
└── THEMES_ANIMES_README.md (ce fichier)
```

---

## 📝 Notes de Développement

### Technologies utilisées:
- CSS3 (animations, transforms, gradients)
- JavaScript ES6+ (modules, arrow functions)
- Python 3 (manipulation de fichiers)
- SVG inline (pour pyramides, montagnes, etc.)
- Unicode (hiéroglyphes, runes, lettres hébraïques)

### Compatibilité navigateurs:
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+

### Améliorations futures possibles:
- [ ] Mode d'accessibilité (réduire animations)
- [ ] Toggle day/night pour certains thèmes
- [ ] Effets parallax au scroll
- [ ] Sons d'ambiance (optionnel)
- [ ] Particules interactives au survol

---

## 👨‍💻 Auteur

Développé avec Claude Code pour Gematria Academy
Date: 29 Octobre 2025

---

## 📄 Licence

Tous droits réservés - Gematria Academy
