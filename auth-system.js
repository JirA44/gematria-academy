/**
 * SYSTÈME D'AUTHENTIFICATION - Académie Gématria
 * Gère connexion/inscription avec Email, Google, GitHub
 */

const AuthSystem = {
    /**
     * Inscription avec Email + Mot de passe
     */
    async signup(email, password, displayName) {
        try {
            const { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } = await import(
                'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
            );

            const userCredential = await createUserWithEmailAndPassword(window.firebaseAuth, email, password);
            const user = userCredential.user;

            // Mettre à jour le profil
            if (displayName) {
                await updateProfile(user, { displayName });
            }

            // Envoyer email de vérification
            await sendEmailVerification(user);

            // Créer profil utilisateur dans Firestore
            await this.createUserProfile(user, { displayName });

            return {
                success: true,
                user: user,
                message: `Compte créé ! Email de vérification envoyé à ${email}`
            };
        } catch (error) {
            return {
                success: false,
                error: error.code,
                message: this.getErrorMessage(error.code)
            };
        }
    },

    /**
     * Connexion avec Email + Mot de passe
     */
    async login(email, password) {
        try {
            const { signInWithEmailAndPassword } = await import(
                'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
            );

            const userCredential = await signInWithEmailAndPassword(window.firebaseAuth, email, password);

            return {
                success: true,
                user: userCredential.user,
                message: 'Connexion réussie !'
            };
        } catch (error) {
            return {
                success: false,
                error: error.code,
                message: this.getErrorMessage(error.code)
            };
        }
    },

    /**
     * Connexion avec Google
     */
    async loginWithGoogle() {
        try {
            const { signInWithPopup } = await import(
                'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
            );

            const result = await signInWithPopup(window.firebaseAuth, window.googleProvider);
            const user = result.user;

            // Créer profil si nouveau
            await this.createUserProfile(user, { displayName: user.displayName });

            return {
                success: true,
                user: user,
                message: `Bienvenue ${user.displayName} !`
            };
        } catch (error) {
            return {
                success: false,
                error: error.code,
                message: this.getErrorMessage(error.code)
            };
        }
    },

    /**
     * Connexion avec GitHub
     */
    async loginWithGitHub() {
        try {
            const { signInWithPopup } = await import(
                'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
            );

            const result = await signInWithPopup(window.firebaseAuth, window.githubProvider);
            const user = result.user;

            // Créer profil si nouveau
            await this.createUserProfile(user, { displayName: user.displayName });

            return {
                success: true,
                user: user,
                message: `Bienvenue ${user.displayName} !`
            };
        } catch (error) {
            return {
                success: false,
                error: error.code,
                message: this.getErrorMessage(error.code)
            };
        }
    },

    /**
     * Déconnexion
     */
    async logout() {
        try {
            const { signOut } = await import(
                'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
            );

            await signOut(window.firebaseAuth);

            return {
                success: true,
                message: 'Déconnexion réussie'
            };
        } catch (error) {
            return {
                success: false,
                message: 'Erreur de déconnexion'
            };
        }
    },

    /**
     * Réinitialisation du mot de passe
     */
    async resetPassword(email) {
        try {
            const { sendPasswordResetEmail } = await import(
                'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
            );

            await sendPasswordResetEmail(window.firebaseAuth, email);

            return {
                success: true,
                message: `Email de réinitialisation envoyé à ${email}`
            };
        } catch (error) {
            return {
                success: false,
                message: this.getErrorMessage(error.code)
            };
        }
    },

    /**
     * Créer profil utilisateur dans Firestore
     */
    async createUserProfile(user, additionalData = {}) {
        try {
            const { doc, setDoc, getDoc, serverTimestamp } = await import(
                'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
            );

            const userRef = doc(window.firebaseDB, 'users', user.uid);
            const userDoc = await getDoc(userRef);

            // Ne créer que si n'existe pas déjà
            if (!userDoc.exists()) {
                await setDoc(userRef, {
                    email: user.email,
                    displayName: additionalData.displayName || user.displayName || 'Anonyme',
                    photoURL: user.photoURL || null,
                    createdAt: serverTimestamp(),
                    lastLogin: serverTimestamp(),
                    totalXP: 0,
                    level: 1,
                    badges: [],
                    streak: 0,
                    lastActivity: serverTimestamp()
                });

                console.log('✅ Profil utilisateur créé');
            } else {
                // Mettre à jour lastLogin
                const { updateDoc } = await import(
                    'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
                );
                await updateDoc(userRef, {
                    lastLogin: serverTimestamp()
                });
            }
        } catch (error) {
            console.error('❌ Erreur création profil:', error);
        }
    },

    /**
     * Messages d'erreur en français
     */
    getErrorMessage(errorCode) {
        const messages = {
            'auth/email-already-in-use': 'Cette adresse email est déjà utilisée',
            'auth/invalid-email': 'Adresse email invalide',
            'auth/operation-not-allowed': 'Opération non autorisée',
            'auth/weak-password': 'Mot de passe trop faible (minimum 6 caractères)',
            'auth/user-disabled': 'Ce compte a été désactivé',
            'auth/user-not-found': 'Aucun compte trouvé avec cet email',
            'auth/wrong-password': 'Mot de passe incorrect',
            'auth/too-many-requests': 'Trop de tentatives. Réessayez plus tard',
            'auth/popup-closed-by-user': 'Fenêtre de connexion fermée',
            'auth/cancelled-popup-request': 'Connexion annulée',
            'auth/account-exists-with-different-credential': 'Un compte existe déjà avec cet email via un autre provider'
        };

        return messages[errorCode] || 'Une erreur est survenue';
    },

    /**
     * Vérifier si utilisateur est connecté
     */
    isLoggedIn() {
        return window.currentUser !== null && window.currentUser !== undefined;
    },

    /**
     * Obtenir utilisateur courant
     */
    getCurrentUser() {
        return window.currentUser;
    }
};

// Exporter globalement
window.AuthSystem = AuthSystem;
