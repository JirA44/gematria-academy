#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script pour ajouter la prononciation phonétique à tous les hiéroglyphes
pour permettre la LECTURE NATURELLE de l'égyptien ancien
"""

import json

# Charger le JSON
with open('inscriptions-temples.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Dictionnaire de prononciation pour les translittérations courantes
PRONONCIATION = {
    # Consonnes égyptiennes
    'nṯr': 'NÉ-tcher',
    'pr': 'pèr',
    'nfr': 'né-fer',
    'ny-swt-bity': 'ni-sout-bi-ti',
    'tut-ankh': 'tout-ânkh',
    'Imn': 'i-men',
    'Amon': 'a-mon',
    'Ra': 'râ',
    'Rê': 'rê',
    'nṯrw': 'né-tcherou',
    'ꜥnḫ': 'ânkh',
    'ḏd': 'djed',
    'wꜣs': 'ouâs',
    'ḥtp': 'hé-tep',
    'ḥtpw': 'hé-tépou',
    'di': 'di',
    'dỉ': 'di',
    'ꜥꜣ': 'â',
    'nswt': 'ni-sout',
    'nsw': 'ni-sou',
    'n': 'en',
    'm': 'em',
    'ꜣḥt': 'a-khet',
    'hrw': 'hérou',
    'prt': 'pé-ret',
    'ink': 'inek',
    'Snḥ': 'si-nou-hé',
    'ḥkꜣw': 'hé-kaou',
    'Ppy': 'pé-pi',
    'pn': 'pen',
    'ỉt': 'it',
    'Ḥr': 'hor',
    'pt': 'pèt',
    'wḏt': 'ou-djet',
    'Trygwtrẃs': 'tri-gou-tros',
    'ḏw': 'dou',
    'ḳꜣb': 'kâb',
    'ꜥḥꜥ': 'a-ha',
    'Ḫwfw': 'khou-fou',
    'Wsir': 'ou-sir',
    'Wsjr': 'ou-sir',
    'Stẖ': 'seth',
    'Stš': 'setesh',
    'ḏd-pjlr': 'djed pi-lèr',
    'wꜣs-sḫm': 'ouâs sékhem',
    'ỉmꜣḫ': 'i-makh',
    'ḫr': 'kher',
    'mꜣꜥ-ḫrw': 'mâ-kherou',
    'sꜣ': 'sa',
    'mwt': 'mout',
    'nb': 'neb',
    'tꜣwy': 'ta-oui',
    'ḥm': 'hem',
    'nṯr-nfr': 'né-tcher né-fer',
    'rḏi': 're-di',
    'ḏt': 'djet',
    'nḥḥ': 'né-heh',
    'sḏm': 'sé-djem',
    'md': 'med',
    'mdw': 'mé-dou',
    'nṯrw': 'né-tcherou',
    'sꜥnḫ': 'sé-ânkh',
    'rḫ': 'rekh',
    't': 'et',
    'Ptolémée': 'pto-lé-mé',
    # Syllabes simples
    'a': 'a',
    'i': 'i',
    'w': 'ou',
    'b': 'eb',
    'p': 'ep',
    'f': 'ef',
    'm': 'em',
    'n': 'en',
    'r': 'er',
    'h': 'eh',
    's': 'es',
    'š': 'esh',
    'k': 'ek',
    'g': 'eg',
    't': 'et',
    'd': 'd',
    'ḏ': 'dj',
}

def generer_prononciation(transliteration, traduction):
    """
    Génère une prononciation phonétique à partir de la translittération
    """
    # Chercher correspondance exacte
    if transliteration in PRONONCIATION:
        return PRONONCIATION[transliteration]

    # Chercher dans les traductions connues
    if traduction in PRONONCIATION:
        return PRONONCIATION[traduction]

    # Générer prononciation approximative
    prononciation = transliteration

    # Remplacer caractères spéciaux
    remplacements = {
        'ṯ': 'tch',
        'ḫ': 'kh',
        'ḥ': 'h',
        'ḳ': 'k',
        'ꜥ': 'a',
        'ꜣ': 'â',
        'š': 'sh',
        'ḏ': 'dj',
        'w': 'ou',
    }

    for ancien, nouveau in remplacements.items():
        prononciation = prononciation.replace(ancien, nouveau)

    return prononciation

# Parcourir tous les niveaux
compteur = 0
for niveau in ['debutant', 'intermediaire', 'expert']:
    for inscription in data['hieroglyphes'][niveau]:
        for mot in inscription['mots']:
            if 'pronunciation' not in mot:
                # Générer prononciation
                transliteration = mot.get('transliteration', '')
                traduction = mot.get('traduction', '')

                prononciation = generer_prononciation(transliteration, traduction)
                mot['pronunciation'] = prononciation
                compteur += 1

print(f"✅ {compteur} prononciations ajoutées !")

# Sauvegarder
with open('inscriptions-temples.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("💾 Fichier sauvegardé avec prononciation !")

# Afficher exemples
print("\n📚 Exemples de prononciation ajoutés:")
for niveau in ['debutant', 'intermediaire', 'expert']:
    premier = data['hieroglyphes'][niveau][0]
    print(f"\n  {niveau.upper()} - {premier['titre']}:")
    for mot in premier['mots'][:3]:  # Premiers 3 mots
        print(f"    {mot['hieroglyph']} → {mot.get('transliteration', '')} → 🗣️ {mot.get('pronunciation', '')}")
