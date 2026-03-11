# 🚀 Guide de Déploiement Firebase - Académie Gématria

## ✅ Configuration Automatique Terminée

Tous les fichiers de configuration Firebase ont été créés automatiquement :

- ✅ `firebase.json` - Configuration du projet
- ✅ `.firebaserc` - Référence au projet Firebase
- ✅ `firestore.rules` - Règles de sécurité de la base de données
- ✅ `firestore.indexes.json` - Index de la base de données
- ✅ `DEPLOY_FIREBASE.bat` - Script de déploiement automatique

## 🔥 Déploiement en 2 étapes

### Méthode 1 : Script automatique (RECOMMANDÉ)

Double-cliquez simplement sur :
```
DEPLOY_FIREBASE.bat
```

Le script va :
1. Vérifier votre connexion Firebase (et vous connecter si besoin)
2. Configurer le projet
3. Déployer automatiquement le site

### Méthode 2 : Commandes manuelles

Ouvrez un terminal dans ce dossier et tapez :

```bash
# 1. Se connecter (une seule fois)
firebase login

# 2. Déployer
firebase deploy
```

## 🎯 Après le déploiement

Votre site sera accessible sur :
```
https://gematria-academy.web.app
```
ou
```
https://gematria-academy.firebaseapp.com
```

## ⚙️ Configuration Firebase Console

Avant le premier déploiement, assurez-vous d'avoir configuré dans la console Firebase :

### 1. Authentication
- ✅ Email/Password activé
- ✅ Google Sign-In activé
- ✅ GitHub Sign-In activé (optionnel)

### 2. Firestore Database
- ✅ Base de données créée en mode test
- ✅ Emplacement : europe-west
- ✅ Les règles de sécurité seront déployées automatiquement

### 3. Hosting
- ✅ Sera configuré automatiquement au premier déploiement

## 🔑 Obtenir vos credentials Firebase

1. Aller sur https://console.firebase.google.com/
2. Sélectionner votre projet `gematria-academy`
3. Aller dans **Paramètres du projet** (⚙️)
4. Descendre jusqu'à **"Vos applications"**
5. Cliquer sur l'icône Web `</>`
6. Copier la configuration `firebaseConfig`
7. Coller dans `firebase-config.js`

## 📊 Vérifier le déploiement

Après déploiement, testez :

1. **Page d'accueil** : https://gematria-academy.web.app/
2. **Page de connexion** : https://gematria-academy.web.app/login.html
3. **Créer un compte** → Vérifier dans Firebase Console > Authentication
4. **Compléter un exercice** → Vérifier dans Firebase Console > Firestore

## 🆘 Problèmes courants

### "Failed to authenticate"
→ Exécutez : `firebase login`

### "Project not found"
→ Vérifiez que le nom du projet dans `.firebaserc` correspond à votre projet Firebase

### "Permission denied"
→ Vérifiez que vous êtes connecté avec le bon compte Google

### "Invalid configuration"
→ Vérifiez que `firebase-config.js` contient vos vraies credentials

## 📚 Commandes utiles

```bash
# Voir les projets Firebase
firebase projects:list

# Changer de projet
firebase use <project-id>

# Déployer seulement le hosting
firebase deploy --only hosting

# Déployer seulement les règles Firestore
firebase deploy --only firestore:rules

# Voir les logs
firebase hosting:channel:list

# Tester localement avant déploiement
firebase emulators:start
```

## 🎉 C'est tout !

Votre Académie Gématria est maintenant prête à être déployée en ligne avec :
- ✅ Authentification multi-providers
- ✅ Base de données cloud Firestore
- ✅ Système de progression avec XP et badges
- ✅ Hébergement rapide et sécurisé

**Prochaine étape** : Double-cliquez sur `DEPLOY_FIREBASE.bat` ! 🚀
