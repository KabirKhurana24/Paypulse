@echo off
setlocal
cd /d "%~dp0"

echo.
echo  PayPulse - Payment Intelligence Workbench
echo  -----------------------------------------
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found. Install the current LTS version from https://nodejs.org/ and run this file again.
  pause
  exit /b 1
)

if not exist node_modules (
  echo Installing project dependencies for the first run...
  call npm install
  if errorlevel 1 (
    echo.
    echo Dependency installation failed. Check your internet connection and try again.
    pause
    exit /b 1
  )
)

echo.
echo Starting PayPulse. Keep this window open while using the app.
echo Your browser should open at http://127.0.0.1:5173
start "" http://127.0.0.1:5173
call npm run dev
pause
