# 🎬 SubtitleAI-Pro-Extension - Complete Documentation

## 📋 Project Overview

SubtitleAI-Pro-Extension is a comprehensive YouTube subtitle generation system that combines:
- **Python Backend**: Flask server with Whisper AI for transcription
- **Chrome Extension**: Browser integration for seamless YouTube experience
- **Auto-Capture**: Automatically detects and processes YouTube videos
- **AI Transcription**: Uses OpenAI's Whisper model for accurate speech-to-text

## 🔧 System Requirements

### Minimum Requirements
- **OS**: Windows 10/11, macOS 10.15+, or Linux Ubuntu 18.04+
- **RAM**: 4GB (8GB recommended for larger models)
- **Storage**: 2GB free space (for models and temporary files)
- **Python**: 3.8 or higher
- **Browser**: Chrome 88+ or Chromium-based browsers

### Recommended Specifications
- **RAM**: 8GB+ for optimal performance
- **CPU**: Multi-core processor (4+ cores recommended)
- **Storage**: SSD for faster model loading
- **Network**: Stable internet connection for model downloads

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│  Chrome Ext     │────│   Flask Server   │────│  Whisper AI     │
│  (Frontend)     │    │   (Backend)      │    │  (AI Model)     │
│                 │    │                  │    │                 │
│ • popup.js      │    │ • server.py      │    │ • faster-whisper│
│ • content.js    │    │ • gen.py         │    │ • Model files   │
│ • background.js │    │ • Audio download │    │ • Transcription │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────────┐
                    │   YouTube Videos    │
                    │   (Audio Source)    │
                    └─────────────────────┘
```

## 🚀 Quick Start Guide

### Method 1: Automated Setup (Recommended)

1. **Download/Clone the project**
2. **Run setup script**:
   - Windows: Double-click `setup.bat`
   - Linux/Mac: `chmod +x setup.sh && ./setup.sh`
3. **Start server**:
   - Windows: Double-click `start_server.bat`
   - Linux/Mac: `source Sub/bin/activate && python server.py`
4. **Install extension**:
   - Chrome → Extensions → Load unpacked → Select `Extension` folder
5. **Generate subtitles**:
   - Go to any YouTube video → Click extension icon → Generate!

### Method 2: Manual Setup

```bash
# 1. Create virtual environment
python -m venv Sub
cd Sub
Scripts\activate  # Windows
# source bin/activate  # Linux/Mac

# 2. Install dependencies
pip install -r requirements.txt

# 3. Start server
python server.py

# 4. Install Chrome extension manually
```

## 📁 File Structure Explained

```
SubtitleAI-Pro-Extension/
├── 🐍 Backend (Python)
│   ├── server.py           # Flask API server
│   ├── gen.py              # Core transcription logic
│   ├── requirements.txt    # Python dependencies
│   └── downloads/          # Temporary audio files
│
├── 🌐 Extension (Chrome)
│   ├── manifest.json       # Extension metadata
│   ├── popup.html/js       # Main interface
│   ├── content.js          # YouTube page integration
│   ├── background.js       # Service worker
│   ├── styles.css          # UI styling
│   └── icons/              # Extension icons
│
├── 🛠️ Setup Scripts
│   ├── setup.bat/sh        # Automated setup
│   ├── start_server.bat    # Server launcher
│   └── README.md           # Documentation
│
├── 📸 Preview/             # Screenshots
└── 🐍 Sub/                 # Python virtual env
```

## 🎛️ Configuration Options

### Server Configuration (`server.py`)

```python
# Server settings
HOST = 'localhost'      # Server host
PORT = 5000            # Server port
DEBUG = False          # Debug mode

# CORS settings
CORS(app)              # Allow all origins
```

### Model Configuration (`gen.py`)

```python
# Whisper model options
MODEL_SIZES = [
    'tiny',    # ~39 MB,   fastest
    'base',    # ~74 MB,   balanced (default)
    'small',   # ~244 MB,  better quality
    'medium',  # ~769 MB,  high quality
    'large',   # ~1550 MB, best quality
]

# Transcription settings
BEAM_SIZE = 5          # Search beam size
TASK = "translate"     # Force English output
DEVICE = "cpu"         # Use CPU (GPU support available)
COMPUTE_TYPE = "int8"  # Optimize for speed
```

### Extension Configuration (`popup.js`)

```javascript
// Server connection
const SERVER_URL = 'http://localhost:5000';

