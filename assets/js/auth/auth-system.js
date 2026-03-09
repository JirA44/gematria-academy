/**
 * Gematria Academy — Auth System
 * Minimal local auth using localStorage.
 * Provides currentUser, login, logout, register.
 * © 2026 Académie des Sagesses
 */
(function () {
    'use strict';

    var STORAGE_KEY = 'gematria_user';
    var USERS_KEY   = 'gematria_users';

    /* ---- Internal helpers ---- */
    function loadUser() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (e) { return null; }
    }

    function saveUser(user) {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(user)); } catch (e) {}
    }

    function loadUsers() {
        try {
            var raw = localStorage.getItem(USERS_KEY);
            return raw ? JSON.parse(raw) : {};
        } catch (e) { return {}; }
    }

    function saveUsers(users) {
        try { localStorage.setItem(USERS_KEY, JSON.stringify(users)); } catch (e) {}
    }

    /* ---- Public API ---- */
    window.GematriaAuth = {

        /** Current logged-in user object (or null) */
        currentUser: loadUser(),

        /**
         * Register a new account.
         * @param {string} email
         * @param {string} password
         * @param {string} displayName
         * @returns {{ success: boolean, error?: string }}
         */
        register: function (email, password, displayName) {
            if (!email || !password) return { success: false, error: 'Email et mot de passe requis.' };
            var users = loadUsers();
            var key = email.toLowerCase().trim();
            if (users[key]) return { success: false, error: 'Ce compte existe déjà.' };

            var user = {
                uid: 'local_' + Date.now(),
                email: key,
                displayName: displayName || key.split('@')[0],
                createdAt: new Date().toISOString(),
                xp: 0,
                level: 1,
                completedModules: [],
            };

            users[key] = { password: password, profile: user }; // NOTE: no real hashing — local only
            saveUsers(users);
            saveUser(user);
            this.currentUser = user;
            this._notify(user);
            return { success: true, user: user };
        },

        /**
         * Sign in.
         * @param {string} email
         * @param {string} password
         * @returns {{ success: boolean, error?: string }}
         */
        login: function (email, password) {
            if (!email || !password) return { success: false, error: 'Email et mot de passe requis.' };
            var users = loadUsers();
            var key = email.toLowerCase().trim();
            var entry = users[key];
            if (!entry) return { success: false, error: 'Compte introuvable.' };
            if (entry.password !== password) return { success: false, error: 'Mot de passe incorrect.' };

            saveUser(entry.profile);
            this.currentUser = entry.profile;
            this._notify(entry.profile);
            return { success: true, user: entry.profile };
        },

        /** Sign out */
        logout: function () {
            try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
            this.currentUser = null;
            this._notify(null);
        },

        /** Update profile field */
        updateProfile: function (fields) {
            if (!this.currentUser) return;
            var users = loadUsers();
            var key = this.currentUser.email;
            Object.assign(this.currentUser, fields);
            if (users[key]) {
                Object.assign(users[key].profile, fields);
                saveUsers(users);
            }
            saveUser(this.currentUser);
        },

        /** Listen for auth state changes */
        onAuthStateChanged: function (callback) {
            this._listeners = this._listeners || [];
            this._listeners.push(callback);
            // Fire immediately with current state
            setTimeout(function () { callback(loadUser()); }, 0);
            return function () {}; // unsubscribe noop
        },

        _listeners: [],
        _notify: function (user) {
            var listeners = this._listeners || [];
            for (var i = 0; i < listeners.length; i++) {
                try { listeners[i](user); } catch (e) {}
            }
        },
    };

    /* ---- UI helpers ---- */

    /** Show/hide elements based on auth state */
    function applyAuthUI(user) {
        var loggedIn  = document.querySelectorAll('[data-auth="loggedin"]');
        var loggedOut = document.querySelectorAll('[data-auth="loggedout"]');
        var nameEls   = document.querySelectorAll('[data-auth-name]');

        for (var i = 0; i < loggedIn.length;  i++) loggedIn[i].style.display  = user ? ''     : 'none';
        for (var i = 0; i < loggedOut.length; i++) loggedOut[i].style.display = user ? 'none' : '';
        for (var i = 0; i < nameEls.length;   i++) nameEls[i].textContent = user ? user.displayName : '';
    }

    window.GematriaAuth.onAuthStateChanged(applyAuthUI);

    console.info('[Gematria] Auth system ready. User:', window.GematriaAuth.currentUser ? window.GematriaAuth.currentUser.email : 'none');
})();
