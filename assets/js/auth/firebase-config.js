// Configuration Firebase pour Gematria Academy
// ============================================

const FIREBASE_CONFIG = {
    apiKey: 'AIzaSyCQLs54rYN06SjYBov9_m5tKMs8n6g59lE',
    authDomain: 'gematria-academy-ed04c.firebaseapp.com',
    projectId: 'gematria-academy-ed04c',
    storageBucket: 'gematria-academy-ed04c.firebasestorage.app',
    messagingSenderId: '501573363898',
    appId: '1:501573363898:web:d557c2ce973e0fcdcefa83',
    measurementId: 'G-T655YX66NQ'
};

function isFirebaseConfigured() {
    return FIREBASE_CONFIG.apiKey && FIREBASE_CONFIG.apiKey.startsWith('AIza');
}

window.FIREBASE_CONFIG = FIREBASE_CONFIG;
window.isFirebaseConfigured = isFirebaseConfigured;
console.log('🔥 Firebase configuré: gematria-academy-ed04c');
