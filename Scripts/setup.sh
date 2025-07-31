#!/bin/bash
# SubtitleAI Pro - Setup Script for Linux/Mac
echo "🎬 SubtitleAI Pro - Setup Script"
echo "================================"
echo

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed"
    echo "Please install Python 3.8+ from https://python.org"
    exit 1
fi

echo "✅ Python detected"
python3 --version

echo
echo "📦 Setting up virtual environment..."
python3 -m venv Sub
if [ $? -ne 0 ]; then
    echo "❌ Failed to create virtual environment"
    exit 1
fi

echo "✅ Virtual environment created"

echo
echo "🔧 Activating virtual environment..."
source Sub/bin/activate

echo
echo "📥 Installing Python dependencies..."
pip install -r requirements.txt
if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    echo "Please check your internet connection and try again"
    exit 1
fi

echo
echo "✅ All dependencies installed successfully!"
echo
echo "🚀 Setup complete! To start the server:"
echo "   1. Run: source Sub/bin/activate"
echo "   2. Run: python server.py"
echo "   3. Install the Chrome extension from the Extension folder"
echo
echo "📖 See README.md for detailed instructions"
