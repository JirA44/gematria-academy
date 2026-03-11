# -*- coding: utf-8 -*-
"""
Ajouter force-dark-mode.css dans toutes les pages individuelles
"""

import os
import re

# Liste des pages à modifier
pages = [
    'hieroglyphes-debutant.html',
    'hieroglyphes-intermediaire.html',
    'hieroglyphes-expert.html',
    'maya-debutant.html',
    'maya-intermediaire.html',
    'maya-expert.html',
    'runes-debutant.html',
    'runes-intermediaire.html',
    'runes-expert.html',
    'gematria-debutant.html',
    'gematria-intermediaire.html',
    'gematria-expert.html',
    'logique-debutant.html',
    'logique-intermediaire.html',
    'logique-expert.html',
    'upload-mandalas.html'
]

ligne_a_ajouter = '    <link rel="stylesheet" href="force-dark-mode.css">\n'

for page in pages:
    chemin = page

    if not os.path.exists(chemin):
        print(f"⚠️  {page} - N'existe pas, ignoré")
        continue

    # Lire le fichier
    with open(chemin, 'r', encoding='utf-8') as f:
        contenu = f.read()

    # Vérifier si déjà ajouté
    if 'force-dark-mode.css' in contenu:
        print(f"✅ {page} - Déjà ajouté, ignoré")
        continue

    # Chercher </title> et ajouter après
    if '</title>' in contenu:
        contenu = contenu.replace('</title>', '</title>\n' + ligne_a_ajouter)

        # Sauvegarder
        with open(chemin, 'w', encoding='utf-8') as f:
            f.write(contenu)

        print(f"✅ {page} - Mode nuit ajouté")
    else:
        print(f"⚠️  {page} - Pas de balise </title>, ignoré")

print("\n🎉 Terminé ! Toutes les pages sont en mode nuit.")
print("Rechargez les pages (Ctrl+R) pour voir le changement.")
