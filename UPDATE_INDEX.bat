@echo off
echo ================================================
echo MISE A JOUR DE INDEX.HTML
echo ================================================
echo.
echo Ce script va ajouter le lien vers le nouveau
echo "Parcours Complet d'Apprentissage" dans index.html
echo.
echo IMPORTANT: Fermez index.html s'il est ouvert dans
echo un navigateur ou editeur de texte !
echo.
pause

cd /d "D:\Apprentissage_Runes_Gematria"

echo.
echo Creation d'une sauvegarde...
copy index.html index.html.backup_%date:~-4%%date:~3,2%%date:~0,2%_%time:~0,2%%time:~3,2%%time:~6,2%.bak

echo.
echo Verification du fichier PATCH...
if not exist "PATCH_INDEX_HIEROGLYPHES.html" (
    echo ERREUR: Le fichier PATCH_INDEX_HIEROGLYPHES.html est manquant !
    pause
    exit /b 1
)

echo.
echo ================================================
echo INSTRUCTIONS MANUELLES:
echo ================================================
echo.
echo 1. Ouvrez index.html dans un editeur de texte
echo 2. Cherchez la ligne 185 (section hieroglyphes)
echo 3. Copiez le code du fichier PATCH_INDEX_HIEROGLYPHES.html
echo 4. Remplacez selon les instructions dans le patch
echo.
echo Le fichier PATCH va s'ouvrir maintenant...
echo.
pause

start "" "PATCH_INDEX_HIEROGLYPHES.html"
notepad "index.html"

echo.
echo ================================================
echo Modifications terminees !
echo ================================================
pause
