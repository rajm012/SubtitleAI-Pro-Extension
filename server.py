from flask import Flask, request, jsonify
from flask_cors import CORS
import threading
import json
import os
import sys

# Import your existing functions
from gen import download_audio, transcribe_audio, write_srt, clean_youtube_url
from pytubefix import YouTube

app = Flask(__name__)
CORS(app)  # Enable CORS for all domains

@app.route('/generate-subtitles', methods=['POST'])
def generate_subtitles():
    try:
        data = request.get_json()
        youtube_url = data.get('url')
        model_size = data.get('model_size', 'base')
        
        if not youtube_url:
            return jsonify({'success': False, 'error': 'No URL provided'}), 400
        
        print(f"🎬 Processing: {youtube_url}")
        print(f"📊 Model size: {model_size}")
        
        # Get video title for better file naming
        try:
            yt = YouTube(clean_youtube_url(youtube_url))
            video_title = yt.title
            # Clean title for filename
            video_title = "".join(c for c in video_title if c.isalnum() or c in (' ', '-', '_')).rstrip()
        except Exception as e:
            video_title = "youtube_video"
            print(f"Warning: Could not get video title: {e}")
        
        # Download audio
        print("📥 Downloading audio...")
        audio_path = download_audio(youtube_url)
        print(f"✅ Audio downloaded: {audio_path}")
        
        # Generate subtitles
        print("🧠 Generating subtitles...")
        subtitles = transcribe_audio(audio_path, model_size)
        
        if not subtitles:
            return jsonify({'success': False, 'error': 'Failed to generate subtitles'}), 500
        
        # Generate SRT content
        srt_content = ""
        for i, sub in enumerate(subtitles, 1):
            start_time = seconds_to_srt_time(sub["start"])
            end_time = seconds_to_srt_time(sub["end"])
            srt_content += f"{i}\n{start_time} --> {end_time}\n{sub['text']}\n\n"
        
        # Clean up audio file
        try:
            os.remove(audio_path)
            print(f"🗑️ Cleaned up: {audio_path}")
        except Exception as e:
            print(f"Warning: Could not remove temp file: {e}")
        
        print("✅ Subtitles generated successfully!")
        
        return jsonify({
            'success': True,
            'srt_content': srt_content,
            'video_title': video_title,
            'subtitle_count': len(subtitles)
        })
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500

def seconds_to_srt_time(seconds):
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    secs = int(seconds % 60)
    milliseconds = int((seconds - int(seconds)) * 1000)
    return f"{hours:02}:{minutes:02}:{secs:02},{milliseconds:03}"

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'Subtitle generator server is running'})

if __name__ == '__main__':
    print("🚀 Starting YouTube Subtitle Generator Server...")
    print("📡 Server will run on http://localhost:5000")
    print("🎬 Ready to generate subtitles!")
    print("-" * 50)
    
    app.run(host='localhost', port=5000, debug=False)
