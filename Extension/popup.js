// popup.js
document.addEventListener('DOMContentLoaded', async () => {
    const generateBtn = document.getElementById('generateBtn');
    const status = document.getElementById('status');
    const downloadArea = document.getElementById('downloadArea');
    const downloadBtn = document.getElementById('downloadBtn');
    const videoTitle = document.getElementById('videoTitle');
    const videoUrl = document.getElementById('videoUrl');
    const modelSize = document.getElementById('modelSize');
    
    let currentVideoUrl = '';
    let subtitleData = null;
    
    // Get current tab info
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        if (tab.url && (tab.url.includes('youtube.com/watch') || tab.url.includes('youtu.be/'))) {
            currentVideoUrl = tab.url;
            videoUrl.textContent = currentVideoUrl;
            
            // Get video title from the tab
            chrome.tabs.sendMessage(tab.id, { action: 'getVideoInfo' }, (response) => {
                if (response && response.title) {
                    videoTitle.textContent = response.title;
                } else {
                    videoTitle.textContent = 'YouTube Video Detected';
                }
            });
        } else {
            videoTitle.textContent = 'Please navigate to a YouTube video';
            generateBtn.disabled = true;
        }
    } catch (error) {
        console.error('Error getting tab info:', error);
        videoTitle.textContent = 'Error detecting video';
        generateBtn.disabled = true;
    }
    
    generateBtn.addEventListener('click', async () => {
        if (!currentVideoUrl) {
            showStatus('Please navigate to a YouTube video first', 'error');
            return;
        }
        
        generateBtn.disabled = true;
        generateBtn.innerHTML = '<span class="loading-spinner"></span>Generating...';
        downloadArea.classList.add('hidden');
        
        try {
            showStatus('Starting subtitle generation...', 'loading');
            
            const response = await fetch('http://localhost:5000/generate-subtitles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    url: currentVideoUrl,
                    model_size: modelSize.value
                })
            });
            
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
            
            const result = await response.json();
            
            if (result.success) {
                subtitleData = result.srt_content;
                showStatus('✅ Subtitles generated successfully!', 'success');
                downloadArea.classList.remove('hidden');
                
                // Create download link
                const blob = new Blob([subtitleData], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                downloadBtn.href = url;
                downloadBtn.download = `${result.video_title || 'youtube_video'}_subtitles.srt`;
            } else {
                throw new Error(result.error || 'Unknown error occurred');
            }
            
        } catch (error) {
            console.error('Error:', error);
            if (error.message.includes('Failed to fetch')) {
                showStatus('❌ Server not running. Please start the backend server.', 'error');
            } else {
                showStatus(`❌ Error: ${error.message}`, 'error');
            }
        } finally {
            generateBtn.disabled = false;
            generateBtn.innerHTML = '✨ Generate Subtitles';
        }
    });
    
    function showStatus(message, type) {
        status.textContent = message;
        status.className = `status ${type}`;
        status.classList.remove('hidden');
        
        if (type === 'success') {
            setTimeout(() => {
                status.classList.add('hidden');
            }, 3000);
        }
    }
    
    // Load saved settings
    chrome.storage.sync.get(['modelSize'], (result) => {
        if (result.modelSize) {
            modelSize.value = result.modelSize;
        }
    });
    
    // Save settings when changed
    modelSize.addEventListener('change', () => {
        chrome.storage.sync.set({ modelSize: modelSize.value });
    });
});
