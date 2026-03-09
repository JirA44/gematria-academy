/**
 * Gematria Academy — Firebase Config Stub
 * Firebase integration is not active in this deployment.
 * Auth is handled locally via auth-system.js.
 * © 2026 Académie des Sagesses
 */
(function () {
    'use strict';

    // Stub — no Firebase SDK loaded.
    // Provides a no-op firebase namespace so pages referencing
    // firebase.* don't throw ReferenceError.

    if (typeof window.firebase === 'undefined') {
        window.firebase = {
            apps: [],
            app: function () { return null; },
            auth: function () {
                return {
                    currentUser: null,
                    onAuthStateChanged: function (cb) { cb(null); return function () {}; },
                    signInWithEmailAndPassword: function () {
                        return Promise.resolve({ user: null });
                    },
                    createUserWithEmailAndPassword: function () {
                        return Promise.resolve({ user: null });
                    },
                    signOut: function () { return Promise.resolve(); },
                };
            },
            firestore: function () {
                return {
                    collection: function () {
                        return {
                            doc: function () {
                                return {
                                    get: function () { return Promise.resolve({ exists: false, data: function () { return {}; } }); },
                                    set: function () { return Promise.resolve(); },
                                    update: function () { return Promise.resolve(); },
                                };
                            },
                        };
                    },
                };
            },
        };
    }

    console.info('[Gematria] Firebase config: stub mode (no remote DB). Using localStorage.');
})();
