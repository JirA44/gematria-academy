/**
 * Gematria Academy — Animated Background
 * Generates floating particles and shooting stars
 * © 2026 Académie des Sagesses
 */
(function () {
    'use strict';

    /* ---- Config ---- */
    var CONFIG = {
        particles: 18,
        particleColors: [
            'rgba(100, 181, 246, 0.45)',
            'rgba(138,  43, 226, 0.35)',
            'rgba(255, 215,   0, 0.25)',
            'rgba( 78, 205, 196, 0.35)',
            'rgba(255, 255, 255, 0.2)',
        ],
        shootingStarInterval: 8000, // ms between shooting stars
        nebulae: true,
    };

    /* ---- Helpers ---- */
    function rand(min, max) {
        return Math.random() * (max - min) + min;
    }

    function pick(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    /* ---- Nebula glows ---- */
    function addNebulae() {
        if (!CONFIG.nebulae) return;
        var count = 3;
        for (var i = 0; i < count; i++) {
            var el = document.createElement('div');
            el.className = 'nebula-bg nebula-' + (i + 1);
            document.body.appendChild(el);
        }
    }

    /* ---- Floating particles ---- */
    function createParticle() {
        var el = document.createElement('div');
        el.className = 'particle';
        var size = rand(2, 6);
        var duration = rand(18, 35);
        var delay = rand(0, 10);
        el.style.cssText = [
            'width:' + size + 'px',
            'height:' + size + 'px',
            'left:' + rand(0, 100) + '%',
            'bottom:-20px',
            'background:' + pick(CONFIG.particleColors),
            'animation-duration:' + duration + 's',
            'animation-delay:' + delay + 's',
        ].join(';');
        document.body.appendChild(el);

        // Remove when animation ends
        setTimeout(function () {
            if (el.parentNode) el.parentNode.removeChild(el);
            // Respawn
            createParticle();
        }, (duration + delay) * 1000);
    }

    /* ---- Shooting stars ---- */
    function launchShootingStar() {
        var el = document.createElement('div');
        el.className = 'shooting-star';
        el.style.top = rand(5, 50) + '%';
        el.style.animationDuration = rand(1.2, 2.5) + 's';
        el.style.width = rand(60, 160) + 'px';
        document.body.appendChild(el);
        setTimeout(function () {
            if (el.parentNode) el.parentNode.removeChild(el);
        }, 3000);
    }

    /* ---- Stars overlay ---- */
    function addStarsOverlay() {
        var el = document.createElement('div');
        el.className = 'stars-overlay';
        document.body.insertBefore(el, document.body.firstChild);
    }

    /* ---- Init ---- */
    function init() {
        addStarsOverlay();
        addNebulae();

        // Spawn initial particles
        for (var i = 0; i < CONFIG.particles; i++) {
            (function (delay) {
                setTimeout(createParticle, delay);
            })(i * 400);
        }

        // Periodic shooting stars
        setInterval(launchShootingStar, CONFIG.shootingStarInterval);
        // First one sooner
        setTimeout(launchShootingStar, 2000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
