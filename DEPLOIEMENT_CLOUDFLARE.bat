@echo off
chcp 65001 >nul
echo.
echo ═══════════════════════════════════════════════════════════════
echo    🚀 DÉPLOIEMENT CLOUDFLARE PAGES - GEMATRIA ACADEMY
echo ═══════════════════════════════════════════════════════════════
echo.
echo Ce script va:
echo   1️⃣  Initialiser Git dans le dossier
echo   2️⃣  Créer un repo GitHub
echo   3️⃣  Te guider pour connecter Cloudflare Pages
echo.
echo ✨ Résultat: Site en ligne + Mises à jour AUTOMATIQUES!
echo.
pause

cd /d "%~dp0"

echo.
echo ═══════════════════════════════════════════════════════════════
echo    📦 ÉTAPE 1: Initialisation Git
echo ═══════════════════════════════════════════════════════════════
echo.

REM Vérifier si Git est déjà initialisé
if exist ".git" (
    echo ✅ Git déjà initialisé!
) else (
    echo Initialisation de Git...
    git init
    echo ✅ Git initialisé!
)

echo.
echo Ajout des fichiers...
git add .
git commit -m "🔮 Gematria Academy - Version initiale avec mode nuit par défaut"
echo ✅ Commit créé!

echo.
echo ═══════════════════════════════════════════════════════════════
echo    🌐 ÉTAPE 2: Création du repo GitHub
echo ═══════════════════════════════════════════════════════════════
echo.

REM Vérifier si gh est installé
where gh >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  GitHub CLI non installé.
    echo.
    echo 📋 CRÉATION MANUELLE:
    echo    1. Va sur https://github.com/new
    echo    2. Nom du repo: gematria-academy
    echo    3. Rends-le PUBLIC
    echo    4. NE coche PAS "Initialize with README"
    echo    5. Clique "Create repository"
    echo.
    echo    Ensuite, copie-colle ces commandes:
    echo    git remote add origin https://github.com/TON-USERNAME/gematria-academy.git
    echo    git branch -M main
    echo    git push -u origin main
    echo.
    pause
) else (
    echo Création du repo avec GitHub CLI...
    gh repo create gematria-academy --public --source=. --push
    echo ✅ Repo GitHub créé et code poussé!
)

echo.
echo ═══════════════════════════════════════════════════════════════
echo    ☁️  ÉTAPE 3: Déploiement sur Cloudflare Pages
echo ═══════════════════════════════════════════════════════════════
echo.
echo 🌟 INSTRUCTIONS FINALES:
echo.
echo 1. Va sur: https://dash.cloudflare.com/
echo 2. Clique sur "Pages" dans le menu de gauche
echo 3. Clique "Create a project"
echo 4. Choisis "Connect to Git"
echo 5. Sélectionne ton repo "gematria-academy"
echo 6. Paramètres de build:
echo    - Framework preset: None
echo    - Build command: (laisse vide)
echo    - Build output directory: /
echo 7. Clique "Save and Deploy"
echo.
echo ⏱️  Attends 1-2 minutes...
echo.
echo ✅ TON SITE SERA EN LIGNE!
echo    URL: https://gematria-academy.pages.dev
echo.
echo 🔄 MISES À JOUR AUTOMATIQUES:
echo    Maintenant, à chaque fois que tu modifies un fichier,
echo    lance simplement: UPDATE_SITE.bat
echo.
echo ═══════════════════════════════════════════════════════════════
echo.
pause

REM Ouvrir Cloudflare Pages
start https://dash.cloudflare.com/

echo.
echo 📖 Script terminé! Suis les instructions ci-dessus.
echo.
pause
