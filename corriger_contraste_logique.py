#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Corrige le problème de contraste dans les tableaux de symboles logiques:
- Fond bleu clair (#e3f2fd, #bbdefb) avec texte blanc = illisible
- Solution: Remplacer par fond sombre semi-transparent
"""

import re

def corriger_contraste_logique(fichier):
    """Corrige les gradients bleu clair par des fonds sombres lisibles"""
    print(f"\n🔧 Correction de {fichier}...")

    with open(fichier, 'r', encoding='utf-8') as f:
        contenu = f.read()

    modifications = 0

    # Pattern pour les sections avec fond bleu clair
    # ligne 127 logique-debutant : background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)
    patterns_a_corriger = [
        # Bleu clair (logique débutant)
        (r'background:\s*linear-gradient\([^)]*#e3f2fd[^)]*#bbdefb[^)]*\)',
         'background: linear-gradient(135deg, rgba(33, 150, 243, 0.15) 0%, rgba(25, 118, 210, 0.2) 100%)'),

        # Autres variantes de bleu clair
        (r'background:\s*linear-gradient\([^)]*#bbdefb[^)]*#90caf9[^)]*\)',
         'background: linear-gradient(135deg, rgba(33, 150, 243, 0.15) 0%, rgba(25, 118, 210, 0.2) 100%)'),

        # Jaune clair (logique intermédiaire)
        (r'background:\s*linear-gradient\([^)]*#fff8e1[^)]*#ffecb3[^)]*\)',
         'background: linear-gradient(135deg, rgba(255, 193, 7, 0.15) 0%, rgba(255, 152, 0, 0.2) 100%)'),

        # Rose/violet clair (logique expert)
        (r'background:\s*linear-gradient\([^)]*#f3e5f5[^)]*#e1bee7[^)]*\)',
         'background: linear-gradient(135deg, rgba(156, 39, 176, 0.15) 0%, rgba(142, 36, 170, 0.2) 100%)'),
    ]

    for pattern, remplacement in patterns_a_corriger:
        if re.search(pattern, contenu):
            contenu = re.sub(pattern, remplacement, contenu)
            modifications += 1
            print(f"   ✓ Gradient clair remplacé par fond sombre semi-transparent")

    if modifications > 0:
        with open(fichier, 'w', encoding='utf-8') as f:
            f.write(contenu)
        print(f"✅ {modifications} corrections appliquées")
        return True
    else:
        print("⚠️  Aucune correction nécessaire")
        return False

if __name__ == '__main__':
    print("🎨 CORRECTION CONTRASTE SYMBOLES LOGIQUES\n")
    print("Problème : Texte blanc/clair sur fond bleu clair = ILLISIBLE")
    print("Solution : Fond sombre semi-transparent avec bon contraste\n")

    fichiers = [
        'logique-debutant.html',
        'logique-intermediaire.html',
        'logique-expert.html'
    ]

    corrigés = 0
    for fichier in fichiers:
        try:
            if corriger_contraste_logique(fichier):
                corrigés += 1
        except FileNotFoundError:
            print(f"⚠️  {fichier} introuvable")
        except Exception as e:
            print(f"❌ Erreur: {e}")

    print(f"\n{'='*60}")
    print(f"✅ {corrigés} fichier(s) corrigé(s)")
    print(f"\nRésultat : Tableaux maintenant lisibles avec bon contraste !")
