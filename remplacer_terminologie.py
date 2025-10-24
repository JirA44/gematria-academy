#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Remplace "apprentissage moderne" par "apprentissage progressif"
et "modern learning" par "progressive learning"
"""

import os
import glob

# Trouver tous les fichiers HTML
fichiers_html = glob.glob('*.html')

compteur_fr = 0
compteur_en = 0

for fichier in fichiers_html:
    with open(fichier, 'r', encoding='utf-8') as f:
        contenu = f.read()

    # Vérifier s'il y a des changements à faire
    contenu_modifie = contenu

    # Remplacer français
    if 'apprentissage moderne' in contenu_modifie:
        contenu_modifie = contenu_modifie.replace('apprentissage moderne', 'apprentissage progressif')
        compteur_fr += contenu.count('apprentissage moderne')

    # Remplacer anglais
    if 'modern learning' in contenu_modifie:
        contenu_modifie = contenu_modifie.replace('modern learning', 'progressive learning')
        compteur_en += contenu.count('modern learning')

    # Sauvegarder si modifié
    if contenu_modifie != contenu:
        with open(fichier, 'w', encoding='utf-8') as f:
            f.write(contenu_modifie)
        print(f"✅ {fichier} - Mis à jour")

print(f"\n🎉 {compteur_fr} occurrences FR remplacées")
print(f"🎉 {compteur_en} occurrences EN remplacées")
print(f"📊 Total: {compteur_fr + compteur_en} remplacements")
