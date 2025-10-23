@echo off
echo ====================================
echo DEPLOIEMENT SUR VERCEL
echo ====================================
echo.
echo Etape 1: Connexion a Vercel (ouvrira le navigateur)
cd /d "D:\Apprentissage_Runes_Gematria"
npx vercel login
echo.
echo Etape 2: Deploiement en production
npx vercel --prod --yes
echo.
echo ====================================
echo DEPLOIEMENT TERMINE!
echo ====================================
pause
