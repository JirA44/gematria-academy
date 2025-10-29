// Initialisation automatique des fonds thématiques animés
(function() {
    'use strict';

    // Détecter le type de page et appliquer le thème correspondant
    function detectAndApplyTheme() {
        const currentPage = window.location.pathname;
        const body = document.body;

        // Thème Hiéroglyphes - Nuit étoilée égyptienne
        if (currentPage.includes('hieroglyphes') || currentPage.includes('hieroglyph')) {
            body.classList.add('hieroglyphes-theme');
            createHieroglyphesElements();
        }
        // Thème Maya - Jungle avec pyramides
        else if (currentPage.includes('maya')) {
            body.classList.add('maya-theme');
            createMayaElements();
        }
        // Thème Runes - Aurore boréale nordique
        else if (currentPage.includes('runes')) {
            body.classList.add('runes-theme');
            createRunesElements();
        }
        // Thème Gematria - Mystique hébreu
        else if (currentPage.includes('gematria') || currentPage.includes('hebreu')) {
            body.classList.add('gematria-theme');
            createGematriaElements();
        }
    }

    // Créer les éléments animés pour le thème hiéroglyphes
    function createHieroglyphesElements() {
        // Constellation
        const constellation = document.createElement('div');
        constellation.className = 'constellation';
        document.body.appendChild(constellation);

        // Lune égyptienne
        const moon = document.createElement('div');
        moon.className = 'egyptian-moon';
        document.body.appendChild(moon);

        // Voie lactée
        const milkyWay = document.createElement('div');
        milkyWay.className = 'milky-way';
        document.body.appendChild(milkyWay);

        // Silhouettes de pyramides
        const pyramids = document.createElement('div');
        pyramids.className = 'pyramids-silhouette';
        document.body.appendChild(pyramids);
    }

    // Créer les éléments animés pour le thème maya
    function createMayaElements() {
        // Feuillage de jungle
        const jungle = document.createElement('div');
        jungle.className = 'jungle-foreground';
        document.body.appendChild(jungle);

        // Pyramides maya
        const pyramids = document.createElement('div');
        pyramids.className = 'maya-pyramids';
        document.body.appendChild(pyramids);

        // Oiseaux tropicaux
        const birdsContainer = document.createElement('div');
        birdsContainer.className = 'tropical-birds';
        for (let i = 1; i <= 3; i++) {
            const bird = document.createElement('div');
            bird.className = 'bird';
            bird.textContent = '🦜';
            birdsContainer.appendChild(bird);
        }
        document.body.appendChild(birdsContainer);

        // Lucioles
        const firefliesContainer = document.createElement('div');
        firefliesContainer.className = 'fireflies';
        for (let i = 1; i <= 5; i++) {
            const firefly = document.createElement('div');
            firefly.className = 'firefly';
            firefliesContainer.appendChild(firefly);
        }
        document.body.appendChild(firefliesContainer);

        // Brume de jungle
        const mist = document.createElement('div');
        mist.className = 'jungle-mist';
        document.body.appendChild(mist);

        // Soleil/Lune maya
        const celestial = document.createElement('div');
        celestial.className = 'maya-celestial';
        document.body.appendChild(celestial);

        // Glyphes flottants
        const glyphsContainer = document.createElement('div');
        glyphsContainer.className = 'maya-glyphs';
        const mayaGlyphs = ['𝌀', '𝋰', '𝋡'];
        mayaGlyphs.forEach((glyph, i) => {
            const glyphEl = document.createElement('div');
            glyphEl.className = 'glyph';
            glyphEl.textContent = glyph;
            glyphsContainer.appendChild(glyphEl);
        });
        document.body.appendChild(glyphsContainer);
    }

    // Créer les éléments animés pour le thème runes
    function createRunesElements() {
        // Montagnes enneigées
        const mountains = document.createElement('div');
        mountains.className = 'nordic-mountains';
        document.body.appendChild(mountains);

        // Sapins
        const trees = document.createElement('div');
        trees.className = 'nordic-trees';
        document.body.appendChild(trees);

        // Étoiles
        const stars = document.createElement('div');
        stars.className = 'nordic-stars';
        document.body.appendChild(stars);

        // Runes flottantes
        const runesContainer = document.createElement('div');
        runesContainer.className = 'floating-runes';
        const runeSymbols = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ'];
        runeSymbols.slice(0, 3).forEach((rune, i) => {
            const runeEl = document.createElement('div');
            runeEl.className = 'floating-rune';
            runeEl.textContent = rune;
            runesContainer.appendChild(runeEl);
        });
        document.body.appendChild(runesContainer);

        // Brume glacée
        const mist = document.createElement('div');
        mist.className = 'icy-mist';
        document.body.appendChild(mist);

        // Lune nordique
        const moon = document.createElement('div');
        moon.className = 'nordic-moon';
        document.body.appendChild(moon);
    }

    // Créer les éléments animés pour le thème gematria
    function createGematriaElements() {
        // Étoile de David
        const star = document.createElement('div');
        star.className = 'star-of-david';
        document.body.appendChild(star);

        // Lettres hébraïques flottantes
        const lettersContainer = document.createElement('div');
        lettersContainer.className = 'hebrew-letters';
        const hebrewLetters = ['א', 'ב', 'ג', 'ד'];
        hebrewLetters.forEach((letter, i) => {
            const letterEl = document.createElement('div');
            letterEl.className = 'hebrew-letter';
            letterEl.textContent = letter;
            lettersContainer.appendChild(letterEl);
        });
        document.body.appendChild(lettersContainer);

        // Cercles de sagesse
        const circlesContainer = document.createElement('div');
        circlesContainer.className = 'wisdom-circles';
        for (let i = 1; i <= 3; i++) {
            const circle = document.createElement('div');
            circle.className = 'wisdom-circle';
            circlesContainer.appendChild(circle);
        }
        document.body.appendChild(circlesContainer);

        // Arbre de vie
        const tree = document.createElement('div');
        tree.className = 'tree-of-life';
        document.body.appendChild(tree);

        // Menorah
        const menorah = document.createElement('div');
        menorah.className = 'menorah-glow';
        document.body.appendChild(menorah);

        // Étoiles mystiques
        const stars = document.createElement('div');
        stars.className = 'mystical-stars';
        document.body.appendChild(stars);
    }

    // Initialiser au chargement de la page
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', detectAndApplyTheme);
    } else {
        detectAndApplyTheme();
    }

})();
