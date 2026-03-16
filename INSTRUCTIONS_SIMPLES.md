# 🚀 INSTRUCTIONS SIMPLES - Déploiement Firebase

## ✅ Étape 1 : Dans le TERMINAL qui s'est ouvert

Tapez cette commande :
```
firebase login
```

→ Une page web va s'ouvrir
→ Connectez-vous avec votre compte Google
→ Cliquez sur "Autoriser"
→ Revenez au terminal

## ✅ Étape 2 : Toujours dans le TERMINAL

Tapez :
```
firebase deploy
```

→ Attendez ~1-2 minutes
→ Votre site sera en ligne !

## ✅ Étape 3 : Obtenir vos credentials Firebase

### **Dans la console Firebase** (https://console.firebase.google.com/)

1. **Créer un projet :**
   - Cliquez sur "Ajouter un projet"
   - Nom : `gematria-academy`
   - Désactivez Google Analytics
   - Cliquez sur "Créer le projet"

2. **Ajouter une app Web :**
   - Cliquez sur l'icône `</>` (Web)
   - Nom de l'app : `Académie Gématria`
   - Cliquez sur "Enregistrer l'application"

3. **COPIER la configuration :**
   ```javascript
   const firebaseConfig = {
       apiKey: "...",           // ← COPIER
       authDomain: "...",       // ← COPIER
       projectId: "...",        // ← COPIER
       storageBucket: "...",    // ← COPIER
       messagingSenderId: "...", // ← COPIER
       appId: "...",            // ← COPIER
   };
   ```

4. **COLLER dans `firebase-config.js` :**
   - Ouvrir le fichier `firebase-config.js`
   - Remplacer les valeurs "VOTRE_API_KEY" etc. par les vraies
   - Sauvegarder

5. **Activer Authentication :**
   - Dans Firebase Console → Authentication
   - Cliquer sur "Commencer"
   - Activer "Email/Password"
   - Activer "Google" (mettre votre email)
   - Cliquer sur "Enregistrer"

6. **Créer Firestore :**
   - Dans Firebase Console → Firestore Database
   - Cliquer sur "Créer une base de données"
   - Mode : "Commencer en mode test"
   - Emplacement : "europe-west"
   - Cliquer sur "Activer"

## ✅ Étape 4 : Re-déployer avec les vraies credentials

Dans le terminal :
```
firebase deploy
```

## 🎉 C'EST TOUT !

Votre site sera accessible sur :
- `https://gematria-academy.web.app/`

---

## ❓ Besoin d'aide ?

Si bloqué, dites-moi à quelle étape vous êtes !
