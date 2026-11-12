@echo off
setlocal
cd /d "%~dp0"
title Md. Al Emran Portfolio - Production Build

set "PATH=C:\Program Files\nodejs;%PATH%"

echo ========================================================
echo   Md. Al Emran - Production Build Compiler
echo ========================================================
echo.
echo Compiling TypeScript and bundling Vite assets...
echo.

call npm run build
if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo   BUILD SUCCESSFUL! Distribution assets are in /dist
    echo ========================================================
) else (
    echo.
    echo [ERROR] Build encountered an issue.
)

pause
