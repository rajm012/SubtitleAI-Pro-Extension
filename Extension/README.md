# 🎬 SubtitleAI-Pro-Extension - Chrome Extension

A beautiful Chrome extension that generates English subtitles for any YouTube video using AI-powered transcription with OpenAI's Whisper model.

## ✨ Features

- 🎯 **One-Click Generation**: Generate subtitles directly from any YouTube video page
- 🌐 **Universal Translation**: Converts any language to English subtitles
- 🎨 **Beautiful UI**: Modern, gradient-based design with smooth animations
- ⚡ **Multiple Quality Options**: Choose from Tiny, Base, Small, Medium, or Large models
- 📥 **Easy Download**: Download subtitles as standard SRT files
- 🔄 **Auto-Detection**: Automatically detects YouTube videos and shows video info
- 🚀 **Floating Button**: Quick access button appears on YouTube video pages
- 📊 **Real-time Status**: Live progress updates during subtitle generation

## 🚀 Installation & Setup

**⚠️ IMPORTANT**: You must run the Python backend server before using this extension!

### 1. First, Set Up the Backend Server

Before installing the extension, you need to set up and run the Python server:

1. Navigate to the main project directory (one level up from this Extension folder)
2. Run the setup script:
   - **Windows**: Double-click `setup.bat`
   - **Linux/Mac**: Run `./setup.sh`
3. Start the server:
   - **Windows**: Double-click `start_server.bat`
   - **Linux/Mac**: Run `source Sub/bin/activate && python server.py`

The server should be running at `http://localhost:5000`

### 2. Install the Chrome Extension

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `chrome-extension` folder from this project
5. The extension icon should appear in your Chrome toolbar

### 2. Start the Backend Server

1. Make sure you're in the project directory and virtual environment is activated:
   ```powershell
   cd "E:\9. Run In VS\SubtitleAI-Pro-Extension"
   .\Sub\Scripts\Activate.ps1
   ```

2. Start the Flask server:
   ```powershell
   python server.py
   ```

3. You should see:
   ```
   🚀 Starting YouTube Subtitle Generator Server...
   📡 Server will run on http://localhost:5000
   🎬 Ready to generate subtitles!
   ```

### 3. Add Extension Icons (Optional)

Add PNG icon files to the `icons/` folder:
- `icon16.png` (16x16 pixels)
- `icon32.png` (32x32 pixels)
- `icon48.png` (48x48 pixels)
- `icon128.png` (128x128 pixels)

## 📖 How to Use

1. **Start the server**: Run `python server.py` in your terminal
2. **Navigate to YouTube**: Go to any YouTube video
3. **Click the extension**: Click the extension icon in your Chrome toolbar
4. **Generate subtitles**: Click the "✨ Generate Subtitles" button
5. **Download**: Once complete, click "Download SRT File"

## 🔧 Configuration

- **Model Quality**: Choose from different AI models:
  - `Tiny`: Fastest, lower quality
  - `Base`: Balanced speed and quality (recommended)
  - `Small`: Better quality, slower
  - `Medium`: Best quality, slowest

## 🎯 Extension Features

### Popup Interface
- Clean, modern design with gradient background
- Real-time video detection and title display
- Progress indicators during generation
- Settings for model quality
- Direct download functionality

### Content Script
- Floating action button on YouTube pages
- Automatic video detection
- Right-click context menu integration

### Background Service
- Handles extension lifecycle
- Manages communication between components

## 🛠️ Technical Details

### Architecture
- **Frontend**: Chrome Extension (Manifest V3)
- **Backend**: Flask server with your existing Python code
- **AI Model**: Whisper (faster-whisper implementation)
- **Communication**: REST API calls to localhost:5000

### File Structure
```
chrome-extension/
├── manifest.json          # Extension configuration
├── popup.html             # Main UI
├── popup.js              # UI logic
├── content.js            # YouTube page integration
├── background.js         # Service worker
├── styles.css            # Content script styles
└── icons/                # Extension icons
```

## 🐛 Troubleshooting

### "Server not running" error
- Make sure you've started the Flask server with `python server.py`
- Check that the server is running on `http://localhost:5000`

### Extension not detecting video
- Make sure you're on a YouTube video page (`youtube.com/watch?v=...`)
- Try refreshing the page
- Check that the extension is properly loaded in `chrome://extensions/`

### Subtitle generation fails
- Check the terminal where the server is running for error messages
- Ensure your virtual environment has all required packages
- Try using a different model quality setting

## 🔄 Updates

To update the extension after making changes:
1. Go to `chrome://extensions/`
2. Click the refresh icon on your extension
3. Restart the backend server if you made server changes

## 🎉 Enjoy!

Your beautiful Chrome extension is now ready to generate subtitles for any YouTube video! The combination of the sleek UI and powerful AI transcription makes it easy to get high-quality English subtitles for content in any language.
