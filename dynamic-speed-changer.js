/**
 * CHANGEUR DE VITESSE AUTOMATIQUE
 * Les animations changent de vitesse de manière fluide et automatique
 */

class DynamicSpeedChanger {
    constructor() {
        this.sections = [
            { selector: '.hero::before', baseSpeed: 25, variance: 15 },
            { selector: '.hero::after', baseSpeed: 120, variance: 60 },
            { selector: '#runes::before', baseSpeed: 20, variance: 10 },
            { selector: '#runes::after', baseSpeed: 18, variance: 12 },
            { selector: '#gematria::before', baseSpeed: 45, variance: 25 },
            { selector: '#gematria::after', baseSpeed: 16, variance: 10 },
            { selector: '#logique::before', baseSpeed: 30, variance: 15 },
            { selector: '#logique::after', baseSpeed: 22, variance: 12 },
            { selector: '#mandala::before', baseSpeed: 35, variance: 20 },
            { selector: '#mandala::after', baseSpeed: 14, variance: 8 },
            { selector: '#hieroglyphes::before', baseSpeed: 40, variance: 20 },
            { selector: '#hieroglyphes::after', baseSpeed: 50, variance: 30 },
            { selector: '#maya::before', baseSpeed: 48, variance: 24 },
            { selector: '#maya::after', baseSpeed: 24, variance: 14 },
            { selector: '.tools::before', baseSpeed: 28, variance: 14 }
        ];

        this.styleSheet = this.createStyleSheet();
        this.init();
    }

    createStyleSheet() {
        const style = document.createElement('style');
        style.id = 'dynamic-speed-styles';
        document.head.appendChild(style);
        return style.sheet;
    }

    getRandomSpeed(base, variance) {
        // Génère une vitesse aléatoire autour de la base
        const min = base - variance;
        const max = base + variance;
        return Math.random() * (max - min) + min;
    }

    getRandomTimingFunction() {
        const functions = [
            'ease-in-out',
            'ease-in',
            'ease-out',
            'cubic-bezier(0.42, 0, 0.58, 1)',
            'cubic-bezier(0.34, 1.56, 0.64, 1)',
            'cubic-bezier(0.45, 0.05, 0.55, 0.95)',
            'cubic-bezier(0.65, 0, 0.35, 1)',
            'cubic-bezier(0.4, 0.2, 0.6, 0.8)',
            'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        ];
        return functions[Math.floor(Math.random() * functions.length)];
    }

    updateSpeed(selector, animationName, duration, timingFunction) {
        // Créer une nouvelle règle CSS pour l'animation
        const rule = `
            ${selector} {
                animation-duration: ${duration}s !important;
                animation-timing-function: ${timingFunction} !important;
                transition: animation-duration 3s ease-in-out;
            }
        `;

        // Ajouter la règle
        try {
            // Supprimer les anciennes règles pour ce sélecteur
            for (let i = this.styleSheet.cssRules.length - 1; i >= 0; i--) {
                if (this.styleSheet.cssRules[i].selectorText === selector) {
                    this.styleSheet.deleteRule(i);
                }
            }

            // Ajouter la nouvelle règle
            this.styleSheet.insertRule(rule, this.styleSheet.cssRules.length);
        } catch (e) {
            console.warn('Could not update animation for:', selector);
        }
    }

    changeAllSpeeds() {
        this.sections.forEach(section => {
            const newSpeed = this.getRandomSpeed(section.baseSpeed, section.variance);
            const newTiming = this.getRandomTimingFunction();
            this.updateSpeed(section.selector, '', newSpeed, newTiming);
        });

        console.log('🎨 Vitesses d\'animation mises à jour');
    }

    startAutoChange() {
        // Change les vitesses toutes les 8-15 secondes (aléatoire)
        const changeSpeed = () => {
            this.changeAllSpeeds();

            // Planifier le prochain changement avec un délai aléatoire
            const nextChange = Math.random() * 7000 + 8000; // 8-15 secondes
            setTimeout(changeSpeed, nextChange);
        };

        // Premier changement après 3 secondes
        setTimeout(changeSpeed, 3000);
    }

    init() {
        console.log('🚀 Dynamic Speed Changer initialisé');
        console.log('✨ Les vitesses d\'animation vont changer automatiquement');

        // Démarre le changement automatique
        this.startAutoChange();

        // Ajoute aussi des changements sur scroll
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                // 30% de chance de changer les vitesses au scroll
                if (Math.random() < 0.3) {
                    this.changeAllSpeeds();
                }
            }, 500);
        });
    }
}

// Initialiser quand le DOM est prêt
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.dynamicSpeedChanger = new DynamicSpeedChanger();
    });
} else {
    window.dynamicSpeedChanger = new DynamicSpeedChanger();
}
