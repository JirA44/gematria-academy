# 📚 SYSTÈME DE PROGRESSION PÉDAGOGIQUE

## ✅ OBJECTIF

Permettre une progression **débutant → intermédiaire → expert** avec validation de maîtrise à chaque niveau.

---

## 🎯 PRINCIPE

### Déblocage progressif
1. **Débutant** : Accessible immédiatement
2. **Intermédiaire** : Débloqué après maîtrise du débutant (≥70%)
3. **Expert** : Débloqué après maîtrise de l'intermédiaire (≥75%)

### Seuils de maîtrise
- **Débutant** : 70% + minimum 3 exercices
- **Intermédiaire** : 75% + minimum 3 exercices
- **Expert** : 80% + minimum 3 exercices

### Retests illimités
L'apprenant peut **refaire les exercices autant de fois qu'il veut**. Le système garde :
- Le **meilleur score** de chaque exercice
- L'**historique complet** des tentatives
- La **moyenne** calculée sur les meilleurs scores

---

## 📁 FICHIERS CRÉÉS

### 1. progression-system.js
**Système JavaScript complet** de gestion de progression

**Fonctions principales :**
- `sauvegarderResultat(domaine, niveau, exerciceId, score)` - Enregistrer un résultat
- `chargerProgression(domaine, niveau)` - Charger la progression d'un niveau
- `estNiveauAccessible(domaine, niveau)` - Vérifier si accessible
- `afficherDeblocage(domaine, niveau)` - Modal de déblocage
- `bloquerAcces(domaine, niveau)` - Bloquer accès niveau verrouillé
- `obtenirProgressionComplete()` - Progression de tous les domaines
- `obtenirStatistiquesGlobales()` - Stats globales

**Stockage :**
- LocalStorage du navigateur
- Clés : `progression_{domaine}_{niveau}`
- Format JSON avec toutes les données

### 2. progression-dashboard.html
**Tableau de bord visuel** de la progression

**Affiche :**
- Stats globales (progression %, niveaux maîtrisés, score moyen)
- Progression par domaine (hiéroglyphes, maya, runes, gematria, logique)
- État de chaque niveau (débutant, intermédiaire, expert)
- Barres de progression visuelles
- Badges de niveau
- Indicateurs de déblocage (🔒/✅)

---

## 🔧 INTÉGRATION DANS LES PAGES

### Étape 1 : Charger le script
Ajouter dans le `<head>` de chaque page d'exercice :

```html
<script src="progression-system.js"></script>
```

### Étape 2 : Vérifier l'accès au chargement
Au chargement de la page, vérifier si le niveau est accessible :

```javascript
document.addEventListener('DOMContentLoaded', () => {
    const domaine = 'hieroglyphes'; // ou maya, runes, etc.
    const niveau = 'intermediaire';  // ou debutant, expert

    if (!ProgressionSystem.estNiveauAccessible(domaine, niveau)) {
        ProgressionSystem.bloquerAcces(domaine, niveau);
        return; // Bloquer le reste du code
    }
});
```

### Étape 3 : Sauvegarder les résultats
Quand un exercice est complété :

```javascript
function validerExercice() {
    // Calculer le score (0-100)
    const score = calculerScore(); // Votre fonction de calcul

    // Sauvegarder
    const result = ProgressionSystem.sauvegarderResultat(
        'hieroglyphes',  // domaine
        'debutant',      // niveau
        'exercice_1',    // ID unique de l'exercice
        score            // score obtenu
    );

    // Vérifier si niveau débloqué
    if (result.niveauDebloque && !result.dejaAffiche) {
        ProgressionSystem.afficherDeblocage('hieroglyphes', 'debutant');
        result.dejaAffiche = true;
    }

    // Afficher le résultat
    alert(`Score : ${score}% - Meilleur score : ${result.meilleurScore}%`);
}
```

### Étape 4 : Lien vers le dashboard
Ajouter un bouton dans chaque page :

```html
<a href="progression-dashboard.html" class="btn">
    📊 Voir ma progression
</a>
```

---

## 📊 DONNÉES STOCKÉES

### Par niveau (exemple : hieroglyphes-debutant)
```json
{
  "domaine": "hieroglyphes",
  "niveau": "debutant",
  "exercices": {
    "exercice_1": [
      { "score": 60, "date": "2025-01-15T10:30:00Z", "timestamp": 1737801000000 },
      { "score": 75, "date": "2025-01-15T11:00:00Z", "timestamp": 1737802800000 },
      { "score": 85, "date": "2025-01-15T12:00:00Z", "timestamp": 1737806400000 }
    ],
    "exercice_2": [
      { "score": 70, "date": "2025-01-15T13:00:00Z", "timestamp": 1737810000000 }
    ]
  },
  "scoreMoyen": 78,        // (85 + 70) / 2
  "nombreExercices": 2,
  "nombreTentatives": 4,
  "meilleurScore": 85,
  "maitrise": true,        // scoreMoyen >= 70 && nombreExercices >= 3
  "niveauDebloque": true,  // si maîtrise = true
  "premierAcces": "2025-01-15T10:00:00Z",
  "dernierAcces": "2025-01-15T13:00:00Z"
}
```

### Global par domaine
```json
{
  "domaine": "hieroglyphes",
  "niveauxMaitrises": 2,     // débutant + intermédiaire
  "scoreGlobalMoyen": 76,     // moyenne des 3 niveaux
  "totalExercices": 7,
  "totalTentatives": 15,
  "niveauActuel": "expert",   // débutant | intermediaire | expert
  "maitrise": false,          // true si les 3 niveaux maîtrisés
  "dernierAcces": "2025-01-15T15:00:00Z"
}
```

