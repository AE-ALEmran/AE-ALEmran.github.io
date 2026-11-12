@echo off
setlocal
cd /d "%~dp0"
title Md. Al Emran Portfolio - Vite Dev Server

set "PATH=C:\Program Files\nodejs;%PATH%"

echo ========================================================
echo   Md. Al Emran - Personal Portfolio (Dev Mode)
echo ========================================================
echo.
echo Starting Vite Development Server with Hot Module Reloading...
echo Open http://localhost:5173/ in your browser.
echo.

call npm run dev
pause
