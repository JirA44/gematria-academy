#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Enrichit les contextes culturels pour qu'ils contiennent EXPLICITEMENT
toutes les informations nécessaires pour répondre au quiz.

Principe pédagogique : ENSEIGNER puis TESTER, pas l'inverse !
"""

import json

# Contextes enrichis pour les inscriptions qui manquent d'info
CONTEXTES_ENRICHIS = {
    "oeil_oudjat": """🔍 **L'ŒIL OUDJAT - AMULETTE SUPRÊME DE PROTECTION**

**Signification du nom :**
Le mot "Oudjat" (wḏꜣt) signifie littéralement "**intact, complet, en bonne santé**". C'est l'opposé de "blessé" ou "endommagé".

**La légende mythologique :**
L'Œil Oudjat est lié au mythe d'Horus et Seth :
1. **Le combat** : Horus combattit Seth pour venger son père Osiris
2. **La blessure** : Seth arracha l'œil gauche d'Horus pendant le combat
3. **La guérison** : **Thot**, dieu de la magie et de la sagesse, restaura magiquement l'œil
4. **La complétude** : L'œil devint "Oudjat" - intact et complet à nouveau

**Les fonctions de l'Œil Oudjat :**
- **Protection magique** : Principale fonction - protège contre le mal, les maladies, la malchance
- **Guérison** : Symbolise la restauration et la régénération
- **Complétude** : Représente l'intégrité retrouvée
- **Vision divine** : L'œil qui voit tout et protège

**Anatomie symbolique :**
L'Œil Oudjat se compose de plusieurs éléments distinctifs :
- Le **sourcil** arqué au-dessus
- La **pupille** centrale (l'œil lui-même)
- La **larme** ou marque sous l'œil
- La **spirale** (marque du faucon, animal d'Horus)

**Utilisation pratique :**
Les Égyptiens portaient des amulettes Oudjat pour se protéger dans la vie et dans la mort. On les plaçait sur les momies, dans les tombes, et on les portait en bijoux.""",

    "amon_roi_dieux": """🔱 **AMON - LE ROI DES DIEUX**

**Origine du nom :**
"Amon" (Imn) signifie "**le Caché**" en égyptien ancien. Ce nom reflète sa nature mystérieuse et invisible, comme le vent qu'on ne peut voir mais dont on ressent la présence.

**Évolution historique :**
- **Moyen Empire** : Dieu local de Thèbes (petite ville du sud)
- **Nouvel Empire** : Thèbes devient capitale → Amon devient le dieu suprême
- **Fusion divine** : Amon fusionne avec Rê (dieu solaire) → devient **Amon-Rê**, roi des dieux
- **Apogée** : XVIIIe dynastie - pharaons comme Hatchepsout et Thoutmosis III le vénèrent

**Représentations iconographiques :**
Amon est représenté de plusieurs façons :
- **Forme humaine** : Homme portant une haute couronne à deux plumes d'autruche
- **Peau bleue** : Symbolise sa nature céleste et invisible (comme le ciel)
- **Barbe divine** : Barbe postiche recourbée (attribut des dieux)
- **Forme animale** : Parfois représenté comme un **bélier** (animal sacré symbolisant la puissance génératrice)

**Pourquoi la peau bleue ?**
La couleur bleue symbolise :
- Le **ciel** et l'invisibilité
- Le caractère **primordial** et éternel
- La **transcendance** divine

**Les grands temples d'Amon :**
1. **Karnak** (Ipet-Sout) : Plus grand complexe religieux du monde antique
   - 200 hectares de superficie
   - 134 colonnes géantes dans la salle hypostyle
   - Construction sur 2000 ans
2. **Louxor** (Ipet-Resyt) : "Harem méridional d'Amon"
   - Relié à Karnak par l'allée des Sphinx (2,7 km)
   - Temple de la célébration divine

**La Fête d'Opet :**
Célébration annuelle majeure durant le 2ème mois d'Akhet (saison de l'inondation) :
- **Durée** : 11 jours sous Thoutmosis III, prolongée à **27 jours** sous Ramsès III
- **Procession** : Barque sacrée d'Amon transportée de Karnak à Louxor
- **But** : Régénération du ka royal (force vitale du pharaon)

**Rôle politique :**
Les prêtres d'Amon devinrent extrêmement puissants :
- Contrôlaient d'immenses richesses
- Influençaient les décisions politiques
- Rivalisaient parfois avec le pharaon lui-même""",

    "toutankhamon_cartouche": """👑 **TOUTÂNKHAMON - LE PHARAON LE PLUS CÉLÈBRE**

**Signification du nom :**
"Toutânkhamon" (twt-ꜥnḫ-imn) se décompose ainsi :
- **Tut** (twt) : Image, représentation vivante
- **Ankh** (ꜥnḫ) : Vie
- **Amon** (imn) : Nom du dieu Amon

**Traduction complète** : "Image vivante d'Amon" ou "Représentation vivante d'Amon"

**Changement de nom :**
À sa naissance, il s'appelait "**Toutânkhaton**" (image vivante d'Aton, le dieu-soleil unique)
- Son père Akhenaton avait imposé le culte exclusif d'Aton
- Vers 9 ans, le jeune pharaon change de nom pour "**Toutânkhamon**"
- Ce changement marque le **retour aux dieux traditionnels**, notamment Amon

