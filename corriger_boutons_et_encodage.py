#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Corrige les boutons de navigation (couleurs distinctes) et l'encodage UTF-8
"""

import os
import re

def corriger_encodage_multilingual():
    """Corrige les problèmes d'encodage dans index_multilingual.html"""
    fichier = 'index_multilingual.html'

    with open(fichier, 'r', encoding='utf-8') as f:
        contenu = f.read()

    # Corrections d'encodage
    corrections = {
        'ðŸ•‰ï¸ Mandalas SacrÃ©s': '🕉️ Mandalas Sacrés',
        'reprÃ©sentations gÃ©omÃ©triques': 'représentations géométriques',
        "l''univers": "l'univers",
        'millÃ©naires': 'millénaires',
        "d''un": "d'un",
        "d''accÃ©der": "d'accéder",
        'Ã ': 'à',
        'pensÃ©es': 'pensées',
    }

    modifications = 0
    for mauvais, bon in corrections.items():
        if mauvais in contenu:
            contenu = contenu.replace(mauvais, bon)
            modifications += 1
            print(f"   ✓ Corrigé : {mauvais} → {bon}")

    with open(fichier, 'w', encoding='utf-8') as f:
        f.write(contenu)

    print(f"\n✅ {modifications} corrections d'encodage dans {fichier}")
    return modifications

def corriger_boutons_navigation():
    """
    Donne des couleurs distinctes aux 3 boutons de navigation :
    - Retour au cours : Orange
    - Voir ma progression : Vert
    - Accueil : Bleu
    """

    # Trouver tous les fichiers hieroglyphes-immersion
    fichiers = [f for f in os.listdir('.') if f.startswith('hieroglyphes-immersion-') and f.endswith('.html')]

    print(f"\n🎨 Correction des boutons de navigation dans {len(fichiers)} fichiers...")

    # Nouveau CSS avec 3 classes distinctes
    nouveau_css = """        .navigation {
            display: flex;
            justify-content: space-between;
            margin-top: 3rem;
            gap: 1rem;
        }

        .btn-nav {
            text-decoration: none;
            padding: 1rem 2rem;
            border-radius: 25px;
            transition: all 0.3s ease;
            color: white;
            font-weight: bold;
            text-align: center;
            flex: 1;
        }

        .btn-nav:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        }

        .btn-nav-orange {
            background: linear-gradient(135deg, #ff9800, #f57c00);
        }

        .btn-nav-orange:hover {
            background: linear-gradient(135deg, #ffa726, #ff6f00);
        }

        .btn-nav-green {
            background: linear-gradient(135deg, #4caf50, #388e3c);
        }

        .btn-nav-green:hover {
            background: linear-gradient(135deg, #66bb6a, #2e7d32);
        }

        .btn-nav-blue {
            background: linear-gradient(135deg, #2196f3, #1976d2);
        }

        .btn-nav-blue:hover {
            background: linear-gradient(135deg, #42a5f5, #1565c0);
        }"""

    fichiers_modifies = 0

    for fichier in fichiers:
        with open(fichier, 'r', encoding='utf-8') as f:
            contenu = f.read()

        # Remplacer l'ancien CSS des boutons
        pattern_ancien_css = r'\.navigation \{[^}]+\}\s+\.btn-nav \{[^}]+\}\s+\.btn-nav:hover \{[^}]+\}'

        if re.search(pattern_ancien_css, contenu):
            contenu = re.sub(pattern_ancien_css, nouveau_css, contenu)

            # Mettre à jour les classes HTML des boutons
            # Retour au cours → orange
            contenu = re.sub(
                r'<a href="[^"]*\.html" class="btn-nav">⬅️ Retour au cours</a>',
                r'<a href="\g<0>" class="btn-nav btn-nav-orange">⬅️ Retour au cours</a>',
                contenu
            )

            # Mieux : utiliser un remplacement plus précis
            contenu = contenu.replace(
                'class="btn-nav">⬅️ Retour au cours',
                'class="btn-nav btn-nav-orange">⬅️ Retour au cours'
            )
            contenu = contenu.replace(
                'class="btn-nav">📊 Voir ma progression',
                'class="btn-nav btn-nav-green">📊 Voir ma progression'
            )
            contenu = contenu.replace(
                'class="btn-nav">🏠 Accueil',
                'class="btn-nav btn-nav-blue">🏠 Accueil'
            )

            with open(fichier, 'w', encoding='utf-8') as f:
                f.write(contenu)

            fichiers_modifies += 1

    print(f"✅ {fichiers_modifies} fichiers modifiés avec boutons colorés distincts")
    print(f"   🟠 Orange : Retour au cours")
    print(f"   🟢 Vert : Voir ma progression")
    print(f"   🔵 Bleu : Accueil")

    return fichiers_modifies

if __name__ == '__main__':
    print("🔧 Correction des boutons et de l'encodage...\n")

    # 1. Corriger les boutons de navigation
    nb_boutons = corriger_boutons_navigation()

    # 2. Corriger l'encodage
    nb_encodage = corriger_encodage_multilingual()

    print(f"\n✨ Terminé !")
    print(f"   - {nb_boutons} fichiers avec boutons distincts")
    print(f"   - {nb_encodage} corrections d'encodage")
