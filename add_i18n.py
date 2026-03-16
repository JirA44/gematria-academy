#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script pour ajouter le système i18n aux pages HTML
"""

import re
import os

pages = [
    "hieroglyphes-parcours-complet.html",
    "hebreu-gematria-parcours-multilingue.html",
    "mayas-glyphes-parcours-multilingue.html"
]

base_dir = "D:/Apprentissage_Runes_Gematria"

for page in pages:
    filepath = os.path.join(base_dir, page)

    if not os.path.exists(filepath):
        print(f"❌ {page} introuvable")
        continue

    print(f"📄 Traitement: {page}")

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    modified = False

    # 1. Ajouter le CSS du bouton langue avant </head>
    if 'lang-button.css' not in content:
        content = content.replace('</head>', '    <link rel="stylesheet" href="lang-button.css">\n</head>')
        print(f"  ✓ CSS bouton langue ajouté")
        modified = True

    # 2. Ajouter le bouton de langue après <body>
    if 'class="lang-toggle"' not in content:
        # Trouver le <body> tag
        body_match = re.search(r'(<body[^>]*>)', content)
        if body_match:
            body_tag = body_match.group(1)
            content = content.replace(body_tag, f'{body_tag}\n    <button class="lang-toggle">🌐 EN</button>')
            print(f"  ✓ Bouton de langue ajouté")
            modified = True

    # 3. Ajouter les scripts avant </body>
    if 'translations-common.js' not in content and 'i18n-global.js' not in content:
        content = content.replace('</body>', '    <script src="translations-common.js"></script>\n    <script src="i18n-global.js"></script>\n</body>')
        print(f"  ✓ Scripts i18n ajoutés")
        modified = True

    # Sauvegarder
    if modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  ✅ {page} mis à jour!\n")
    else:
        print(f"  ⏭️  {page} déjà à jour\n")

print("🎉 Configuration terminée!")
print("Le système multilingue FR/EN/ES est maintenant actif!")
