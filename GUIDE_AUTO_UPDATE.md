# 🔄 Guide de Mise à Jour Automatique - Gematria Academy

## ✨ Système mis en place

Votre site Gematria Academy dispose maintenant d'un système de mise à jour automatique vers GitHub et Cloudflare Pages.

## 📁 Fichiers créés

- **`auto_update_gematria.ps1`** - Script PowerShell qui fait le commit et push
- **`SETUP_AUTO_UPDATE.bat`** - Configure la tâche planifiée Windows (1x/heure)
- **`STOP_AUTO_UPDATE.bat`** - Désactive la mise à jour automatique
- **`auto_update.log`** - Historique des mises à jour

## 🚀 Activation (une seule fois)

### Méthode 1 : Automatique
1. Clic droit sur **`SETUP_AUTO_UPDATE.bat`**
2. Choisir **"Exécuter en tant qu'administrateur"**
3. Suivre les instructions à l'écran

### Méthode 2 : Manuelle
Si la méthode 1 ne fonctionne pas :

1. Ouvrir **PowerShell en tant qu'administrateur**
2. Copier-coller cette commande :
```powershell
schtasks /Create /SC HOURLY /TN "Gematria_Auto_Update" /TR "powershell.exe -ExecutionPolicy Bypass -File 'D:\Apprentissage_Runes_Gematria\auto_update_gematria.ps1'" /F
```

## 🎯 Comment ça marche

### Toutes les heures automatiquement :
1. ✅ Vérifie s'il y a des changements dans le dossier
2. ✅ Si oui : crée un commit avec l'heure
3. ✅ Pousse vers GitHub
4. ✅ Cloudflare Pages détecte le changement
5. ✅ Cloudflare déploie automatiquement (1-2 min)

### Vous n'avez RIEN à faire !

## 📊 Vérifier que ça fonctionne

### Voir le log des mises à jour :
```
Ouvrir: auto_update.log
```

### Vérifier la tâche planifiée :
1. Appuyez sur `Win + R`
2. Tapez : `taskschd.msc`
3. Cherchez : **Gematria_Auto_Update**

### Tester manuellement :
Double-cliquez sur **`auto_update_gematria.ps1`**
(ou lancez dans PowerShell)

## 🌐 URL du site

Une fois Cloudflare Pages configuré, votre site sera à :
**https://gematria-academy.pages.dev**

## 🛑 Désactiver

Double-cliquez sur **`STOP_AUTO_UPDATE.bat`**

## 📝 Notes importantes

- **Commit automatique** : Chaque heure, s'il y a des changements
- **Pas de changement ?** : Aucun commit n'est créé
- **Internet nécessaire** : Le push vers GitHub nécessite une connexion
- **Logs** : Consultez `auto_update.log` pour voir l'historique

## 🔧 Dépannage

### La tâche ne se crée pas
- Lancez le script en **tant qu'administrateur**
- Vérifiez que PowerShell est autorisé sur votre système

### Le push échoue
- Vérifiez votre connexion Internet
- Assurez-vous que vos credentials GitHub sont configurés

### Cloudflare ne déploie pas
- Vérifiez que le projet est bien connecté sur https://dash.cloudflare.com/
- Le déploiement prend 1-2 minutes après chaque push

---

✨ **Résultat** : Votre site se met à jour automatiquement toutes les heures !
