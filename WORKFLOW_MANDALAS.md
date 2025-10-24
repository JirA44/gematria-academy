# 🕉️ WORKFLOW COMPLET DES MANDALAS

## 📋 LES 3 PAGES CRÉÉES

### 1. `upload-mandalas.html` - PAGE D'UPLOAD
**Objectif :** Uploader et gérer vos mandalas

**Fonctionnalités :**
- ✅ Upload multiple (glisser-déposer ou sélection)
- ✅ Galerie avec miniatures
- ✅ Compteur d'images
- ✅ Suppression individuelle (bouton ×)
- ✅ Suppression totale
- ✅ Bouton "Voir en mode contemplation" → va vers mandala.html

**Utilisation :**
1. Ouvrir `upload-mandalas.html`
2. Glisser plusieurs images OU cliquer "Choisir des fichiers"
3. Sélectionner plusieurs mandalas (Ctrl+Clic)
4. Les images apparaissent dans la galerie
5. Cliquer "👁️ Voir en mode contemplation"

---

### 2. `mandala.html` - PAGE DE CONTEMPLATION
**Objectif :** Contempler vos mandalas en plein écran

**Fonctionnalités :**
- ✅ Écran d'intro avec message "Sans mots, sans pensées"
- ✅ Affichage plein écran
- ✅ Navigation ← → (flèches ou clavier)
- ✅ Points indicateurs en bas
- ✅ Upload direct possible (bouton +)
- ✅ Interface auto-cachée (apparaît au survol)

**Utilisation :**
1. Ouvrir `mandala.html`
2. Cliquer sur ∞ pour commencer
3. Naviguer avec ← → ou clavier
4. Appuyer F11 pour plein écran
5. Contempler en silence

---

### 3. `mandala-with-defaults.html` - AVEC MANDALAS PAR DÉFAUT
**Objectif :** Tester sans uploader d'images

**Fonctionnalités :**
- ✅ 3 mandalas SVG géométriques pré-chargés
- ✅ Toutes les fonctions de mandala.html
- ✅ Possibilité d'ajouter vos propres images

**Utilisation :**
1. Ouvrir `mandala-with-defaults.html`
2. 3 mandalas déjà présents
3. Cliquer + pour ajouter les vôtres

---

## 🔄 WORKFLOW RECOMMANDÉ

### Option A : Upload puis Contemplation

```
1. Ouvrir upload-mandalas.html
   ↓
2. Uploader plusieurs mandalas (Ctrl+Clic)
   ↓
3. Voir la galerie se remplir
   ↓
4. Cliquer "👁️ Voir en mode contemplation"
   ↓
5. mandala.html s'ouvre avec vos images
   ↓
6. Cliquer ∞ pour commencer
   ↓
7. Contempler en mode plein écran
```

### Option B : Contemplation directe

```
1. Ouvrir mandala.html
   ↓
2. Cliquer ∞
   ↓
3. Cliquer + pour uploader
   ↓
4. Sélectionner plusieurs images
   ↓
5. Contempler directement
```

---

## 💾 STOCKAGE DES DONNÉES

### LocalStorage
Clé : `mandalaImages`
Format : `["data:image/png;base64...", "data:image/jpeg;base64...", ...]`

**Important :**
- Les 3 pages utilisent la MÊME clé LocalStorage
- Les images sont partagées entre toutes les pages
- Upload sur upload-mandalas.html → visible dans mandala.html
- Upload sur mandala.html → visible dans upload-mandalas.html

### Limite
- Maximum ~30 images (selon taille)
- Si dépassement → garde les 30 dernières
- Notification automatique

---

## 🔍 VÉRIFICATION DE L'AFFICHAGE

### Test 1 : Upload sur upload-mandalas.html
1. ✅ Ouvrir upload-mandalas.html
2. ✅ Uploader 3-5 mandalas
3. ✅ Vérifier qu'ils apparaissent dans la galerie
4. ✅ Compteur affiche "5 mandala(s)"
5. ✅ Cliquer "👁️ Voir en mode contemplation"
6. ✅ mandala.html s'ouvre
7. ✅ Cliquer ∞
8. ✅ Vérifier que les 5 mandalas s'affichent
9. ✅ Tester navigation ← →