**Le cartouche royal :**
Un **cartouche** (shenu en égyptien) est un ovale allongé entourant le nom du pharaon :
- Forme : Ovale avec une barre horizontale à la base
- Symbolisme : Représente une corde nouée qui entoure et protège le nom
- Fonction : Le nom royal est sacré et doit être protégé magiquement
- Lecture : Les hiéroglyphes à l'intérieur se lisent de droite à gauche (ou de haut en bas)

**Structure du cartouche de Toutânkhamon :**
Dans son cartouche, on trouve les hiéroglyphes suivants (de droite à gauche) :
1. **𓇋𓏠𓈖** (Imn) : Amon - le dieu caché
2. **𓋹** (ꜥnḫ) : Ankh - vie
3. **𓏏𓅱𓏏** (twt) : Image vivante

**Vie et règne :**
- **Dates** : Vers 1345-1327 avant J.-C. (XVIIIe dynastie)
- **Âge de couronnement** : 9 ans environ
- **Âge de mort** : 18-19 ans
- **Durée du règne** : ~10 ans
- **Contexte** : Période de restauration après la révolution religieuse d'Akhenaton
- **Capitale** : Retour à Memphis après Akhetaton (Amarna)

**La découverte du tombeau (1922) :**
- **Découvreur** : Howard Carter (archéologue britannique)
- **Localisation** : Vallée des Rois (KV62), Louxor
- **État** : Quasi intact (seule tombe royale presque intacte découverte)
- **Trésors** : Plus de 5000 objets retrouvés
- **Masque funéraire** : 11 kg d'or massif, devenu icône mondiale
- **Impact** : "Toutmania" - engouement mondial pour l'Égypte antique

**Pourquoi est-il si célèbre ?**
Ironiquement, Toutânkhamon était un pharaon mineur de son vivant :
- Règne court
- Jeune âge
- Pas de grandes conquêtes militaires
- Mais sa tombe intacte en a fait le pharaon le plus célèbre du XXe siècle !""",

    "ramses_nom": """⚔️ **RAMSÈS II - LE GRAND PHARAON BÂTISSEUR**

**Signification du nom :**
"Ramsès" (Rꜥ-ms-sw) signifie littéralement "**Rê l'a engendré**" ou "**Né de Rê**"
- **Rê** (Rꜥ) : Le dieu solaire suprême
- **Mès** (ms) : Engendrer, donner naissance
- **Sou** (sw) : Pronom le/lui

