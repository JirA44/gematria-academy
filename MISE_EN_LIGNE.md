# 🌐 MISE EN LIGNE DE L'ACADÉMIE

## ✅ OBJECTIF

Transformer l'académie de `file:///D:/...` en site web accessible via `https://academie-runes.pages.dev`

---

## 🚀 SOLUTION RECOMMANDÉE : CLOUDFLARE PAGES

**Avantages :**
- ✅ 100% GRATUIT et illimité
- ✅ HTTPS automatique
- ✅ Déploiement en 2 minutes
- ✅ Mises à jour instantanées
- ✅ Pas de serveur à gérer
- ✅ Performance mondiale (CDN)
- ✅ Compatible avec GitHub

---

## 📋 MÉTHODE 1 : GITHUB + CLOUDFLARE PAGES (Recommandée)

### Étape 1 : Créer un dépôt GitHub

1. **Aller sur GitHub** : https://github.com
2. **Créer un nouveau repository** : "academie-runes-gematria"
3. **Public ou Private** (les deux fonctionnent)

### Étape 2 : Pousser les fichiers

```bash
cd "D:\Apprentissage_Runes_Gematria"
git init
git add .
git commit -m "Initial commit - Académie Runes & Gematria"
git branch -M main
git remote add origin https://github.com/VOTRE_NOM/academie-runes-gematria.git
git push -u origin main
```

### Étape 3 : Déployer sur Cloudflare Pages

1. **Aller sur Cloudflare Pages** : https://pages.cloudflare.com
2. **Se connecter** avec votre compte Cloudflare
3. **Create a project** → **Connect to Git**
4. **Sélectionner le repo** "academie-runes-gematria"
5. **Configuration :**
   - Build command : `(vide)`
   - Build output directory : `/`
   - Root directory : `(vide)`
6. **Save and Deploy**

**Résultat :** Votre site sera en ligne à `https://academie-runes-gematria.pages.dev`

---

## 📋 MÉTHODE 2 : UPLOAD DIRECT (Plus simple)

### Via Cloudflare Pages Direct Upload

1. **Aller sur Cloudflare Pages** : https://pages.cloudflare.com
2. **Create a project** → **Direct Upload**
3. **Nom du projet** : `academie-runes`
4. **Zipper le dossier** `D:\Apprentissage_Runes_Gematria`
5. **Uploader le ZIP**
6. **Deploy**

**Résultat :** Site en ligne en 2 minutes !

---

## 📋 MÉTHODE 3 : NETLIFY (Alternative)

1. **Aller sur Netlify** : https://www.netlify.com
2. **Drag & drop** le dossier `D:\Apprentissage_Runes_Gematria`
3. **Deploy**

**Résultat :** `https://academie-runes.netlify.app`

---

## 🔗 DOMAINE PERSONNALISÉ (Optionnel)

### Acheter un domaine

1. **Namecheap**, **Google Domains**, **Cloudflare Registrar**
2. Acheter `academie-runes-gematria.com` (~$12/an)

### Connecter le domaine

**Sur Cloudflare Pages :**
1. **Custom domains** → **Add domain**
2. Entrer `academie-runes-gematria.com`
3. Suivre les instructions DNS

**Résultat :** `https://academie-runes-gematria.com`

---

## 📱 QR CODE AUTOMATIQUE

Une fois en ligne, créer un QR code vers votre site :

```javascript
// Sur qr-code-site.html, mettre :
const siteURL = 'https://academie-runes-gematria.pages.dev';
```

---

## 🔄 MISES À JOUR

### Avec GitHub

```bash
cd "D:\Apprentissage_Runes_Gematria"
git add .
git commit -m "Mise à jour - nouveaux exercices"
git push
```

**Résultat :** Site mis à jour automatiquement en 30 secondes !

### Avec Direct Upload

1. Re-zipper le dossier
2. Uploader nouvelle version sur Cloudflare Pages

---

## ✅ CHECKLIST AVANT MISE EN LIGNE

- [ ] Vérifier que toutes les pages s'ouvrent localement
- [ ] Vérifier les liens entre pages (pas de chemins absolus)
- [ ] Tester le mode nuit sur toutes les pages
- [ ] Vérifier que les mandalas uploadés fonctionnent
- [ ] Tester le système de progression
- [ ] Vérifier les exercices interactifs

---

## 🎯 COMMANDES RAPIDES

### Initialiser Git (si pas déjà fait)

```bash
cd "D:\Apprentissage_Runes_Gematria"
git init
git add .
git commit -m "🚀 Académie Runes & Gematria - Version initiale"
```

### Créer le repo GitHub

```bash
# Via GitHub CLI
gh repo create academie-runes-gematria --public
git remote add origin https://github.com/VOTRE_NOM/academie-runes-gematria.git
git push -u origin main
```

---

## 🌐 ALTERNATIVE : SERVEUR LOCAL ACCESSIBLE

Si vous voulez juste tester en réseau local :

```bash
cd "D:\Apprentissage_Runes_Gematria"
python -m http.server 8000
```

**Accès :**
- Local : `http://localhost:8000`
- Réseau : `http://VOTRE_IP:8000`

### Avec tunnel Cloudflare (accessible partout)

```bash
cloudflared tunnel --url http://localhost:8000
```

**Résultat :** URL publique temporaire `https://xxx.trycloudflare.com`

---

## 📊 COMPARAISON DES OPTIONS

| Solution | Gratuit | Permanent | HTTPS | CDN | Vitesse |
|----------|---------|-----------|-------|-----|---------|
| Cloudflare Pages | ✅ | ✅ | ✅ | ✅ | ⚡⚡⚡ |
| Netlify | ✅ | ✅ | ✅ | ✅ | ⚡⚡⚡ |
| GitHub Pages | ✅ | ✅ | ✅ | ✅ | ⚡⚡ |
| Vercel | ✅ | ✅ | ✅ | ✅ | ⚡⚡⚡ |
| Cloudflare Tunnel | ✅ | ❌ | ✅ | ✅ | ⚡⚡ |
| Python Server | ✅ | ❌ | ❌ | ❌ | ⚡ |

**Recommandation :** Cloudflare Pages (le plus rapide et fiable)

---

## 🎉 APRÈS LA MISE EN LIGNE

Votre académie sera accessible depuis :
- 📱 Smartphone
- 💻 Ordinateur
- 📱 Tablette
- 🌍 N'importe où dans le monde

**Plus de `file:///` → Maintenant `https://` !**

---

## ❓ BESOIN D'AIDE ?

1. **Documentation Cloudflare Pages :** https://developers.cloudflare.com/pages/
2. **Tutoriel vidéo :** Rechercher "Cloudflare Pages deploy"
3. **Support :** https://community.cloudflare.com/

---

## 🚀 COMMANDE ULTRA-RAPIDE (All-in-One)

```bash
cd "D:\Apprentissage_Runes_Gematria"

# Initialiser Git
git init
git add .
git commit -m "Académie Runes & Gematria"

# Créer repo GitHub
gh repo create academie-runes-gematria --public --source=. --remote=origin --push

# Ensuite sur Cloudflare Pages :
# 1. Connect to Git
# 2. Sélectionner le repo
# 3. Deploy
```

**DONE !** Site en ligne en 5 minutes ! 🎉
