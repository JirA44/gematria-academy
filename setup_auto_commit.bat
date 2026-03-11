@echo off
echo Configuration du commit automatique toutes les 10 minutes...
schtasks /Create /SC MINUTE /MO 10 /TN "Gematria_Academy_AutoCommit" /TR "powershell.exe -ExecutionPolicy Bypass -File \"D:\Apprentissage_Runes_Gematria\auto_git_commit.ps1\"" /F
echo.
echo Fait ! La tache planifiee est active.
echo Le site sera mis a jour automatiquement toutes les 10 minutes.
pause
