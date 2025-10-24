@echo off
chcp 65001 >nul
echo.
echo ========================================
echo RÉINSTALLATION PROPRE
echo ========================================
echo.
echo 1. Restauration de la sauvegarde originale...
copy /Y "index_multilingual.html.backup_20251024_071405" "index_multilingual.html"
echo    ✅ Fichier restauré
echo.
echo 2. Ouvrez maintenant le fichier index_multilingual.html
echo.
echo 3. AJOUTEZ cette ligne après la ligne 8 (après fix-contrast.css):
echo    ^<link rel="stylesheet" href="animated-backgrounds.css"^>
echo.
echo 4. Ouvrez le fichier SECTION_MANDALA_A_COPIER.html
echo    Copiez tout le contenu HTML
echo    Collez-le dans index_multilingual.html ligne 189 (après section Logique)
echo.
echo 5. Copiez les traductions depuis SECTION_MANDALA_A_COPIER.html
echo    Collez-les dans les objets fr: et en: du JavaScript
echo.
echo Fichiers à ouvrir:
start "" "index_multilingual.html"
timeout /t 2 >nul
start "" "SECTION_MANDALA_A_COPIER.html"
timeout /t 2 >nul
start "" "INSTRUCTIONS_ANIMATIONS.md"
echo.
echo ========================================
echo ✅ FICHIERS OUVERTS
echo ========================================
echo.
pause