### Test 2 : Upload direct sur mandala.html
1. ✅ Ouvrir mandala.html
2. ✅ Cliquer ∞
3. ✅ Cliquer + (en haut à droite)
4. ✅ Sélectionner plusieurs images
5. ✅ Vérifier qu'elles s'affichent
6. ✅ Points en bas = nombre d'images

### Test 3 : Vérification croisée
1. ✅ Uploader sur upload-mandalas.html
2. ✅ Fermer l'onglet
3. ✅ Ouvrir mandala.html
4. ✅ Vérifier que les images sont là
5. ✅ Ajouter une image via +
6. ✅ Ouvrir upload-mandalas.html
7. ✅ Vérifier que la nouvelle image apparaît

---

## 🎨 AFFICHAGE DES IMAGES

### Dans upload-mandalas.html
- **object-fit: cover** → Remplit le carré (peut couper)
- **aspect-ratio: 1** → Carré parfait
- **Grid responsive** → S'adapte à la largeur

### Dans mandala.html
- **object-fit: contain** → Image entière visible (pas de crop)
- **max-width: 100vw** → Ne dépasse pas l'écran
- **max-height: 100vh** → Ne dépasse pas l'écran
- **Centré** → Au milieu de l'écran noir

---

## 🐛 PROBLÈMES POTENTIELS

### Les images ne s'affichent pas dans mandala.html

**Cause possible :**
- LocalStorage vide
- Domaine différent (file:// vs http://)
- Navigateur en mode privé

**Solution :**
1. Ouvrir Console (F12)
2. Taper : `localStorage.getItem('mandalaImages')`
3. Si `null` → Ré-uploader les images
4. Si pas `null` → Recharger la page (Ctrl+R)

### Les images sont coupées

**Dans upload-mandalas.html :**
- Normal, c'est `object-fit: cover` pour la galerie

**Dans mandala.html :**
- Pas normal, devrait être `object-fit: contain`
- Vérifier le CSS ligne 113 dans mandala.html

### Le bouton + n'apparaît pas

**Cause :**
- Interface auto-cachée

**Solution :**
- Bouger la souris
- Le + apparaît en haut à droite au survol

---

## 📱 COMPATIBILITÉ

### Navigateurs testés
- ✅ Chrome/Edge (recommandé)
- ✅ Firefox
- ✅ Safari (peut avoir des limites de taille)

### Appareils
- ✅ Desktop
- ✅ Tablette
- ⚠️ Mobile (upload peut être limité)

### Formats d'image
- ✅ JPG/JPEG
- ✅ PNG
- ✅ GIF
- ✅ WebP
- ✅ SVG

---

## 🎯 PAGES OUVERTES ACTUELLEMENT

1. ✅ **upload-mandalas.html** - Pour uploader
2. ✅ **mandala.html** - Pour contempler

**Pour tester :**
1. Aller sur upload-mandalas.html
2. Uploader 3-5 mandalas
3. Cliquer "👁️ Voir en mode contemplation"
4. mandala.html s'ouvre avec vos images
5. Cliquer ∞
6. Vérifier que toutes les images sont là

---

## 💡 RECOMMANDATIONS

### Pour la meilleure expérience :

1. **Uploader d'abord** sur upload-mandalas.html
   - Plus facile de gérer plusieurs images
   - Galerie visuelle
   - Suppression sélective

2. **Contempler ensuite** sur mandala.html
   - Plein écran (F11)
   - Silence
   - Navigation fluide

3. **Taille des images**
   - Optimiser avant upload (< 2 Mo par image)
   - PNG pour la qualité
   - JPG pour la taille

4. **Nombre d'images**
   - 10-20 images idéal
   - Maximum ~30 (limite navigateur)

---

## ✅ CHECKLIST DE VÉRIFICATION

- [ ] upload-mandalas.html ouvre correctement
- [ ] Upload de plusieurs images fonctionne
- [ ] Galerie affiche les miniatures
- [ ] Compteur affiche le bon nombre
- [ ] Bouton "Voir en mode contemplation" redirige
- [ ] mandala.html ouvre avec les images
- [ ] Bouton ∞ lance la contemplation
- [ ] Navigation ← → fonctionne
- [ ] Points indicateurs apparaissent
- [ ] Images en plein écran (pas coupées)
- [ ] Retour sur upload-mandalas.html montre les mêmes images

---

**TOUT DEVRAIT FONCTIONNER PARFAITEMENT ! 🕉️✨**

*Si un problème persiste, vérifiez la console (F12) pour les erreurs*
