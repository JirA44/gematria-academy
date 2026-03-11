@echo off
chcp 65001 >nul
echo.
echo ═══════════════════════════════════════════════════════════════
echo    🔄 MISE À JOUR AUTOMATIQUE DU SITE
echo ═══════════════════════════════════════════════════════════════
echo.

cd /d "%~dp0"

echo 📝 Ajout des modifications...
git add .

echo.
set /p message="💬 Message de mise à jour (ou Entrée pour message auto): "

if "%message%"=="" (
    set message=🔄 Mise à jour du site - %date% %time%
)

echo.
echo 💾 Sauvegarde des modifications...
git commit -m "%message%"

echo.
echo 🚀 Envoi vers GitHub...
git push

echo.
echo ═══════════════════════════════════════════════════════════════
echo    ✅ MISE À JOUR TERMINÉE!
echo ═══════════════════════════════════════════════════════════════
echo.
echo ⏱️  Cloudflare va déployer automatiquement dans 30-60 secondes
echo 🌐 Ton site sera à jour à: https://gematria-academy.pages.dev
echo.
pause
