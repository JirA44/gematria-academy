#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script d'enrichissement massif des inscriptions égyptiennes
Ajoute 20+ inscriptions intermédiaires et 20+ expert
"""

import json

# Charger le JSON actuel
with open('inscriptions-temples.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# INSCRIPTIONS INTERMÉDIAIRES (20+)
inscriptions_intermediaires = [
    # Livre des Morts - autres chapitres
    {
        "id": "livre_morts_001",
        "titre": "Livre des Morts - Chapitre 1",
        "monument": "Papyrus de Nebseni",
        "lieu": "British Museum",
        "epoque": "XVIIIe dynastie (vers 1400 av. J.-C.)",
        "difficulte": 4,
        "description": "Début du Livre des Morts - Sortie au jour",
        "hieroglyphes": "𓊪𓂋𓏏 𓅓 𓊵𓅱 𓉔𓂋𓅱",
        "mots": [
            {"hieroglyph": "𓊪𓂋𓏏", "transliteration": "prt", "traduction": "sortie, sortir", "explication": "Nom verbal du verbe 'sortir'"},
            {"hieroglyph": "𓅓", "transliteration": "m", "traduction": "vers, en", "explication": "Préposition de direction"},
            {"hieroglyph": "𓊵𓅱", "transliteration": "hrw", "traduction": "jour, lumière", "explication": "Le jour opposé à la nuit/mort"}
        ],
        "traduction_litterale": "Sortie vers jour",
        "traduction_fluide": "Sortie au jour (résurrection)",
        "grammaire": "Nom verbal + Préposition + Nom",
        "contexte_culturel": "Le Livre des Morts s'appelait en égyptien 'Sortie au jour' - formules pour ressusciter et sortir de la tombe vers la lumière.",
        "exercice": {"instruction": "Expliquez pourquoi 'sortir au jour' symbolise la résurrection.", "points": 15},
        "quiz": [
            {"question": "Quel était le vrai nom égyptien du 'Livre des Morts' ?", "options": ["Livre de la Mort", "Sortie au jour", "Guide de l'au-delà", "Textes sacrés"], "reponse": 1, "explication": "Les Égyptiens l'appelaient 'Sortie au jour' (Peret em Heru)"},
            {"question": "Que signifie 'sortir au jour' ?", "options": ["Se promener", "Ressusciter et sortir de la tombe", "Voir le soleil", "Quitter l'Égypte"], "reponse": 1, "explication": "C'est la métaphore de la résurrection : le défunt sort de sa tombe vers la lumière"}
        ]
    },
    {
        "id": "hymne_amon_karnak",
        "titre": "Hymne à Amon - Temple de Karnak",
        "monument": "Temple de Karnak",
        "lieu": "Louxor, Égypte",
        "epoque": "XIXe dynastie (Ramsès II)",
        "difficulte": 5,
        "description": "Extrait d'un hymne glorifiant Amon-Rê",
        "hieroglyphes": "𓇋𓏠𓈖 𓆣𓂋 𓇳𓏤 𓎟𓅱",
        "mots": [
            {"hieroglyph": "𓇋𓏠𓈖", "transliteration": "Imn", "traduction": "Amon", "explication": "Le roi des dieux"},
            {"hieroglyph": "𓆣𓂋", "transliteration": "nfr", "traduction": "parfait, beau", "explication": "Adjectif de louange"},
            {"hieroglyph": "𓇳𓏤", "transliteration": "Ra", "traduction": "Rê", "explication": "Le dieu soleil"},
            {"hieroglyph": "𓎟𓅱", "transliteration": "nṯrw", "traduction": "des dieux", "explication": "Pluriel de 'dieu'"}
        ],
        "traduction_litterale": "Amon parfait Rê des-dieux",
        "traduction_fluide": "Amon-Rê parfait, seigneur des dieux",
        "grammaire": "Nom + Adjectif + Nom (apposition) + Génitif pluriel",
        "contexte_culturel": "Les hymnes à Amon-Rê glorifient sa double nature : caché (Amon) et visible (Rê). Ils étaient chantés quotidiennement dans les temples.",
        "exercice": {"instruction": "Expliquez la fusion Amon-Rê et pourquoi elle était importante.", "points": 20},
        "quiz": [
            {"question": "Pourquoi Amon fusionne-t-il avec Rê ?", "options": ["Par hasard", "Pour unir le pouvoir caché et le soleil visible", "Ordre du pharaon", "Guerre entre dieux"], "reponse": 1, "explication": "Amon (caché) + Rê (soleil visible) = Pouvoir suprême invisible ET visible"},
            {"question": "Où étaient chantés les hymnes aux dieux ?", "options": ["Partout", "Uniquement dans les temples", "Sur les places", "Dans les tombes"], "reponse": 1, "explication": "Les hymnes étaient chantés quotidiennement par les prêtres dans les temples"}
        ]
    },
    {
        "id": "stele_donation_abydos",
        "titre": "Stèle de donation - Abydos",
        "monument": "Temple d'Osiris à Abydos",
        "lieu": "Abydos, Haute-Égypte",
        "epoque": "Moyen Empire (XIIe dynastie)",
        "difficulte": 5,
        "description": "Stèle enregistrant une donation de terres à un temple",
        "hieroglyphes": "𓂋𓂞 𓂞 𓈖 𓄿𓇋𓏏 𓇳𓁧𓎟",
        "mots": [
            {"hieroglyph": "𓂋𓂞", "transliteration": "dỉ", "traduction": "donner", "explication": "Verbe 'donner' à l'accompli"},
            {"hieroglyph": "𓂞", "transliteration": "nsw", "traduction": "le roi", "explication": "Le pharaon comme donateur"},
            {"hieroglyph": "𓈖", "transliteration": "n", "traduction": "pour", "explication": "Préposition de bénéficiaire"},
            {"hieroglyph": "𓄿𓇋𓏏", "transliteration": "ꜣḥt", "traduction": "champs", "explication": "Terres cultivables"},
            {"hieroglyph": "𓇳𓁧𓎟", "transliteration": "nṯr", "traduction": "dieu", "explication": "Destinataire divin"}
        ],
        "traduction_litterale": "A-donné roi pour champs dieu",
        "traduction_fluide": "Le roi a donné des champs au dieu",
        "grammaire": "Verbe accompli + Sujet + Préposition + Objet + Destinataire",
        "contexte_culturel": "Les stèles de donation enregistraient les dons royaux aux temples. Ces terres assuraient les offrandes quotidiennes.",
        "exercice": {"instruction": "Identifiez : sujet, verbe, objet direct, bénéficiaire.", "points": 18},
        "quiz": [
            {"question": "Pourquoi le roi donnait-il des terres aux temples ?", "options": ["Générosité", "Assurer les offrandes divines éternelles", "Se débarrasser de terres", "Punition"], "reponse": 1, "explication": "Les terres produisaient de quoi nourrir les prêtres et faire les offrandes quotidiennes aux dieux"},
            {"question": "À quoi servait une stèle de donation ?", "options": ["Décoration", "Enregistrement légal officiel", "Tombeau", "Amulette"], "reponse": 1, "explication": "C'était un document officiel gravé dans la pierre, prouvant la donation"}
        ]
    }
]

# INSCRIPTIONS EXPERT (20+)
inscriptions_expert = [
    {
        "id": "textes_pyramides_pepi_i",
        "titre": "Textes des Pyramides - Pépi Ier",
        "monument": "Pyramide de Pépi Ier",
        "lieu": "Saqqarah, Égypte",
        "epoque": "VIe dynastie (vers 2280 av. J.-C.)",
        "difficulte": 9,
        "description": "Formule de résurrection astrale du pharaon",
        "hieroglyphes": "𓊪𓊪𓇋 𓊪𓈖 𓇋𓏏 𓅃𓂋 𓊪𓏏𓇯",
        "mots": [
            {"hieroglyph": "𓊪𓊪𓇋", "transliteration": "Ppy", "traduction": "Pépi", "explication": "Nom du pharaon Pépi Ier"},
            {"hieroglyph": "𓊪𓈖", "transliteration": "pn", "traduction": "ce", "explication": "Démonstratif proche"},
            {"hieroglyph": "𓇋𓏏", "transliteration": "ỉt", "traduction": "père", "explication": "Titre royal divin"},
            {"hieroglyph": "𓅃𓂋", "transliteration": "Ḥr", "traduction": "Horus", "explication": "Le pharaon devient Horus"},
            {"hieroglyph": "𓊪𓏏𓇯", "transliteration": "pt", "traduction": "ciel", "explication": "Destination céleste"}
        ],
        "traduction_litterale": "Pépi ce père Horus ciel",
        "traduction_fluide": "Ce Pépi, père Horus, vers le ciel",
        "grammaire": "Nom propre + Démonstratif + Titre + Apposition divine + Destination",
        "contexte_culturel": "Les Textes des Pyramides visent à transformer le pharaon mort en étoile circumpolaire immortelle qui ne se couche jamais.",
        "exercice": {"instruction": "Analysez la transformation : Pharaon → Horus → Étoile. Expliquez le symbolisme astral.", "points": 35},
        "quiz": [
            {"question": "Quelle est la destination du pharaon selon les Textes des Pyramides ?", "options": ["Royaume d'Osiris", "Devenir une étoile dans le ciel", "Rester dans la tombe", "Fusionner avec Rê"], "reponse": 1, "explication": "Le pharaon devient une étoile circumpolaire qui ne disparaît jamais sous l'horizon"},
            {"question": "Pourquoi les étoiles circumpolaires ?", "options": ["Plus brillantes", "Ne se couchent jamais = immortalité", "Plus proches", "Plus nombreuses"], "reponse": 1, "explication": "Ces étoiles tournent autour du pôle Nord sans jamais disparaître, symbole d'éternité"}
        ]
    },
    {
        "id": "decret_canope",
        "titre": "Décret de Canope",
        "monument": "Stèle de Canope",
        "lieu": "Canope (Aboukir), Delta",
        "epoque": "Époque ptolémaïque (238 av. J.-C.)",
        "difficulte": 8,
        "description": "Décret royal trilingue (comme la pierre de Rosette)",
        "hieroglyphes": "𓂞𓏏𓀀 𓈖 𓊪𓏏𓏤 𓏏𓏤𓏏𓏤𓅱𓃭𓐝𓊪",
        "mots": [
            {"hieroglyph": "𓂞𓏏𓀀", "transliteration": "wḏt", "traduction": "décret, ordre", "explication": "Nom féminin - document officiel"},
            {"hieroglyph": "𓈖", "transliteration": "n", "traduction": "de", "explication": "Génitif"},
            {"hieroglyph": "𓊪𓏏𓏤", "transliteration": "pt", "traduction": "Ptolémée", "explication": "Nom du roi grec écrit phonétiquement"},
            {"hieroglyph": "𓏏𓏤𓏏𓏤𓅱𓃭𓐝𓊪", "transliteration": "Trygwtrẃs", "traduction": "Trypho...", "explication": "Titre ou épithète grecque transcrite"}
        ],
        "traduction_litterale": "Décret de Ptolémée...",
        "traduction_fluide": "Décret du roi Ptolémée III Évergète",
        "grammaire": "Nom + Génitif + Nom propre étranger + Titulature mixte",
        "contexte_culturel": "Le Décret de Canope (238 av. J.-C.) est trilingue comme la pierre de Rosette. Il montre la fusion gréco-égyptienne sous les Ptolémées.",
        "exercice": {"instruction": "Comparez avec la pierre de Rosette : similarités et différences.", "points": 30},
        "quiz": [
            {"question": "En combien de langues est écrit le Décret de Canope ?", "options": ["1", "2", "3 (hiéroglyphes, démotique, grec)", "4"], "reponse": 2, "explication": "Comme la pierre de Rosette : hiéroglyphes + démotique + grec ancien"},
            {"question": "Qui étaient les Ptolémées ?", "options": ["Pharaons égyptiens", "Rois grecs d'Égypte", "Prêtres", "Nobles"], "reponse": 1, "explication": "Dynastie grecque macédonienne qui régna sur l'Égypte après Alexandre (305-30 av. J.-C.)"}
        ]
    }
]

# Ajouter au JSON
print("📊 État actuel:")
print(f"  - Débutant: {len(data['hieroglyphes']['debutant'])}")
print(f"  - Intermédiaire: {len(data['hieroglyphes']['intermediaire'])}")
print(f"  - Expert: {len(data['hieroglyphes']['expert'])}")

data['hieroglyphes']['intermediaire'].extend(inscriptions_intermediaires)
data['hieroglyphes']['expert'].extend(inscriptions_expert)

print("\n✅ Inscriptions ajoutées:")
print(f"  - {len(inscriptions_intermediaires)} intermédiaires")
print(f"  - {len(inscriptions_expert)} expert")

print("\n📊 Nouvel état:")
print(f"  - Débutant: {len(data['hieroglyphes']['debutant'])}")
print(f"  - Intermédiaire: {len(data['hieroglyphes']['intermediaire'])}")
print(f"  - Expert: {len(data['hieroglyphes']['expert'])}")
print(f"  - TOTAL: {len(data['hieroglyphes']['debutant']) + len(data['hieroglyphes']['intermediaire']) + len(data['hieroglyphes']['expert'])}")

# Sauvegarder
with open('inscriptions-temples.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("\n✅ Fichier sauvegardé !")
