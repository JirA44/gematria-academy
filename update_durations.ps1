$content = Get-Content 'D:/Apprentissage_Runes_Gematria/index_multilingual.html' -Raw -Encoding UTF8

$content = $content -replace 'Durée : 15-25 heures','Durée : 80-120 heures'
$content = $content -replace 'Durée : 20-30 heures','Durée : 150-200 heures'
$content = $content -replace 'Durée : 10-15 heures','Durée : 100-150 heures'

$content = $content -replace 'Duration: 15-25 hours','Duration: 80-120 hours'
$content = $content -replace 'Duration: 20-30 hours','Duration: 150-200 hours'
$content = $content -replace 'Duration: 10-15 hours','Duration: 100-150 hours'

[System.IO.File]::WriteAllText('D:/Apprentissage_Runes_Gematria/index_multilingual.html', $content, [System.Text.Encoding]::UTF8)

Write-Host "Durées mises à jour avec succès !"
Write-Host "Hébreu & Gematria: 80-120 heures"
Write-Host "Glyphes Mayas: 150-200 heures"
Write-Host "Hiéroglyphes Égyptiens: 100-150 heures"
