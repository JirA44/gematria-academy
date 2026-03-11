# Script pour ajouter le système i18n à toutes les pages HTML

$pages = @(
    "hieroglyphes-parcours-complet.html",
    "hebreu-gematria-parcours-multilingue.html",
    "mayas-glyphes-parcours-multilingue.html",
    "hieroglyphes-alphabet-complet.html",
    "hieroglyphes-flashcards.html",
    "hieroglyphes-grammaire-niveau1.html",
    "hieroglyphes-exercices-dechiffrage.html",
    "alphabet-hebreu.html",
    "alphabet-runes.html",
    "calculateur-gematria.html",
    "exercices-logique.html",
    "mandala.html",
    "tirage-runes.html"
)

$baseDir = "D:/Apprentissage_Runes_Gematria"

foreach ($page in $pages) {
    $filePath = Join-Path $baseDir $page

    if (Test-Path $filePath) {
        Write-Host "Traitement de $page..." -ForegroundColor Cyan

        $content = Get-Content $filePath -Raw -Encoding UTF8

        # Vérifier si le fichier a déjà le script i18n
        if ($content -notmatch 'i18n-global\.js') {
            # Ajouter le bouton de langue dans le header si absent
            if ($content -notmatch 'lang-toggle') {
                $content = $content -replace '(<header[^>]*>)', '$1`n        <button class="lang-toggle" onclick="window.i18n.toggleLanguage()">🌐 EN</button>'
            }

            # Ajouter le script i18n avant la fermeture du </body>
            if ($content -match '</body>') {
                $content = $content -replace '</body>', '    <script src="i18n-global.js"></script>`n</body>'
            }

            # Sauvegarder
            [System.IO.File]::WriteAllText($filePath, $content, [System.Text.Encoding]::UTF8)
            Write-Host "✓ $page mis à jour" -ForegroundColor Green
        } else {
            Write-Host "○ $page a déjà le système i18n" -ForegroundColor Yellow
        }
    } else {
        Write-Host "✗ $page non trouvé" -ForegroundColor Red
    }
}

Write-Host "`n✅ Traitement terminé!" -ForegroundColor Green
