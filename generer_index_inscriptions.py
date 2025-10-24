#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Génère automatiquement la page d'index avec TOUTES les 46 inscriptions
depuis inscriptions-temples.json
"""

import json

# Charger le JSON
with open('inscriptions-temples.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

def difficulte_etoiles(niveau):
    """Convertit niveau de difficulté en étoiles"""
    if niveau <= 2:
        return "★☆☆"
    elif niveau <= 4:
        return "★★☆"
    elif niveau <= 6:
        return "★★★☆☆"
    elif niveau <= 8:
        return "★★★★☆"
    else:
        return "★★★★★"

def generer_cartes(inscriptions, niveau_nom):
    """Génère les cartes HTML pour un niveau"""
    html = ""

    for inscription in inscriptions:
        id_fichier = inscription['id']
        titre = inscription['titre']
        hieroglyphes = inscription['hieroglyphes']
        monument = inscription['monument']
        lieu = inscription.get('lieu', '')
        epoque = inscription['epoque']
        description = inscription['description']
        difficulte = inscription['difficulte']
        etoiles = difficulte_etoiles(difficulte)

        html += f'''
                <!-- {titre} -->
                <div class="inscription-card" onclick="window.location.href='hieroglyphes-immersion-{niveau_nom}-{id_fichier}.html'">
                    <span class="difficulty-badge diff-{difficulte}">Difficulté : {etoiles}</span>
                    <h3 class="inscription-title">{titre}</h3>
                    <div class="inscription-hieroglyphs">{hieroglyphes}</div>
                    <p class="inscription-monument">📍 {monument}{', ' + lieu if lieu else ''}</p>
                    <p class="inscription-epoch">📅 {epoque}</p>
                    <p class="inscription-description">{description}</p>
                    <button class="btn-open">Ouvrir l'inscription →</button>
                </div>
'''

    return html

# Générer les cartes pour chaque niveau
cartes_debutant = generer_cartes(data['hieroglyphes']['debutant'], 'debutant')
cartes_intermediaire = generer_cartes(data['hieroglyphes']['intermediaire'], 'intermediaire')
cartes_expert = generer_cartes(data['hieroglyphes']['expert'], 'expert')

# Calculer statistiques
total = len(data['hieroglyphes']['debutant']) + len(data['hieroglyphes']['intermediaire']) + len(data['hieroglyphes']['expert'])
monuments = set()
quiz_total = 0
for niveau in ['debutant', 'intermediaire', 'expert']:
    for inscription in data['hieroglyphes'][niveau]:
        monuments.add(inscription['monument'])
        quiz_total += len(inscription.get('quiz', []))

# Template HTML complet
html_complet = f'''<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>📜 Bibliothèque d'Inscriptions Authentiques</title>
    <link rel="stylesheet" href="force-dark-mode.css">
    <link rel="stylesheet" href="animated-background.css">
    <script src="animated-background.js" defer></script>
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}

        body {{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            padding: 2rem;
            line-height: 1.6;
        }}

        .container {{
            max-width: 1400px;
            margin: 0 auto;
        }}

        h1 {{
            font-size: 3rem;
            margin-bottom: 1rem;
            text-align: center;
            background: linear-gradient(135deg, #c49c62, #8b6f47);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }}

        .subtitle {{
            text-align: center;
            font-size: 1.3rem;
            margin-bottom: 3rem;
            opacity: 0.8;
        }}

        .stats-box {{
            background: rgba(30, 30, 45, 0.8);
            border: 2px solid rgba(196, 156, 98, 0.5);
            border-radius: 15px;
            padding: 2rem;
            margin-bottom: 4rem;
            text-align: center;
        }}

        .stats-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }}

        .stat-item {{
            padding: 1rem;
        }}

        .stat-value {{
            font-size: 3rem;
            font-weight: bold;
            color: #c49c62;
            margin-bottom: 0.5rem;
        }}

        .stat-label {{
            font-size: 1rem;
            opacity: 0.8;
        }}

        .level-section {{
            margin-bottom: 4rem;
        }}

        .level-title {{
            font-size: 2.5rem;
            margin-bottom: 2rem;
            padding-bottom: 0.5rem;
            border-bottom: 3px solid rgba(196, 156, 98, 0.5);
        }}

        .inscriptions-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 2rem;
            margin-bottom: 3rem;
        }}

        .inscription-card {{
            background: rgba(25, 25, 40, 0.9);
            border: 2px solid rgba(100, 100, 150, 0.3);
            border-radius: 15px;
            padding: 2rem;
            transition: all 0.3s ease;
            cursor: pointer;
        }}

        .inscription-card:hover {{
            transform: translateY(-10px);
            border-color: rgba(196, 156, 98, 0.8);
            box-shadow: 0 10px 30px rgba(196, 156, 98, 0.3);
        }}

        .difficulty-badge {{
            display: inline-block;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: bold;
            margin-bottom: 1rem;
        }}

        .diff-1, .diff-2 {{ background: rgba(76, 175, 80, 0.3); color: #81c784; }}
        .diff-3, .diff-4 {{ background: rgba(255, 193, 7, 0.3); color: #ffd54f; }}
        .diff-5, .diff-6 {{ background: rgba(255, 152, 0, 0.3); color: #ffb74d; }}
        .diff-7, .diff-8 {{ background: rgba(244, 67, 54, 0.3); color: #e57373; }}
        .diff-9, .diff-10 {{ background: rgba(156, 39, 176, 0.3); color: #ba68c8; }}

        .inscription-title {{
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: #c49c62;
        }}

        .inscription-hieroglyphs {{
            font-size: 2.5rem;
            text-align: center;
            margin: 1.5rem 0;
            direction: rtl;
            letter-spacing: 0.3rem;
            line-height: 1.5;
        }}

        .inscription-monument {{
            font-size: 1rem;
            opacity: 0.8;
            margin-bottom: 0.5rem;
        }}

        .inscription-epoch {{
            font-size: 0.9rem;
            opacity: 0.7;
            margin-bottom: 1rem;
        }}

        .inscription-description {{
            font-size: 0.95rem;
            line-height: 1.6;
            margin-bottom: 1.5rem;
            opacity: 0.9;
        }}

        .btn-open {{
            background: linear-gradient(135deg, #c49c62, #8b6f47);
            border: none;
            color: white;
            padding: 1rem 2rem;
            border-radius: 25px;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            width: 100%;
        }}

        .btn-open:hover {{
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(196, 156, 98, 0.4);
        }}

        .back-link {{
            display: inline-block;
            margin-bottom: 2rem;
            color: #c49c62;
            text-decoration: none;
            font-size: 1.1rem;
        }}

        .back-link:hover {{
            text-decoration: underline;
        }}
    </style>
</head>
<body>
    <div class="container">
        <a href="index.html" class="back-link">← Retour à l'accueil</a>

        <h1>📜 Bibliothèque d'Inscriptions Authentiques</h1>
        <p class="subtitle">Apprenez les hiéroglyphes à partir de vraies inscriptions de temples et pyramides égyptiens</p>

        <div class="stats-box">
            <h2>📊 Statistiques de la bibliothèque</h2>
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-value">{total}</div>
                    <div class="stat-label">Inscriptions authentiques</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">3</div>
                    <div class="stat-label">Niveaux de difficulté</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">{len(monuments)}</div>
                    <div class="stat-label">Monuments différents</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">{quiz_total}</div>
                    <div class="stat-label">Questions de quiz</div>
                </div>
            </div>
        </div>

        <!-- NIVEAU DÉBUTANT -->
        <div class="level-section" id="debutant">
            <h2 class="level-title">🌱 Niveau Débutant ({len(data['hieroglyphes']['debutant'])} inscriptions)</h2>
            <div class="inscriptions-grid">
{cartes_debutant}
            </div>
        </div>

        <!-- NIVEAU INTERMÉDIAIRE -->
        <div class="level-section" id="intermediaire">
            <h2 class="level-title">🌿 Niveau Intermédiaire ({len(data['hieroglyphes']['intermediaire'])} inscriptions)</h2>
            <div class="inscriptions-grid">
{cartes_intermediaire}
            </div>
        </div>

        <!-- NIVEAU EXPERT -->
        <div class="level-section" id="expert">
            <h2 class="level-title">🌳 Niveau Expert ({len(data['hieroglyphes']['expert'])} inscriptions)</h2>
            <div class="inscriptions-grid">
{cartes_expert}
            </div>
        </div>

    </div>
</body>
</html>
'''

# Sauvegarder
with open('immersion-inscriptions-index.html', 'w', encoding='utf-8') as f:
    f.write(html_complet)

print(f"✅ Page d'index générée avec {total} inscriptions !")
print(f"   - 🌱 {len(data['hieroglyphes']['debutant'])} débutant")
print(f"   - 🌿 {len(data['hieroglyphes']['intermediaire'])} intermédiaire")
print(f"   - 🌳 {len(data['hieroglyphes']['expert'])} expert")
print(f"   - 🏛️ {len(monuments)} monuments différents")
print(f"   - ❓ {quiz_total} questions de quiz")
