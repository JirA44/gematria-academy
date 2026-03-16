@echo off
echo ========================================
echo  DEPLOIEMENT FIREBASE - Academie Gematria
echo ========================================
echo.

cd /d "%~dp0"

echo [1/3] Verification connexion Firebase...
firebase projects:list >nul 2>&1
if errorlevel 1 (
    echo [!] Vous devez d'abord vous connecter a Firebase
    echo [!] Execution: firebase login
    echo.
    firebase login
    if errorlevel 1 (
        echo [ERREUR] Connexion echouee
        pause
        exit /b 1
    )
)
echo [OK] Connecte a Firebase
echo.

echo [2/3] Verification du projet...
firebase use --add >nul 2>&1
if errorlevel 1 (
    echo [!] Configuration du projet...
    firebase use --add
)
echo [OK] Projet configure
echo.

echo [3/3] Deploiement en cours...
firebase deploy

if errorlevel 1 (
    echo.
    echo [ERREUR] Le deploiement a echoue
    echo Verifiez les messages d'erreur ci-dessus
    pause
    exit /b 1
)

echo.
echo ========================================
echo  DEPLOIEMENT REUSSI !
echo ========================================
echo.
echo Votre site est maintenant en ligne sur Firebase Hosting !
echo.
echo Pour voir votre site:
firebase hosting:channel:list
echo.
pause
