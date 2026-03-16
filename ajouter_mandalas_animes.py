# -*- coding: utf-8 -*-

# Lire le fichier
with open('index_COMPLET.html', 'r', encoding='utf-8') as f:
    contenu = f.read()

# Trouver la section Contemplation Profonde et ajouter un lien vers les mandalas animés
ancien_contemp = '''<div class="card beginner">
                        <h3>🧘 Contemplation Profonde</h3>
                        <span class="badge" data-i18n="beginner">Débutant</span>
                        <ul>
                            <li data-i18n="mandala_level1_1">Galerie plein écran immersive</li>
                            <li data-i18n="mandala_level1_2">Sans mots, sans pensées</li>
                            <li data-i18n="mandala_level1_3">Silence intérieur et concentration</li>
                            <li data-i18n="mandala_level1_4">Navigation intuitive (← →)</li>
                            <li data-i18n="mandala_level1_5">Upload de vos mandalas</li>
                        </ul>
                        <a href="mandala.html" class="card-btn" data-i18n="contemplate">Contempler →</a>
                    </div>'''

nouveau_contemp = '''<div class="card beginner">
                        <h3>🧘 Contemplation Profonde</h3>
                        <span class="badge" data-i18n="beginner">Débutant</span>
                        <ul>
                            <li data-i18n="mandala_level1_1">Galerie plein écran immersive</li>
                            <li data-i18n="mandala_level1_2">Sans mots, sans pensées</li>
                            <li data-i18n="mandala_level1_3">Silence intérieur et concentration</li>
                            <li data-i18n="mandala_level1_4">Navigation intuitive (← →)</li>
                            <li data-i18n="mandala_level1_5">Upload de vos mandalas</li>
                            <li><strong>✨ Mandalas animés vivants (psychédélique)</strong></li>
                        </ul>
                        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                            <a href="mandala.html" class="card-btn" data-i18n="contemplate">Contempler →</a>
                            <a href="mandala_anime.html" class="card-btn">🌀 Mandalas Vivants →</a>
                        </div>
                    </div>'''

contenu = contenu.replace(ancien_contemp, nouveau_contemp)

# Ajouter les traductions pour les mandalas animés
# Trouver le bloc de traduction FR
ancien_trad_fr = '''mandala_level1_5: "Upload de vos mandalas",'''

nouveau_trad_fr = '''mandala_level1_5: "Upload de vos mandalas",
            mandala_animated: "Mandalas animés vivants (psychédélique)",'''

contenu = contenu.replace(ancien_trad_fr, nouveau_trad_fr)

# Traduction EN
ancien_trad_en = '''mandala_level1_5: "Upload your mandalas",'''

nouveau_trad_en = '''mandala_level1_5: "Upload your mandalas",
            mandala_animated: "Living animated mandalas (psychedelic)",'''

contenu = contenu.replace(ancien_trad_en, nouveau_trad_en)

# Sauvegarder
with open('index_COMPLET.html', 'w', encoding='utf-8') as f:
    f.write(contenu)

print("✅ Mandalas animés ajoutés avec succès !")
print("✅ Lien vers mandala_anime.html créé")
print("✅ Traductions FR et EN ajoutées")
print("")
print("Les mandalas vivants sont maintenant accessibles depuis la section Contemplation Profonde !")
