// Configuration Firebase pour Gematria Academy
// ============================================

const FIREBASE_CONFIG = {
    apiKey: 'AIzaSyDDZOR_c5XDZQWIlttbRRmWwLRxklwjHckQ',
    authDomain: 'gematria-academy.firebaseapp.com',
    projectId: 'gematria-academy',
    storageBucket: 'gematria-academy.firebasestorage.app',
    messagingSenderId: '1011899111393',
    appId: '1:1011899111393:web:e80808a15bcbd19f86a4a0',
    measurementId: 'G-1G1GYKPNLM'
};

function isFirebaseConfigured() {
    return FIREBASE_CONFIG.apiKey && FIREBASE_CONFIG.apiKey.startsWith('AIza');
}

window.FIREBASE_CONFIG = FIREBASE_CONFIG;
window.isFirebaseConfigured = isFirebaseConfigured;
console.log('🔥 Firebase configuré: gematria-academy');
