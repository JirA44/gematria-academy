# Instructions pour ajouter le mode nuit aux pages

## Problème détecté
Les pages suivantes n'ont PAS le bouton mode nuit et le script JavaScript:
- runes-debutant.html
- runes-intermediaire.html
- runes-expert.html
- gematria-debutant.html
- gematria-intermediaire.html
- gematria-expert.html

## Solution

### 1. Ajouter le bouton dans le `<header>`

Après la balise `<header>`, ajouter:
```html
<button class="dark-mode-toggle" onclick="toggleDarkMode()">🌙 Mode Nuit</button>
```

### 2. Ajouter le script JavaScript avant `</body>`

Avant la balise `</body>`, ajouter:
```html
<script>
    // Mode Nuit
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        const btn = document.querySelector('.dark-mode-toggle');
        btn.textContent = isDark ? '☀️ Mode Jour' : '🌙 Mode Nuit';
    }

    // Charger la préférence au démarrage
    window.addEventListener('DOMContentLoaded', () => {
        const isDark = localStorage.getItem('darkMode') === 'true';
        if (isDark) {
            document.body.classList.add('dark-mode');
            const btn = document.querySelector('.dark-mode-toggle');
            if (btn) btn.textContent = '☀️ Mode Jour';
        }
    });
</script>
```

## Backgrounds blancs à corriger dans style.css

Le fichier `style.css` contient déjà les bonnes variables CSS:
- `.content-page` utilise `var(--card-bg)` ✓
- `.rune-card, .letter-card` utilisent `var(--card-bg)` ✓
- `.lesson` utilise `var(--bg-light)` ✓
- `.tool-card` utilise `var(--bg-light)` ✓

## Styles inline à vérifier

Vérifier dans les fichiers HTML s'il y a des styles inline avec `background: white` ou `background: #fff`:

```bash
grep -n "style.*background.*white" *.html
grep -n "style.*background.*#fff" *.html
```

Si trouvés, les remplacer par des classes CSS ou des variables.

## Test final

1. Fermer toutes les pages du navigateur
2. Ouvrir chaque page
3. Cliquer sur le bouton mode nuit
4. Vérifier qu'il n'y a AUCUN fond blanc
5. La préférence doit être sauvegardée (rafraîchir la page pour tester)

## Pages qui ONT déjà le mode nuit
✓ index.html
✓ index_multilingual.html
✓ logique-debutant.html
✓ logique-intermediaire.html
✓ logique-expert.html
✓ exercices-logique.html
✓ alphabet-hebreu.html
✓ alphabet-runes.html
✓ calculateur-gematria.html
✓ tirage-runes.html
