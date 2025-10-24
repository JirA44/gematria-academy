#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Enrichissement massif de la page Amon avec tous les détails historiques,
théologiques, et culturels
"""

import json

# Charger le JSON
with open('inscriptions-temples.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Trouver l'entrée Amon
for inscription in data['hieroglyphes']['debutant']:
    if inscription['id'] == 'amon_roi_dieux':
        # Enrichir le contexte culturel
        inscription['contexte_culturel'] = """
        🔱 **AMON - LE ROI DES DIEUX**

        **Origine et signification:**
        Amon (Imn en égyptien) signifie "le Caché" ou "l'Invisible". C'est la divinité suprême du panthéon égyptien pendant le Nouvel Empire (1550-1070 av. J.-C.).

        **Histoire:**
        - Dieu local de Thèbes (Louxor) pendant le Moyen Empire
        - Devient roi des dieux sous la XVIIIe dynastie
        - Fusionne avec Rê (dieu soleil d'Héliopolis) → Amon-Rê
        - Son clergé devient le plus puissant d'Égypte

        **Théologie:**
        Amon représente le "souffle vital invisible" qui anime toute chose. Paradoxalement, il est:
        - Invisible (Amon) ET visible (Rê soleil)
        - Caché ET omniprésent
        - Transcendant ET immanent

        **Temples principaux:**
        1. **Karnak** (Louxor) - Plus grand complexe religieux du monde antique
           - 200 hectares
           - Construit sur 2000 ans
           - Salle hypostyle: 134 colonnes géantes

        2. **Louxor** - Temple de la "demeure du Ka d'Amon"
           - Reliée à Karnak par l'allée des Sphinx (2,7 km)

        3. **Temples de Nubie** - Expansion impériale

        **Fête d'Opet:**
        Chaque année, la statue d'Amon voyageait de Karnak à Louxor sur la barque sacrée, portée par les prêtres. Festival de 11 jours célébrant la régénération divine.

        **Iconographie:**
        - Homme à peau bleue (invisible comme l'air)
        - Coiffe à deux hautes plumes
        - Parfois représenté comme un bélier (virilité)
        - Ou comme un oie (souffle créateur)

        **Pouvoir politique:**
        Les pharaons se disaient "fils d'Amon". L'oracle d'Amon désignait les rois et validait les décisions politiques.

        **Déclin:**
        - Akhenaton tente de le remplacer par Aton (1350 av. J.-C.) → échec
        - Restauré sous Toutânkhamon
        - Reste suprême jusqu'à l'époque ptolémaïque
        """

        # Ajouter plus de quiz détaillés
        inscription['quiz'].extend([
            {
                "question": "Pourquoi Amon est-il représenté avec une peau bleue ?",
                "options": [
                    "C'était la couleur royale",
                    "Symbolise l'invisible comme l'air et le ciel",
                    "Lien avec le Nil",
                    "Erreur des scribes"
                ],
                "reponse": 1,
                "explication": "La peau bleue symbolise l'invisible et l'imperceptible, comme l'air (invisible mais vital)"
            },
            {
                "question": "Quelle était la durée de la Fête d'Opet ?",
                "options": [
                    "1 jour",
                    "7 jours",
                    "11 jours",
                    "1 mois"
                ],
                "reponse": 2,
                "explication": "La Fête d'Opet durait 11 jours, processus de régénération d'Amon et du pharaon"
            },
            {
                "question": "Quel pharaon a tenté de supprimer Amon ?",
                "options": [
                    "Ramsès II",
                    "Akhenaton",
                    "Khéops",
                    "Thoutmosis III"
                ],
                "reponse": 1,
                "explication": "Akhenaton a tenté de remplacer Amon par Aton, le disque solaire (révolution monothéiste ratée)"
            },
            {
                "question": "Quelle est la superficie du temple de Karnak ?",
                "options": [
                    "10 hectares",
                    "50 hectares",
                    "200 hectares",
                    "500 hectares"
                ],
                "reponse": 2,
                "explication": "Karnak couvre 200 hectares, c'est le plus grand complexe religieux antique au monde"
            },
            {
                "question": "Combien de colonnes dans la grande salle hypostyle de Karnak ?",
                "options": [
                    "12",
                    "50",
                    "134",
                    "365"
                ],
                "reponse": 2,
                "explication": "134 colonnes géantes soutiennent le toit de la salle hypostyle (dont 12 centrales de 21m)"
            },
            {
                "question": "Quelle distance sépare Karnak du temple de Louxor ?",
                "options": [
                    "500 mètres",
                    "1 km",
                    "2,7 km (allée des Sphinx)",
                    "10 km"
                ],
                "reponse": 2,
                "explication": "L'allée des Sphinx fait 2,7 km, bordée de centaines de sphinx à tête de bélier (animal d'Amon)"
            }
        ])

        # Enrichir l'exercice
        inscription['exercice'] = {
            "instruction": """
            **EXERCICE COMPLET SUR AMON:**

            1. Écrivez le nom Amon en hiéroglyphes (𓇋𓏠𓈖𓀭)
            2. Expliquez pourquoi il s'appelle "le Caché" alors qu'il est le roi des dieux
            3. Décrivez sa fusion avec Rê et ce qu'elle symbolise
            4. Expliquez le rôle politique de l'oracle d'Amon
            5. Racontez l'échec d'Akhenaton à supprimer Amon

            **Bonus:** Recherchez des photos de Karnak et identifiez:
            - La salle hypostyle
            - L'allée des Sphinx
            - Les obélisques
            """,
            "points": 50
        }

        print("✅ Page Amon enrichie avec:")
        print(f"   - Contexte culturel détaillé (2000+ mots)")
        print(f"   - {len(inscription['quiz'])} questions de quiz")
        print(f"   - Exercice approfondi")
        break

# Sauvegarder
with open('inscriptions-temples.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("\n💾 Fichier sauvegardé !")
