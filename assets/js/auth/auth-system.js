// Système d'authentification Gematria Academy
// ==========================================
// Supporte Firebase ET localStorage (fallback)

class GematriaAuth {
    constructor() {
        this.user = null;
        this.isFirebaseMode = false;
        this.listeners = [];
        this.init();
    }

    async init() {
        // Vérifier si Firebase est disponible
        if (window.isFirebaseConfigured && window.isFirebaseConfigured()) {
            await this.initFirebase();
        } else {
            console.log('📦 Mode localStorage activé');
            this.loadFromLocalStorage();
        }
    }

    async initFirebase() {
        try {
            const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
            const { getAuth, onAuthStateChanged } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');

            const app = initializeApp(window.FIREBASE_CONFIG);
            this.auth = getAuth(app);
            this.isFirebaseMode = true;

            onAuthStateChanged(this.auth, (user) => {
                this.user = user;
                this.notifyListeners();
                if (user) {
                    this.saveToLocalStorage(user);
                }
            });

            console.log('🔥 Firebase Auth initialisé');
        } catch (error) {
            console.error('Firebase error:', error);
            this.loadFromLocalStorage();
        }
    }

    loadFromLocalStorage() {
        const saved = localStorage.getItem('gematria_user');
        if (saved) {
            this.user = JSON.parse(saved);
            this.notifyListeners();
        }
    }

    saveToLocalStorage(user) {
        const userData = {
            uid: user.uid || 'local_' + Date.now(),
            email: user.email,
            displayName: user.displayName || user.email?.split('@')[0],
            photoURL: user.photoURL,
            createdAt: user.createdAt || new Date().toISOString()
        };
        localStorage.setItem('gematria_user', JSON.stringify(userData));
    }

    // Inscription
    async signUp(email, password, displayName) {
        if (this.isFirebaseMode) {
            const { createUserWithEmailAndPassword, updateProfile } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
            const result = await createUserWithEmailAndPassword(this.auth, email, password);
            await updateProfile(result.user, { displayName });
            return result.user;
        } else {
            // Mode localStorage
            const user = {
                uid: 'local_' + Date.now(),
                email,
                displayName,
                createdAt: new Date().toISOString()
            };
            this.user = user;
            this.saveToLocalStorage(user);
            this.notifyListeners();
            return user;
        }
    }

    // Connexion
    async signIn(email, password) {
        if (this.isFirebaseMode) {
            const { signInWithEmailAndPassword } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
            const result = await signInWithEmailAndPassword(this.auth, email, password);
            return result.user;
        } else {
            // Mode localStorage - vérifier si l'utilisateur existe
            const saved = localStorage.getItem('gematria_user');
            if (saved) {
                const user = JSON.parse(saved);
                if (user.email === email) {
                    this.user = user;
                    this.notifyListeners();
                    return user;
                }
            }
            // Créer un nouvel utilisateur si pas trouvé
            return this.signUp(email, password, email.split('@')[0]);
        }
    }

    // Connexion Google
    async signInWithGoogle() {
        if (this.isFirebaseMode) {
            const { GoogleAuthProvider, signInWithPopup } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(this.auth, provider);
            return result.user;
        } else {
            alert('🔧 Connexion Google nécessite Firebase.\nUtilisez email/mot de passe.');
            return null;
        }
    }

    // Déconnexion
    async signOut() {
        if (this.isFirebaseMode) {
            const { signOut } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
            await signOut(this.auth);
        }
        this.user = null;
        localStorage.removeItem('gematria_user');
        this.notifyListeners();
    }

    // Observer pattern
    onAuthStateChanged(callback) {
        this.listeners.push(callback);
        callback(this.user);
        return () => {
            this.listeners = this.listeners.filter(l => l !== callback);
        };
    }

    notifyListeners() {
        this.listeners.forEach(cb => cb(this.user));
        window.dispatchEvent(new CustomEvent('authStateChanged', { detail: { user: this.user } }));
    }

    // Getters
    get currentUser() {
        return this.user;
    }

    get isLoggedIn() {
        return !!this.user;
    }
}

// Instance globale
window.gematriaAuth = new GematriaAuth();
window.currentUser = null;

// Écouter les changements
window.gematriaAuth.onAuthStateChanged(user => {
    window.currentUser = user;
});

console.log('🔐 Système d\'authentification initialisé');
