// Configuration Firebase pour Gematria Academy
// ============================================
// Pour configurer votre propre Firebase:
// 1. Aller sur console.firebase.google.com
// 2. Créer un projet "gematria-academy"
// 3. Activer Authentication > Email/Password + Google
// 4. Remplacer les credentials ci-dessous

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyD_VOTRE_CLE_API",
    authDomain: "gematria-academy.firebaseapp.com",
    projectId: "gematria-academy",
    storageBucket: "gematria-academy.appspot.com",
    messagingSenderId: "VOTRE_SENDER_ID",
    appId: "VOTRE_APP_ID"
};

// Vérifier si Firebase est configuré
function isFirebaseConfigured() {
    return FIREBASE_CONFIG.apiKey && !FIREBASE_CONFIG.apiKey.includes('VOTRE_CLE');
}

window.FIREBASE_CONFIG = FIREBASE_CONFIG;
window.isFirebaseConfigured = isFirebaseConfigured;
console.log('🔥 Firebase config chargé');
