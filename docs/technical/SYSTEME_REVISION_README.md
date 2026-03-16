# 🔄 Système de Révision Espacée - Documentation

## 📖 Vue d'ensemble

Le système de révision espacée utilise l'**algorithme SM-2** (SuperMemo 2) pour optimiser la mémorisation à long terme. Il permet aux étudiants de réviser les connaissances déjà acquises au moment optimal pour maximiser la rétention.

---

## 🧠 Principe de la Révision Espacée

### Qu'est-ce que la Révision Espacée ?

La révision espacée (spaced repetition) est une technique d'apprentissage scientifiquement prouvée qui consiste à réviser l'information juste avant de l'oublier. Les intervalles entre les révisions augmentent progressivement à mesure que vous maîtrisez le contenu.

### Pourquoi ça fonctionne ?

- **Courbe de l'oubli** : Sans révision, nous oublions 50% de l'information en quelques jours
- **Consolidation** : Chaque révision renforce les connexions neuronales
- **Optimisation** : Les intervalles sont calculés pour maximiser l'effort de rappel sans surcharge

---

## 🎯 Algorithme SM-2

### Principe

Le système utilise l'algorithme SM-2 (SuperMemo 2), développé par Piotr Wozniak :

1. **Facteur de facilité (EF)** : Commence à 2.5 pour chaque carte
2. **Intervalle** : Augmente selon la formule :
   - 1ère répétition réussie : 1 jour
   - 2ème répétition réussie : 6 jours
   - Répétitions suivantes : intervalle × EF

3. **Qualité de la réponse (Q)** :
   - 0-2 : Réponse incorrecte → Redémarrer à 1 jour
   - 3-5 : Réponse correcte → Augmenter l'intervalle

4. **Ajustement du facteur** :
   ```
   EF' = EF + (0.1 - (5 - Q) × (0.08 + (5 - Q) × 0.02))
   EF_min = 1.3
   ```

### Exemple de Progression

| Révision | Qualité | Intervalle | Prochain |
|----------|---------|-----------|----------|
| 1 | ✅ 4 | 1 jour | Demain |
| 2 | ✅ 4 | 6 jours | Dans 6 jours |
| 3 | ✅ 5 | 15 jours | Dans 15 jours |
| 4 | ❌ 1 | 1 jour | Demain (reset) |
| 5 | ✅ 4 | 1 jour | Demain |
| 6 | ✅ 4 | 6 jours | Dans 6 jours |

---

## 📁 Architecture du Système

### Fichiers Créés

1. **spaced-repetition.js** (520 lignes)
   - Classe `SpacedRepetitionSystem`
   - Classe `ReviewSession`
   - Classe `ReviewUI`
   - Algorithme SM-2
   - Gestion du planning

2. **spaced-repetition.css** (600 lignes)
   - Interface de révision
   - Animations
   - Responsive design

---

## 🔧 Classes Principales

### SpacedRepetitionSystem

Gestionnaire principal du système de révision.

#### Méthodes Clés

```javascript
// Ajouter une question au planning
addToReviewSchedule(lessonId, questionIndex)

// Obtenir les révisions dues aujourd'hui
getDueReviews()

// Enregistrer une révision
recordReview(key, wasCorrect, timeSpent)

// Obtenir les statistiques
getReviewStats()

// Démarrer une session
startReviewSession()

// Initialiser pour une leçon
initializeForLesson(lessonId)
```

#### Structure des Données

```javascript
reviewSchedule = {
  'lesson-id_q0': {
    lessonId: 'rune-fehu',
    questionIndex: 0,
    interval: 6,              // Jours avant prochaine révision
    repetitions: 2,           // Nombre de répétitions réussies
    easeFactor: 2.5,          // Facteur de facilité (SM-2)
    nextReview: '2025-01-26', // Date de la prochaine révision
    lastReview: '2025-01-20', // Dernière révision
    correctStreak: 2,         // Série de bonnes réponses
    totalReviews: 3,          // Total de révisions
    correctReviews: 2         // Bonnes réponses
  }
}
```

### ReviewSession

Gestion d'une session de révision.

#### Méthodes

```javascript
// Obtenir la question actuelle
getCurrentQuestion()

// Soumettre une réponse
submitAnswer(selectedIndex)

// Passer à la question suivante
nextQuestion()

// Obtenir les résultats
getSessionResults()
```

### ReviewUI

Interface utilisateur du système.

#### Méthodes

```javascript
// Afficher le panneau principal
showReviewPanel()

// Démarrer une session
startSession()

// Afficher une question
showQuestion()

// Sélectionner une réponse
selectAnswer(index)

// Question suivante
nextQuestion()

// Afficher les résultats
showSessionResults()
```

