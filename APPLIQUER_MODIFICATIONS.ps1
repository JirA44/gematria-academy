# Script PowerShell pour appliquer automatiquement toutes les modifications
# Exécuter ce script pour ajouter les animations et la section Mandala

$fichier = "D:\Apprentissage_Runes_Gematria\index_multilingual.html"

Write-Host "=== APPLICATION DES MODIFICATIONS ===" -ForegroundColor Cyan
Write-Host ""

# Lire le contenu du fichier
$contenu = Get-Content -Path $fichier -Raw -Encoding UTF8

# Vérifier si les modifications sont déjà appliquées
$animationsDejaPresentees = $contenu -match "animated-backgrounds.css"
$mandalaDejaPresentee = $contenu -match 'id="mandala"'

if ($animationsDejaPresentees -and $mandalaDejaPresentee) {
    Write-Host "✅ Toutes les modifications sont déjà appliquées !" -ForegroundColor Green
    Write-Host ""
    Read-Host "Appuyez sur Entrée pour fermer"
    exit
}

# Faire une sauvegarde
$backup = $fichier + ".backup_" + (Get-Date -Format "yyyyMMdd_HHmmss")
Copy-Item -Path $fichier -Destination $backup
Write-Host "✅ Sauvegarde créée : $backup" -ForegroundColor Green

# MODIFICATION 1 : Ajouter le lien CSS pour les animations
if (-not $animationsDejaPresentees) {
    Write-Host "⏳ Ajout du fichier CSS d'animations..." -ForegroundColor Yellow
    $contenu = $contenu -replace '(<link rel="stylesheet" href="fix-contrast.css">)', '$1`n    <link rel="stylesheet" href="animated-backgrounds.css">'
    Write-Host "✅ Animations CSS ajoutées" -ForegroundColor Green
} else {
    Write-Host "⚠️  Les animations CSS sont déjà présentes" -ForegroundColor Yellow
}

# MODIFICATION 2 : Ajouter la section Mandala
if (-not $mandalaDejaPresentee) {
    Write-Host "⏳ Ajout de la section Mandala..." -ForegroundColor Yellow

    $sectionMandala = @'

        <section id="mandala" class="section-category">
            <h2 data-i18n="mandala_title">🕉️ Mandalas Sacrés</h2>
            <p class="intro" data-i18n="mandala_intro">Les mandalas sont des représentations géométriques de l''univers, utilisés depuis des millénaires dans les traditions bouddhistes et hindoues. La contemplation profonde d''un mandala, sans mots ni pensées, permet d''accéder au silence intérieur et à la paix de l''esprit.</p>

            <div class="level-cards">
                <div class="card beginner">
                    <div class="card-header">
                        <h3 data-i18n="mandala_contemplation">🧘 Contemplation Profonde</h3>
                        <span class="badge" data-i18n="badge_meditation">Méditation</span>
                    </div>
                    <ul data-section="mandala-practice">
                        <li data-i18n="mandala_1">Galerie plein écran immersive</li>
                        <li data-i18n="mandala_2">Sans mots, sans pensées</li>
                        <li data-i18n="mandala_3">Silence intérieur et concentration</li>
                        <li data-i18n="mandala_4">Navigation intuitive (flèches ‹ ›)</li>
                        <li data-i18n="mandala_5">Uploadez vos mandalas personnels</li>
                    </ul>
                    <a href="mandala.html" class="btn btn-beginner" data-i18n="btn_contemplate">Contempler →</a>
                </div>

                <div class="card intermediate">
                    <div class="card-header">
                        <h3 data-i18n="mandala_creation">🎨 Création de Mandalas</h3>
                        <span class="badge" data-i18n="badge_deepening">Approfondissement</span>
                    </div>
                    <ul data-section="mandala-creation">
                        <li data-i18n="mandala_create_1">Comprendre la géométrie sacrée</li>
                        <li data-i18n="mandala_create_2">Symbolisme des formes et couleurs</li>
                        <li data-i18n="mandala_create_3">Mandalas tibétains traditionnels</li>
                        <li data-i18n="mandala_create_4">Techniques de dessin circulaire</li>
                        <li data-i18n="mandala_create_5">Méditation créative guidée</li>
                    </ul>
                    <a href="mandala.html" class="btn btn-intermediate" data-i18n="btn_create">Créer →</a>
                </div>

                <div class="card expert">
                    <div class="card-header">
                        <h3 data-i18n="mandala_mastery">🌺 Maîtrise des Mandalas</h3>
                        <span class="badge" data-i18n="badge_mastery">Maîtrise</span>
                    </div>
                    <ul data-section="mandala-expert">
                        <li data-i18n="mandala_master_1">Mandalas tantriques avancés</li>
                        <li data-i18n="mandala_master_2">Yantras et diagrammes cosmiques</li>
                        <li data-i18n="mandala_master_3">Méditation profonde prolongée</li>
                        <li data-i18n="mandala_master_4">Rituel de création et destruction</li>
                        <li data-i18n="mandala_master_5">Transmission spirituelle par le mandala</li>
                    </ul>
                    <a href="mandala.html" class="btn btn-expert" data-i18n="btn_master">Maîtriser →</a>
                </div>
            </div>
        </section>
'@

    # Insérer la section avant <section class="tools">
    $contenu = $contenu -replace '(\s+<section class="tools">)', "$sectionMandala`n`$1"
    Write-Host "✅ Section Mandala ajoutée" -ForegroundColor Green
} else {
    Write-Host "⚠️  La section Mandala est déjà présente" -ForegroundColor Yellow
}

