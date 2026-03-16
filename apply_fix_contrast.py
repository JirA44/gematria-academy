#!/usr/bin/env python3
"""
Script pour ajouter le fichier fix-contrast.css à toutes les pages HTML
"""

import os
import glob

# Dossier contenant les fichiers HTML
html_dir = os.path.dirname(os.path.abspath(__file__))

# Ligne à ajouter
fix_line = '    <link rel="stylesheet" href="fix-contrast.css">\n'

# Trouver tous les fichiers HTML
html_files = glob.glob(os.path.join(html_dir, "*.html"))

print(f"Trouvé {len(html_files)} fichiers HTML à traiter...\n")

for html_file in html_files:
    filename = os.path.basename(html_file)

    # Lire le contenu
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Vérifier si le fix n'est pas déjà ajouté
    if 'fix-contrast.css' in content:
        print(f"⏭️  {filename} - Déjà corrigé, ignoré")
        continue

    # Trouver la position après la dernière balise <link rel="stylesheet">
    if '<link rel="stylesheet" href="style.css">' in content:
        # Ajouter juste après style.css
        content = content.replace(
            '<link rel="stylesheet" href="style.css">',
            '<link rel="stylesheet" href="style.css">\n    <link rel="stylesheet" href="fix-contrast.css">'
        )
    elif '</head>' in content:
        # Sinon, ajouter juste avant </head>
        content = content.replace('</head>', fix_line + '</head>')
    else:
        print(f"❌ {filename} - Structure HTML non reconnue")
        continue

    # Écrire le nouveau contenu
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"✅ {filename} - Correction appliquée")

print("\n🎉 Terminé ! Le contraste a été amélioré sur toutes les pages.")
