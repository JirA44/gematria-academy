# 🕉️ Dossier Mandalas

Ce dossier contient vos images de mandalas qui seront affichées sur la page de contemplation.

## 📸 Comment ajouter vos mandalas

### Méthode 1 : Ajouter des fichiers permanents (recommandé)

1. **Placez vos images** dans ce dossier `/mandalas/`
   - Formats acceptés : `.jpg`, `.png`, `.svg`, `.webp`
   - Nommez vos fichiers de manière descriptive
   - Exemple : `mandala-essénien-1.jpg`, `fleur-de-vie.png`, etc.

2. **Éditez le fichier `mandalas-list.js`**
   - Ouvrez `mandalas-list.js` dans un éditeur de texte
   - Ajoutez vos noms de fichiers dans le tableau `MANDALA_FILES`

   Exemple :
   ```javascript
   const MANDALA_FILES = [
       'mandala-essénien-1.jpg',
       'mandala-essénien-2.jpg',
       'fleur-de-vie.png',
       'sri-yantra.jpg',
       'lotus-sacre.png',
   ];
   ```

3. **Commit et push vers GitHub**
   ```bash
   git add mandalas/
   git commit -m "Ajout de mes mandalas personnels"
   git push
   ```

4. **Vos mandalas seront maintenant accessibles sur** :
   - https://gematria-academy.pages.dev/mandala

### Méthode 2 : Upload temporaire via l'interface

1. Cliquez sur le symbole **∞** dans la section Mandalas de la page d'accueil
2. Cliquez sur le bouton **"+"** (apparaît au survol)
3. Sélectionnez vos images de mandalas
4. Naviguez avec les flèches **←** **→**

⚠️ **Note** : Les mandalas uploadés via l'interface sont stockés dans le `localStorage` du navigateur et peuvent être perdus si vous videz le cache.

## 🎨 Mandalas par défaut

Si aucun mandala n'est trouvé, 8 mandalas SVG magnifiques seront affichés par défaut :
1. Fleur de Vie (violet/mauve)
2. Sri Yantra (rouge/orange/jaune)
3. Lotus (vert/cyan)
4. Étoile géométrique 12 branches (rose/violet)
5. Cercles concentriques (bleu/cyan/vert)
6. Mandala floral 8 pétales (orange/rouge/jaune)
7. Mandala tibétain (bleu/rouge)
8. Spirale sacrée (violet/mauve)

## 📝 Conseils pour vos images

- **Résolution** : 1920x1920 pixels ou plus pour une qualité optimale
- **Format** : Préférez `.jpg` pour les photos, `.png` pour les graphiques avec transparence
- **Taille** : Essayez de garder chaque fichier sous 2-3 MB pour un chargement rapide
- **Orientation** : Les images carrées fonctionnent le mieux

## 🧘 Utilisation pour la contemplation

1. Appuyez sur **F11** pour le mode plein écran
2. Naviguez avec les flèches **←** **→** ou les boutons de navigation
3. Fixez le centre du mandala
4. Respirez profondément
5. Laissez votre esprit se calmer

## 🔮 Mandalas Esséniens

Les mandalas esséniens, transmis par les archanges après les années 2000, sont particulièrement puissants pour :
- La connexion angélique
- La guérison spirituelle
- La méditation profonde
- L'harmonisation des énergies

N'hésitez pas à ajouter vos mandalas esséniens personnels dans ce dossier !

---

**Pour toute question, consultez la documentation du projet.**
