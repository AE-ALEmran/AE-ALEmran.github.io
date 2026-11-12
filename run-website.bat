@echo off
setlocal
cd /d "%~dp0"
title Md. Al Emran Portfolio - Local Server

echo ========================================================
echo   Md. Al Emran - Personal Portfolio & Research Portal
echo ========================================================
echo.
echo Starting local web server...
echo.

python serve.py
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Could not start Python server. Trying Node preview server...
    set "PATH=C:\Program Files\nodejs;%PATH%"
    npx vite preview --port 5173
)

pause
