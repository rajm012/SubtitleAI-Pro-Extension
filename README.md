# 🎬 SubtitleAI-Pro-Extension - YouTube Subtitle Generator

An AI-powered YouTube subtitle generator that uses OpenAI's Whisper model to automatically transcribe videos in any language to English subtitles. This project consists of a Python Flask backend server and a Chrome extension that seamlessly integrates with YouTube to generate high-quality subtitles.

## ✨ Features

- **🤖 AI-Powered Transcription**: Uses OpenAI's Whisper model for accurate speech-to-text conversion
- **🌍 Multi-Language Support**: Transcribes videos in any language and translates to English
- **⚡ Real-Time Processing**: Fast subtitle generation with multiple model size options
- **🎯 Browser Integration**: Chrome extension automatically detects YouTube videos
- **📁 Easy Export**: Download subtitles in standard SRT format
- **🚀 One-Click Operation**: Generate subtitles with a single button click
- **🎨 Modern UI**: Clean, intuitive interface with real-time status updates

## 🏗️ Project Structure

```
SubtitleAI-Pro-Extension/
├── 📁 Extension/                # Chrome Extension
│   ├── manifest.json           # Extension configuration
│   ├── popup.html             # Extension popup interface
│   ├── popup.js               # Extension popup logic
│   ├── content.js             # YouTube page integration
│   ├── background.js          # Background service worker
│   ├── styles.css             # Extension styling
│   └── 📁 icons/              # Extension icons
├── 📁 downloads/              # Temporary audio files
├── 📁 Preview/                # Screenshots of the application
├── gen.py                     # Core subtitle generation logic
├── server.py                  # Flask backend server
├── requirements.txt           # Python dependencies
└── README.md                  # This file
```

## 🛠️ Technology Stack

### Backend
- **Python 3.8+**: Core programming language
- **Flask**: Web framework for API server
- **Flask-CORS**: Cross-origin resource sharing
- **faster-whisper**: Optimized Whisper implementation
- **pytubefix**: YouTube video downloading
- **OpenAI Whisper**: AI transcription model

### Frontend
- **Chrome Extension API**: Browser integration
- **JavaScript ES6+**: Extension logic
- **HTML5/CSS3**: User interface
- **Chrome Manifest V3**: Modern extension framework

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.8 or higher**
- **pip** (Python package installer)
- **Google Chrome** browser
- **Internet connection** (for downloading Whisper models)

## 🚀 Quick Start

### Step 1: Clone the Repository

```bash
git clone SubtitleAI-Pro-Extension
cd SubtitleAI-Pro-Extension
```

### Step 2: Set Up Python Environment

```bash
# Create virtual environment (recommended)
python -m venv Sub
cd Sub
Scripts\activate  # On Windows

# Install dependencies
pip install -r requirements.txt
```

### Step 3: Start the Backend Server

```bash
python server.py
```

You should see:
```
🚀 Starting YouTube Subtitle Generator Server...
📡 Server will run on http://localhost:5000
🎬 Ready to generate subtitles!
--------------------------------------------------
 * Running on http://localhost:5000
```

### Step 4: Install Chrome Extension

1. Open Google Chrome
2. Navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top-right corner)
4. Click "Load unpacked"
5. Select the `Extension` folder from this project
6. The extension icon should appear in your Chrome toolbar

### Step 5: Generate Subtitles

1. Navigate to any YouTube video
2. Click the SubtitleAI-Pro-Extension icon
3. Select your preferred model size:
   - **Tiny**: Fastest, lower accuracy
   - **Base**: Good balance (recommended)
   - **Small**: Better accuracy
   - **Medium**: High accuracy
   - **Large**: Best accuracy, slower
4. Click "Generate Subtitles"
5. Wait for processing to complete
6. Download the generated SRT file

## 🎛️ Model Sizes & Performance

| Model | Size | Speed | Accuracy | Use Case |
|-------|------|-------|----------|----------|
| Tiny | ~39 MB | ⚡⚡⚡⚡⚡ | ⭐⭐⭐ | Quick previews |
| Base | ~74 MB | ⚡⚡⚡⚡ | ⭐⭐⭐⭐ | Recommended |
| Small | ~244 MB | ⚡⚡⚡ | ⭐⭐⭐⭐ | Better quality |
| Medium | ~769 MB | ⚡⚡ | ⭐⭐⭐⭐⭐ | High accuracy |
| Large | ~1550 MB | ⚡ | ⭐⭐⭐⭐⭐ | Best quality |

## 🔧 Configuration

### Server Configuration

The server runs on `http://localhost:5000` by default. To change this, modify `server.py`:

```python
app.run(host='localhost', port=5000, debug=False)
```

### Extension Configuration

The extension is configured to connect to `localhost:5000`. To change the server URL, modify the `serverUrl` in `Extension/popup.js`:

```javascript
const serverUrl = 'http://localhost:5000';
```

## 📖 API Documentation

### Generate Subtitles Endpoint

**POST** `/generate-subtitles`

**Request Body:**
```json
{
  "url": "https://www.youtube.com/watch?v=VIDEO_ID",
  "model_size": "base"
}
```

**Response:**
```json
{
  "success": true,
  "srt_content": "1\n00:00:00,000 --> 00:00:05,000\nHello, welcome to this video...\n\n",
  "video_title": "Sample Video Title",
  "subtitle_count": 42
}
```

### Health Check Endpoint

**GET** `/health`

**Response:**
```json
{
  "status": "healthy",
  "message": "Subtitle generator server is running"
}
```

## 🐛 Troubleshooting

### Common Issues

1. **"Server not responding" error**
   - Ensure the Python server is running on port 5000
   - Check if another application is using port 5000
   - Verify firewall settings

2. **"Failed to download audio" error**
   - Check internet connection
   - Verify the YouTube URL is valid and accessible
   - Some videos may be restricted or private

3. **Slow processing**
   - Use a smaller model size (tiny/base)
   - Ensure adequate RAM (4GB+ recommended)
   - Close unnecessary applications

4. **Extension not working**
   - Refresh the YouTube page
   - Reload the extension in Chrome
   - Check browser console for errors

### Performance Tips

- **Use SSD storage** for faster model loading
- **Close unnecessary tabs** to free up memory
- **Use base model** for best speed/accuracy balance
- **Ensure stable internet** for smooth downloads

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI** for the Whisper model
- **pytube developers** for YouTube download capabilities
- **Flask team** for the excellent web framework
- **Chrome Extension community** for documentation and examples

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Search existing [GitHub Issues](https://github.com/SubtitleAI-Pro-Extension/issues)
3. Create a new issue with detailed information
4. Include error messages and system information

## 🚀 Roadmap

### Upcoming Features
- [ ] Multiple language output support
- [ ] Batch processing for multiple videos
- [ ] Subtitle editing interface
- [ ] Auto-sync with video timing
- [ ] Cloud deployment option
- [ ] Firefox extension support

---

**Made with ❤️ by RajM012**

*Transform any YouTube video into accessible content with AI-powered subtitles!*
