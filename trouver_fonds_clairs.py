# -*- coding: utf-8 -*-
"""
Trouver toutes les classes CSS avec des fonds clairs dans les fichiers HTML
"""

import re
import glob

# Patterns de couleurs claires à détecter
patterns_clairs = [
    r'background:\s*#[fF][0-9a-fA-F]{5}',  # #Fxxxxx (commence par F = clair)
    r'background:\s*#[eE][0-9a-fA-F]{5}',  # #Exxxxx
    r'background:\s*#[dD][0-9a-fA-F]{5}',  # #Dxxxxx
    r'background:\s*#[cC][89a-fA-F][0-9a-fA-F]{4}',  # #C8-CF
    r'background:\s*rgba?\(255,\s*255,\s*255',  # rgb(255, 255, 255)
    r'background:\s*rgba?\(2[0-5][0-9],\s*2[0-5][0-9]',  # rgb(200+, 200+...)
    r'background:\s*white',
    r'background:\s*#fff\b',
    r'background:\s*#ffffff\b',
]

# Classes trouvées avec fonds clairs
classes_claires = set()

# Parcourir tous les fichiers HTML
fichiers_html = glob.glob('*.html')

print("🔍 Recherche des classes avec fonds clairs...\n")

for fichier in fichiers_html:
    try:
        with open(fichier, 'r', encoding='utf-8') as f:
            contenu = f.read()

        # Chercher les définitions de classes avec background clair
        # Pattern: .nom-classe { ... background: #clair ... }
        for pattern in patterns_clairs:
            matches = re.finditer(pattern, contenu, re.IGNORECASE)
            for match in matches:
                # Remonter pour trouver le nom de la classe
                debut = max(0, match.start() - 500)
                extrait = contenu[debut:match.end()]

                # Chercher le sélecteur de classe
                class_match = re.findall(r'\.([a-zA-Z0-9_-]+)\s*\{[^}]*' + re.escape(match.group()), extrait)
                if class_match:
                    for classe in class_match:
                        classes_claires.add(classe)
                        print(f"  {fichier}: .{classe} → {match.group()}")

    except Exception as e:
        print(f"⚠️  Erreur avec {fichier}: {e}")

print(f"\n📊 TOTAL: {len(classes_claires)} classes trouvées avec fonds clairs\n")

if classes_claires:
    print("📋 LISTE DES CLASSES À AJOUTER À force-dark-mode.css:\n")
    for classe in sorted(classes_claires):
        print(f"  .{classe}")

    print("\n💡 Copiez-collez dans force-dark-mode.css:")
    print("\n/* Classes avec fonds clairs (auto-détectées) */")
    print(",\n".join([f".{c}" for c in sorted(classes_claires)]) + " {")
    print("    background: rgba(25, 25, 40, 0.9) !important;")
    print("    color: #e0e0e0 !important;")
    print("    border-color: rgba(100, 100, 150, 0.3) !important;")
    print("}")
else:
    print("✅ Aucune classe avec fond clair trouvée !")