# MODIFICATION 3 : Ajouter le lien dans la navigation
if ($contenu -notmatch 'href="#mandala"') {
    Write-Host "⏳ Ajout du lien Mandala dans la navigation..." -ForegroundColor Yellow
    $contenu = $contenu -replace '(<a href="#logique" data-i18n="nav_logic">Logique</a>)', '$1`n            <a href="#mandala" data-i18n="nav_mandala">Mandala</a>'
    Write-Host "✅ Lien navigation ajouté" -ForegroundColor Green
} else {
    Write-Host "⚠️  Le lien navigation est déjà présent" -ForegroundColor Yellow
}

# MODIFICATION 4 : Ajouter les traductions FR
if ($contenu -notmatch 'mandala_title:') {
    Write-Host "⏳ Ajout des traductions françaises..." -ForegroundColor Yellow

    $traductionsFR = @'
                mandala_title: "🕉️ Mandalas Sacrés",
                mandala_intro: "Les mandalas sont des représentations géométriques de l''univers, utilisés depuis des millénaires dans les traditions bouddhistes et hindoues. La contemplation profonde d''un mandala, sans mots ni pensées, permet d''accéder au silence intérieur et à la paix de l''esprit.",
                mandala_contemplation: "🧘 Contemplation Profonde",
                badge_meditation: "Méditation",
                mandala_1: "Galerie plein écran immersive",
                mandala_2: "Sans mots, sans pensées",
                mandala_3: "Silence intérieur et concentration",
                mandala_4: "Navigation intuitive (flèches ‹ ›)",
                mandala_5: "Uploadez vos mandalas personnels",
                btn_contemplate: "Contempler →",
                mandala_creation: "🎨 Création de Mandalas",
                mandala_create_1: "Comprendre la géométrie sacrée",
                mandala_create_2: "Symbolisme des formes et couleurs",
                mandala_create_3: "Mandalas tibétains traditionnels",
                mandala_create_4: "Techniques de dessin circulaire",
                mandala_create_5: "Méditation créative guidée",
                btn_create: "Créer →",
                mandala_mastery: "🌺 Maîtrise des Mandalas",
                mandala_master_1: "Mandalas tantriques avancés",
                mandala_master_2: "Yantras et diagrammes cosmiques",
                mandala_master_3: "Méditation profonde prolongée",
                mandala_master_4: "Rituel de création et destruction",
                mandala_master_5: "Transmission spirituelle par le mandala",
                nav_mandala: "Mandala",
'@

    # Ajouter après la ligne "footer: "
    $contenu = $contenu -replace '(footer: "© 2025 Académie des Runes & Gematria - Savoir ancestral, apprentissage moderne")', "$1,`n$traductionsFR"
    Write-Host "✅ Traductions FR ajoutées" -ForegroundColor Green
} else {
    Write-Host "⚠️  Les traductions FR sont déjà présentes" -ForegroundColor Yellow
}

# MODIFICATION 5 : Ajouter les traductions EN
if ($contenu -notmatch 'Sacred Mandalas') {
    Write-Host "⏳ Ajout des traductions anglaises..." -ForegroundColor Yellow

    $traductionsEN = @'
                mandala_title: "🕉️ Sacred Mandalas",
                mandala_intro: "Mandalas are geometric representations of the universe, used for millennia in Buddhist and Hindu traditions. Deep contemplation of a mandala, without words or thoughts, allows access to inner silence and peace of mind.",
                mandala_contemplation: "🧘 Deep Contemplation",
                badge_meditation: "Meditation",
                mandala_1: "Immersive full-screen gallery",
                mandala_2: "Without words, without thoughts",
                mandala_3: "Inner silence and concentration",
                mandala_4: "Intuitive navigation (arrows ‹ ›)",
                mandala_5: "Upload your personal mandalas",
                btn_contemplate: "Contemplate →",
                mandala_creation: "🎨 Mandala Creation",
                mandala_create_1: "Understanding sacred geometry",
                mandala_create_2: "Symbolism of shapes and colors",
                mandala_create_3: "Traditional Tibetan mandalas",
                mandala_create_4: "Circular drawing techniques",
                mandala_create_5: "Guided creative meditation",
                btn_create: "Create →",
                mandala_mastery: "🌺 Mandala Mastery",
                mandala_master_1: "Advanced tantric mandalas",
                mandala_master_2: "Yantras and cosmic diagrams",
                mandala_master_3: "Prolonged deep meditation",
                mandala_master_4: "Ritual of creation and destruction",
                mandala_master_5: "Spiritual transmission through mandala",
                nav_mandala: "Mandala",
'@

    # Ajouter après "footer: " de la section en
    $contenu = $contenu -replace '(en: \{[^}]*footer: "© 2025 Academy of Runes & Gematria - Ancient knowledge, modern learning")', "$1,`n$traductionsEN"
    Write-Host "✅ Traductions EN ajoutées" -ForegroundColor Green
} else {
    Write-Host "⚠️  Les traductions EN sont déjà présentes" -ForegroundColor Yellow
}

# Sauvegarder les modifications
Set-Content -Path $fichier -Value $contenu -Encoding UTF8 -NoNewline

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "✅ TOUTES LES MODIFICATIONS APPLIQUÉES !" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Ouvrez maintenant index_multilingual.html dans votre navigateur" -ForegroundColor Cyan
Write-Host "Vous devriez voir :" -ForegroundColor Cyan
Write-Host "  - Les fonds d'écran animés sur chaque section" -ForegroundColor White
Write-Host "  - La section Mandala entre Logique et Outils" -ForegroundColor White
Write-Host "  - Le lien Mandala dans la navigation" -ForegroundColor White
Write-Host ""

# Ouvrir la page
Start-Process "D:\Apprentissage_Runes_Gematria\index_multilingual.html"

Write-Host "Appuyez sur Entrée pour fermer..." -ForegroundColor Yellow
Read-Host
