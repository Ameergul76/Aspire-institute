@echo off
title Aspire Institute - FastAPI Backend
echo ====================================================
echo Starting Aspire Institute Backend (FastAPI + SQLite)
echo ====================================================
cd /d "%~dp0backend"
if exist ".venv\Scripts\activate.bat" (
    call .venv\Scripts\activate.bat
    python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
) else (
    echo [ERROR] Virtual environment not found in backend\.venv
    pause
)
