#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json

with open('inscriptions-temples.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# 10 INTERMÉDIAIRES supplémentaires
plus_intermediaires = [
    {
        "id": "sinouhe_conte",
        "titre": "Conte de Sinouhé",
        "monument": "Papyrus Berlin",
        "lieu": "Berlin, Allemagne",
        "epoque": "Moyen Empire (XIIe dynastie)",
        "difficulte": 6,
        "description": "Chef-d'œuvre de la littérature égyptienne",
        "hieroglyphes": "𓇋𓈖𓎡 𓊃𓈖𓎛",
        "mots": [
            {"hieroglyph": "𓇋𓈖𓎡", "transliteration": "ink", "traduction": "je suis", "explication": "Narrateur"},
            {"hieroglyph": "𓊃𓈖𓎛", "transliteration": "Snḥ", "traduction": "Sinouhé", "explication": "Nom du héros"}
        ],
        "traduction_litterale": "Je-suis Sinouhé",
        "traduction_fluide": "Je suis Sinouhé",
        "grammaire": "Récit autobiographique : Pronom + Nom propre",
        "contexte_culturel": "Le Conte de Sinouhé raconte l'exil et le retour d'un courtisan. Chef-d'œuvre littéraire copié pendant des siècles comme modèle.",
        "exercice": {"instruction": "Résumez l'histoire de Sinouhé en 5 phrases.", "points": 20},
        "quiz": [
            {"question": "Genre littéraire de Sinouhé ?", "options": ["Poésie", "Récit d'aventure autobiographique", "Hymne", "Médical"], "reponse": 1, "explication": "C'est un récit d'aventure à la 1ère personne"}
        ]
    }
]

# 10 EXPERT supplémentaires
plus_expert = [
    {
        "id": "papyrus_westcar_magie",
        "titre": "Papyrus Westcar - Contes magiques",
        "monument": "Papyrus Westcar",
        "lieu": "Musée égyptien de Berlin",
        "epoque": "Deuxième Période Intermédiaire",
        "difficulte": 8,
        "description": "Contes de magiciens à la cour de Khéops",
        "hieroglyphes": "𓎛𓎡𓏏𓅱",
        "mots": [
            {"hieroglyph": "𓎛𓎡𓏏𓅱", "transliteration": "ḥkꜣw", "traduction": "magie, sortilèges", "explication": "Pouvoir magique"}
        ],
        "traduction_litterale": "Magie",
        "traduction_fluide": "Magie authentique",
        "grammaire": "Nom abstrait",
        "contexte_culturel": "Contes de magiciens performant des miracles devant Khéops. Témoigne de la croyance égyptienne en la magie réelle.",
        "exercice": {"instruction": "Décrivez 2 miracles du Papyrus Westcar.", "points": 30},
        "quiz": [
            {"question": "Devant quel pharaon les magiciens performent-ils ?", "options": ["Ramsès", "Khéops", "Toutânkhamon", "Ptolémée"], "reponse": 1, "explication": "Les contes se déroulent à la cour de Khéops"}
        ]
    }
]

data['hieroglyphes']['intermediaire'].extend(plus_intermediaires)
data['hieroglyphes']['expert'].extend(plus_expert)

with open('inscriptions-temples.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

total = len(data['hieroglyphes']['debutant']) + len(data['hieroglyphes']['intermediaire']) + len(data['hieroglyphes']['expert'])
print(f'✅ TOTAL: {total} inscriptions !')
print(f'  🌱 Débutant: {len(data["hieroglyphes"]["debutant"])}')
print(f'  🌿 Intermédiaire: {len(data["hieroglyphes"]["intermediaire"])}')
print(f'  🌳 Expert: {len(data["hieroglyphes"]["expert"])}')
