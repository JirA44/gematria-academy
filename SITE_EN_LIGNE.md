# 🌐 SITE EN LIGNE

## ✅ VOTRE ACADÉMIE EST EN LIGNE !

**URL principale :** https://gematria-academy.pages.dev

**Repository GitHub :** https://github.com/JirA44/gematria-academy

---

## 🔄 METTRE À JOUR LE SITE

### Après chaque modification locale :

```bash
cd "D:\Apprentissage_Runes_Gematria"

# 1. Ajouter les changements
git add .

# 2. Créer un commit
git commit -m "Description des changements"

# 3. Pousser vers GitHub
git push
```

**Résultat :** Le site se met à jour automatiquement en 1-2 minutes !

---

## ⏱️ TEMPS DE DÉPLOIEMENT

- **Commit → GitHub** : Instantané
- **GitHub → Cloudflare Pages** : 1-2 minutes
- **Propagation CDN** : 30 secondes

**Total : ~2-3 minutes** entre `git push` et le site mis à jour

---

## 🔍 VÉRIFIER SI LE SITE EST À JOUR

### Option 1 : Vider le cache navigateur

Sur https://gematria-academy.pages.dev :
- **Ctrl + Shift + R** (Windows)
- **Cmd + Shift + R** (Mac)

### Option 2 : Dashboard Cloudflare

1. Aller sur https://dash.cloudflare.com
2. **Pages** → **gematria-academy**
3. **Deployments**
4. Vérifier le dernier commit :
   - ✅ Si vous voyez `🌙 Version finale - Mode nuit complet...` → Site à jour !
   - ⏳ Si "In progress" → Attendre 1-2 minutes
   - ❌ Si commit ancien → Forcer le redéploiement

### Option 3 : Tester une nouvelle fonctionnalité

Ouvrir https://gematria-academy.pages.dev/progression-dashboard.html

- ✅ Si la page s'ouvre → Site à jour !
- ❌ Si erreur 404 → Pas encore déployé

---

## 🚀 FORCER UN REDÉPLOIEMENT

Si le site ne se met pas à jour automatiquement :

1. **Dashboard Cloudflare** : https://dash.cloudflare.com
2. **Pages** → **gematria-academy**
3. **Deployments** → Dernier déploiement
4. **Retry deployment** (bouton en haut à droite)

Ou via Cloudflare CLI :

```bash
wrangler pages deployment create gematria-academy --branch main
```

---

## 📱 ACCÈS MOBILE

Le site est accessible depuis n'importe quel appareil :

**QR Code** :
1. Ouvrir https://gematria-academy.pages.dev/qr-code-site.html
2. Scanner le QR code avec votre téléphone

Ou directement taper l'URL sur mobile : **gematria-academy.pages.dev**

---

## 🔗 PAGES PRINCIPALES

- **Accueil** : https://gematria-academy.pages.dev/index_COMPLET.html
- **Progression** : https://gematria-academy.pages.dev/progression-dashboard.html
- **Mandalas** : https://gematria-academy.pages.dev/mandala.html
- **Upload** : https://gematria-academy.pages.dev/upload-mandalas.html
- **Demo animations** : https://gematria-academy.pages.dev/demo-animated-bg.html

---

## 🎨 DERNIÈRES MISES À JOUR (Commit actuel)

✅ Mode nuit 100% complet (55 classes corrigées)
✅ Système de progression pédagogique
✅ Dashboard de progression visuel
✅ Fonds animés bleu marine magnifiques
✅ Mandalas plein écran corrigés
✅ Toute la documentation

---

## 🔐 DOMAINE PERSONNALISÉ (Optionnel)

Si vous voulez un domaine comme `academie-runes.com` :

1. **Acheter le domaine** (Namecheap, Google Domains, etc.)
2. **Sur Cloudflare Pages** :
   - **Custom domains** → **Set up a custom domain**
   - Entrer le domaine acheté
   - Suivre les instructions DNS
3. **Résultat** : https://academie-runes.com (au lieu de .pages.dev)

**Coût** : ~$12/an pour le domaine

---

## ✅ CHECKLIST POST-DÉPLOIEMENT

Vérifier que tout fonctionne en ligne :

- [ ] Page d'accueil s'affiche correctement
- [ ] Mode nuit actif (fond sombre partout)
- [ ] Navigation entre pages fonctionne
- [ ] Mandalas s'affichent en plein écran
- [ ] Dashboard de progression accessible
- [ ] Animations de fond fonctionnent (demo-animated-bg.html)
- [ ] Upload de mandalas fonctionne (localStorage)
- [ ] Exercices interactifs fonctionnent
- [ ] Responsive mobile OK

---

## 🎯 COMMANDES RAPIDES

### Mise à jour rapide

```bash
cd "D:\Apprentissage_Runes_Gematria"
git add . && git commit -m "Mise à jour" && git push
```

### Voir les logs de déploiement

```bash
# Via Cloudflare dashboard
https://dash.cloudflare.com → Pages → gematria-academy → Deployments

# Ou via l'URL directe des logs
https://dash.cloudflare.com/[ACCOUNT_ID]/pages/view/gematria-academy
```

---

## 📊 STATISTIQUES CLOUDFLARE

Sur le dashboard, vous pouvez voir :
- 📈 Nombre de visiteurs
- 🌍 Pays d'origine
- 📱 Appareils utilisés (mobile/desktop)
- ⚡ Performance (temps de chargement)
- 🔒 Sécurité (attaques bloquées)

---

## 🔄 WORKFLOW COMPLET

```
LOCAL                  GITHUB              CLOUDFLARE PAGES
┌─────────┐            ┌─────────┐         ┌──────────────┐
│ Modifier│  git push  │  Repo   │  Auto   │   Site Web   │
│ fichiers├───────────>│ GitHub  ├────────>│   https://   │
│  .html  │            │         │ Deploy  │ gematria-... │
└─────────┘            └─────────┘         └──────────────┘
     ↓                                              ↓
 Ctrl+S                                     Accessible
                                           mondialement
```

---

## 🎉 FÉLICITATIONS !

Votre **Académie des Runes & Gematria** est maintenant accessible partout dans le monde ! 🌍✨

**Partagez l'URL :** https://gematria-academy.pages.dev

---

## 📞 SUPPORT

**Cloudflare Pages Docs :** https://developers.cloudflare.com/pages/
**Community Forum :** https://community.cloudflare.com/

**GitHub Repo :** https://github.com/JirA44/gematria-academy
