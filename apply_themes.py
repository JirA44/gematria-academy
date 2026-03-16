#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script pour appliquer les fonds animés thématiques aux pages du site Gematria Academy
"""

import os
import re
from pathlib import Path

def apply_theme_to_file(filepath, theme_type):
    """Applique un thème à un fichier HTML"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Déterminer le fichier CSS à inclure
    if theme_type == 'hieroglyphes':
        css_file = 'hieroglyphes-animated-bg.css'
    elif theme_type == 'maya':
        css_file = 'maya-animated-bg.css'
    elif theme_type == 'runes':
        css_file = 'runes-animated-bg.css'
    elif theme_type == 'gematria':
        css_file = 'gematria-animated-bg.css'
    else:
        return False

    # Ajouter le CSS thématique s'il n'existe pas déjà
    if css_file not in content:
        # Chercher la balise </head>
        if '<link rel="stylesheet" href="force-dark-mode.css">' in content:
            content = content.replace(
                '<link rel="stylesheet" href="force-dark-mode.css">',
                f'<link rel="stylesheet" href="force-dark-mode.css">\n    <link rel="stylesheet" href="{css_file}">'
            )
        elif '</head>' in content:
            content = content.replace(
                '</head>',
                f'    <link rel="stylesheet" href="{css_file}">\n</head>'
            )

    # Ajouter le script JS s'il n'existe pas déjà
    if 'theme-backgrounds.js' not in content:
        if '</head>' in content:
            content = content.replace(
                '</head>',
                '    <script src="theme-backgrounds.js" defer></script>\n</head>'
            )

    # Sauvegarder
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    return True

def main():
    base_dir = Path(__file__).parent

    # Traiter les fichiers hiéroglyphes
    hieroglyphes_files = list(base_dir.glob('hieroglyphes*.html'))
    print(f"Traitement de {len(hieroglyphes_files)} fichiers hiéroglyphes...")
    for file in hieroglyphes_files:
        if apply_theme_to_file(file, 'hieroglyphes'):
            print(f"  ✓ {file.name}")

    # Traiter les fichiers maya
    maya_files = list(base_dir.glob('maya*.html'))
    print(f"\nTraitement de {len(maya_files)} fichiers maya...")
    for file in maya_files:
        if apply_theme_to_file(file, 'maya'):
            print(f"  ✓ {file.name}")

    # Traiter les fichiers runes
    runes_files = list(base_dir.glob('runes*.html'))
    print(f"\nTraitement de {len(runes_files)} fichiers runes...")
    for file in runes_files:
        if apply_theme_to_file(file, 'runes'):
            print(f"  ✓ {file.name}")

    # Traiter les fichiers gematria
    gematria_files = list(base_dir.glob('gematria*.html')) + list(base_dir.glob('*hebreu*.html'))
    print(f"\nTraitement de {len(gematria_files)} fichiers gematria...")
    for file in gematria_files:
        if apply_theme_to_file(file, 'gematria'):
            print(f"  ✓ {file.name}")

    print(f"\n✅ Thèmes appliqués avec succès!")

if __name__ == '__main__':
    main()
