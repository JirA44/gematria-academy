@echo off
echo ====================================
echo DEPLOIEMENT SUR GITHUB PAGES
echo ====================================
echo.
echo Instructions:
echo 1. Va sur https://github.com/new
echo 2. Nomme le repo: gematria-academy
echo 3. Rends-le PUBLIC
echo 4. NE coche PAS "Initialize with README"
echo 5. Clique sur "Create repository"
echo.
echo Puis reviens ici et appuie sur une touche...
pause
echo.
echo Deploiement en cours...
cd /d "D:\Apprentissage_Runes_Gematria"

REM Creer .gitignore
echo node_modules/ > .gitignore
echo .git/ >> .gitignore
echo *.log >> .gitignore

REM Ajouter tous les fichiers
git add .
git commit -m "Initial commit - Gematria Academy"

echo.
echo Entre le nom de ton compte GitHub:
set /p GITHUB_USER="Ton username GitHub: "

git remote add origin https://github.com/%GITHUB_USER%/gematria-academy.git
git push -u origin main

echo.
echo ====================================
echo Maintenant va sur:
echo https://github.com/%GITHUB_USER%/gematria-academy/settings/pages
echo.
echo Et active GitHub Pages:
echo - Source: Deploy from a branch
echo - Branch: main / (root)
echo - Clique sur Save
echo.
echo Ton site sera accessible sur:
echo https://%GITHUB_USER%.github.io/gematria-academy/
echo ====================================
pause