---

## 🎮 EXEMPLE D'UTILISATION

### Page hieroglyphes-debutant.html

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Hiéroglyphes - Débutant</title>
    <link rel="stylesheet" href="force-dark-mode.css">
    <script src="progression-system.js"></script>
</head>
<body>
    <h1>𓂀 Hiéroglyphes - Débutant</h1>

    <!-- Exercice 1 -->
    <div class="exercise" id="exercise1">
        <h3>Exercice 1 : Reconnaissance</h3>
        <!-- Contenu de l'exercice -->
        <button onclick="validerExercice1()">Valider</button>
    </div>

    <a href="progression-dashboard.html" class="btn">📊 Voir ma progression</a>

    <script>
        const DOMAINE = 'hieroglyphes';
        const NIVEAU = 'debutant';

        // Fonction de validation exercice 1
        function validerExercice1() {
            // Calculer le score (exemple simplifié)
            const bonnesReponses = 8;
            const totalQuestions = 10;
            const score = Math.round((bonnesReponses / totalQuestions) * 100);

            // Sauvegarder
            const result = ProgressionSystem.sauvegarderResultat(
                DOMAINE,
                NIVEAU,
                'reconnaissance_symboles',
                score
            );

            // Afficher résultat
            alert(`✅ Score : ${score}%\nMeilleur score : ${result.meilleurScore}%\nMoyenne niveau : ${result.scoreMoyen}%`);

            // Déblocage ?
            if (result.niveauDebloque && score === result.meilleurScore) {
                ProgressionSystem.afficherDeblocage(DOMAINE, NIVEAU);
            }
        }
    </script>
</body>
</html>
```

---

## 🔐 CONTRÔLE D'ACCÈS

### Page hieroglyphes-intermediaire.html

```html
<script>
    document.addEventListener('DOMContentLoaded', () => {
        // Vérifier l'accès
        if (!ProgressionSystem.estNiveauAccessible('hieroglyphes', 'intermediaire')) {
            ProgressionSystem.bloquerAcces('hieroglyphes', 'intermediaire');
            return;
        }

        // Si accessible, continuer normalement
        console.log('✅ Niveau intermédiaire accessible');
    });
</script>
```

---

## 🎨 DASHBOARD

### Accès
Ouvrir `progression-dashboard.html` pour voir :

- **Stats globales** : Progression %, niveaux maîtrisés, score moyen
- **5 domaines** : Hiéroglyphes, Maya, Runes, Gematria, Logique
- **3 niveaux par domaine** : Débutant, Intermédiaire, Expert
- **Indicateurs visuels** : Barres de progression, badges, emojis 🔒/✅

### Bouton d'accès dans index_COMPLET.html

Ajouter dans la page d'accueil :

```html
<a href="progression-dashboard.html" class="btn" style="
    display: block;
    max-width: 300px;
    margin: 2rem auto;
    text-align: center;
">
    📊 Voir ma progression
</a>
```

---

## ✅ AVANTAGES

### Pour l'apprenant
1. **Motivation** : Voir sa progression
2. **Objectifs clairs** : Seuils à atteindre
3. **Retests illimités** : S'améliorer sans limite
4. **Déblocages récompensants** : Modales de félicitations
5. **Historique complet** : Voir son évolution

### Pour l'apprentissage
1. **Progression structurée** : Pas de saut de niveau
2. **Maîtrise validée** : Seuils minimum à respecter
3. **Pratique répétée** : Encouragement des retests
4. **Suivi précis** : Statistiques détaillées
5. **Persistance** : Données sauvegardées localement

---

## 🔄 PROCHAINES ÉTAPES

### Intégration complète
1. ✅ Système créé (progression-system.js)
2. ✅ Dashboard créé (progression-dashboard.html)
3. ⏳ Intégrer dans les pages Hiéroglyphes (3 pages)
4. ⏳ Intégrer dans les pages Maya (3 pages)
5. ⏳ Intégrer dans les pages Runes (3 pages) - déjà localStorage, adapter
6. ⏳ Intégrer dans les pages Gematria (3 pages) - déjà localStorage, adapter
7. ⏳ Intégrer dans les pages Logique (3 pages) - déjà localStorage, adapter
8. ⏳ Ajouter bouton dashboard dans index_COMPLET.html

### Améliorations futures
- Certificats de maîtrise
- Graphiques d'évolution temporelle
- Comparaison avec objectifs personnalisés
- Export/import de progression
- Système de badges/récompenses

---

## 📝 CHECKLIST D'INTÉGRATION

Pour chaque page d'exercice :

- [ ] Ajouter `<script src="progression-system.js"></script>`
- [ ] Vérifier accès au chargement (bloquerAcces si besoin)
- [ ] Identifier tous les exercices/quiz
- [ ] Donner un ID unique à chaque exercice
- [ ] Appeler sauvegarderResultat() après validation
- [ ] Afficher déblocage si niveau maîtrisé
- [ ] Ajouter lien vers dashboard
- [ ] Tester : débutant → intermédiaire → expert

---

## 🎯 RÉSULTAT FINAL

**Un apprenant peut :**
1. Commencer au niveau débutant
2. Faire et refaire les exercices jusqu'à maîtrise (≥70%)
3. Débloquer automatiquement le niveau intermédiaire
4. Progresser de la même manière jusqu'à expert
5. Voir sa progression globale sur le dashboard
6. Maîtriser l'académie complète (5 domaines × 3 niveaux = 15 niveaux)

**Progression garantie par la pratique et les retests !** ✅
