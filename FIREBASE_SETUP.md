# 🔥 CONFIGURATION FIREBASE - Académie Gématria

Ce guide vous explique comment configurer Firebase pour activer les comptes utilisateurs avec suivi de progression cloud.

## 📋 Étapes de configuration

### 1️⃣ Créer un projet Firebase

1. Aller sur https://console.firebase.google.com/
2. Cliquer sur "Ajouter un projet"
3. Nom du projet : **`gematria-academy`** (ou autre nom)
4. Désactiver Google Analytics (optionnel pour commencer)
5. Cliquer sur "Créer le projet"

### 2️⃣ Créer une app Web

1. Dans la console Firebase, cliquer sur l'icône Web `</>`
2. Nom de l'app : **`Académie Gématria Web`**
3. Cocher "Configurer Firebase Hosting" (optionnel)
4. Cliquer sur "Enregistrer l'application"
5. **IMPORTANT** : Copier la configuration Firebase affichée

### 3️⃣ Copier la configuration dans `firebase-config.js`

Ouvrir le fichier `firebase-config.js` et remplacer les valeurs par vos vraies credentials :

```javascript
const firebaseConfig = {
    apiKey: "VOTRE_VRAIE_API_KEY",              // ← Remplacer
    authDomain: "votre-projet.firebaseapp.com", // ← Remplacer
    projectId: "votre-projet-id",               // ← Remplacer
    storageBucket: "votre-projet.appspot.com",  // ← Remplacer
    messagingSenderId: "123456789",             // ← Remplacer
    appId: "1:123456789:web:abcdef",            // ← Remplacer
    measurementId: "G-XXXXXXXXXX"               // ← Remplacer (optionnel)
};
```

### 4️⃣ Activer Authentication

1. Dans la console Firebase, aller dans **"Authentication"**
2. Cliquer sur "Commencer"
3. Activer les fournisseurs suivants :

#### **Email/Mot de passe**
- Cliquer sur "Email/Password"
- Activer "Email/Password"
- Activer aussi "Lien e-mail (connexion sans mot de passe)" (optionnel)
- Cliquer sur "Enregistrer"

#### **Google Sign-In**
- Cliquer sur "Google"
- Activer
- Email d'assistance du projet : votre.email@gmail.com
- Cliquer sur "Enregistrer"

#### **GitHub Sign-In**
1. Créer une OAuth App GitHub :
   - Aller sur https://github.com/settings/developers
   - Cliquer sur "New OAuth App"
   - **Application name** : `Académie Gématria`
   - **Homepage URL** : `https://votre-projet.firebaseapp.com`
   - **Authorization callback URL** : Copier depuis Firebase (fourni quand vous activez GitHub)
   - Cliquer sur "Register application"
   - **Copier** le Client ID et Client Secret

2. Dans Firebase :
   - Cliquer sur "GitHub"
   - Activer
   - Coller le **Client ID** et **Client Secret**
   - Cliquer sur "Enregistrer"

### 5️⃣ Créer la base de données Firestore

1. Dans la console Firebase, aller dans **"Firestore Database"**
2. Cliquer sur "Créer une base de données"
3. Mode : **"Commencer en mode test"** (⚠️ à sécuriser plus tard)
4. Emplacement : **europe-west** (ou proche de vos utilisateurs)
5. Cliquer sur "Activer"

### 6️⃣ Configurer les règles de sécurité Firestore

1. Dans Firestore, aller dans l'onglet **"Règles"**
2. Remplacer les règles par :

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    // Règles pour les profils utilisateurs
    match /users/{userId} {
      // Lecture : tout le monde peut voir les profils publics
      allow read: if true;

      // Écriture : seulement le propriétaire
      allow write: if request.auth != null && request.auth.uid == userId;

      // Progression de l'utilisateur
      match /progression/{progressId} {
        allow read: if request.auth != null && request.auth.uid == userId;
        allow write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

3. Cliquer sur "Publier"

### 7️⃣ (Optionnel) Déployer sur Firebase Hosting

Si vous voulez héberger le site sur Firebase :

```bash
# Installer Firebase CLI
npm install -g firebase-tools

# Se connecter
firebase login

# Initialiser Firebase dans votre projet
cd "D:\Apprentissage_Runes_Gematria"
firebase init

# Sélectionner:
# - Hosting
# - Firestore
# - Authentication (si demandé)

# Déployer
firebase deploy
```

## ✅ Vérification

Une fois configuré, testez :

1. Ouvrir `login.html` dans votre navigateur
2. Essayer de créer un compte avec email/password
3. Essayer de se connecter avec Google
4. Vérifier que le profil s'affiche dans `profile.html`
5. Compléter un exercice et vérifier que la progression est sauvegardée dans Firestore

## 🔒 Sécurité - Production

**⚠️ IMPORTANT** : Avant de mettre en production, sécuriser :

1. **Règles Firestore** : Passer en mode production avec validation
2. **Domaines autorisés** : Dans Authentication > Settings > Authorized domains
3. **Quotas** : Surveiller l'utilisation dans la console Firebase
4. **Backup** : Configurer sauvegardes automatiques Firestore

## 🆘 Problèmes courants

### Erreur "Firebase not initialized"
- Vérifier que `firebase-config.js` est bien inclus dans la page
- Vérifier que les credentials sont corrects

### Erreur "auth/unauthorized-domain"
- Aller dans Authentication > Settings > Authorized domains
- Ajouter votre domaine (ex: gematria-academy.pages.dev)

### Popup bloquée (Google/GitHub login)
- Autoriser les popups dans le navigateur
- Vérifier que le domaine est autorisé dans Firebase

### Progression non sauvegardée
- Vérifier les règles Firestore
- Ouvrir la console navigateur pour voir les erreurs
- Vérifier que l'utilisateur est bien connecté

## 📚 Documentation

- Firebase Authentication: https://firebase.google.com/docs/auth
- Firestore: https://firebase.google.com/docs/firestore
- Console Firebase: https://console.firebase.google.com/

## 🎯 Structure Firestore

```
users/
  {userId}/
    - email: string
    - displayName: string
    - totalXP: number
    - level: number
    - badges: array
    - streak: number
    - createdAt: timestamp
    - lastLogin: timestamp

    progression/
      hieroglyphes_debutant/
        - domaine: string
        - niveau: string
        - exercices: object
        - scoreMoyen: number
        - meilleurScore: number
        - maitrise: boolean
```

## 💰 Coûts

Firebase est **GRATUIT** jusqu'à :
- **Authentication** : 50,000 utilisateurs actifs par mois
- **Firestore** :
  - 50,000 lectures/jour
  - 20,000 écritures/jour
  - 1 GB stockage
  - 10 GB/mois transfert

Pour un site éducatif avec quelques centaines d'utilisateurs, **c'est entièrement gratuit** ! 🎉
