@echo off
echo 🎬 SubtitleAI Pro - Setup Script
echo ================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed or not in PATH
    echo Please install Python 3.8+ from https://python.org
    pause
    exit /b 1
)

echo ✅ Python detected
python --version

echo.
echo 📦 Setting up virtual environment...
python -m venv Sub
if errorlevel 1 (
    echo ❌ Failed to create virtual environment
    pause
    exit /b 1
)

echo ✅ Virtual environment created

echo.
echo 🔧 Activating virtual environment...
call Sub\Scripts\activate.bat

echo.
echo 📥 Installing Python dependencies...
pip install -r requirements.txt
if errorlevel 1 (
    echo ❌ Failed to install dependencies
    echo Please check your internet connection and try again
    pause
    exit /b 1
)

echo.
echo ✅ All dependencies installed successfully!
echo.
echo 🚀 Setup complete! To start the server:
echo    1. Run: Sub\Scripts\activate.bat
echo    2. Run: python server.py
echo    3. Install the Chrome extension from the Extension folder
echo.
echo 📖 See README.md for detailed instructions
pause
