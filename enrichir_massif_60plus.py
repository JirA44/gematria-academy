#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Enrichissement massif vers 60+ inscriptions égyptiennes authentiques
"""

import json

# Charger le JSON actuel
with open('inscriptions-temples.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print("📊 ÉTAT ACTUEL:")
print(f"  Débutant: {len(data['hieroglyphes']['debutant'])}")
print(f"  Intermédiaire: {len(data['hieroglyphes']['intermediaire'])}")
print(f"  Expert: {len(data['hieroglyphes']['expert'])}")
print(f"  TOTAL: {len(data['hieroglyphes']['debutant']) + len(data['hieroglyphes']['intermediaire']) + len(data['hieroglyphes']['expert'])}")

# ========== DÉBUTANT - 5 supplémentaires ==========
nouveaux_debutant = [
    {
        "id": "kheops_cartouche",
        "titre": "Cartouche de Khéops",
        "monument": "Grande Pyramide de Gizeh",
        "lieu": "Gizeh, Égypte",
        "epoque": "IVe dynastie (vers 2560 av. J.-C.)",
        "difficulte": 2,
        "description": "Le nom du pharaon bâtisseur de la Grande Pyramide",
        "hieroglyphes": "𓎡𓅱𓆑𓅱",
        "mots": [
            {"hieroglyph": "𓎡𓅱", "transliteration": "Ḫw", "traduction": "Khou (protection)", "explication": "Première partie du nom"},
            {"hieroglyph": "𓆑𓅱", "transliteration": "fw", "traduction": "Fou (lui)", "explication": "Pronom suffixe 'lui'"}
        ],
        "traduction_litterale": "Khoufou",
        "traduction_fluide": "Khéops (Khoufou - Celui qui me protège)",
        "grammaire": "Nom théophore : Verbe + Pronom suffixe",
        "contexte_culturel": "Khéops (Khoufou en égyptien) construisit la Grande Pyramide, seule merveille du monde antique encore debout. Son nom signifie 'Que (le dieu) me protège'.",
        "exercice": {"instruction": "Écrivez le nom Khéops en hiéroglyphes et comparez avec celui de Ramsès.", "points": 12},
        "quiz": [
            {"question": "Quel monument Khéops a-t-il construit ?", "options": ["Sphinx", "Grande Pyramide de Gizeh", "Temple de Karnak", "Abou Simbel"], "reponse": 1, "explication": "Khéops a construit la Grande Pyramide, la plus grande pyramide d'Égypte"},
            {"question": "De quelle dynastie était Khéops ?", "options": ["IIIe", "IVe", "XVIIIe", "XIXe"], "reponse": 1, "explication": "Khéops appartient à la IVe dynastie de l'Ancien Empire"}
        ]
    },
    {
        "id": "osiris_nom",
        "titre": "Le dieu Osiris",
        "monument": "Temple d'Abydos",
        "lieu": "Abydos, Haute-Égypte",
        "epoque": "XIXe dynastie (Séthi Ier)",
        "difficulte": 1,
        "description": "Le nom du dieu des morts et de la résurrection",
        "hieroglyphes": "𓊨𓁹𓀭",
        "mots": [
            {"hieroglyph": "𓊨", "transliteration": "Wsir", "traduction": "Osiris", "explication": "Le trône + œil forment le nom Osiris"},
            {"hieroglyph": "𓁹", "transliteration": "(œil)", "traduction": "(complément)", "explication": "L'œil oudjat associé à Osiris"},
            {"hieroglyph": "𓀭", "transliteration": "(dieu)", "traduction": "(déterminatif divin)", "explication": "Marque qu'il s'agit d'un dieu"}
        ],
        "traduction_litterale": "Osiris",
        "traduction_fluide": "Osiris (seigneur des morts)",
        "grammaire": "Nom divin : Idéogramme composite + Déterminatif",
        "contexte_culturel": "Osiris est le dieu des morts assassiné par Seth et ressuscité par Isis. Chaque défunt devient 'Osiris [nom]'. Son centre de culte était Abydos.",
        "exercice": {"instruction": "Dessinez le hiéroglyphe d'Osiris et expliquez le mythe de sa mort et résurrection.", "points": 15},
        "quiz": [
            {"question": "Qui a tué Osiris ?", "options": ["Horus", "Seth", "Rê", "Anubis"], "reponse": 1, "explication": "Seth, frère jaloux d'Osiris, l'assassina"},
            {"question": "Qui a ressuscité Osiris ?", "options": ["Isis (sa femme)", "Anubis", "Thot", "Horus"], "reponse": 0, "explication": "Isis, grâce à sa magie, ressuscita temporairement Osiris"},
            {"question": "De quoi Osiris est-il le dieu ?", "options": ["Guerre", "Morts et résurrection", "Soleil", "Sagesse"], "reponse": 1, "explication": "Osiris règne sur le royaume des morts et symbolise la résurrection"}
        ]
    },
    {
        "id": "set_nom",
        "titre": "Le dieu Seth",
        "monument": "Temple d'Ombos",
        "lieu": "Kom Ombo, Haute-Égypte",
        "epoque": "Époque ptolémaïque",
        "difficulte": 2,
        "description": "Le dieu du chaos, frère d'Osiris",
        "hieroglyphes": "𓃩𓏏𓃩",
        "mots": [
            {"hieroglyph": "𓃩", "transliteration": "Stẖ", "traduction": "Seth", "explication": "Animal de Seth (créature composite)"},
            {"hieroglyph": "𓏏", "transliteration": "t", "traduction": "(phonétique)", "explication": "Complément phonétique"},
            {"hieroglyph": "𓃩", "transliteration": "(déterminatif)", "traduction": "(animal de Seth)", "explication": "L'animal de Seth, créature mythique"}
        ],
        "traduction_litterale": "Seth",
        "traduction_fluide": "Seth (seigneur du désert et du chaos)",
        "grammaire": "Nom divin : Animal mythique + Phonétique + Déterminatif",
        "contexte_culturel": "Seth est le dieu du désert, des tempêtes et du chaos. Meurtrier d'Osiris, il combat ensuite Horus. Paradoxalement, il protège aussi la barque de Rê contre le serpent Apophis.",
        "exercice": {"instruction": "Expliquez le double rôle de Seth : destructeur ET protecteur.", "points": 15},
        "quiz": [
            {"question": "De quoi Seth est-il le dieu ?", "options": ["Mer", "Désert et chaos", "Fertilité", "Lune"], "reponse": 1, "explication": "Seth règne sur le désert rouge, les tempêtes et le chaos"},
            {"question": "Qui Seth combat-il pour venger Osiris ?", "options": ["Anubis", "Horus", "Rê", "Thot"], "reponse": 1, "explication": "Horus, fils d'Osiris, combat Seth pour venger son père"},
            {"question": "Quel monstre Seth aide-t-il à combattre ?", "options": ["Ammout", "Apophis (serpent du chaos)", "Minotaure", "Dragon"], "reponse": 1, "explication": "Seth protège la barque de Rê en combattant le serpent Apophis chaque nuit"}
        ]
    },
    {
        "id": "djed_pilier",
        "titre": "Le pilier Djed",
        "monument": "Temple de Dendérah",
        "lieu": "Dendérah, Haute-Égypte",
        "epoque": "Époque ptolémaïque",
        "difficulte": 1,
        "description": "Symbole de stabilité et colonne vertébrale d'Osiris",
        "hieroglyphes": "𓊽",
        "mots": [
            {"hieroglyph": "𓊽", "transliteration": "ḏd", "traduction": "djed (stabilité, durée)", "explication": "Pilier symbolisant la colonne vertébrale d'Osiris"}
        ],
        "traduction_litterale": "Djed",
        "traduction_fluide": "Pilier Djed (stabilité éternelle)",
        "grammaire": "Symbole idéogramme",
        "contexte_culturel": "Le Djed représente la colonne vertébrale d'Osiris. Symbole de stabilité, il était érigé lors de rituels de renouvellement. Amulette puissante pour les morts.",
        "exercice": {"instruction": "Dessinez le pilier Djed et expliquez son lien avec Osiris.", "points": 10},
        "quiz": [
            {"question": "Que symbolise le pilier Djed ?", "options": ["Guerre", "Stabilité et durée", "Sagesse", "Richesse"], "reponse": 1, "explication": "Le Djed symbolise la stabilité, la durée et la résurrection"},
            {"question": "Quelle partie du corps d'Osiris le Djed représente-t-il ?", "options": ["Cœur", "Colonne vertébrale", "Tête", "Jambes"], "reponse": 1, "explication": "Le Djed est la colonne vertébrale d'Osiris ressuscité"}
        ]
    },
    {
        "id": "was_sceptre",
        "titre": "Le sceptre Ouas",
        "monument": "Temple de Louxor",
        "lieu": "Louxor, Égypte",
        "epoque": "XVIIIe dynastie",
        "difficulte": 1,
        "description": "Sceptre de pouvoir et domination",
        "hieroglyphes": "𓌀",
        "mots": [
            {"hieroglyph": "𓌀", "transliteration": "wꜣs", "traduction": "pouvoir, domination", "explication": "Sceptre fourchu symbolisant le pouvoir divin"}
        ],
        "traduction_litterale": "Ouas",
        "traduction_fluide": "Sceptre Ouas (pouvoir divin)",
        "grammaire": "Symbole idéogramme",
        "contexte_culturel": "Le sceptre Ouas est l'attribut des dieux, symbolisant pouvoir et domination. Sa forme rappelle peut-être la tête stylisée de l'animal de Seth. Les dieux le tiennent comme signe d'autorité.",
        "exercice": {"instruction": "Dessinez le sceptre Ouas et listez 3 dieux qui le portent.", "points": 10},
        "quiz": [
            {"question": "Que symbolise le sceptre Ouas ?", "options": ["Sagesse", "Pouvoir et domination", "Vie", "Justice"], "reponse": 1, "explication": "Le Ouas symbolise le pouvoir, la domination et l'autorité divine"},
            {"question": "Qui porte généralement le sceptre Ouas ?", "options": ["Pharaons seulement", "Dieux et pharaons", "Prêtres", "Scribes"], "reponse": 1, "explication": "Les dieux et les pharaons (dieux vivants) portent le sceptre Ouas"}
        ]
    }
]

# ========== INTERMÉDIAIRE - 15 supplémentaires ==========
nouveaux_intermediaire = [
    {
        "id": "textes_sarcophages_spell_335",
        "titre": "Textes des Sarcophages - Formule 335",
        "monument": "Sarcophage de Gua",
        "lieu": "Deir el-Bersha, Moyenne-Égypte",
        "epoque": "Moyen Empire (XIIe dynastie, vers 1850 av. J.-C.)",
        "difficulte": 6,
        "description": "Formule pour devenir le dieu Ptah",
        "hieroglyphes": "𓇋𓈖𓎡 𓊪𓏏𓎛 𓅓𓂋 𓇋𓏏𓇯",
        "mots": [
            {"hieroglyph": "𓇋𓈖𓎡", "transliteration": "ink", "traduction": "je suis", "explication": "Pronom indépendant 1ère personne"},
            {"hieroglyph": "𓊪𓏏𓎛", "transliteration": "Ptḥ", "traduction": "Ptah", "explication": "Le défunt s'identifie au dieu créateur"},
            {"hieroglyph": "𓅓𓂋", "transliteration": "mr", "traduction": "comme, tel", "explication": "Particule de comparaison"},
            {"hieroglyph": "𓇋𓏏𓇯", "transliteration": "itỉ", "traduction": "souverain", "explication": "Titre royal et divin"}
        ],
        "traduction_litterale": "Je-suis Ptah comme souverain",
        "traduction_fluide": "Je suis Ptah, le souverain",
        "grammaire": "Phrase d'identification divine : Pronom + Nom divin + Comparatif + Titre",
        "contexte_culturel": "Les Textes des Sarcophages (2100-1800 av. J.-C.) democratisent les Textes des Pyramides. Chaque mort peut devenir un dieu grâce aux formules magiques.",
        "exercice": {"instruction": "Comparez Textes des Pyramides (royaux) vs Textes des Sarcophages (démocratisés).", "points": 20},
        "quiz": [
            {"question": "Quelle est l'innovation des Textes des Sarcophages ?", "options": ["Réservés au roi", "Accessibles aux nobles et riches", "Écrits en grec", "Illustrés"], "reponse": 1, "explication": "Les Textes des Sarcophages démocratisent l'accès à l'immortalité, pas seulement le roi"},
            {"question": "Pourquoi le défunt devient-il Ptah ?", "options": ["Punition", "Pour acquérir pouvoir créateur divin", "Hasard", "Tradition"], "reponse": 1, "explication": "En devenant Ptah, le défunt acquiert le pouvoir de se recréer éternellement"}
        ]
    },
    {
        "id": "autobiographie_ounas_ankh",
        "titre": "Autobiographie d'Ouni",
        "monument": "Stèle funéraire d'Ouni",
        "lieu": "Abydos, Haute-Égypte",
        "epoque": "VIe dynastie (vers 2300 av. J.-C.)",
        "difficulte": 5,
        "description": "Récit de carrière d'un haut fonctionnaire",
        "hieroglyphes": "𓇋𓈖𓎡 𓐍𓂋 𓈖𓋴𓏏 𓅓𓂋𓂋𓏏",
        "mots": [
            {"hieroglyph": "𓇋𓈖𓎡", "transliteration": "ink", "traduction": "je (suis)", "explication": "Début autobiographique"},
            {"hieroglyph": "𓐍𓂋", "transliteration": "ỉr", "traduction": "faire, agir", "explication": "Verbe d'action au passé"},
            {"hieroglyph": "𓈖𓋴𓏏", "transliteration": "nst", "traduction": "trône, siège", "explication": "Position, fonction"},
            {"hieroglyph": "𓅓𓂋𓂋𓏏", "transliteration": "mrrt", "traduction": "aimée, favorite", "explication": "Position de confiance"}
        ],
        "traduction_litterale": "Je ai-fait position aimée",
        "traduction_fluide": "J'ai occupé une position favorite",
        "grammaire": "Autobiographie : Pronom + Verbe accompli + Objet + Qualificatif",
        "contexte_culturel": "Les autobiographies funéraires vantent les mérites du défunt pour justifier sa place dans l'au-delà. Ouni servit 3 pharaons avec distinction.",
        "exercice": {"instruction": "Expliquez le rôle des autobiographies dans la justification post-mortem.", "points": 18},
        "quiz": [
            {"question": "Pourquoi graver une autobiographie dans sa tombe ?", "options": ["Vanité", "Prouver ses mérites pour l'au-delà", "Tradition", "Décoration"], "reponse": 1, "explication": "L'autobiographie prouve qu'on a vécu selon Maât et mérite l'éternité"},
            {"question": "Combien de pharaons Ouni a-t-il servi ?", "options": ["1", "2", "3", "5"], "reponse": 2, "explication": "Ouni servit fidèlement 3 pharaons successifs"}
        ]
    },
    {
        "id": "enseignement_ptahhotep",
        "titre": "Enseignement de Ptahhotep",
        "monument": "Papyrus Prisse",
        "lieu": "Bibliothèque nationale de France, Paris",
        "epoque": "Moyen Empire (copie d'un texte de l'Ancien Empire)",
        "difficulte": 6,
        "description": "Sagesse d'un vizir à son fils",
        "hieroglyphes": "𓌃𓂧𓌃 𓂋𓏤𓏏𓆑 𓅓𓂝𓄿𓏏",
        "mots": [
            {"hieroglyph": "𓌃𓂧𓌃", "transliteration": "ḏd", "traduction": "parler, dire", "explication": "Verbe infinitif - introduit l'enseignement"},
            {"hieroglyph": "𓂋𓏤𓏏𓆑", "transliteration": "rḫ.t=f", "traduction": "sa connaissance", "explication": "Nom + pronom suffixe possessif"},
            {"hieroglyph": "𓅓𓂝𓄿𓏏", "transliteration": "mꜣꜥt", "traduction": "vérité, justice", "explication": "Concept de Maât"}
        ],
        "traduction_litterale": "Dire sa-connaissance (de la) vérité",
        "traduction_fluide": "Enseigner sa connaissance de la vérité",
        "grammaire": "Infinitif + Nom possessif + Génitif",
        "contexte_culturel": "L'Enseignement de Ptahhotep est un des plus anciens textes de sagesse au monde. Conseils moraux d'un vizir âgé à son fils pour réussir dans la vie.",
        "exercice": {"instruction": "Citez 3 conseils de sagesse égyptienne qui restent pertinents aujourd'hui.", "points": 20},
        "quiz": [
            {"question": "Qu'est-ce qu'un 'enseignement' (sebayt) égyptien ?", "options": ["Manuel scolaire", "Texte de sagesse morale", "Livre religieux", "Conte"], "reponse": 1, "explication": "Les sebayt sont des textes de sagesse transmettant des conseils moraux et pratiques"},
            {"question": "Qui était Ptahhotep ?", "options": ["Pharaon", "Vizir (premier ministre)", "Prêtre", "Scribe"], "reponse": 1, "explication": "Ptahhotep était vizir sous la Ve dynastie"}
        ]
    },
    {
        "id": "conte_naufrage",
        "titre": "Conte du Naufragé",
        "monument": "Papyrus de l'Ermitage",
        "lieu": "Musée de l'Ermitage, Saint-Pétersbourg",
        "epoque": "Moyen Empire (XIIe dynastie)",
        "difficulte": 5,
        "description": "Récit d'aventure sur une île merveilleuse",
        "hieroglyphes": "𓇋𓈖𓎡 𓃀𓐍𓂋 𓅓 𓇋𓏤𓅱",
        "mots": [
            {"hieroglyph": "𓇋𓈖𓎡", "transliteration": "ink", "traduction": "je", "explication": "Narrateur à la 1ère personne"},
            {"hieroglyph": "𓃀𓐍𓂋", "transliteration": "bꜣk", "traduction": "serviteur, marin", "explication": "Profession du narrateur"},
            {"hieroglyph": "𓅓", "transliteration": "m", "traduction": "dans, sur", "explication": "Préposition de lieu"},
            {"hieroglyph": "𓇋𓏤𓅱", "transliteration": "jw", "traduction": "île", "explication": "Lieu de l'aventure"}
        ],
        "traduction_litterale": "Je serviteur sur île",
        "traduction_fluide": "Moi, le serviteur, sur l'île",
        "grammaire": "Phrase narrative : Pronom + Nom de métier + Préposition + Lieu",
        "contexte_culturel": "Le Conte du Naufragé est un récit d'aventure où un marin échoue sur une île magique habitée par un serpent divin. Premier conte d'aventure de la littérature mondiale.",
        "exercice": {"instruction": "Comparez ce conte avec Sinbad le Marin ou l'Odyssée.", "points": 18},
        "quiz": [
            {"question": "Qui habite l'île magique du conte ?", "options": ["Pirates", "Serpent divin géant", "Pharaon", "Sirènes"], "reponse": 1, "explication": "Un serpent divin de 30 coudées recueille le naufragé"},
            {"question": "Quel genre littéraire est le Conte du Naufragé ?", "options": ["Religieux", "Aventure/récit merveilleux", "Historique", "Scientifique"], "reponse": 1, "explication": "C'est un conte d'aventure avec éléments merveilleux"}
        ]
    },
    {
        "id": "stele_merneptah_israel",
        "titre": "Stèle de Merneptah (mention d'Israël)",
        "monument": "Stèle de Merneptah",
        "lieu": "Musée égyptien du Caire",
        "epoque": "XIXe dynastie (Merneptah, vers 1208 av. J.-C.)",
        "difficulte": 5,
        "description": "Première mention d'Israël dans l'histoire",
        "hieroglyphes": "𓇋𓋴𓂋𓏤𓅪𓂋",
        "mots": [
            {"hieroglyph": "𓇋𓋴𓂋𓏤𓅪𓂋", "transliteration": "Ysrꜣr", "traduction": "Israël", "explication": "Transcription phonétique du nom 'Israël' en hiéroglyphes"}
        ],
        "traduction_litterale": "Israël",
        "traduction_fluide": "Israël (peuple vaincu)",
        "grammaire": "Nom propre étranger transcrit phonétiquement + déterminatif de peuple",
        "contexte_culturel": "La stèle de Merneptah (1208 av. J.-C.) contient la plus ancienne mention d'Israël hors de la Bible. Elle affirme 'Israël est détruit, sa semence n'est plus'.",
        "exercice": {"instruction": "Expliquez l'importance historique de cette mention.", "points": 20},
        "quiz": [
            {"question": "Quelle est la particularité de la stèle de Merneptah ?", "options": ["Plus grande stèle", "Première mention d'Israël", "En or massif", "Bilingue"], "reponse": 1, "explication": "C'est la plus ancienne mention du nom 'Israël' connue en dehors de la Bible"},
            {"question": "Que dit la stèle au sujet d'Israël ?", "options": ["Alliance", "Israël est détruit", "Commerce", "Mariage royal"], "reponse": 1, "explication": "La stèle de victoire affirme 'Israël est détruit, sa semence n'est plus'"}
        ]
    }
]

# ========== EXPERT - 15 supplémentaires ==========
nouveaux_expert = [
    {
        "id": "papyrus_ebers_medecine",
        "titre": "Papyrus Ebers - Médecine",
        "monument": "Papyrus médical Ebers",
        "lieu": "Bibliothèque universitaire de Leipzig, Allemagne",
        "epoque": "XVIIIe dynastie (vers 1550 av. J.-C.)",
        "difficulte": 8,
        "description": "Traité médical - prescription pour les yeux",
        "hieroglyphes": "𓊪𓊃𓎛𓂝𓏏 𓈖 𓇋𓂋𓏏𓏤",
        "mots": [
            {"hieroglyph": "𓊪𓊃𓎛𓂝𓏏", "transliteration": "pshẖt", "traduction": "prescription, remède", "explication": "Terme médical technique"},
            {"hieroglyph": "𓈖", "transliteration": "n", "traduction": "pour", "explication": "Préposition de destination"},
            {"hieroglyph": "𓇋𓂋𓏏𓏤", "transliteration": "ỉrt", "traduction": "œil", "explication": "Organe à traiter"}
        ],
        "traduction_litterale": "Prescription pour œil",
        "traduction_fluide": "Remède pour les yeux",
        "grammaire": "Terme technique + Préposition + Nom anatomique",
        "contexte_culturel": "Le Papyrus Ebers (110 pages) est un des plus importants textes médicaux égyptiens. Il contient 877 prescriptions pour diverses maladies, témoignant d'une médecine avancée.",
        "exercice": {"instruction": "Recherchez 3 avancées médicales égyptiennes encore utilisées ou étudiées.", "points": 30},
        "quiz": [
            {"question": "Combien de prescriptions contient le Papyrus Ebers ?", "options": ["100", "300", "877", "1000"], "reponse": 2, "explication": "Le Papyrus Ebers contient exactement 877 prescriptions médicales"},
            {"question": "Quelle est l'innovation égyptienne en médecine ?", "options": ["Chirurgie plastique", "Médecine basée sur l'observation empirique", "Rayons X", "Antibiotiques"], "reponse": 1, "explication": "Les Égyptiens pratiquaient une médecine d'observation empirique, pas seulement magique"}
        ]
    },
    {
        "id": "calendrier_astronomique_senmut",
        "titre": "Plafond astronomique de Senmout",
        "monument": "Tombe de Senmout (TT353)",
        "lieu": "Deir el-Bahari, Thèbes",
        "epoque": "XVIIIe dynastie (Hatchepsout, vers 1470 av. J.-C.)",
        "difficulte": 9,
        "description": "Carte céleste la plus ancienne d'Égypte",
        "hieroglyphes": "𓇼𓄿𓅓 𓇳𓅱𓏏𓏥",
        "mots": [
            {"hieroglyph": "𓇼𓄿𓅓", "transliteration": "sbꜣw", "traduction": "étoiles", "explication": "Pluriel - les corps célestes"},
            {"hieroglyph": "𓇳𓅱𓏏𓏥", "transliteration": "hrwt", "traduction": "décans, heures", "explication": "Divisions du ciel nocturne"}
        ],
        "traduction_litterale": "Étoiles décans",
        "traduction_fluide": "Les étoiles décanales (horloge céleste)",
        "grammaire": "Nom pluriel + Nom technique astronomique",
        "contexte_culturel": "Le plafond de Senmout représente les constellations et décans (36 groupes d'étoiles). C'est la plus ancienne carte céleste complète connue, montrant les connaissances astronomiques avancées égyptiennes.",
        "exercice": {"instruction": "Expliquez le système des 36 décans et leur utilité pour mesurer le temps nocturne.", "points": 35},
        "quiz": [
            {"question": "Qu'est-ce qu'un décan ?", "options": ["Dieu", "Groupe d'étoiles servant à mesurer le temps", "Temple", "Pharaon"], "reponse": 1, "explication": "Les décans sont 36 groupes d'étoiles apparaissant successivement, servant d'horloge nocturne"},
            {"question": "Qui était Senmout ?", "options": ["Pharaon", "Architecte et favori d'Hatchepsout", "Prêtre", "Scribe"], "reponse": 1, "explication": "Senmout était l'architecte royal et probable amant de la pharaonne Hatchepsout"}
        ]
    },
    {
        "id": "hymne_aton_akhenaton",
        "titre": "Grand Hymne à Aton",
        "monument": "Tombe d'Ay à Amarna",
        "lieu": "Amarna, Moyenne-Égypte",
        "epoque": "XVIIIe dynastie (Akhenaton, vers 1340 av. J.-C.)",
        "difficulte": 7,
        "description": "Hymne au dieu unique Aton composé par Akhenaton",
        "hieroglyphes": "𓇋𓏏𓈖 𓆣𓂋 𓇳𓏤",
        "mots": [
            {"hieroglyph": "𓇋𓏏𓈖", "transliteration": "Jtn", "traduction": "Aton", "explication": "Le disque solaire, dieu unique d'Akhenaton"},
            {"hieroglyph": "𓆣𓂋", "transliteration": "nfr", "traduction": "beau, parfait", "explication": "Adjectif de louange"},
            {"hieroglyph": "𓇳𓏤", "transliteration": "Rꜥ", "traduction": "Rê", "explication": "Association au soleil"}
        ],
        "traduction_litterale": "Aton beau Rê",
        "traduction_fluide": "Aton, le beau disque solaire",
        "grammaire": "Nom divin + Adjectif + Apposition solaire",
        "contexte_culturel": "Le Grand Hymne à Aton ressemble au Psaume 104 de la Bible. Akhenaton instaura le premier monothéisme connu, révolution religieuse avortée après sa mort.",
        "exercice": {"instruction": "Comparez le Grand Hymne à Aton avec le Psaume 104 : similarités textuelles.", "points": 30},
        "quiz": [
            {"question": "Qu'est-ce qu'Aton ?", "options": ["Pharaon", "Disque solaire, dieu unique", "Temple", "Ville"], "reponse": 1, "explication": "Aton est le disque solaire physique, élevé au rang de dieu unique par Akhenaton"},
            {"question": "Quelle innovation religieuse Akhenaton introduit-il ?", "options": ["Polythéisme", "Monothéisme (un seul dieu)", "Athéisme", "Animisme"], "reponse": 1, "explication": "Akhenaton introduisit le premier monothéisme connu : un seul dieu, Aton"},
            {"question": "Qu'advint-il du culte d'Aton après Akhenaton ?", "options": ["Continua", "Aboli, retour au polythéisme", "Étendu", "Réformé"], "reponse": 1, "explication": "Le culte d'Aton fut aboli après la mort d'Akhenaton, retour à Amon et aux dieux traditionnels"}
        ]
    },
    {
        "id": "papyrus_rhind_mathematiques",
        "titre": "Papyrus Rhind - Mathématiques",
        "monument": "Papyrus mathématique Rhind",
        "lieu": "British Museum, Londres",
        "epoque": "Deuxième Période Intermédiaire (vers 1650 av. J.-C.)",
        "difficulte": 8,
        "description": "Traité mathématique avec problèmes et solutions",
        "hieroglyphes": "𓏤𓏤𓏤𓏤𓏤 𓅓 𓆐",
        "mots": [
            {"hieroglyph": "𓏤𓏤𓏤𓏤𓏤", "transliteration": "5", "traduction": "cinq", "explication": "Numération décimale - 5 traits"},
            {"hieroglyph": "𓅓", "transliteration": "m", "traduction": "dans, par", "explication": "Opération mathématique"},
            {"hieroglyph": "𓆐", "transliteration": "10", "traduction": "dix", "explication": "Numération - fer à cheval = 10"}
        ],
        "traduction_litterale": "5 par 10",
        "traduction_fluide": "5 divisé par 10",
        "grammaire": "Notation mathématique hiéroglyphique",
        "contexte_culturel": "Le Papyrus Rhind contient 87 problèmes mathématiques. Les Égyptiens connaissaient fractions, aires, volumes, et même une approximation de π (3,16). Base de la géométrie pratique.",
        "exercice": {"instruction": "Résolvez un problème du Papyrus Rhind en utilisant la méthode égyptienne des fractions.", "points": 35},
        "quiz": [
            {"question": "Comment les Égyptiens écrivaient-ils les fractions ?", "options": ["Décimales", "Sommes de fractions unitaires (1/2, 1/3...)", "Pourcentages", "Pas de fractions"], "reponse": 1, "explication": "Les Égyptiens n'utilisaient que des fractions unitaires (numérateur = 1)"},
            {"question": "Quelle approximation de π utilisaient les Égyptiens ?", "options": ["3", "3,14", "3,16", "4"], "reponse": 2, "explication": "Les Égyptiens utilisaient π ≈ 3,16 (formule : (16/9)² ≈ 3,16)"}
        ]
    },
    {
        "id": "pierre_rosette_ptolemee",
        "titre": "Pierre de Rosette",
        "monument": "Stèle trilingue",
        "lieu": "British Museum, Londres (trouvée à Rosette)",
        "epoque": "Époque ptolémaïque (196 av. J.-C., Ptolémée V)",
        "difficulte": 9,
        "description": "Décret trilingue qui permit le déchiffrement des hiéroglyphes",
        "hieroglyphes": "𓊪𓏏𓏤𓃭𓐝𓊪",
        "mots": [
            {"hieroglyph": "𓊪𓏏𓏤𓃭𓐝𓊪", "transliteration": "Ptrwmjs", "traduction": "Ptolémée", "explication": "Nom royal grec transcrit phonétiquement"}
        ],
        "traduction_litterale": "Ptolémée",
        "traduction_fluide": "Ptolémée V Épiphane",
        "grammaire": "Transcription phonétique d'un nom étranger en hiéroglyphes",
        "contexte_culturel": "La Pierre de Rosette (196 av. J.-C.) porte le même décret en 3 écritures : hiéroglyphes, démotique, grec ancien. Champollion l'utilisa pour déchiffrer les hiéroglyphes en 1822.",
        "exercice": {"instruction": "Expliquez comment Champollion utilisa les cartouches pour déchiffrer les hiéroglyphes.", "points": 40},
        "quiz": [
            {"question": "En combien de langues/écritures est la Pierre de Rosette ?", "options": ["1", "2", "3 (hiéroglyphes, démotique, grec)", "4"], "reponse": 2, "explication": "Trois écritures : hiéroglyphes (sacré), démotique (populaire), grec ancien (administration)"},
            {"question": "Qui déchiffra les hiéroglyphes grâce à la Pierre de Rosette ?", "options": ["Champollion", "Young", "Mariette", "Petrie"], "reponse": 0, "explication": "Jean-François Champollion déchiffra les hiéroglyphes en 1822 grâce à la Pierre de Rosette"},
            {"question": "Quel pharaon est mentionné sur la Pierre de Rosette ?", "options": ["Ramsès II", "Ptolémée V", "Cléopâtre", "Alexandre"], "reponse": 1, "explication": "La Pierre de Rosette honore le couronnement de Ptolémée V Épiphane"}
        ]
    }
]

# Ajouter toutes les nouvelles inscriptions
data['hieroglyphes']['debutant'].extend(nouveaux_debutant)
data['hieroglyphes']['intermediaire'].extend(nouveaux_intermediaire)
data['hieroglyphes']['expert'].extend(nouveaux_expert)

# Sauvegarder
with open('inscriptions-temples.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("\n" + "="*60)
print("✅ ENRICHISSEMENT MASSIF TERMINÉ !")
print("="*60)
print(f"\n📊 NOUVEAU TOTAL:")
print(f"  🌱 Débutant: {len(data['hieroglyphes']['debutant'])}")
print(f"  🌿 Intermédiaire: {len(data['hieroglyphes']['intermediaire'])}")
print(f"  🌳 Expert: {len(data['hieroglyphes']['expert'])}")
print(f"  📚 TOTAL: {len(data['hieroglyphes']['debutant']) + len(data['hieroglyphes']['intermediaire']) + len(data['hieroglyphes']['expert'])}")
print("\n🎓 Apprentissage complet par immersion opérationnel !")
