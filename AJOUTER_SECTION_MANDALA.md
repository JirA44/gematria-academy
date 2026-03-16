# Comment ajouter la section Mandala à la page d'accueil

## 1. Ouvrir le fichier `index_multilingual.html`

## 2. Trouver la ligne 188 (juste avant `<section class="tools">`)

## 3. Insérer ce code :

```html
        <section id="mandala" class="section-category">
            <h2 data-i18n="mandala_title">🕉️ Mandalas Sacrés</h2>
            <p class="intro" data-i18n="mandala_intro">Les mandalas sont des représentations géométriques de l'univers, utilisés depuis des millénaires dans les traditions bouddhistes et hindoues. La contemplation profonde d'un mandala, sans mots ni pensées, permet d'accéder au silence intérieur et à la paix de l'esprit.</p>

            <div class="level-cards">
                <div class="card beginner" style="width: 100%; max-width: none;">
                    <div class="card-header">
                        <h3 data-i18n="mandala_contemplation">🧘 Contemplation Profonde</h3>
                        <span class="badge" data-i18n="badge_meditation">Méditation</span>
                    </div>
                    <ul data-section="mandala-practice">
                        <li data-i18n="mandala_1">Galerie plein écran immersive</li>
                        <li data-i18n="mandala_2">Sans mots, sans pensées</li>
                        <li data-i18n="mandala_3">Silence intérieur et concentration</li>
                        <li data-i18n="mandala_4">Navigation intuitive entre vos mandalas</li>
                        <li data-i18n="mandala_5">Uploadez vos images personnelles</li>
                    </ul>
                    <a href="mandala.html" class="btn btn-beginner" data-i18n="btn_contemplate">Contempler →</a>
                </div>
            </div>
        </section>
```

## 4. Ajouter les traductions dans l'objet `translations` (vers ligne 268)

### Dans la section `fr:` :
```javascript
mandala_title: "🕉️ Mandalas Sacrés",
mandala_intro: "Les mandalas sont des représentations géométriques de l'univers, utilisés depuis des millénaires dans les traditions bouddhistes et hindoues. La contemplation profonde d'un mandala, sans mots ni pensées, permet d'accéder au silence intérieur et à la paix de l'esprit.",
mandala_contemplation: "🧘 Contemplation Profonde",
badge_meditation: "Méditation",
mandala_1: "Galerie plein écran immersive",
mandala_2: "Sans mots, sans pensées",
mandala_3: "Silence intérieur et concentration",
mandala_4: "Navigation intuitive entre vos mandalas",
mandala_5: "Uploadez vos images personnelles",
btn_contemplate: "Contempler →",
```

### Dans la section `en:` :
```javascript
mandala_title: "🕉️ Sacred Mandalas",
mandala_intro: "Mandalas are geometric representations of the universe, used for millennia in Buddhist and Hindu traditions. Deep contemplation of a mandala, without words or thoughts, allows access to inner silence and peace of mind.",
mandala_contemplation: "🧘 Deep Contemplation",
badge_meditation: "Meditation",
mandala_1: "Immersive full-screen gallery",
mandala_2: "Without words, without thoughts",
mandala_3: "Inner silence and concentration",
mandala_4: "Intuitive navigation between your mandalas",
mandala_5: "Upload your personal images",
btn_contemplate: "Contemplate →",
```

## 5. Ajouter un lien dans la navigation (ligne 24)

Remplacer :
```html
            <a href="#logique" data-i18n="nav_logic">Logique</a>
```

Par :
```html
            <a href="#logique" data-i18n="nav_logic">Logique</a>
            <a href="#mandala" data-i18n="nav_mandala">Mandala</a>
```

Et ajouter dans les traductions :
```javascript
nav_mandala: "Mandala",  // pour fr
nav_mandala: "Mandala",  // pour en
```

---

## ✅ Modifications déjà effectuées

La page **mandala.html** a déjà été créée avec :
- ✅ Mandalas étirés en PLEIN ÉCRAN (100vw x 100vh)
- ✅ Écran d'introduction avec le message "Contemplation profonde / Sans mots / Sans pensées / Silence intérieur"
- ✅ Navigation silencieuse (flèches ‹ › et touches clavier)
- ✅ Aucun mot dans l'interface principale
- ✅ Upload d'images personnelles
- ✅ Boucle infinie entre les mandalas
