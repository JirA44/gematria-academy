#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Corrige les problèmes de cadrage des mandalas:
1. Change object-fit: cover → contain (pour ne pas couper l'image)
2. Ajoute viewBox aux SVG qui n'en ont pas
3. Ajoute du padding pour éviter que l'image touche les bords
"""

import re

def corriger_mandala_html(fichier):
    """Corrige le fichier mandala HTML"""
    print(f"\n🔧 Correction de {fichier}...")

    with open(fichier, 'r', encoding='utf-8') as f:
        contenu = f.read()

    modifications = 0

    # 1. Changer object-fit: cover en contain
    if 'object-fit: cover' in contenu:
        contenu = contenu.replace('object-fit: cover', 'object-fit: contain')
        print("   ✓ object-fit: cover → contain")
        modifications += 1

    # 2. Ajouter max-width et max-height pour éviter que l'image soit trop grande
    pattern_mandala_css = r'(\.mandala-image \{[^}]+)(object-fit: contain;)'
    if re.search(pattern_mandala_css, contenu):
        contenu = re.sub(
            pattern_mandala_css,
            r'\1\2\n            max-width: 90vw;\n            max-height: 90vh;',
            contenu
        )
        print("   ✓ Ajout max-width: 90vw et max-height: 90vh")
        modifications += 1

    # 3. Ajouter viewBox à tous les SVG qui n'en ont pas
    svg_pattern = r'<svg width="800" height="800" xmlns="http://www\.w3\.org/2000/svg">'
    svg_avec_viewbox = '<svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">'

    if re.search(svg_pattern, contenu):
        avant = contenu.count(svg_pattern)
        contenu = contenu.replace(svg_pattern, svg_avec_viewbox)
        print(f"   ✓ Ajout viewBox à {avant} SVG")
        modifications += avant

    # 4. Changer background viewer pour mieux voir
    if 'background: #000;' in contenu and '.viewer {' in contenu:
        # Ne pas changer, garder noir pour la méditation
        pass

    if modifications > 0:
        with open(fichier, 'w', encoding='utf-8') as f:
            f.write(contenu)
        print(f"✅ {modifications} corrections appliquées")
        return True
    else:
        print("⚠️  Aucune correction nécessaire")
        return False

if __name__ == '__main__':
    print("🎨 CORRECTION DES MANDALAS\n")
    print("Problèmes à corriger :")
    print("  - Images coupées en bas (object-fit: cover)")
    print("  - Espace blanc inutile en haut (viewBox manquant)")
    print("  - Images touchent les bords de l'écran\n")

    fichiers = [
        'mandala.html',
        'mandala-with-defaults.html',
        'mandala_anime.html'
    ]

    corrigés = 0
    for fichier in fichiers:
        try:
            if corriger_mandala_html(fichier):
                corrigés += 1
        except FileNotFoundError:
            print(f"⚠️  {fichier} introuvable, ignoré")
        except Exception as e:
            print(f"❌ Erreur avec {fichier}: {e}")

    print(f"\n{'='*60}")
    print(f"✅ {corrigés} fichier(s) corrigé(s)")
    print(f"\nCorrections appliquées :")
    print(f"  ✓ object-fit: contain (image entière visible)")
    print(f"  ✓ max-width/max-height: 90vw/90vh (marge de sécurité)")
    print(f"  ✓ viewBox ajouté aux SVG (cadrage correct)")
