# Script de mise à jour automatique du site Gematria Academy
# Exécuté toutes les heures par le planificateur de tâches Windows

$repoPath = "D:\Apprentissage_Runes_Gematria"
$logFile = "$repoPath\auto_update.log"

# Fonction de log
function Write-Log {
    param($message)
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    "$timestamp - $message" | Out-File -Append -FilePath $logFile
}

try {
    Write-Log "=== Démarrage de la mise à jour automatique ==="

    # Se déplacer dans le répertoire
    Set-Location $repoPath

    # Vérifier s'il y a des changements
    $status = git status --porcelain

    if ($status) {
        Write-Log "Changements détectés, début du commit..."

        # Ajouter tous les fichiers
        git add .

        # Créer le commit avec un message horodaté
        $commitMessage = "🔄 Mise à jour automatique - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
        git commit -m $commitMessage

        Write-Log "Commit créé: $commitMessage"

        # Pousser vers GitHub
        git push origin main

        Write-Log "✅ Push vers GitHub réussi!"
        Write-Log "⏱️ Cloudflare Pages va déployer dans 1-2 minutes"
    }
    else {
        Write-Log "Aucun changement détecté, pas de mise à jour nécessaire"
    }

    Write-Log "=== Fin de la mise à jour automatique ==="
}
catch {
    Write-Log "❌ ERREUR: $_"
}
