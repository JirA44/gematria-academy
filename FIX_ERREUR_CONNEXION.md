# 🔧 FIX : Erreur "Une erreur est survenue" lors création compte

## ❌ Problème
Les credentials Firebase dans `firebase-config.js` sont factices.

## ✅ Solution en 5 étapes

### **ÉTAPE 1 : Créer le projet Firebase**

1. Ouvrir https://console.firebase.google.com/
2. Cliquer sur **"Ajouter un projet"** (Add project)
3. Nom du projet : **`gematria-academy`**
4. Désactiver Google Analytics (optionnel)
5. Cliquer sur **"Créer le projet"**
6. Attendre ~30 secondes
7. Cliquer sur **"Continuer"**

### **ÉTAPE 2 : Ajouter une app Web**

1. Dans la page d'accueil du projet, cliquer sur l'icône **`</>`** (Web)
2. Nom de l'app : **`Académie Gématria`**
3. **NE PAS** cocher "Firebase Hosting" pour l'instant
4. Cliquer sur **"Enregistrer l'application"**

### **ÉTAPE 3 : COPIER la configuration**

Vous allez voir un bloc de code comme ceci :

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "gematria-academy.firebaseapp.com",
  projectId: "gematria-academy",
  storageBucket: "gematria-academy.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

**COPIEZ TOUT CE BLOC !**

### **ÉTAPE 4 : COLLER dans firebase-config.js**

1. Ouvrir le fichier **`D:\Apprentissage_Runes_Gematria\firebase-config.js`**
2. Trouver la ligne 16-23 qui contient :
   ```javascript
   const firebaseConfig = {
       apiKey: "VOTRE_API_KEY",
       ...
   };
   ```
3. **REMPLACER** ce bloc par celui que vous avez copié
4. **SAUVEGARDER** le fichier (Ctrl+S)

### **ÉTAPE 5 : Activer Authentication**

1. Dans Firebase Console, cliquer sur **"Authentication"** dans le menu de gauche
2. Cliquer sur **"Commencer"** (Get started)
3. Activer **"Email/Password"** :
   - Cliquer sur "Email/Password"
   - Activer la première option (Email/Password)
   - Cliquer sur "Enregistrer"
4. Activer **"Google"** :
   - Cliquer sur "Google"
   - Activer
   - Email d'assistance : **hugo.padilla.pro@gmail.com**
   - Cliquer sur "Enregistrer"

### **ÉTAPE 6 : Créer Firestore Database**

1. Dans Firebase Console, cliquer sur **"Firestore Database"** dans le menu de gauche
2. Cliquer sur **"Créer une base de données"**
3. Mode : **"Commencer en mode test"**
4. Emplacement : **"europe-west"** (ou "eur3")
5. Cliquer sur **"Activer"**
6. Attendre ~1 minute

### **ÉTAPE 7 : TESTER !**

1. Rafraîchir la page **`login.html`** dans votre navigateur (F5)
2. Essayer de créer un compte avec email/password
3. Ça devrait marcher ! ✅

---

## 🆘 Si ça ne marche toujours pas

Ouvrir la console du navigateur (F12) et me donner l'erreur exacte.
