#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Répare les boutons navigation mal formés (href dupliqué)
"""

import os
import re

def reparer_bouton_orange(contenu):
    """Répare le bouton orange qui a un href dupliqué"""

    # Pattern : <a href="<a href="xxx.html" class="btn-nav btn-nav-orange">⬅️ Retour au cours</a>" class="btn-nav btn-nav-orange">⬅️ Retour au cours</a>
    # On veut extraire juste le href correct du milieu

    pattern = r'<a href="<a href="([^"]+)" class="btn-nav btn-nav-orange">⬅️ Retour au cours</a>" class="btn-nav btn-nav-orange">⬅️ Retour au cours</a>'

    if re.search(pattern, contenu):
        # Remplacer par la forme correcte
        contenu = re.sub(
            pattern,
            r'<a href="\1" class="btn-nav btn-nav-orange">⬅️ Retour au cours</a>',
            contenu
        )
        return contenu, True

    return contenu, False

def reparer_fichier(fichier):
    """Répare un fichier"""
    with open(fichier, 'r', encoding='utf-8') as f:
        contenu = f.read()

    contenu, modifie = reparer_bouton_orange(contenu)

    if modifie:
        with open(fichier, 'w', encoding='utf-8') as f:
            f.write(contenu)
        return True

    return False

if __name__ == '__main__':
    print("🔧 Réparation des boutons navigation cassés...\n")

    # Trouver tous les fichiers hieroglyphes-immersion
    fichiers = [f for f in os.listdir('.') if f.startswith('hieroglyphes-immersion-') and f.endswith('.html')]

    fichiers_repares = 0

    for fichier in fichiers:
        if reparer_fichier(fichier):
            fichiers_repares += 1
            print(f"✓ {fichier}")

    print(f"\n✅ {fichiers_repares} fichiers réparés")
    print(f"   Bouton 'Retour au cours' maintenant correct avec href simple")
