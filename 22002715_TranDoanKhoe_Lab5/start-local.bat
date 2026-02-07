@echo off
pushd %~dp0
echo Starting local services (will run PowerShell helper)...
powershell -NoProfile -ExecutionPolicy Bypass -Command "Start-Process powershell -ArgumentList '-NoProfile -ExecutionPolicy Bypass -File ""%~dp0run_local.ps1""' -Verb RunAs"
timeout /t 3 >nul
start "" "http://localhost:3000/"
popd