Le nom affirme donc la filiation divine du pharaon avec le dieu solaire.

**Cartouche royal :**
Le cartouche de Ramsès II contient les hiéroglyphes suivants :
- **𓇳** : Rê (le soleil)
- **𓅓𓋴** : Mès (engendrer)
- **𓋴** : Sou (lui)

**Identité complète :**
- **Nom de naissance** : Ramsès (Ra-msj-sw)
- **Nom de couronnement** : Ousermaâtrê-Setepenrê ("Puissante est la justice de Rê, Élu de Rê")
- **Dynastie** : XIXe dynastie
- **Dates de règne** : ~1279-1213 avant J.-C.
- **Durée** : **66-67 ans** - l'un des plus longs règnes de l'histoire égyptienne
- **Âge de mort** : 90-91 ans (exceptionnel pour l'époque)

**Pourquoi "le Grand" ?**
Ramsès II mérite ce titre pour plusieurs raisons :

**1. Bâtisseur monumental :**
- **Abou Simbel** : Deux temples monumentaux taillés dans la falaise
  - Grand temple : 4 colosses de 20m de haut à son effigie
  - Petit temple : Dédié à son épouse Néfertari
- **Ramesséum** : Son temple funéraire gigantesque à Thèbes
- **Pi-Ramsès** : Nouvelle capitale dans le Delta du Nil
- **Modifications** : Agrandit Karnak, Louxor, et d'innombrables temples

**2. Guerrier redoutable :**
- **Bataille de Qadesh** (1274 av. J.-C.) : Affrontement épique contre les Hittites
  - Ramsès prétend à une grande victoire
  - En réalité : bataille indécise mais racontée partout
  - Propagande monumentale : récit gravé sur tous ses temples
- **Traité de paix** : Premier traité de paix de l'histoire (avec les Hittites)
- **Campagnes** : Nombreuses expéditions en Nubie, Libye, Canaan

**3. Famille prolifique :**
- **Épouses** : 8 épouses principales + nombreuses épouses secondaires
- **Enfants** : Plus de **100 enfants** (52 fils, 40+ filles documentés)
- **Épouse favorite** : Néfertari ("La plus belle")
- **Succession** : Son 13e fils, Mineptah, lui succède (les 12 premiers morts avant lui)

**4. Propagande et image :**
- **Colosses partout** : Statues gigantesques à son effigie dans toute l'Égypte
- **Usurpation** : Effaçait les noms d'autres pharaons pour graver le sien
- **Auto-divinisation** : Se représentait comme un dieu de son vivant

**Momie :**
- Découverte en 1881 dans la cachette de Deir el-Bahari
- État de conservation : Excellent
- Caractéristiques : Cheveux roux/blonds, 1m75
- Actuellement au Musée national de la civilisation égyptienne, Le Caire"""
}

def enrichir_inscription(inscription):
    """Enrichit une inscription si elle a un contexte enrichi prédéfini"""
    id_inscription = inscription['id']

    if id_inscription in CONTEXTES_ENRICHIS:
        inscription['contexte_culturel'] = CONTEXTES_ENRICHIS[id_inscription]
        return True

    return False

if __name__ == '__main__':
    print("📚 Enrichissement pédagogique des contextes culturels...\n")

    # Charger le JSON
    with open('inscriptions-temples.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    enrichies = 0

    # Enrichir chaque niveau
    for niveau in ['debutant', 'intermediaire', 'expert']:
        for inscription in data['hieroglyphes'][niveau]:
            if enrichir_inscription(inscription):
                enrichies += 1
                print(f"✓ Enrichi : {inscription['titre']}")

    # Sauvegarder
    with open('inscriptions-temples.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"\n✅ {enrichies} inscriptions enrichies avec contextes détaillés")
    print("   Principe : ENSEIGNER les réponses AVANT le quiz !")
