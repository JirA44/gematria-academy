/**
 * CONFIGURATION FIREBASE - Académie Gématria
 *
 * INSTRUCTIONS POUR CONFIGURER:
 *
 * 1. Aller sur https://console.firebase.google.com/
 * 2. Créer un nouveau projet "Gematria Academy"
 * 3. Activer Authentication (Email/Password, Google, GitHub)
 * 4. Créer une app Web
 * 5. Copier la configuration ci-dessous
 * 6. Activer Firestore Database
 * 7. Configurer les règles de sécurité (voir firebase-rules.txt)
 */

// TODO: Remplacer par vos vraies credentials Firebase
const firebaseConfig = {
    apiKey: "VOTRE_API_KEY",
    authDomain: "gematria-academy.firebaseapp.com",
    projectId: "gematria-academy",
    storageBucket: "gematria-academy.appspot.com",
    messagingSenderId: "VOTRE_MESSAGING_SENDER_ID",
    appId: "VOTRE_APP_ID",
    measurementId: "VOTRE_MEASUREMENT_ID"
};

// Initialiser Firebase
let app, auth, db;

try {
    // Import Firebase SDK
    import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js').then(({ initializeApp }) => {
        app = initializeApp(firebaseConfig);
        console.log('✅ Firebase initialisé');

        // Importer Authentication
        return import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
    }).then(({ getAuth, GoogleAuthProvider, GithubAuthProvider }) => {
        auth = getAuth(app);
        window.googleProvider = new GoogleAuthProvider();
        window.githubProvider = new GithubAuthProvider();
        console.log('✅ Firebase Auth initialisé');

        // Importer Firestore
        return import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
    }).then(({ getFirestore }) => {
        db = getFirestore(app);
        console.log('✅ Firestore initialisé');

        // Exporter globalement
        window.firebaseAuth = auth;
        window.firebaseDB = db;

        // Écouter l'état de connexion
        import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js').then(({ onAuthStateChanged }) => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    console.log('👤 Utilisateur connecté:', user.email || user.displayName);
                    window.currentUser = user;
                    // Synchroniser progression locale vers cloud
                    if (typeof UserProgressionSystem !== 'undefined') {
                        UserProgressionSystem.syncToCloud();
                    }
                } else {
                    console.log('👤 Aucun utilisateur connecté');
                    window.currentUser = null;
                }

                // Déclencher événement personnalisé
                window.dispatchEvent(new CustomEvent('authStateChanged', { detail: { user } }));
            });
        });
    });
} catch (error) {
    console.error('❌ Erreur Firebase:', error);
}