// UI settings
const AUTO_REFRESH = true;    // Auto-refresh video info
const SHOW_PROGRESS = true;   // Show progress indicators
```

## 🎯 Usage Workflows

### Basic Workflow
1. User opens YouTube video
2. Extension detects video and shows popup
3. User selects model size and clicks generate
4. Extension sends request to backend server
5. Server downloads audio using pytubefix
6. Whisper transcribes audio to text
7. Server returns SRT formatted subtitles
8. User downloads subtitle file

### Advanced Workflow
1. Content script injects floating button
2. Background script manages extension state
3. Popup provides real-time status updates
4. Server handles concurrent requests
5. Automatic cleanup of temporary files

## 🔧 Troubleshooting Guide

### Common Issues & Solutions

**🚫 "Server not responding"**
- ✅ Check if server is running: `http://localhost:5000/health`
- ✅ Restart server: `python server.py`
- ✅ Check firewall settings
- ✅ Try different port in server.py

**🚫 "Failed to download audio"**
- ✅ Check internet connection
- ✅ Verify YouTube URL is valid
- ✅ Some videos may be restricted/private
- ✅ Try different video

**🚫 "Extension not working"**
- ✅ Refresh YouTube page
- ✅ Reload extension in Chrome
- ✅ Check developer console for errors
- ✅ Verify extension permissions

**🚫 "Slow processing"**
- ✅ Use smaller model (tiny/base)
- ✅ Close other applications
- ✅ Check available RAM
- ✅ Use SSD storage if available

**🚫 "Python/pip not found"**
- ✅ Install Python 3.8+ from python.org
- ✅ Add Python to system PATH
- ✅ Restart command prompt/terminal

### Debug Mode

Enable debug mode for troubleshooting:

```python
# In server.py
app.run(host='localhost', port=5000, debug=True)
```

Check browser console:
1. Right-click on extension popup
2. Select "Inspect"
3. Check Console tab for errors

## 🚀 Performance Optimization

### Server Performance
- Use SSD storage for model files
- Increase RAM for larger models
- Consider GPU acceleration for CUDA-capable systems
- Use nginx reverse proxy for production

### Extension Performance
- Minimize DOM queries in content script
- Use efficient event listeners
- Cache video information
- Optimize popup loading time

### Model Selection Guide
- **Development/Testing**: tiny model
- **General Use**: base model (recommended)
- **High Accuracy Needed**: small/medium models
- **Professional Use**: large model

## 🔒 Security Considerations

### Data Privacy
- Audio files are processed locally
- Temporary files are automatically deleted
- No data sent to external services (except YouTube)
- Extension only runs on YouTube domains

### Permissions
- Extension requests minimal permissions
- Host permissions limited to YouTube and localhost
- No access to other websites or personal data

## 📦 Deployment Options

### Local Development
- Current setup (localhost server)
- Suitable for personal use
- Easy to modify and debug

### Cloud Deployment
- Deploy server to cloud platform (AWS, Google Cloud, etc.)
- Update extension to use cloud URL
- Consider API rate limiting and authentication

### Docker Deployment
```dockerfile
FROM python:3.9-slim
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "server.py"]
```

## 🔮 Future Enhancements

### Planned Features
- [ ] Multiple output languages
- [ ] Batch processing for playlists
- [ ] Subtitle editing interface
- [ ] Auto-sync timing adjustment
- [ ] Cloud storage integration
- [ ] Firefox extension support
- [ ] Mobile app version

### Advanced Features
- [ ] Speaker identification
- [ ] Emotion detection
- [ ] Automatic punctuation
- [ ] Custom model training
- [ ] Real-time transcription
- [ ] Video chapter detection

## 📞 Support & Contributing

### Getting Help
1. Check this documentation
2. Review troubleshooting section
3. Search GitHub issues
4. Create new issue with details

### Contributing
1. Fork the repository
2. Create feature branch
3. Make changes and test
4. Submit pull request
5. Follow code style guidelines

### Code Style
- Python: Follow PEP 8
- JavaScript: Use ES6+ features
- HTML/CSS: Follow modern standards
- Comments: Document complex logic

---

**🎬 Happy Subtitling with SubtitleAI-Pro-Extension!**
