// Système d'authentification Firebase - Gematria Academy
// =====================================================

class GematriaAuth {
    constructor() {
        this.user = null;
        this.db = null;
        this.auth = null;
        this.initialized = false;
        this.listeners = [];
    }

    async init() {
        if (this.initialized) return;
        
        try {
            // Charger Firebase depuis CDN
            const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
            const { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, updateProfile } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
            const { getFirestore, doc, setDoc, getDoc, updateDoc, serverTimestamp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');

            // Initialiser Firebase
            const app = initializeApp(window.FIREBASE_CONFIG);
            this.auth = getAuth(app);
            this.db = getFirestore(app);
            
            // Sauvegarder les fonctions
            this.signInWithEmailAndPassword = signInWithEmailAndPassword;
            this.createUserWithEmailAndPassword = createUserWithEmailAndPassword;
            this.signOutFn = signOut;
            this.GoogleAuthProvider = GoogleAuthProvider;
            this.signInWithPopup = signInWithPopup;
            this.updateProfile = updateProfile;
            this.doc = doc;
            this.setDoc = setDoc;
            this.getDoc = getDoc;
            this.updateDoc = updateDoc;
            this.serverTimestamp = serverTimestamp;

            // Écouter les changements d'auth
            onAuthStateChanged(this.auth, async (user) => {
                this.user = user;
                if (user) {
                    await this.loadUserData(user.uid);
                }
                this.notifyListeners();
            });

            this.initialized = true;
            console.log('🔥 Firebase Auth initialisé');
        } catch (error) {
            console.error('❌ Erreur Firebase:', error);
            this.loadFromLocalStorage();
        }
    }

    // Charger données utilisateur depuis Firestore
    async loadUserData(uid) {
        try {
            const userDoc = await this.getDoc(this.doc(this.db, 'users', uid));
            if (userDoc.exists()) {
                this.userData = userDoc.data();
                return this.userData;
            }
            return null;
        } catch (error) {
            console.error('Erreur chargement données:', error);
            return null;
        }
    }

    // Sauvegarder données utilisateur dans Firestore
    async saveUserData(uid, data) {
        try {
            await this.setDoc(this.doc(this.db, 'users', uid), {
                ...data,
                updatedAt: this.serverTimestamp()
            }, { merge: true });
        } catch (error) {
            console.error('Erreur sauvegarde:', error);
        }
    }

    // Inscription
    async signUp(email, password, displayName) {
        await this.init();
        const result = await this.createUserWithEmailAndPassword(this.auth, email, password);
        await this.updateProfile(result.user, { displayName });
        
        // Créer profil dans Firestore
        await this.saveUserData(result.user.uid, {
            email,
            displayName,
            createdAt: this.serverTimestamp(),
            xp: 0,
            level: 1,
            badges: [],
            lessonsCompleted: [],
            dailyStreak: 0
        });
        
        return result.user;
    }

    // Connexion
    async signIn(email, password) {
        await this.init();
        const result = await this.signInWithEmailAndPassword(this.auth, email, password);
        return result.user;
    }

    // Connexion Google
    async signInWithGoogle() {
        await this.init();
        const provider = new this.GoogleAuthProvider();
        const result = await this.signInWithPopup(this.auth, provider);
        
        // Vérifier si nouveau user
        const userDoc = await this.getDoc(this.doc(this.db, 'users', result.user.uid));
        if (!userDoc.exists()) {
            await this.saveUserData(result.user.uid, {
                email: result.user.email,
                displayName: result.user.displayName,
                photoURL: result.user.photoURL,
                createdAt: this.serverTimestamp(),
                xp: 0,
                level: 1,
                badges: [],
                lessonsCompleted: [],
                dailyStreak: 0
            });
        }
        
        return result.user;
    }

    // Déconnexion
    async signOut() {
        await this.init();
        await this.signOutFn(this.auth);
        this.user = null;
        this.userData = null;
    }

    // Mettre à jour XP et données
    async updateUserProgress(data) {
        if (!this.user) return;
        await this.saveUserData(this.user.uid, data);
    }

    // Fallback localStorage
    loadFromLocalStorage() {
        const saved = localStorage.getItem('gematria_user');
        if (saved) {
            this.user = JSON.parse(saved);
            this.notifyListeners();
        }
    }

    // Observer pattern
    onAuthStateChanged(callback) {
        this.listeners.push(callback);
        if (this.initialized) callback(this.user);
        return () => {
            this.listeners = this.listeners.filter(l => l !== callback);
        };
    }

    notifyListeners() {
        this.listeners.forEach(cb => cb(this.user));
        window.dispatchEvent(new CustomEvent('authStateChanged', { detail: { user: this.user } }));
    }

    get currentUser() { return this.user; }
    get isLoggedIn() { return !!this.user; }
}

// Instance globale
window.gematriaAuth = new GematriaAuth();
window.gematriaAuth.init();
console.log('🔐 Auth système initialisé');
