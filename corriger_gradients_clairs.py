#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Corrige tous les gradients clairs restants
"""

import re

fichiers = [
    'logique-expert.html',
    'alphabet-hebreu.html',
    'alphabet-runes.html',
    'maya-debutant.html',
    'maya-intermediaire.html',
    'qr-gematria.html',
    'tirage-runes.html'
]

# Patterns et remplacements
remplacements = [
    # Jaune/beige clair
    (r'background:\s*linear-gradient\([^)]*#fff8e1[^)]*\)',
     'background: linear-gradient(135deg, rgba(255, 193, 7, 0.15) 0%, rgba(255, 152, 0, 0.2) 100%)'),

    (r'background:\s*linear-gradient\([^)]*#fff3cd[^)]*\)',
     'background: linear-gradient(135deg, rgba(255, 193, 7, 0.15) 0%, rgba(255, 152, 0, 0.2) 100%)'),

    (r'background:\s*linear-gradient\([^)]*#fff9e6[^)]*\)',
     'background: linear-gradient(135deg, rgba(255, 193, 7, 0.15) 0%, rgba(255, 152, 0, 0.2) 100%)'),

    # Gris très clairs
    (r'background:\s*linear-gradient\([^)]*#f8f9fa[^)]*\)',
     'background: linear-gradient(135deg, rgba(40, 40, 60, 0.3) 0%, rgba(60, 60, 80, 0.4) 100%)'),

    # Rose/violet clair
    (r'background:\s*linear-gradient\([^)]*#fce4ec[^)]*\)',
     'background: linear-gradient(135deg, rgba(156, 39, 176, 0.15) 0%, rgba(123, 31, 162, 0.2) 100%)'),

    (r'background:\s*linear-gradient\([^)]*#f3e5f5[^)]*\)',
     'background: linear-gradient(135deg, rgba(156, 39, 176, 0.15) 0%, rgba(123, 31, 162, 0.2) 100%)'),
]

compteur_total = 0

for fichier in fichiers:
    try:
        with open(fichier, 'r', encoding='utf-8') as f:
            contenu = f.read()

        contenu_modifie = contenu
        modifs = 0

        for pattern, remplacement in remplacements:
            matches = re.findall(pattern, contenu_modifie, re.IGNORECASE)
            if matches:
                contenu_modifie = re.sub(pattern, remplacement, contenu_modifie, flags=re.IGNORECASE)
                modifs += len(matches)

        if contenu_modifie != contenu:
            with open(fichier, 'w', encoding='utf-8') as f:
                f.write(contenu_modifie)
            print(f"✅ {fichier} - {modifs} gradient(s) corrigé(s)")
            compteur_total += modifs
        else:
            print(f"⚪ {fichier} - Aucun gradient clair trouvé")

    except FileNotFoundError:
        print(f"❌ {fichier} - Fichier non trouvé")

print(f"\n🎉 {compteur_total} gradient(s) clair(s) remplacé(s) par des gradients sombres !")