---

## 💾 Stockage des Données

### localStorage Keys

```javascript
// Planning de révision
review_schedule = {
  'lesson-id_q0': { ... },
  'lesson-id_q1': { ... }
}

// Historique de révision
review_history = [
  {
    key: 'rune-fehu_q0',
    lessonId: 'rune-fehu',
    questionIndex: 0,
    wasCorrect: true,
    timeSpent: 12, // secondes
    date: '2025-01-20T10:30:00.000Z',
    interval: 6
  }
]
```

---

## 📊 Statistiques Disponibles

### Statistiques Globales

```javascript
{
  totalCards: 20,              // Total de cartes en révision
  dueToday: 5,                 // À réviser aujourd'hui
  reviewedLast7Days: 35,       // Révisées dans les 7 derniers jours
  accuracyLast7Days: 87,       // Précision sur 7 jours (%)
  averageRetention: 85,        // Taux de rétention moyen (%)
  currentStreak: 7,            // Série actuelle (jours consécutifs)
  longestStreak: 14            // Plus longue série
}
```

---

## 🎨 Interface Utilisateur

### Bouton Flottant

Un bouton **🔄 Révision** apparaît en bas à droite (au-dessus du bouton Dashboard) :
- Couleur : Orange (#ff9800)
- Position : fixed, bottom: 110px, right: 30px
- Animation de pulsation
- Disparaît sur mobile (icône seule)

### Panneau Principal

Affiche :
1. **Statistiques** : Cartes totales, dues aujourd'hui, rétention, série
2. **CTA** : Bouton "🚀 Commencer la révision" si révisions disponibles
3. **Message de complétion** : Si toutes les révisions sont à jour
4. **Informations** : Explication du système
5. **Historique** : Statistiques sur 7 jours

### Session de Révision

1. **Barre de progression** : Affiche question X/Y
2. **Question** : Texte de la question
3. **Options** : 4 boutons de réponse
4. **Feedback immédiat** :
   - ✅ Vert si correct
   - ❌ Rouge si incorrect
   - Explication détaillée
5. **Bouton suivant** : "Question suivante →"

### Résultats de Session

1. **Score circulaire** : Pourcentage de précision
2. **Statistiques** :
   - Réponses correctes (X/Y)
   - Temps moyen par question
   - Temps total
3. **Message** :
   - ≥80% : "Excellente mémoire !"
   - <80% : "Continuez à réviser !"

---

## 🚀 Utilisation

### Pour les Étudiants

#### 1. Validation d'une Leçon

Quand vous validez une leçon avec succès (≥80%), **toutes les questions** de cette leçon sont automatiquement ajoutées au planning de révision.

#### 2. Révisions Quotidiennes

1. Cliquez sur le bouton **🔄 Révision**
2. Consultez combien de questions sont à réviser
3. Cliquez sur **🚀 Commencer la révision**
4. Répondez aux 10 questions (ou moins si moins disponibles)
5. Consultez vos résultats

#### 3. Objectif Quotidien

- **10 questions par jour** recommandé
- Prend environ **5-10 minutes**
- Permet de réviser **50 questions** en une semaine

#### 4. Série de Jours Consécutifs

Maintenez une série en révisant **au moins 1 question par jour** :
- 🔥 7 jours : Bonne habitude !
- 🔥 14 jours : Excellent !
- 🔥 30 jours : Maître de la discipline !

### Pour les Développeurs

#### Initialiser Automatiquement

Le système s'initialise automatiquement quand une leçon est validée :

```javascript
// Événement déclenché automatiquement
window.addEventListener('lessonValidated', (e) => {
    spacedRepetition.initializeForLesson(e.detail.lessonId);
});
```

#### Démarrer une Session Manuellement

```javascript
const session = spacedRepetition.startReviewSession();
if (session) {
    // Session démarrée
} else {
    // Aucune révision disponible
}
```

#### Obtenir les Statistiques

```javascript
const stats = spacedRepetition.getReviewStats();
console.log(`${stats.dueToday} révisions aujourd'hui`);
```

---

## 📈 Métriques de Performance

### Optimisations

- ✅ Stockage localStorage (rapide et local)
- ✅ Calculs algorithmiques optimisés
- ✅ Limitation de l'historique (1000 entrées max)
- ✅ Tri efficace des révisions dues
- ✅ Animations CSS (GPU-accelerated)

### Taille

- **JavaScript** : ~520 lignes (~15 KB)
- **CSS** : ~600 lignes (~12 KB)
- **Total** : ~27 KB (non compressé)

---

## 🔬 Science derrière le Système

### Recherches

Le système est basé sur des décennies de recherche cognitive :

1. **Hermann Ebbinghaus (1885)** : Courbe de l'oubli
2. **Piotr Wozniak (1987)** : Algorithme SM-2
3. **Bjork & Bjork (1992)** : "New Theory of Disuse"
4. **Cepeda et al. (2006)** : Méta-analyse de 300+ études

### Efficacité Prouvée

- **2-3× meilleure rétention** vs révision massive
- **50% moins de temps** pour le même niveau de maîtrise
- **Effets durables** : Rétention de 80%+ après 1 an

---

## 🎯 Objectifs Pédagogiques

### Pour l'Étudiant

- ✅ **Rétention à long terme** : 80%+ après plusieurs mois
- ✅ **Efficacité** : 10 min/jour suffisent
- ✅ **Motivation** : Série de jours, statistiques
- ✅ **Autonomie** : Système automatique

### Pour le Système

- ✅ **Algorithme scientifique** (SM-2)
- ✅ **Personnalisation** : Adapté à chaque étudiant
- ✅ **Suivi précis** : Historique complet
- ✅ **Gamification** : Séries, statistiques

---

## 🔮 Améliorations Futures

### Court Terme (1-2 semaines)

- [ ] Notifications de révision (Web Push)
- [ ] Graphique de progression (Chart.js)
- [ ] Mode "cramming" (révision intensive)
- [ ] Export des données de révision

### Moyen Terme (1-2 mois)

- [ ] Algorithme SM-17 (version améliorée)
- [ ] Priorisation des questions difficiles
- [ ] Révision par catégorie
- [ ] Mode audio (questions parlées)

### Long Terme (3-6 mois)

- [ ] IA prédictive (prédire l'oubli)
- [ ] Synchronisation cloud
- [ ] Partage de decks
- [ ] Révision collaborative

---

## 📊 Comparaison avec d'autres Systèmes

| Fonctionnalité | Notre Système | Anki | Quizlet | Memrise |
|----------------|---------------|------|---------|---------|
| Algorithme SM-2 | ✅ | ✅ | ❌ | ✅ |
| Gratuit | ✅ | ✅ | Limité | Limité |
| Hors ligne | ✅ | ✅ | ❌ | ❌ |
| Intégré à l'Académie | ✅ | ❌ | ❌ | ❌ |
| Auto-initialisation | ✅ | ❌ | ❌ | ❌ |
| Statistiques avancées | ✅ | ✅ | ✅ | ✅ |

---

## 🎓 Guide d'Utilisation Optimal

### Routine Recommandée

**Matin (5-10 min)** :
1. Ouvrir l'Académie
2. Cliquer sur 🔄 Révision
3. Faire les révisions du jour
4. Maintenir la série 🔥

**Après une leçon** :
1. Passer le quiz de validation
2. Valider avec 80%+
3. Les questions sont automatiquement ajoutées
4. Première révision : demain

**Hebdomadaire** :
1. Consulter les statistiques
2. Vérifier le taux de rétention
3. Revoir les questions difficiles

---

## ✅ Checklist de Déploiement

- [x] Algorithme SM-2 implémenté
- [x] Système de planning créé
- [x] Interface utilisateur complète
- [x] Statistiques et métriques
- [x] Stockage localStorage
- [x] Auto-initialisation
- [x] Bouton flottant
- [x] Session de révision
- [x] Résultats détaillés
- [x] Responsive design
- [x] Animations fluides
- [x] Documentation complète

---

## 🔗 Ressources

### Algorithmes de Révision Espacée

- [SuperMemo Algorithm](https://www.supermemo.com/en/archives1990-2015/english/ol/sm2)
- [Anki Manual](https://docs.ankiweb.net/)
- [Gwern - Spaced Repetition](https://gwern.net/spaced-repetition)

### Recherches Scientifiques

- Ebbinghaus, H. (1885). "Memory: A Contribution to Experimental Psychology"
- Wozniak, P. (1990). "Optimization of learning"
- Cepeda et al. (2006). "Distributed practice in verbal recall tasks"

---

**🔄 Système créé avec rigueur scientifique pour l'Académie des Sagesses Ésotériques**

*Basé sur l'algorithme SM-2 et des décennies de recherche cognitive*

---

## 💡 En Résumé

Le système de révision espacée transforme l'apprentissage en :
- ✅ Révisant au **moment optimal**
- ✅ **Réduisant le temps** d'étude de 50%
- ✅ **Augmentant la rétention** à long terme
- ✅ Rendant l'apprentissage **durable et efficace**

**10 minutes par jour suffisent pour ne jamais oublier ce que vous avez appris ! 🧠✨**
