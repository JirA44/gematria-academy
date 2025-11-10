# Script pour configurer le système i18n sur toutes les pages principales
# Exécution: powershell -ExecutionPolicy Bypass -File setup_i18n_system.ps1

$baseDir = "D:/Apprentissage_Runes_Gematria"

# Pages principales à mettre à jour
$mainPages = @(
    "hieroglyphes-parcours-complet.html",
    "hebreu-gematria-parcours-multilingue.html",
    "mayas-glyphes-parcours-multilingue.html"
)

Write-Host "`n🌍 Configuration du système multilingue (FR/EN/ES)`n" -ForegroundColor Cyan

foreach ($page in $mainPages) {
    $filePath = Join-Path $baseDir $page

    if (Test-Path $filePath) {
        Write-Host "📄 Traitement: $page" -ForegroundColor Yellow

        $content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

        # 1. Ajouter le CSS du bouton langue si absent
        if ($content -notmatch 'lang-button\.css') {
            $content = $content -replace '(<link rel="stylesheet"[^>]*>)', "`$1`n    <link rel=`"stylesheet`" href=`"lang-button.css`">"
            Write-Host "  ✓ CSS bouton langue ajouté" -ForegroundColor Green
        }

        # 2. Ajouter les scripts avant </body> si absents
        if ($content -notmatch 'translations-common\.js') {
            $scriptsToAdd = @"
    <script src="translations-common.js"></script>
    <script src="i18n-global.js"></script>
</body>
"@
            $content = $content -replace '</body>', $scriptsToAdd
            Write-Host "  ✓ Scripts i18n ajoutés" -ForegroundColor Green
        }

        # 3. Ajouter le bouton de langue dans le header/body
        if ($content -notmatch 'class="lang-toggle"') {
            # Chercher le <body> et ajouter le bouton juste après
            $content = $content -replace '(<body[^>]*>)', "`$1`n    <button class=`"lang-toggle`">🌐 EN</button>"
            Write-Host "  ✓ Bouton de langue ajouté" -ForegroundColor Green
        }

        # 4. Sauvegarder les modifications
        [System.IO.File]::WriteAllText($filePath, $content, [System.Text.Encoding]::UTF8)
        Write-Host "  ✅ $page mis à jour avec succès!`n" -ForegroundColor Green

    } else {
        Write-Host "  ✗ $page introuvable`n" -ForegroundColor Red
    }
}

Write-Host "`n🎉 Configuration terminée!" -ForegroundColor Cyan
Write-Host "📊 Résumé:" -ForegroundColor White
Write-Host "  - Fichiers traités: $($mainPages.Count)" -ForegroundColor White
Write-Host "  - Système i18n: FR / EN / ES" -ForegroundColor White
Write-Host "  - Bouton de langue ajouté en haut à droite" -ForegroundColor White
Write-Host "`n💡 Le changement de langue est maintenant persistant sur toutes les pages!`n" -ForegroundColor Yellow
