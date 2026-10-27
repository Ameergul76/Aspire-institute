@echo off
title Aspire Institute - Launch All
echo ====================================================
echo Starting Aspire Institute Web Application (Full Stack)
echo ====================================================

echo [1/2] Launching FastAPI Backend on http://127.0.0.1:8000...
start "Aspire Backend (Port 8000)" cmd /k "%~dp0run_backend.bat"

echo [2/2] Launching Next.js Frontend on http://localhost:3000...
cd /d "%~dp0frontend"
start "Aspire Frontend (Port 3000)" cmd /k "npm run dev"

echo ====================================================
echo Both servers are starting up!
echo Frontend: http://localhost:3000
echo Backend:  http://127.0.0.1:8000
echo API Docs: http://127.0.0.1:8000/docs
echo ====================================================
