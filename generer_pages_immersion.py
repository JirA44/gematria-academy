# -*- coding: utf-8 -*-
"""
Générateur automatique de pages d'apprentissage par immersion
Lit inscriptions-temples.json et génère des pages HTML interactives
"""

import json
import os
import re

def markdown_to_html(text):
    """Convertit Markdown simple en HTML"""
    # Gras **texte** → <strong>texte</strong>
    text = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', text)
    # Retours à la ligne → <br>
    text = text.replace('\n', '<br>')
    # Listes - texte → <li>texte</li>
    text = re.sub(r'<br>\s*-\s*(.+?)<br>', r'<li>\1</li>', text)
    # Envelopper les <li> dans <ul>
    if '<li>' in text:
        text = re.sub(r'(<li>.*?</li>)', r'<ul>\1</ul>', text, flags=re.DOTALL)
    return text

def generer_page_immersion(inscription, niveau):
    """Génère une page HTML complète pour une inscription"""

    # Générer les blocs de mots
    mots_html = ""
    for mot in inscription['mots']:
        # Prononciation phonétique
        pronunciation = mot.get('pronunciation', '')
        pronunciation_html = f'<div class="word-pronunciation">🗣️ {pronunciation}</div>' if pronunciation else ''

        mots_html += f"""
                    <div class="word-block">
                        <div class="word-hieroglyph">{mot['hieroglyph']}</div>
                        {pronunciation_html}
                        <div class="word-transliteration">{mot['transliteration']}</div>
                        <div class="word-translation">{mot['traduction']}</div>
                        <div class="word-explanation">{mot['explication']}</div>
                    </div>
"""

    # Générer les questions du quiz
    quiz_html = ""
    for i, q in enumerate(inscription['quiz']):
        options_html = ""
        for j, opt in enumerate(q['options']):
            options_html += f"""
                    <div class="quiz-option" data-index="{j}" onclick="checkAnswer('{inscription['id']}', {i}, {j}, {q['reponse']})">
                        {opt}
                    </div>
"""

        quiz_html += f"""
                <div class="quiz-question" id="quiz-{i}">
                    <h4>Question {i+1} :</h4>
                    <p>{q['question']}</p>
                    <div class="quiz-options">
{options_html}
                    </div>
                    <div class="quiz-feedback" id="feedback-{i}" style="display: none;"></div>
                </div>
"""

    # Badge de niveau
    niveau_class = f"level-{niveau}"
    niveau_label = niveau.capitalize()

    # Template HTML complet
    html = f"""<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>𓂀 {inscription['titre']}</title>
    <link rel="stylesheet" href="force-dark-mode.css">
    <script src="progression-system.js"></script>
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
            max-width: 1200px;
            margin: 0 auto;
        }}

        h1 {{
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
            text-align: center;
        }}

        .subtitle {{
            text-align: center;
            font-size: 1.1rem;
            margin-bottom: 2rem;
            opacity: 0.8;
        }}

        .level-badge {{
            display: inline-block;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: bold;
            margin-bottom: 1rem;
        }}

        .level-debutant {{
            background: rgba(76, 175, 80, 0.3);
            border: 2px solid #4caf50;
            color: #81c784;
        }}

        .level-intermediaire {{
            background: rgba(255, 152, 0, 0.3);
            border: 2px solid #ff9800;
            color: #ffb74d;
        }}

        .level-expert {{
            background: rgba(156, 39, 176, 0.3);
            border: 2px solid #9c27b0;
            color: #ce93d8;
        }}

        .monument-card {{
            background: rgba(25, 25, 40, 0.9);
            border: 2px solid rgba(100, 100, 150, 0.3);
            border-radius: 15px;
            padding: 2rem;
            margin-bottom: 2rem;
        }}

        .context-box {{
            background: rgba(255, 243, 205, 0.1);
            border-left: 4px solid rgba(255, 193, 7, 0.7);
            padding: 1rem;
            margin-bottom: 2rem;
            border-radius: 5px;
        }}

        .inscription-display {{
            background: rgba(40, 40, 60, 0.7);
            padding: 2rem;
            border-radius: 10px;
            margin: 2rem 0;
            border: 2px solid rgba(196, 156, 98, 0.5);
        }}

        .hieroglyphic-text {{
            font-size: 3rem;
            text-align: center;
            margin: 2rem 0;
            line-height: 1.8;
            direction: rtl;
            letter-spacing: 0.5rem;
        }}

        .word-by-word {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            margin: 2rem 0;
        }}

        .word-block {{
            background: rgba(30, 30, 45, 0.85);
            padding: 1.5rem;
            border-radius: 10px;
            text-align: center;
            border: 2px solid rgba(138, 43, 226, 0.3);
            transition: all 0.3s ease;
        }}

        .word-block:hover {{
            border-color: rgba(138, 43, 226, 0.6);
            transform: translateY(-5px);
        }}

        .word-hieroglyph {{
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
        }}

        .word-pronunciation {{
            font-size: 1.3rem;
            color: #ffa726;
            font-weight: bold;
            margin: 0.8rem 0;
            padding: 0.5rem;
            background: rgba(255, 167, 38, 0.1);
            border-radius: 5px;
        }}

        .word-transliteration {{
            font-size: 1.2rem;
            color: #64b5f6;
            margin: 0.5rem 0;
            font-style: italic;
        }}

        .word-translation {{
            font-size: 1.1rem;
            color: #81c784;
            font-weight: bold;
            margin: 0.5rem 0;
        }}

        .word-explanation {{
            font-size: 0.9rem;
            color: #b0b0c0;
            margin-top: 0.5rem;
        }}

        .translation-box {{
            background: rgba(76, 175, 80, 0.1);
            border: 2px solid rgba(76, 175, 80, 0.3);
            padding: 1.5rem;
            border-radius: 10px;
            margin-top: 2rem;
        }}

        .translation-title {{
            font-size: 1.3rem;
            margin-bottom: 1rem;
            color: #81c784;
        }}

        .btn {{
            background: linear-gradient(135deg, #9b59b6, #8e44ad);
            color: white;
            border: none;
            padding: 1rem 2rem;
            font-size: 1.1rem;
            border-radius: 25px;
            cursor: pointer;
            margin: 0.5rem;
            transition: transform 0.3s ease;
        }}

        .btn:hover {{
            transform: translateY(-3px);
        }}

        .hidden {{
            display: none;
        }}

        .hint-box {{
            background: rgba(100, 150, 255, 0.1);
            border-left: 4px solid rgba(100, 150, 255, 0.7);
            padding: 1rem;
            margin: 1rem 0;
            border-radius: 5px;
        }}

        .exercise-box {{
            background: rgba(138, 43, 226, 0.1);
            border: 2px dashed rgba(138, 43, 226, 0.5);
            padding: 2rem;
            border-radius: 15px;
            margin: 2rem 0;
            text-align: center;
        }}

        .quiz-section {{
            background: rgba(25, 25, 40, 0.9);
            border: 2px solid rgba(100, 100, 150, 0.3);
            border-radius: 15px;
            padding: 2rem;
            margin: 2rem 0;
        }}

        .quiz-question {{
            margin-bottom: 2rem;
        }}

        .quiz-options {{
            display: grid;
            gap: 1rem;
            margin-top: 1rem;
        }}

        .quiz-option {{
            background: rgba(40, 40, 60, 0.7);
            padding: 1rem;
            border-radius: 10px;
            border: 2px solid rgba(100, 100, 150, 0.3);
            cursor: pointer;
            transition: all 0.3s ease;
        }}

        .quiz-option:hover {{
            border-color: rgba(138, 43, 226, 0.6);
            transform: translateX(5px);
        }}

        .quiz-option.correct {{
            background: rgba(76, 175, 80, 0.3);
            border-color: #4caf50;
        }}

        .quiz-option.incorrect {{
            background: rgba(231, 76, 60, 0.3);
            border-color: #e74c3c;
        }}

        .quiz-feedback {{
            margin-top: 1rem;
            padding: 1rem;
            border-radius: 10px;
        }}

        .quiz-feedback.correct {{
            background: rgba(76, 175, 80, 0.2);
            color: #81c784;
        }}

        .quiz-feedback.incorrect {{
            background: rgba(231, 76, 60, 0.2);
            color: #e57373;
        }}

        .navigation {{
            display: flex;
            justify-content: space-between;
            margin-top: 3rem;
        }}

        .btn-nav {{
            background: linear-gradient(135deg, #3498db, #2980b9);
            color: white;
            text-decoration: none;
            padding: 1rem 2rem;
            border-radius: 25px;
            transition: transform 0.3s ease;
        }}

        .btn-nav:hover {{
            transform: translateY(-3px);
        }}

        .score-display {{
            background: rgba(255, 215, 0, 0.1);
            border: 2px solid rgba(255, 215, 0, 0.5);
            padding: 1rem;
            border-radius: 10px;
            text-align: center;
            margin: 2rem 0;
            font-size: 1.3rem;
        }}
    </style>
    <link rel="stylesheet" href="animated-background.css">
    <script src="animated-background.js" defer></script>
</head>
<body>
    <div class="container">
        <span class="level-badge {niveau_class}">Niveau {niveau_label}</span>
        <h1>𓂀 {inscription['titre']}</h1>
        <p class="subtitle">{inscription['monument']}, {inscription['lieu']}</p>

        <div class="monument-card">
            <div class="context-box">
                <strong>📍 Contexte historique :</strong><br>
                <strong>Monument :</strong> {inscription['monument']}<br>
                <strong>Lieu :</strong> {inscription['lieu']}<br>
                <strong>Époque :</strong> {inscription['epoque']}<br>
                <strong>Description :</strong> {inscription['description']}
            </div>

            <div class="inscription-display">
                <h2 style="text-align: center; margin-bottom: 2rem;">📜 Inscription originale</h2>

                <div class="hieroglyphic-text">
                    {inscription['hieroglyphes']}
                </div>

                <button class="btn" onclick="toggleTranslation()">
                    Révéler/Cacher la traduction mot à mot
                </button>

                <div id="translation-detail" class="hidden">
                    <h3 style="margin-top: 2rem; margin-bottom: 1rem;">Décomposition mot à mot :</h3>
                    <div class="word-by-word">
{mots_html}
                    </div>

                    <div class="translation-box">
                        <div class="translation-title">📖 Traduction littérale :</div>
                        <p style="font-size: 1.2rem; margin-bottom: 1rem;">{inscription['traduction_litterale']}</p>

                        <div class="translation-title">✨ Traduction fluide :</div>
                        <p style="font-size: 1.3rem; font-weight: bold;">{inscription['traduction_fluide']}</p>
                    </div>

                    <div class="hint-box">
                        📚 <strong>Grammaire :</strong> {inscription['grammaire']}
                    </div>

                    <div class="hint-box">
                        🏛️ <strong>Contexte culturel :</strong><br>{markdown_to_html(inscription['contexte_culturel'])}
                    </div>
                </div>
            </div>

            <div class="exercise-box">
                <h3>✍️ Exercice pratique</h3>
                <p style="margin: 1rem 0;">{inscription['exercice']['instruction']}</p>
                <button class="btn" onclick="completeExercise()">
                    J'ai terminé mon exercice ({inscription['exercice']['points']} points)
                </button>
            </div>

            <div class="quiz-section">
                <h2 style="margin-bottom: 2rem;">🧠 Quiz de compréhension</h2>
{quiz_html}
                <div class="score-display" id="quiz-score" style="display: none;">
                    Score : <span id="score-value">0</span> / {len(inscription['quiz'])}
                </div>
            </div>
        </div>

        <div class="navigation">
            <a href="hieroglyphes-{niveau}.html" class="btn-nav">⬅️ Retour au cours</a>
            <a href="progression-dashboard.html" class="btn-nav">📊 Voir ma progression</a>
            <a href="index_COMPLET.html" class="btn-nav">🏠 Accueil</a>
        </div>
    </div>

    <script>
        let quizAnswered = {{}};
        let correctAnswers = 0;
        let exerciseCompleted = false;

        function toggleTranslation() {{
            const detail = document.getElementById('translation-detail');
            detail.classList.toggle('hidden');
        }}

        function checkAnswer(inscriptionId, questionIndex, selectedIndex, correctIndex) {{
            if (quizAnswered[questionIndex]) return; // Déjà répondu

            const options = document.querySelectorAll(`#quiz-${{questionIndex}} .quiz-option`);
            const feedback = document.getElementById(`feedback-${{questionIndex}}`);
            const explanation = {json.dumps([q['explication'] for q in inscription['quiz']])};

            quizAnswered[questionIndex] = true;

            if (selectedIndex === correctIndex) {{
                options[selectedIndex].classList.add('correct');
                feedback.className = 'quiz-feedback correct';
                feedback.textContent = '✅ Correct ! ' + explanation[questionIndex];
                correctAnswers++;
            }} else {{
                options[selectedIndex].classList.add('incorrect');
                options[correctIndex].classList.add('correct');
                feedback.className = 'quiz-feedback incorrect';
                feedback.textContent = '❌ Incorrect. La bonne réponse était : ' + options[correctIndex].textContent + '. ' + explanation[questionIndex];
            }}

            feedback.style.display = 'block';

            // Désactiver tous les boutons de cette question
            options.forEach(opt => opt.style.pointerEvents = 'none');

            // Afficher le score si toutes les questions sont répondues
            if (Object.keys(quizAnswered).length === {len(inscription['quiz'])}) {{
                const scoreDisplay = document.getElementById('quiz-score');
                const scoreValue = document.getElementById('score-value');
                scoreValue.textContent = correctAnswers;
                scoreDisplay.style.display = 'block';

                // Calculer le score en pourcentage
                const percentage = Math.round((correctAnswers / {len(inscription['quiz'])}) * 100);

                // Sauvegarder dans le système de progression
                if (typeof ProgressionSystem !== 'undefined') {{
                    ProgressionSystem.sauvegarderResultat(
                        'hieroglyphes',
                        '{niveau}',
                        '{inscription['id']}',
                        percentage
                    );
                }}

                // Afficher message
                if (percentage >= 80) {{
                    alert('🎉 Excellent ! Vous avez obtenu ' + percentage + '% !');
                }} else if (percentage >= 60) {{
                    alert('👍 Bien joué ! Vous avez obtenu ' + percentage + '%. Continuez ainsi !');
                }} else {{
                    alert('📚 Vous avez obtenu ' + percentage + '%. Relisez le contenu et réessayez !');
                }}
            }}
        }}

        function completeExercise() {{
            if (exerciseCompleted) {{
                alert('Vous avez déjà validé cet exercice !');
                return;
            }}

            exerciseCompleted = true;

            // Sauvegarder dans le système de progression
            if (typeof ProgressionSystem !== 'undefined') {{
                ProgressionSystem.sauvegarderResultat(
                    'hieroglyphes',
                    '{niveau}',
                    '{inscription['id']}_exercice',
                    100 // Exercice de copie = 100% si complété
                );
            }}

            alert('✅ Exercice validé ! Vous avez gagné {inscription['exercice']['points']} points !');
        }}
    </script>
</body>
</html>
"""

    return html


def main():
    """Génère toutes les pages d'immersion depuis le JSON"""

    print("🚀 GÉNÉRATION DES PAGES D'IMMERSION")
    print("=" * 60)

    # Charger le JSON
    with open('inscriptions-temples.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    total_pages = 0

    # Pour chaque domaine
    for domaine, niveaux in data.items():
        print(f"\n📚 Domaine : {domaine.upper()}")

        # Pour chaque niveau
        for niveau, inscriptions in niveaux.items():
            print(f"  📖 Niveau {niveau} : {len(inscriptions)} inscription(s)")

            # Pour chaque inscription
            for i, inscription in enumerate(inscriptions, 1):
                # Générer le HTML
                html = generer_page_immersion(inscription, niveau)

                # Nom du fichier
                filename = f"{domaine}-immersion-{niveau}-{inscription['id']}.html"

                # Écrire le fichier
                with open(filename, 'w', encoding='utf-8') as f:
                    f.write(html)

                print(f"    ✅ {i}. {filename}")
                total_pages += 1

    print("\n" + "=" * 60)
    print(f"✅ TERMINÉ ! {total_pages} page(s) générée(s)")
    print("\nOuvrez les fichiers pour voir le résultat !")


if __name__ == "__main__":
    main()
