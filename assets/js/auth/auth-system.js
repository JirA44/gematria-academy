// Système d'authentification Firebase - Gematria Academy
// =====================================================

class GematriaAuth {
    constructor() {
        this.user = null;
        this.db = null;
        this.auth = null;
        this.initialized = false;
        this.authResolved = false;
        this.initPromise = null;
        this.listeners = [];
    }

    async init() {
        if (this.initialized) return;
        if (!this.initPromise) {
            this.initPromise = this._init().catch(error => {
                this.initPromise = null;
                throw error;
            });
        }
        return this.initPromise;
    }

    async _init() {
        if (!window.FIREBASE_CONFIG || !window.isFirebaseConfigured?.()) {
            throw new Error("Configuration Firebase absente ou invalide.");
        }

        // L'authentification ne doit pas dépendre du chargement de Firestore.
        const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
        const {
            getAuth, onAuthStateChanged, signInWithEmailAndPassword,
            createUserWithEmailAndPassword, signOut, GoogleAuthProvider,
            signInWithPopup, updateProfile
        } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');

        this.app = initializeApp(window.FIREBASE_CONFIG);
        this.auth = getAuth(this.app);
        this.signInWithEmailAndPassword = signInWithEmailAndPassword;
        this.createUserWithEmailAndPassword = createUserWithEmailAndPassword;
        this.signOutFn = signOut;
        this.GoogleAuthProvider = GoogleAuthProvider;
        this.signInWithPopup = signInWithPopup;
        this.updateProfile = updateProfile;
        this.initialized = true;

        onAuthStateChanged(this.auth, async (user) => {
            this.user = user;
            if (user) {
                try {
                    await this.loadUserData(user.uid);
                } catch (error) {
                    console.warn("Profil Firestore indisponible; authentification conservée :", error);
                }
            }
            this.authResolved = true;
            this.notifyListeners();
        });

        console.log('🔥 Firebase Auth initialisé');
    }

    async initFirestore() {
        if (this.db) return this.db;
        if (!this.firestorePromise) {
            this.firestorePromise = import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js')
                .then(({ getFirestore, doc, setDoc, getDoc, updateDoc, serverTimestamp }) => {
                    this.db = getFirestore(this.app);
                    this.doc = doc;
                    this.setDoc = setDoc;
                    this.getDoc = getDoc;
                    this.updateDoc = updateDoc;
                    this.serverTimestamp = serverTimestamp;
                    this.firestoreError = null;
                    return this.db;
                })
                .catch((error) => {
                    this.firestorePromise = null;
                    this.firestoreError = error;
                    throw error;
                });
        }
        return this.firestorePromise;
    }

    // Charger données utilisateur depuis Firestore
    async loadUserData(uid) {
        try {
            await this.initFirestore();
            const userDoc = await this.getDoc(this.doc(this.db, 'users', uid));
            if (userDoc.exists()) {
                this.userData = userDoc.data();
                return this.userData;
            }
            return null;
        } catch (error) {
            console.error('Erreur chargement données:', error);
            throw error;
        }
    }

    // Sauvegarder données utilisateur dans Firestore
    async saveUserData(uid, data) {
        try {
            await this.initFirestore();
            await this.setDoc(this.doc(this.db, 'users', uid), {
                ...data,
                updatedAt: this.serverTimestamp()
            }, { merge: true });
        } catch (error) {
            console.error('Erreur sauvegarde:', error);
            throw error;
        }
    }

    // Inscription
    async signUp(email, password, displayName) {
        await this.init();
        const result = await this.createUserWithEmailAndPassword(this.auth, email, password);
        await this.updateProfile(result.user, { displayName });
        
        // Créer profil dans Firestore
        try {
            await this.initFirestore();
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
        } catch (error) {
            console.warn('Compte créé, mais profil Firestore non synchronisé :', error);
        }
        
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
        provider.setCustomParameters({ prompt: "select_account" });
        const result = await this.signInWithPopup(this.auth, provider);
        
        // Le profil cloud est secondaire : un incident Firestore ne doit pas annuler la connexion.
        try {
            await this.initFirestore();
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
        } catch (error) {
            console.warn('Connexion réussie, mais profil Firestore non synchronisé :', error);
        }
        
        return result.user;
    }

    // Progression privée du parcours mémoire, conforme aux règles Firestore.
    async loadProgression(progressId) {
        await this.init();
        if (!this.user) return null;
        await this.initFirestore();
        const ref = this.doc(this.db, "users", this.user.uid, "progression", progressId);
        const snapshot = await this.getDoc(ref);
        return snapshot.exists() ? snapshot.data() : null;
    }

    async saveProgression(progressId, data) {
        await this.init();
        if (!this.user) throw new Error("Connecte-toi pour synchroniser ta progression.");
        await this.initFirestore();
        const ref = this.doc(this.db, "users", this.user.uid, "progression", progressId);
        await this.setDoc(ref, { ...data, updatedAt: this.serverTimestamp() }, { merge: true });
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
        if (this.authResolved) callback(this.user);
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
window.gematriaAuth.init().catch(error => {
    console.error("Initialisation Firebase impossible :", error);
    window.dispatchEvent(new CustomEvent("authInitializationError", { detail: { error } }));
});
console.log('🔐 Auth système initialisé');
