# Script de commit automatique toutes les 10 minutes
# Gematria Academy - Auto-update

$repoPath = "D:\Apprentissage_Runes_Gematria"
$logFile = "$repoPath\auto_commit.log"

# Fonction de log
function Write-Log {
    param($message)
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    "$timestamp - $message" | Out-File -FilePath $logFile -Append
    Write-Host "$timestamp - $message"
}

Write-Log "========================================="
Write-Log "Début du cycle de commit automatique"

# Aller dans le répertoire
Set-Location $repoPath

# Vérifier s'il y a des changements
git status --porcelain | Out-File -FilePath "$repoPath\git_status_temp.txt"
$changes = Get-Content "$repoPath\git_status_temp.txt"
Remove-Item "$repoPath\git_status_temp.txt" -ErrorAction SilentlyContinue

if ($changes) {
    Write-Log "Changements détectés : $($changes.Count) fichier(s)"

    # Ajouter tous les fichiers
    git add .
    Write-Log "Fichiers ajoutés au staging"

    # Créer le message de commit avec timestamp
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
    $commitMessage = @"
Auto-update: $timestamp

Mise à jour automatique du contenu de Gematria Academy

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
"@

    # Commit
    git commit -m "$commitMessage"
    if ($LASTEXITCODE -eq 0) {
        Write-Log "Commit créé avec succès"

        # Push vers GitHub
        git push
        if ($LASTEXITCODE -eq 0) {
            Write-Log "✅ Push réussi vers GitHub"
            Write-Log "🌐 Site sera mis à jour sur https://gematria-academy.pages.dev"
        } else {
            Write-Log "❌ Erreur lors du push"
        }
    } else {
        Write-Log "❌ Erreur lors du commit"
    }
} else {
    Write-Log "Aucun changement détecté, pas de commit"
}

Write-Log "Fin du cycle de commit automatique"
Write-Log "========================================="
