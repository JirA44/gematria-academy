#!/usr/bin/env python3
"""
Script pour ajouter le bouton mode nuit et le script JavaScript
à toutes les pages HTML qui ne l'ont pas encore.
"""

import os
import re

# Liste des pages à mettre à jour
pages_to_update = [
    "runes-debutant.html",
    "runes-intermediaire.html",
    "runes-expert.html",
    "gematria-debutant.html",
    "gematria-intermediaire.html",
    "gematria-expert.html"
]

# Bouton mode nuit à insérer dans le header
dark_mode_button = '        <button class="dark-mode-toggle" onclick="toggleDarkMode()">🌙 Mode Nuit</button>\n'

# Script JavaScript à insérer avant </body>
dark_mode_script = '''
    <script>
        // Mode Nuit
        function toggleDarkMode() {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDark);
            const btn = document.querySelector('.dark-mode-toggle');
            btn.textContent = isDark ? '☀️ Mode Jour' : '🌙 Mode Nuit';
        }

        // Charger la préférence au démarrage
        window.addEventListener('DOMContentLoaded', () => {
            const isDark = localStorage.getItem('darkMode') === 'true';
            if (isDark) {
                document.body.classList.add('dark-mode');
                const btn = document.querySelector('.dark-mode-toggle');
                if (btn) btn.textContent = '☀️ Mode Jour';
            }
        });
    </script>
'''

def add_dark_mode_to_file(filepath):
    """Ajoute le mode nuit à un fichier HTML"""
    print(f"Traitement de {filepath}...")

    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Vérifier si le mode nuit est déjà présent
        if 'dark-mode-toggle' in content:
            print(f"  ✓ {filepath} a déjà le mode nuit")
            return False

        # Ajouter le bouton dans le header
        # Chercher le pattern <header>\n et ajouter le bouton après
        header_pattern = r'(<header>)\s*\n'
        if re.search(header_pattern, content):
            content = re.sub(header_pattern, r'\1\n' + dark_mode_button, content)
            print(f"  ✓ Bouton ajouté au header")
        else:
            print(f"  ⚠️  Pattern header non trouvé")
            return False

        # Ajouter le script avant </body>
        body_pattern = r'(</body>)'
        if re.search(body_pattern, content):
            content = re.sub(body_pattern, dark_mode_script + r'\n\1', content)
            print(f"  ✓ Script ajouté avant </body>")
        else:
            print(f"  ⚠️  Balise </body> non trouvée")
            return False

        # Sauvegarder le fichier
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

        print(f"  ✅ {filepath} mis à jour avec succès!")
        return True

    except Exception as e:
        print(f"  ❌ Erreur: {e}")
        return False

def main():
    """Fonction principale"""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    updated_count = 0

    print("=" * 60)
    print("Ajout du mode nuit aux pages HTML")
    print("=" * 60)

    for page in pages_to_update:
        filepath = os.path.join(script_dir, page)

        if not os.path.exists(filepath):
            print(f"⚠️  {page} n'existe pas")
            continue

        if add_dark_mode_to_file(filepath):
            updated_count += 1
        print()

    print("=" * 60)
    print(f"Résumé: {updated_count} page(s) mise(s) à jour")
    print("=" * 60)

    if updated_count > 0:
        print("\n✅ Mode nuit ajouté avec succès!")
        print("Testez en ouvrant les pages dans votre navigateur.")
    else:
        print("\nℹ️  Aucune page n'a été modifiée (déjà à jour ou erreurs)")

if __name__ == "__main__":
    main()
