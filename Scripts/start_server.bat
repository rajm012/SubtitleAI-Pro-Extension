@echo off
echo 🎬 SubtitleAI Pro Server
echo =======================
echo.

REM Check if virtual environment exists
if not exist "Sub\Scripts\activate.bat" (
    echo ❌ Virtual environment not found
    echo Please run setup.bat first
    pause
    exit /b 1
)

echo 🔧 Activating virtual environment...
call Sub\Scripts\activate.bat

echo 🚀 Starting SubtitleAI Pro Server...
echo.
echo 📡 Server will be available at: http://localhost:5000
echo 🎬 Make sure your Chrome extension is installed
echo.
echo Press Ctrl+C to stop the server
echo ================================
echo.

python server.py

pause
