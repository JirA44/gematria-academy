#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Ajoute le fond animé à toutes les pages HTML
Style KOF Ultimate Online
"""

import os
import re

# Pages à modifier
pages_a_modifier = [
    'index_COMPLET.html',
    'index_multilingual.html',
    'alphabet-hebreu.html',
    'alphabet-runes.html',
    'calculateur-gematria.html',
    'gematria-debutant.html',
    'gematria-intermediaire.html',
    'gematria-expert.html',
    'maya-debutant.html',
    'maya-intermediaire.html',
    'maya-expert.html',
    'mandala.html',
    'mandala_anime.html',
    'mandala-with-defaults.html',
    'immersion-inscriptions-index.html',
]

# Lignes à ajouter
css_link = '    <link rel="stylesheet" href="animated-background.css">'
js_script = '    <script src="animated-background.js" defer></script>'

compteur = 0

for fichier in pages_a_modifier:
    chemin = fichier
    if not os.path.exists(chemin):
        print(f"⚠️  {fichier} - Non trouvé, skip")
        continue

    with open(chemin, 'r', encoding='utf-8') as f:
        contenu = f.read()

    # Vérifier si déjà ajouté
    if 'animated-background.css' in contenu:
        print(f"✅ {fichier} - Déjà présent, skip")
        continue

    # Trouver </head> et ajouter avant
    if '</head>' in contenu:
        # Ajouter CSS et JS juste avant </head>
        contenu = contenu.replace('</head>', f'{css_link}\n{js_script}\n</head>')

        with open(chemin, 'w', encoding='utf-8') as f:
            f.write(contenu)

        print(f"✅ {fichier} - Fond animé ajouté")
        compteur += 1
    else:
        print(f"❌ {fichier} - Pas de balise </head> trouvée")

print(f"\n🎉 {compteur} page(s) modifiée(s) !")
