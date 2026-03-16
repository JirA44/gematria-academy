#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Supprime tous les fonds blancs et les remplace par transparent
ou des fonds sombres semi-transparents
"""

import os
import glob
import re

# Trouver tous les fichiers HTML
fichiers_html = glob.glob('*.html') + glob.glob('hieroglyphes-*.html')

compteur = 0

# Mappings de remplacement
remplacements = [
    # Fonds blancs purs
    (r'background:\s*white\s*;', 'background: rgba(30, 30, 45, 0.7);'),
    (r'background:\s*#fff\s*;', 'background: rgba(30, 30, 45, 0.7);'),
    (r'background:\s*#ffffff\s*;', 'background: rgba(30, 30, 45, 0.7);'),
    (r'background-color:\s*white\s*;', 'background-color: rgba(30, 30, 45, 0.7);'),
    (r'background-color:\s*#fff\s*;', 'background-color: rgba(30, 30, 45, 0.7);'),
    (r'background-color:\s*#ffffff\s*;', 'background-color: rgba(30, 30, 45, 0.7);'),

    # Fonds gris très clairs
    (r'background:\s*#f8f9fa\s*;', 'background: rgba(40, 40, 60, 0.5);'),
    (r'background:\s*#f5f5f5\s*;', 'background: rgba(40, 40, 60, 0.5);'),
    (r'background:\s*#fafafa\s*;', 'background: rgba(40, 40, 60, 0.5);'),
    (r'background:\s*#f0f0f0\s*;', 'background: rgba(40, 40, 60, 0.5);'),
    (r'background-color:\s*#f8f9fa\s*;', 'background-color: rgba(40, 40, 60, 0.5);'),

    # Fonds jaunes/beiges clairs (exercices)
    (r'background:\s*#fff3cd\s*;', 'background: rgba(255, 193, 7, 0.15);'),
    (r'background:\s*#fffbf0\s*;', 'background: rgba(255, 193, 7, 0.1);'),
    (r'background:\s*#fef9e7\s*;', 'background: rgba(255, 193, 7, 0.1);'),

    # Texte noir sur fond clair → texte clair
    (r'color:\s*#000\s*;', 'color: #e0e0e0;'),
    (r'color:\s*#000000\s*;', 'color: #e0e0e0;'),
    (r'color:\s*black\s*;', 'color: #e0e0e0;'),
    (r'color:\s*#333\s*;', 'color: #c0c0c0;'),
    (r'color:\s*#222\s*;', 'color: #d0d0d0;'),
]

for fichier in fichiers_html:
    if not os.path.exists(fichier):
        continue

    with open(fichier, 'r', encoding='utf-8') as f:
        contenu = f.read()

    contenu_modifie = contenu
    modifications_fichier = 0

    # Appliquer tous les remplacements
    for pattern, remplacement in remplacements:
        matches = re.findall(pattern, contenu_modifie, re.IGNORECASE)
        if matches:
            contenu_modifie = re.sub(pattern, remplacement, contenu_modifie, flags=re.IGNORECASE)
            modifications_fichier += len(matches)

    # Sauvegarder si modifié
    if contenu_modifie != contenu:
        with open(fichier, 'w', encoding='utf-8') as f:
            f.write(contenu_modifie)
        print(f"✅ {fichier} - {modifications_fichier} fond(s) blanc(s) supprimé(s)")
        compteur += 1

print(f"\n🎉 {compteur} fichier(s) modifié(s) !")
print("🌌 Tous les fonds blancs ont été remplacés par des fonds sombres semi-transparents")
