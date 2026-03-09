/**
 * Gematria Academy — Progression System
 * XP, levels, module completion, badges — all in localStorage.
 * © 2026 Académie des Sagesses
 */
(function () {
    'use strict';

    var STORAGE_KEY = 'gematria_progression';

    /* ---- XP thresholds per level ---- */
    var LEVEL_THRESHOLDS = [0, 100, 250, 500, 900, 1500, 2300, 3400, 5000, 7000, 10000];

    function levelFromXP(xp) {
        for (var i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
            if (xp >= LEVEL_THRESHOLDS[i]) return i + 1;
        }
        return 1;
    }

    /* ---- Load / save ---- */
    function load() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            if (raw) return JSON.parse(raw);
        } catch (e) {}
        return {
            xp: 0,
            level: 1,
            completedModules: [],
            badges: [],
            history: [],
        };
    }

    function save(data) {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) {}
    }

    /* ---- Public API ---- */
    var GematriaProgression = {

        /** Get current progression data */
        getData: function () { return load(); },

        /**
         * Add XP and update level.
         * @param {number} amount - XP to add (positive integer)
         * @param {string} [reason] - Optional label for history
         * @returns {{ xp: number, level: number, leveledUp: boolean }}
         */
        addXP: function (amount, reason) {
            if (!amount || amount <= 0) return;
            var data = load();
            var prevLevel = data.level;
            data.xp += amount;
            data.level = levelFromXP(data.xp);
            data.history = data.history || [];
            data.history.push({
                date: new Date().toISOString(),
                xp: amount,
                reason: reason || 'Action',
                totalXP: data.xp,
            });
            // Keep last 100 history entries
            if (data.history.length > 100) data.history = data.history.slice(-100);
            save(data);

            var leveledUp = data.level > prevLevel;

            // Update any XP display on the page
            GematriaProgression._updateUI(data);

            if (leveledUp) {
                GematriaProgression._showLevelUp(data.level);
            }

            return { xp: data.xp, level: data.level, leveledUp: leveledUp };
        },

        /**
         * Mark a module as completed.
         * @param {string} moduleId - Unique module identifier
         * @param {number} [xpReward] - XP awarded (default 50)
         */
        completeModule: function (moduleId, xpReward) {
            if (!moduleId) return;
            var data = load();
            data.completedModules = data.completedModules || [];
            if (data.completedModules.indexOf(moduleId) === -1) {
                data.completedModules.push(moduleId);
                save(data);
                var reward = xpReward || 50;
                GematriaProgression.addXP(reward, 'Module complété : ' + moduleId);
            }
        },

        /**
         * Check if a module is completed.
         * @param {string} moduleId
         * @returns {boolean}
         */
        isCompleted: function (moduleId) {
            var data = load();
            return (data.completedModules || []).indexOf(moduleId) !== -1;
        },

        /**
         * Award a badge.
         * @param {string} badgeId
         * @param {string} [label]
         */
        awardBadge: function (badgeId, label) {
            if (!badgeId) return;
            var data = load();
            data.badges = data.badges || [];
            var existing = data.badges.find(function (b) { return b.id === badgeId; });
            if (!existing) {
                data.badges.push({ id: badgeId, label: label || badgeId, date: new Date().toISOString() });
                save(data);
                GematriaProgression._showBadge(label || badgeId);
            }
        },

        /** XP needed to reach next level */
        xpToNextLevel: function () {
            var data = load();
            var nextIdx = data.level; // 0-indexed threshold for level+1
            if (nextIdx >= LEVEL_THRESHOLDS.length) return 0;
            return LEVEL_THRESHOLDS[nextIdx] - data.xp;
        },

        /**
         * Mark a domain level as completed and unlock the next.
         * domain: 'astronomie' | 'cognitif' | 'logique' | 'runes' | 'gematria' | 'hieroglyphes' | 'maya'
         * levelName: 'debutant' | 'intermediaire' | 'expert'
         * xpReward: optional (default 100 for debutant, 200 for intermediaire, 400 for expert)
         */
        completeDomainLevel: function(domain, levelName, xpReward) {
            if (!domain || !levelName) return;
            var data = load();
            data.domainMastery = data.domainMastery || {};
            data.domainMastery[domain] = data.domainMastery[domain] || { completedLevels: [] };
            var dm = data.domainMastery[domain];
            dm.completedLevels = dm.completedLevels || [];

            if (dm.completedLevels.indexOf(levelName) !== -1) return; // already done

            dm.completedLevels.push(levelName);

            // Compute mastery level (0=none, 1=debutant, 2=intermediaire, 3=expert, 4=maitre)
            var ORDER = ['debutant', 'intermediaire', 'expert'];
            var allDone = ORDER.every(function(l) { return dm.completedLevels.indexOf(l) !== -1; });
            if (allDone) dm.masteryLevel = 4; // maitre
            else dm.masteryLevel = dm.completedLevels.length;

            save(data);

            var defaultXP = { debutant: 100, intermediaire: 200, expert: 400 };
            var reward = xpReward || defaultXP[levelName] || 100;
            GematriaProgression.addXP(reward, 'Niveau ' + levelName + ' complété : ' + domain);

            // Show domain level toast
            GematriaProgression._showDomainLevelUp(domain, levelName, allDone);

            // Badge for maitre
            if (allDone) {
                GematriaProgression.awardBadge('maitre_' + domain, 'Maître ' + domain);
            }
        },

        /**
         * Get mastery data for a domain
         * Returns { masteryLevel: 0-4, completedLevels: [], masteryLabel: string }
         */
        getDomainMastery: function(domain) {
            var data = load();
            var dm = (data.domainMastery || {})[domain] || { completedLevels: [], masteryLevel: 0 };
            var LABELS = ['Novice', 'Débutant', 'Intermédiaire', 'Expert', 'Maître'];
            return {
                masteryLevel: dm.masteryLevel || 0,
                completedLevels: dm.completedLevels || [],
                masteryLabel: LABELS[dm.masteryLevel || 0]
            };
        },

        /** Get all domain mastery data */
        getAllDomainMastery: function() {
            var data = load();
            return data.domainMastery || {};
        },

        _showDomainLevelUp: function(domain, levelName, isMaitre) {
            var msg = isMaitre
                ? '👑 Maître ' + domain + ' !'
                : '🎯 ' + domain + ' — niveau ' + levelName + ' validé !';
            var toast = document.createElement('div');
            toast.style.cssText = [
                'position:fixed','top:5rem','right:1.5rem','z-index:9999',
                'background:linear-gradient(135deg,#00c853,#1b5e20)',
                'color:#fff','padding:1rem 1.8rem','border-radius:15px',
                'font-weight:700','font-size:1rem',
                'box-shadow:0 8px 25px rgba(0,200,83,0.5)',
                'animation:gematria-toast-in 0.4s ease'
            ].join(';');
            toast.textContent = msg;
            document.body.appendChild(toast);
            setTimeout(function() {
                toast.style.opacity = '0'; toast.style.transition = 'opacity 0.5s';
                setTimeout(function() { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 600);
            }, 4000);
        },

        /* ---- UI helpers (internal) ---- */
        _updateUI: function (data) {
            var xpEls    = document.querySelectorAll('[data-xp]');
            var levelEls = document.querySelectorAll('[data-level]');
            for (var i = 0; i < xpEls.length;    i++) xpEls[i].textContent    = data.xp;
            for (var i = 0; i < levelEls.length;  i++) levelEls[i].textContent = data.level;

            // Progress bar if present
            var bar = document.querySelector('[data-xp-bar]');
            if (bar) {
                var nextIdx = data.level;
                var current = LEVEL_THRESHOLDS[data.level - 1] || 0;
                var next    = LEVEL_THRESHOLDS[nextIdx] || data.xp;
                var pct = next > current ? ((data.xp - current) / (next - current)) * 100 : 100;
                bar.style.width = Math.min(100, pct) + '%';
            }
        },

        _showLevelUp: function (newLevel) {
            var toast = document.createElement('div');
            toast.style.cssText = [
                'position:fixed', 'bottom:2rem', 'right:2rem', 'z-index:9999',
                'background:linear-gradient(135deg,#ffd700,#ff8c00)',
                'color:#1a1a2e', 'padding:1.2rem 2rem', 'border-radius:15px',
                'font-weight:700', 'font-size:1.1rem',
                'box-shadow:0 8px 25px rgba(255,215,0,0.5)',
                'animation:gematria-toast-in 0.4s ease',
            ].join(';');
            toast.textContent = '⬆️ Niveau ' + newLevel + ' atteint !';
            document.body.appendChild(toast);
            setTimeout(function () {
                toast.style.opacity = '0';
                toast.style.transition = 'opacity 0.5s';
                setTimeout(function () { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 600);
            }, 3000);
        },

        _showBadge: function (label) {
            var toast = document.createElement('div');
            toast.style.cssText = [
                'position:fixed', 'bottom:2rem', 'right:2rem', 'z-index:9999',
                'background:linear-gradient(135deg,#8a2be2,#5a0db4)',
                'color:#fff', 'padding:1rem 1.8rem', 'border-radius:15px',
                'font-weight:600', 'font-size:1rem',
                'box-shadow:0 8px 25px rgba(138,43,226,0.5)',
            ].join(';');
            toast.textContent = '🏅 Badge : ' + label;
            document.body.appendChild(toast);
            setTimeout(function () {
                toast.style.opacity = '0';
                toast.style.transition = 'opacity 0.5s';
                setTimeout(function () { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 600);
            }, 3000);
        },
    };

    /* ---- Toast keyframe injection ---- */
    var styleEl = document.createElement('style');
    styleEl.textContent = '@keyframes gematria-toast-in{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}';
    document.head.appendChild(styleEl);

    /* ---- Expose globally ---- */
    window.GematriaProgression = GematriaProgression;

    /* ---- Convenience shorthand (pages call addXP directly) ---- */
    window.addXP = function (amount, reason) {
        return GematriaProgression.addXP(amount, reason);
    };

    /* ---- Init: update UI on load ---- */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            GematriaProgression._updateUI(load());
        });
    } else {
        GematriaProgression._updateUI(load());
    }

    console.info('[Gematria] Progression system ready. XP:', load().xp, '| Level:', load().level);
})();
