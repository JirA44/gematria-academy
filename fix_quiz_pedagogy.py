#!/usr/bin/env python3
"""
Script pour corriger automatiquement les pages d'immersion hiéroglyphes
Problème: Les réponses du quiz sont cachées dans le bouton "Révéler/Cacher"
Solution: Extraire les infos clés et créer une section "Vocabulaire à apprendre" visible
"""

import re
import os
from pathlib import Path
from bs4 import BeautifulSoup

def extract_quiz_info(html_content):
    """Extrait les questions du quiz et leurs réponses correctes"""
    soup = BeautifulSoup(html_content, 'html.parser')

    quiz_questions = []
    quiz_section = soup.find('div', class_='quiz-section')

    if not quiz_section:
        return []

    # Trouver toutes les questions
    questions = quiz_section.find_all('div', class_='quiz-question')

    for q in questions:
        question_text = q.find('p').text.strip() if q.find('p') else ""

        # Trouver la réponse correcte en cherchant le onclick avec le bon index
        options = q.find_all('div', class_='quiz-option')
        correct_answer = None

        for opt in options:
            onclick = opt.get('onclick', '')
            # Pattern: checkAnswer('id', question_index, selected_index, correct_index)
            match = re.search(r"checkAnswer\([^,]+,\s*\d+,\s*(\d+),\s*(\d+)\)", onclick)
            if match:
                selected_idx = int(match.group(1))
                correct_idx = int(match.group(2))
                if selected_idx == correct_idx:
                    correct_answer = opt.text.strip()
                    break

        quiz_questions.append({
            'question': question_text,
            'answer': correct_answer
        })

    return quiz_questions

def extract_vocabulary_from_hidden(html_content):
    """Extrait le vocabulaire principal du contenu caché"""
    soup = BeautifulSoup(html_content, 'html.parser')

    # Trouver la section cachée
    hidden_section = soup.find('div', id='translation-detail')
    if not hidden_section:
        return {}

    vocab = {}

    # Extraire le hiéroglyphe principal
    hieroglyph_div = soup.find('div', class_='hieroglyphic-text')
    if hieroglyph_div:
        vocab['hieroglyph'] = hieroglyph_div.text.strip()

    # Extraire la prononciation
    pronunciation = hidden_section.find('div', class_='word-pronunciation')
    if pronunciation:
        vocab['pronunciation'] = pronunciation.text.replace('🗣️', '').strip()

    # Extraire la traduction
    translation = hidden_section.find('div', class_='word-translation')
    if translation:
        vocab['translation'] = translation.text.strip()

    # Extraire l'explication
    explanation = hidden_section.find('div', class_='word-explanation')
    if explanation:
        vocab['explanation'] = explanation.text.strip()

    return vocab

def generate_vocabulary_section(vocab, quiz_questions):
    """Génère le HTML de la section 'Vocabulaire à apprendre'"""

    # Template de base
    html = '''
            <div style="background: rgba(255, 193, 7, 0.15); border: 3px solid rgba(255, 193, 7, 0.8); border-radius: 15px; padding: 2rem; margin: 2rem 0;">
                <h2 style="color: #ffc107; margin-bottom: 1.5rem; text-align: center;">📖 Vocabulaire à apprendre</h2>

                <div style="display: grid; gap: 1.5rem;">
'''

    # Carte 1: Vocabulaire principal
    if vocab.get('hieroglyph'):
        html += f'''
                    <!-- Vocabulaire principal -->
                    <div style="background: rgba(30, 30, 45, 0.6); padding: 1.5rem; border-radius: 10px; border-left: 5px solid #4caf50;">
                        <div style="text-align: center; font-size: 3rem; margin-bottom: 1rem;">{vocab['hieroglyph']}</div>
                        <h3 style="color: #81c784; margin-bottom: 1rem; text-align: center;">
                            <strong style="font-size: 1.8rem;">{vocab.get('translation', 'Vocabulaire')}</strong>
                        </h3>
'''
        if vocab.get('pronunciation'):
            html += f'''
                        <p style="font-size: 1.2rem; line-height: 1.8; text-align: center;">
                            🗣️ Prononciation : <strong style="color: #81c784;">{vocab['pronunciation']}</strong>
                        </p>
'''
        if vocab.get('explanation'):
            html += f'''
                        <p style="margin-top: 1rem; font-size: 1.1rem; text-align: center;">
                            {vocab['explanation']}
                        </p>
'''
        html += '''
                    </div>
'''

    # Ajouter les cartes pour les questions du quiz
    for i, q in enumerate(quiz_questions[:3]):  # Max 3 cartes
        colors = ['#ba68c8', '#4fc3f7', '#ff9800']
        html += f'''
                    <!-- Info {i+1}: {q['question'][:30]}... -->
                    <div style="background: rgba(30, 30, 45, 0.6); padding: 1.5rem; border-radius: 10px; border-left: 5px solid {colors[i]};">
                        <h3 style="color: {colors[i]}; margin-bottom: 1rem; text-align: center;">{q['question']}</h3>
                        <p style="font-size: 1.2rem; line-height: 1.8; text-align: center;">
                            <strong style="color: {colors[i]}; font-size: 1.4rem;">{q['answer']}</strong>
                        </p>
                    </div>
'''

    html += '''
                </div>
            </div>
'''

    return html

def insert_vocabulary_section(html_content, vocab_section):
    """Insère la section vocabulaire avant le quiz"""

    # Trouver la position juste avant <div class="quiz-section">
    pattern = r'(\s*<div class="exercise-box">.*?</div>\s*)(\s*<div class="quiz-section">)'

    replacement = r'\1' + vocab_section + r'\2'

    modified_html = re.sub(pattern, replacement, html_content, flags=re.DOTALL)

    return modified_html

def process_file(filepath):
    """Traite un seul fichier HTML"""
    print(f"Traitement de {filepath.name}...")

    # Lire le fichier
    with open(filepath, 'r', encoding='utf-8') as f:
        html_content = f.read()

    # Extraire les infos
    quiz_questions = extract_quiz_info(html_content)
    vocab = extract_vocabulary_from_hidden(html_content)

    if not quiz_questions:
        print(f"  ⚠️ Aucune question trouvée")
        return False

    print(f"  ✓ {len(quiz_questions)} questions trouvées")
    for q in quiz_questions:
        print(f"    - {q['question'][:50]}... → {q['answer']}")

    # Générer la section vocabulaire
    vocab_section = generate_vocabulary_section(vocab, quiz_questions)

    # Insérer dans le HTML
    modified_html = insert_vocabulary_section(html_content, vocab_section)

    if modified_html == html_content:
        print(f"  ⚠️ Aucune modification effectuée")
        return False

    # Sauvegarder
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(modified_html)

    print(f"  ✅ Fichier modifié avec succès")
    return True

def main():
    """Point d'entrée principal"""
    base_dir = Path(__file__).parent

    # Lister TOUS les fichiers d'immersion (débutant + intermédiaire + expert)
    files = sorted(base_dir.glob('hieroglyphes-immersion-*.html'))

    print(f"\n🔍 {len(files)} fichiers trouvés\n")

    processed = 0
    for filepath in files:
        if process_file(filepath):
            processed += 1
        print()

    print(f"\n✅ {processed}/{len(files)} fichiers traités avec succès")

if __name__ == '__main__':
    main()
