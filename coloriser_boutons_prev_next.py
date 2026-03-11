#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Donne des couleurs vives et distinctes aux boutons Précédent/Index/Suivant
"""

import os
import re

# Couleurs très contrastées pour les 3 boutons
STYLE_PRECEDENT = 'background: linear-gradient(135deg, #00bcd4, #0097a7); color: white; padding: 1rem 2rem; border-radius: 25px; text-decoration: none; font-size: 1.1rem; font-weight: bold; box-shadow: 0 3px 10px rgba(0, 188, 212, 0.3);'
STYLE_INDEX = 'background: linear-gradient(135deg, #ffc107, #ffa000); color: white; padding: 1rem 2rem; border-radius: 25px; text-decoration: none; font-size: 1.1rem; font-weight: bold; box-shadow: 0 3px 10px rgba(255, 193, 7, 0.3);'
STYLE_SUIVANT = 'background: linear-gradient(135deg, #e91e63, #c2185b); color: white; padding: 1rem 2rem; border-radius: 25px; text-decoration: none; font-size: 1.1rem; font-weight: bold; box-shadow: 0 3px 10px rgba(233, 30, 99, 0.3);'

def coloriser_boutons(contenu):
    """Remplace les styles inline des boutons par des couleurs vives"""

    modifications = 0

    # 1. Bouton Précédent (cyan)
    pattern_prev = r'<a href="([^"]+)" style="[^"]*">← Précédent</a>'
    if re.search(pattern_prev, contenu):
        contenu = re.sub(
            pattern_prev,
            f'<a href="\\1" style="{STYLE_PRECEDENT}">← Précédent</a>',
            contenu
        )
        modifications += 1

    # 2. Bouton Index (jaune/orange)
    pattern_index = r'<a href="([^"]+)" style="[^"]*">📚 Index</a>'
    if re.search(pattern_index, contenu):
        contenu = re.sub(
            pattern_index,
            f'<a href="\\1" style="{STYLE_INDEX}">📚 Index</a>',
            contenu
        )
        modifications += 1

    # 3. Bouton Suivant (rose/magenta)
    pattern_next = r'<a href="([^"]+)" style="[^"]*">Suivant →</a>'
    if re.search(pattern_next, contenu):
        contenu = re.sub(
            pattern_next,
            f'<a href="\\1" style="{STYLE_SUIVANT}">Suivant →</a>',
            contenu
        )
        modifications += 1

    return contenu, modifications

def coloriser_fichier(fichier):
    """Colorise un fichier"""
    with open(fichier, 'r', encoding='utf-8') as f:
        contenu = f.read()

    contenu, nb_modifs = coloriser_boutons(contenu)

    if nb_modifs > 0:
        with open(fichier, 'w', encoding='utf-8') as f:
            f.write(contenu)
        return nb_modifs

    return 0

if __name__ == '__main__':
    print("🎨 Colorisation des boutons Précédent/Index/Suivant...\n")

    # Trouver tous les fichiers hieroglyphes-immersion
    fichiers = [f for f in os.listdir('.') if f.startswith('hieroglyphes-immersion-') and f.endswith('.html')]

    fichiers_modifies = 0
    total_boutons = 0

    for fichier in fichiers:
        nb_modifs = coloriser_fichier(fichier)
        if nb_modifs > 0:
            fichiers_modifies += 1
            total_boutons += nb_modifs

    print(f"✅ {fichiers_modifies} fichiers modifiés")
    print(f"   {total_boutons} boutons colorisés\n")
    print("Palette de couleurs distinctes :")
    print("   🔵 Cyan : ← Précédent")
    print("   🟡 Jaune : 📚 Index")
    print("   🔴 Rose : Suivant →")
