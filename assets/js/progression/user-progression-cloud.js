/**
 * Gematria Academy — User Progression Cloud Sync (Stub)
 * No remote backend is active. All data stays in localStorage.
 * This stub exposes the same API so pages don't break.
 * © 2026 Académie des Sagesses
 */
(function () {
    'use strict';

    /**
     * CloudSync — no-op wrapper around GematriaProgression.
     * If a real Firestore / Supabase backend is added later,
     * replace the stub methods below with actual API calls.
     */
    window.GematriaCloudSync = {

        /** Sync local progression to cloud (no-op). */
        push: function () {
            return Promise.resolve({ success: false, reason: 'no-backend' });
        },

        /** Pull progression from cloud (no-op). */
        pull: function () {
            return Promise.resolve({ success: false, reason: 'no-backend' });
        },

        /**
         * Save user profile to cloud.
         * @param {object} profile
         */
        saveProfile: function (profile) {
            // Store locally as fallback
            try { localStorage.setItem('gematria_cloud_profile', JSON.stringify(profile)); } catch (e) {}
            return Promise.resolve({ success: true, local: true });
        },

        /**
         * Load user profile.
         * @returns {Promise<object|null>}
         */
        loadProfile: function () {
            try {
                var raw = localStorage.getItem('gematria_cloud_profile');
                return Promise.resolve(raw ? JSON.parse(raw) : null);
            } catch (e) {
                return Promise.resolve(null);
            }
        },

        /**
         * Log an event (analytics placeholder).
         * @param {string} eventName
         * @param {object} [params]
         */
        logEvent: function (eventName, params) {
            // Noop in stub mode
            console.debug('[GematriaCloud] event:', eventName, params || '');
        },

        isOnline: false,
        mode: 'local',
    };

    console.info('[Gematria] Cloud sync: stub mode (local only).');
})();
