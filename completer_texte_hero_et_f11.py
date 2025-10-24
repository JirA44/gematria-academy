#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
1. Met à jour le texte hero pour inclure TOUTES les disciplines
2. Ajoute une instruction F11 pour le plein écran
"""

import re

# Nouveau texte hero complet
NOUVEAU_TEXTE_HERO = "Découvrez les secrets ancestraux des civilisations anciennes : runes nordiques, gematria hébraïque, hiéroglyphes égyptiens, glyphes mayas, mandalas sacrés et logiques. Un apprentissage progressif structuré en trois niveaux de maîtrise."

# Message F11 à ajouter en haut de page
MESSAGE_F11 = '''        <div class="fullscreen-hint" style="background: linear-gradient(135deg, rgba(76, 175, 80, 0.2), rgba(33, 150, 243, 0.2)); border: 2px solid rgba(76, 175, 80, 0.5); border-radius: 15px; padding: 1rem 2rem; margin-bottom: 2rem; text-align: center; font-size: 1.1rem;">
            💡 <strong>Astuce :</strong> Appuyez sur <kbd style="background: rgba(255, 255, 255, 0.1); padding: 0.3rem 0.6rem; border-radius: 5px; border: 1px solid rgba(255, 255, 255, 0.3); font-family: monospace;">F11</kbd> pour profiter du site en plein écran !
        </div>
'''

def mettre_a_jour_fichier(fichier):
    """Met à jour un fichier index avec le nouveau texte hero et le message F11"""
    print(f"\n📝 Traitement de {fichier}...")

    with open(fichier, 'r', encoding='utf-8') as f:
        contenu = f.read()

    modifie = False

    # 1. Mettre à jour le texte hero dans le HTML
    pattern_html = r'<p[^>]*data-i18n="hero_text"[^>]*>.*?</p>'
    if re.search(pattern_html, contenu):
        contenu = re.sub(
            pattern_html,
            f'<p data-i18n="hero_text">{NOUVEAU_TEXTE_HERO}</p>',
            contenu
        )
        print("   ✓ Texte hero HTML mis à jour")
        modifie = True
    else:
        # Essayer sans data-i18n
        pattern_simple = r'<section class="hero">.*?<p>(.*?)</p>'
        if re.search(pattern_simple, contenu, re.DOTALL):
            contenu = re.sub(
                r'(<section class="hero">.*?<p>).*?(</p>)',
                f'\\1{NOUVEAU_TEXTE_HERO}\\2',
                contenu,
                flags=re.DOTALL
            )
            print("   ✓ Texte hero HTML simple mis à jour")
            modifie = True

    # 2. Mettre à jour le texte hero dans les traductions JS (si présent)
    pattern_js = r'hero_text:\s*"[^"]+?"'
    if re.search(pattern_js, contenu):
        contenu = re.sub(
            pattern_js,
            f'hero_text: "{NOUVEAU_TEXTE_HERO}"',
            contenu
        )
        print("   ✓ Texte hero JS (traductions) mis à jour")
        modifie = True

    # 3. Ajouter le message F11 après <main>
    if MESSAGE_F11.strip() not in contenu:
        # Trouver <main> et insérer juste après
        pattern_main = r'(<main>\s*)'
        if re.search(pattern_main, contenu):
            contenu = re.sub(
                pattern_main,
                f'\\1{MESSAGE_F11}\n',
                contenu
            )
            print("   ✓ Message F11 ajouté")
            modifie = True

    if modifie:
        with open(fichier, 'w', encoding='utf-8') as f:
            f.write(contenu)
        print(f"✅ {fichier} mis à jour avec succès")
        return True
    else:
        print(f"⚠️  {fichier} non modifié (patterns non trouvés)")
        return False

if __name__ == '__main__':
    print("🔧 Mise à jour du texte hero et ajout instruction F11...\n")

    fichiers = ['index.html', 'index_COMPLET.html', 'index_multilingual.html']
    fichiers_modifies = 0

    for fichier in fichiers:
        if mettre_a_jour_fichier(fichier):
            fichiers_modifies += 1

    print(f"\n✨ Terminé !")
    print(f"   - {fichiers_modifies} fichiers mis à jour")
    print(f"   - Nouveau texte : {NOUVEAU_TEXTE_HERO[:80]}...")
    print(f"   - Message F11 ajouté en haut de page")
