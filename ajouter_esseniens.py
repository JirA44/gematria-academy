# -*- coding: utf-8 -*-

# Lire le fichier
with open('index_COMPLET.html', 'r', encoding='utf-8') as f:
    contenu = f.read()

# Mise à jour de l'introduction FR
ancien_intro_fr = "Les mandalas sont des représentations géométriques de l'univers, utilisés depuis des millénaires dans les traditions bouddhistes et hindoues. La contemplation profonde d'un mandala, sans mots ni pensées, permet d'accéder au silence intérieur et à la paix de l'esprit."

nouveau_intro_fr = "Les mandalas sont des représentations géométriques de l'univers, utilisés depuis des millénaires dans les traditions bouddhistes et hindoues. Les mandalas esséniens, transmis à l'humanité par les archanges après les années 2000, sont des outils de connexion angélique et de guérison spirituelle. La contemplation profonde d'un mandala, sans mots ni pensées, permet d'accéder au silence intérieur et à la paix de l'esprit."

contenu = contenu.replace(ancien_intro_fr, nouveau_intro_fr)

# Mise à jour de l'introduction EN
ancien_intro_en = "Mandalas are geometric representations of the universe, used for millennia in Buddhist and Hindu traditions. Deep contemplation of a mandala, without words or thoughts, allows access to inner silence and peace of mind."

nouveau_intro_en = "Mandalas are geometric representations of the universe, used for millennia in Buddhist and Hindu traditions. Essene mandalas, transmitted to humanity by the archangels after the year 2000, are tools for angelic connection and spiritual healing. Deep contemplation of a mandala, without words or thoughts, allows access to inner silence and peace of mind."

contenu = contenu.replace(ancien_intro_en, nouveau_intro_en)

# Mise à jour des traductions FR dans le JavaScript
ancien_trad_fr = 'mandala_intro: "Les mandalas sont des représentations géométriques de l\'univers, utilisés depuis des millénaires dans les traditions bouddhistes et hindoues. La contemplation profonde d\'un mandala, sans mots ni pensées, permet d\'accéder au silence intérieur et à la paix de l\'esprit.",'

nouveau_trad_fr = 'mandala_intro: "Les mandalas sont des représentations géométriques de l\'univers, utilisés depuis des millénaires dans les traditions bouddhistes et hindoues. Les mandalas esséniens, transmis à l\'humanité par les archanges après les années 2000, sont des outils de connexion angélique et de guérison spirituelle. La contemplation profonde d\'un mandala, sans mots ni pensées, permet d\'accéder au silence intérieur et à la paix de l\'esprit.",'

contenu = contenu.replace(ancien_trad_fr, nouveau_trad_fr)

# Mise à jour des traductions EN dans le JavaScript
ancien_trad_en = 'mandala_intro: "Mandalas are geometric representations of the universe, used for millennia in Buddhist and Hindu traditions. Deep contemplation of a mandala, without words or thoughts, allows access to inner silence and peace of mind.",'

nouveau_trad_en = 'mandala_intro: "Mandalas are geometric representations of the universe, used for millennia in Buddhist and Hindu traditions. Essene mandalas, transmitted to humanity by the archangels after the year 2000, are tools for angelic connection and spiritual healing. Deep contemplation of a mandala, without words or thoughts, allows access to inner silence and peace of mind.",'

contenu = contenu.replace(ancien_trad_en, nouveau_trad_en)

# Sauvegarder
with open('index_COMPLET.html', 'w', encoding='utf-8') as f:
    f.write(contenu)

print("✅ Mandalas esséniens ajoutés avec succès !")
print("✅ Introduction mise à jour (FR et EN)")
print("✅ Traductions mises à jour")
print("")
print("Les mandalas esséniens transmis par les archanges après 2000")
print("sont maintenant mentionnés dans la section Mandala !")
