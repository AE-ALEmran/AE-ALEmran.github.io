@echo off
setlocal EnableDelayedExpansion
cd /d "%~dp0"
title Publish Portfolio to GitHub Pages (AE-ALEmran)

set "PATH=C:\Program Files\Git\cmd;C:\Program Files\GitHub CLI;C:\Program Files\nodejs;%PATH%"

echo ==============================================================
echo   Md. Al Emran - Automated GitHub & GitHub Pages Publisher
echo ==============================================================
echo.

:: 1. Ensure Git is installed
where git >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [1/5] Git not found. Installing Git via winget...
    winget install --id Git.Git --source winget --accept-package-agreements --accept-source-agreements
    set "PATH=C:\Program Files\Git\cmd;%PATH%"
)

where git >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Git is required. Please install from https://git-scm.com/download/win
    pause
    exit /b 1
)

:: 2. Ensure GitHub CLI is installed
where gh >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [2/5] GitHub CLI not found. Installing GitHub CLI via winget...
    winget install --id GitHub.cli --source winget --accept-package-agreements --accept-source-agreements
    set "PATH=C:\Program Files\GitHub CLI;%PATH%"
)

where gh >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] GitHub CLI is required. Please install from https://cli.github.com/
    pause
    exit /b 1
)

:: 3. Authenticate safely via GitHub browser OAuth
echo [3/5] Checking GitHub authentication...
gh auth status >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Opening secure browser sign-in for GitHub ^(no password needed in terminal^)...
    gh auth login -h github.com -p https -w
    if !ERRORLEVEL! NEQ 0 (
        echo [ERROR] GitHub authentication failed or was cancelled.
        pause
        exit /b 1
    )
)
gh auth setup-git

:: 4. Choose repository name
echo.
echo NOTE on your GitHub account ^(AE-ALEmran^):
echo   - If you use "portfolio" or "Web", URL will be: https://ae-alemran.github.io/^<repo^>/
echo   - If you use "AE-ALEmran.github.io", URL will be: https://ae-alemran.github.io/
echo     ^(Note: AE-ALEmran.github.io currently redirects to your "testloom" repo^)
echo.
set "REPO=portfolio"
set /p "REPO=Enter repository name [default: portfolio]: "
if "!REPO!"=="" set "REPO=portfolio"

:: 5. Commit local changes
echo.
echo [4/5] Preparing Git commit on branch 'main'...
git status >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    git init
)
git branch -M main
git add -A
git diff --cached --quiet
if %ERRORLEVEL% NEQ 0 (
    git commit -m "Deploy Md. Al Emran portfolio with GitHub Pages workflow"
) else (
    echo No new file changes to commit.
)

:: 6. Create repository or push to existing
echo.
echo [5/5] Publishing to https://github.com/AE-ALEmran/!REPO! ...
gh repo view "AE-ALEmran/!REPO!" >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Creating public repository AE-ALEmran/!REPO! and pushing...
    gh repo create "AE-ALEmran/!REPO!" --public --description "Professional Portfolio of Md. Al Emran | Electrical Engineer, Researcher & DWDM Network Engineer" --source=. --remote=origin --push
    if !ERRORLEVEL! NEQ 0 (
        echo [ERROR] Failed to create or push repository.
        pause
        exit /b 1
    )
) else (
    git remote set-url origin "https://github.com/AE-ALEmran/!REPO!.git" 2>nul || git remote add origin "https://github.com/AE-ALEmran/!REPO!.git"
    git push -u origin main
    if !ERRORLEVEL! NEQ 0 (
        echo [ERROR] Failed to push to AE-ALEmran/!REPO!.
        pause
        exit /b 1
    )
)

:: 7. Enable GitHub Pages (GitHub Actions workflow mode)
echo Enabling GitHub Pages ^(GitHub Actions source^)...
gh api -X POST "repos/AE-ALEmran/!REPO!/pages" -f build_type=workflow >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    gh api -X PUT "repos/AE-ALEmran/!REPO!/pages" -f build_type=workflow >nul 2>&1
)

echo.
echo ==============================================================
echo   SUCCESS! Your code is on GitHub and building via Actions.
echo.
echo   Repository : https://github.com/AE-ALEmran/!REPO!
echo   Build Logs : https://github.com/AE-ALEmran/!REPO!/actions
if /I "!REPO!"=="AE-ALEmran.github.io" (
    echo   Live Site  : https://ae-alemran.github.io/
) else (
    echo   Live Site  : https://ae-alemran.github.io/!REPO!/
)
echo ==============================================================
echo.
pause
