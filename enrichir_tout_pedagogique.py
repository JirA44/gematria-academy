#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Enrichit TOUTES les inscriptions pour que le contexte culturel contienne
EXPLICITEMENT les réponses à TOUTES les questions du quiz.

Principe : Ne JAMAIS tester une connaissance qui n'a pas été enseignée !
"""

import json

# Contextes enrichis massifs pour les inscriptions manquantes
CONTEXTES_ENRICHIS_MASSIF = {
    "pyramide_simple": """📐 **LA PYRAMIDE - MER EN ÉGYPTIEN**

**Nom égyptien de la pyramide :**
Les Égyptiens anciens appelaient la pyramide "**Mer**" (𓉐, prononcé "mèr"). Ce mot est totalement différent des autres symboles sacrés comme :
- **Benben** (pyramidion au sommet uniquement, pas la pyramide entière)
- **Djed** (pilier de stabilité d'Osiris)
- **Ankh** (croix de vie)

**Anatomie de la pyramide :**
Une pyramide égyptienne se compose de plusieurs parties :
1. **La base carrée** : Fondations massives alignées aux points cardinaux
2. **Les faces triangulaires** : 4 faces lisses orientées N-S-E-O
3. **Le pyramidion (Benben)** : Pierre pointue au sommet, souvent recouverte d'or ou d'électrum

**Le Benben - Pierre sacrée du sommet :**
Le **benben** (𓉐) est UNIQUEMENT la pierre pyramidale qui coiffe le sommet. C'est :
- Un symbole du **monticule primordial** de la création
- La première terre émergée du chaos aquatique (Noun)
- Le lieu où le dieu Atoum s'est manifesté
- Souvent recouvert d'or pour capter les rayons du soleil

**Attention à la confusion :**
- **Pyramide entière** = Mer (𓉐)
- **Pierre du sommet seulement** = Benben (𓉐 ou 𓐍𓐍𓐍)

**La Pyramide de Khéops :**
- **Nom égyptien** : "Akhet Khufu" (L'horizon de Khéops)
- **Hauteur originale** : 146,5 mètres
- **Hauteur actuelle** : 138,8 mètres (pyramidion disparu)
- **Blocs de pierre** : Environ 2,3 millions de blocs
- **Poids moyen par bloc** : 2,5 tonnes
- **Blocs les plus lourds** : Jusqu'à 80 tonnes (chambre du roi)
- **Temps de construction** : Environ 20 ans
- **Ouvriers** : Estimés entre 20 000 et 100 000
- **Alignement** : Précision incroyable (erreur < 0,05°)

**Technique de construction :**
Le hiéroglyphe 𓉐 représente la pyramide **vue de profil**, comme si vous la regardiez de côté. Cette vue latérale montre :
- Le triangle de la face
- La pente régulière à environ 51-52°
- La symétrie parfaite

**Fonction religieuse :**
La pyramide n'était pas qu'un tombeau, mais :
- **Machine d'ascension** : Rampe pour le pharaon vers le ciel
- **Rayon de soleil pétrifié** : Les faces brillantes imitent les rayons de Rê
- **Mont primordial** : Réplique du benben cosmique
- **Demeure d'éternité** : Protection du corps pour la vie éternelle""",

    "ankh_symbole": """☥ **ANKH - LA CROIX DE VIE ÉTERNELLE**

**Signification du symbole :**
L'Ankh (𓋹, ꜥnḫ) signifie "**vie**" en égyptien ancien. C'est LE symbole le plus puissant et le plus reconnaissable de l'Égypte antique.

**Anatomie de l'Ankh :**
Le symbole se compose de trois parties distinctes :
1. **Boucle ovale au sommet** : Représente l'éternité, l'œuf primordial, ou le soleil levant
2. **Barre horizontale** : Les bras, l'horizon, ou la dualité (masculin/féminin)
3. **Barre verticale** : La vie terrestre, le chemin de vie, ou le Nil

**Interprétations symboliques multiples :**

**1. Soleil levant :**
- Boucle = disque solaire
- Barre horizontale = horizon
- Barre verticale = rayons du soleil
- Symbolise la **renaissance quotidienne**

**2. Clé de vie :**
L'Ankh est appelée "**clé de vie**" car elle :
- Ouvre les portes de la mort
- Déverrouille l'immortalité
- Donne accès au monde des dieux

**3. Miroir de vie :**
Certains égyptologues pensent que l'Ankh représente un **miroir** :
- La boucle = surface réfléchissante
- Le manche = poignée
- Le miroir reflète l'âme et la vérité

**4. Union sacrée :**
- Boucle = principe féminin (utérus, Isis)
- Croix = principe masculin (Osiris)
- Leur union = **création de la vie**

**Qui porte l'Ankh ?**
Sur les reliefs et peintures, on voit :
- **Les dieux uniquement** tenir l'Ankh par la boucle
- **Les pharaons** (demi-dieux) recevoir l'Ankh des dieux
- **Jamais les mortels ordinaires** - c'est un attribut divin

**Geste rituel "donner la vie" :**
Les dieux sont souvent représentés tenant l'Ankh devant le nez du pharaon. Ce geste signifie :
- **Transmission du souffle de vie** (respiration)
- **Don de l'immortalité**
- **Bénédiction divine**

**L'Ankh dans les tombes :**
Amulette funéraire extrêmement populaire :
- **Placée sur la momie** pour garantir la vie éternelle
- **Peinte sur les sarcophages** comme protection
- **Gravée sur les murs** pour animer le défunt dans l'au-delà

**Différence avec d'autres symboles :**
- **Ankh (𓋹)** = VIE
- **Djed (𓊽)** = STABILITÉ (pilier d'Osiris)
- **Was (𓌀)** = POUVOIR (sceptre des dieux)
- **Oudjat (𓂀)** = PROTECTION (œil d'Horus)

Ces 4 symboles sont souvent combinés dans les amulettes pour offrir vie, stabilité, pouvoir et protection.

**Dimensions spirituelles :**
- **Vie physique** (sur Terre)
- **Vie spirituelle** (dans l'au-delà)
- **Vie éternelle** (dans le royaume d'Osiris)

L'Ankh n'est pas juste un symbole de survie, mais d'une **existence éternelle en plénitude**.""",

    "djed_pilier": """𓊽 **DJED - PILIER DE STABILITÉ D'OSIRIS**

**Signification du symbole :**
Le Djed (𓊽, ḏd) représente la "**stabilité**", la "**durée**" et la "**permanence**". C'est le symbole sacré d'Osiris, dieu de la renaissance et de l'au-delà.

**Que représente physiquement le Djed ?**
Plusieurs interprétations existent :

**1. Colonne vertébrale d'Osiris** (interprétation la plus courante)
- Selon le mythe, Seth découpa Osiris en 14 morceaux
- Isis rassembla tous les morceaux sauf le phallus
- La colonne vertébrale d'Osiris devint le Djed
- Symbolise : force, stabilité, résurrection

**2. Arbre sacré**
- Tronc de tamaris ou de sycomore
- Branches coupées (les 4 barres horizontales)
- Symbolise : vie éternelle, croissance

**3. Faisceau de tiges de papyrus**
- Papyrus liés ensemble
- Les 4 liens = barres horizontales
- Symbolise : unité, cohésion

**Anatomie du symbole :**
Le Djed se compose de :
- **Pilier vertical** : Force, rectitude, colonne vertébrale
- **Base élargie** : Ancrage, fondations solides
- **4 barres horizontales** : Les 4 vertèbres sacrées, ou les 4 éléments

**Le mythe du redressement du Djed :**
Cérémonie royale majeure célébrée à chaque couronnement et jubilé (fête Sed) :

1. **État initial** : Le Djed est couché (Osiris mort, chaos)
2. **Redressement** : Le pharaon et les prêtres redressent le pilier Djed
3. **État final** : Le Djed est droit (Osiris ressuscité, ordre restauré)
4. **Signification** : Restauration de l'ordre cosmique (Maât)

Cette cérémonie symbolise :
- La victoire d'Horus sur Seth
- La résurrection d'Osiris
- La stabilité du règne pharaonique
- Le renouvellement du cosmos

**Association avec Osiris :**
Le Djed est l'**attribut principal d'Osiris** :
- Osiris est souvent représenté momifié
- Le Djed remplace parfois son corps entier
- Couleur : Vert (régénération) ou bleu (royauté)

**Fonction d'amulette :**
Amulette funéraire extrêmement puissante :
- **Placée au niveau des vertèbres** de la momie
- Formule du Livre des Morts (chapitre 155) récitée
- Texte gravé : "Tu as ta colonne vertébrale, ô Osiris, tu es stable!"
- But : Permettre au défunt de se lever et marcher dans l'au-delà

**Différence avec d'autres symboles :**
- **Djed (𓊽)** = STABILITÉ, colonne d'Osiris
- **Was (𓌀)** = POUVOIR, sceptre à tête de Seth
- **Ankh (𓋹)** = VIE éternelle
- **Ouas + Djed + Ankh** = Formule complète "Pouvoir, Stabilité, Vie"

**Valeurs symboliques :**
- **Endurance** : Ce qui dure éternellement
- **Stabilité** : L'ordre contre le chaos
- **Résurrection** : Capacité de se relever après la mort
- **Permanence** : Ce qui ne change pas malgré le temps

**Utilisation architecturale :**
Les colonnes des temples égyptiens imitent souvent le Djed :
- Fût vertical puissant
- Chapiteaux élaborés (remplaçant les 4 barres)
- Symbolisme : Le temple lui-même est stable comme le Djed"""
}

def enrichir_inscription_avec_quiz(inscription):
    """
    Enrichit une inscription en analysant son quiz et en ajoutant
    les informations manquantes au contexte culturel
    """
    id_insc = inscription['id']

    # Si contexte enrichi prédéfini existe, l'utiliser
    if id_insc in CONTEXTES_ENRICHIS_MASSIF:
        inscription['contexte_culturel'] = CONTEXTES_ENRICHIS_MASSIF[id_insc]
        return True

    # Sinon, analyser le quiz et enrichir automatiquement
    if 'quiz' not in inscription or not inscription['quiz']:
        return False

    contexte_actuel = inscription.get('contexte_culturel', '')
    ajouts = []

    for i, q in enumerate(inscription['quiz'], 1):
        question = q['question']
        reponse_index = q['reponse']
        bonne_reponse = q['options'][reponse_index]
        explication = q.get('explication', '')

        # Vérifier si la réponse est clairement mentionnée dans le contexte
        if bonne_reponse.lower() not in contexte_actuel.lower():
            ajouts.append(f"\n**Réponse à '{question}' :**\n{bonne_reponse}. {explication}")

    if ajouts:
        inscription['contexte_culturel'] = contexte_actuel + "\n\n" + "\n".join(ajouts)
        return True

    return False

if __name__ == '__main__':
    print("📚 ENRICHISSEMENT PÉDAGOGIQUE MASSIF\n")
    print("Principe : TOUTES les réponses du quiz doivent être dans le contexte culturel !\n")

    # Charger JSON
    with open('inscriptions-temples.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    total_enrichies = 0
    par_niveau = {'debutant': 0, 'intermediaire': 0, 'expert': 0}

    for niveau in ['debutant', 'intermediaire', 'expert']:
        print(f"\n🔹 Niveau {niveau.upper()}")
        for inscription in data['hieroglyphes'][niveau]:
            if enrichir_inscription_avec_quiz(inscription):
                total_enrichies += 1
                par_niveau[niveau] += 1
                print(f"   ✓ {inscription['titre']}")

    # Sauvegarder
    with open('inscriptions-temples.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"\n{'='*60}")
    print(f"✅ TERMINÉ : {total_enrichies} inscriptions enrichies")
    print(f"   - Débutant : {par_niveau['debutant']}")
    print(f"   - Intermédiaire : {par_niveau['intermediaire']}")
    print(f"   - Expert : {par_niveau['expert']}")
    print(f"\nPrincipe appliqué : ENSEIGNER → puis TESTER !")
