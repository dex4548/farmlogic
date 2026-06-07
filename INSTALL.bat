@echo off
echo.
echo  ================================
echo   FarmLogic - Setup Script
echo  ================================
echo.

echo [1/4] Creating folder structure...
mkdir electron 2>nul
mkdir public 2>nul
mkdir src 2>nul
echo Done.

echo.
echo [2/4] Installing dependencies...
echo This takes 3-5 minutes, please wait...
echo.
npm install --legacy-peer-deps
echo.

echo [3/4] Checking installation...
if exist node_modules (
  echo Dependencies installed successfully.
) else (
  echo ERROR: Something went wrong with npm install.
  echo Try running this manually: npm install --legacy-peer-deps
  pause
  exit
)

echo.
echo [4/4] Setup complete!
echo.
echo ================================
echo  NEXT STEPS:
echo ================================
echo.
echo  To TEST the app first, type:
echo     npm run electron-dev
echo.
echo  To BUILD the .exe, type:
echo     npm run package-win
echo.
echo ================================
echo.
pause
