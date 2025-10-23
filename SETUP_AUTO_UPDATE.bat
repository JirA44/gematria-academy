@echo off
chcp 65001 >nul
echo.
echo ═══════════════════════════════════════════════════════════════
echo    ⏰ CONFIGURATION MISE À JOUR AUTOMATIQUE - GEMATRIA
echo ═══════════════════════════════════════════════════════════════
echo.
echo Ce script va créer une tâche planifiée qui:
echo   🔄 Met à jour le site AUTOMATIQUEMENT toutes les heures
echo   📤 Pousse les changements vers GitHub
echo   ☁️  Cloudflare déploie automatiquement en 1-2 minutes
echo.
pause

cd /d "%~dp0"

echo.
echo 📝 Création de la tâche planifiée...
schtasks /Create /SC HOURLY /TN "Gematria_Auto_Update" /TR "powershell.exe -ExecutionPolicy Bypass -File \"%~dp0auto_update_gematria.ps1\"" /F

if %errorlevel% equ 0 (
    echo ✅ Tâche planifiée créée avec succès!
    echo.
    echo ═══════════════════════════════════════════════════════════════
    echo    ✨ CONFIGURATION TERMINÉE!
    echo ═══════════════════════════════════════════════════════════════
    echo.
    echo 📋 Résumé:
    echo    • Le site se met à jour AUTOMATIQUEMENT toutes les heures
    echo    • Les logs sont dans: auto_update.log
    echo    • Pour désactiver: STOP_AUTO_UPDATE.bat
    echo.
    echo 🧪 Test immédiat...
    echo.
    powershell.exe -ExecutionPolicy Bypass -File "%~dp0auto_update_gematria.ps1"
    echo.
    echo 📊 Vérifier le log: auto_update.log
    echo.
) else (
    echo ❌ Erreur lors de la création de la tâche
    echo    Lancez ce script en tant qu'administrateur
)

pause
