# Script pour corriger l'encodage UTF-8 du fichier HTML

$fichier = "D:\Apprentissage_Runes_Gematria\index_multilingual.html"

Write-Host "Correction de l'encodage UTF-8..." -ForegroundColor Yellow

# Lire le fichier avec l'encodage actuel
$contenu = Get-Content -Path $fichier -Raw -Encoding UTF8

# Sauvegarder avec UTF-8 sans BOM
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText($fichier, $contenu, $utf8NoBom)

Write-Host "✅ Encodage corrigé !" -ForegroundColor Green
Write-Host ""
Write-Host "Rechargez la page dans votre navigateur (F5)" -ForegroundColor Cyan
Write-Host ""

Start-Process "D:\Apprentissage_Runes_Gematria\index_multilingual.html"

Read-Host "Appuyez sur Entrée pour fermer"
