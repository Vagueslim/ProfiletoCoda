@echo off
setlocal
cd /d "%~dp0"

where npm.cmd >nul 2>nul
if errorlevel 1 (
  echo [ProfiletoCoda] Node.js and npm are required.
  echo Install the current Node.js LTS release, then run this file again.
  pause
  exit /b 1
)

if not exist "node_modules\vite\bin\vite.js" (
  echo [ProfiletoCoda] Installing locked dependencies for the first local run...
  call npm.cmd ci
  if errorlevel 1 (
    echo [ProfiletoCoda] Dependency installation failed.
    pause
    exit /b 1
  )
)

echo [ProfiletoCoda] Opening http://127.0.0.1:4174/coda/
call npm.cmd run dev -- --port 4174 --open /coda/

if errorlevel 1 (
  echo [ProfiletoCoda] The local server stopped with an error.
  pause
  exit /b 1
)
