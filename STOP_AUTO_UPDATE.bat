@echo off
chcp 65001 >nul
echo.
echo ═══════════════════════════════════════════════════════════════
echo    🛑 ARRÊT DE LA MISE À JOUR AUTOMATIQUE
echo ═══════════════════════════════════════════════════════════════
echo.

schtasks /Delete /TN "Gematria_Auto_Update" /F

if %errorlevel% equ 0 (
    echo ✅ Tâche planifiée supprimée!
    echo.
    echo Le site ne se mettra plus à jour automatiquement.
    echo Pour réactiver: SETUP_AUTO_UPDATE.bat
) else (
    echo ❌ La tâche n'existait pas ou erreur
)

echo.
pause
