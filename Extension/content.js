// content.js - Runs on YouTube pages
console.log('YouTube Subtitle Generator extension loaded');

// Listen for messages from popup and background
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getVideoInfo') {
        const title = document.querySelector('h1.ytd-video-primary-info-renderer') || 
                     document.querySelector('h1.title') ||
                     document.querySelector('[data-sessionlink="itct="]');
        
        sendResponse({
            title: title ? title.textContent.trim() : 'YouTube Video',
            url: window.location.href
        });
    } else if (request.action === 'showPopupHint') {
        showPopupHint();
    }
});

// Add a floating button to the page for quick access
function addFloatingButton() {
    // Remove existing button if any
    const existing = document.getElementById('subtitle-generator-btn');
    if (existing) {
        existing.remove();
    }
    
    const button = document.createElement('button');
    button.id = 'subtitle-generator-btn';
    button.innerHTML = '🎬 SubtitleAI Pro';
    button.className = 'subtitle-generator-floating-btn';
    button.title = 'Generate AI subtitles for this video';
    
    button.addEventListener('click', () => {
        // This will trigger the extension popup to open
        button.style.animation = 'pulse 0.3s ease-in-out';
        setTimeout(() => {
            button.style.animation = '';
        }, 300);
    });
    
    document.body.appendChild(button);
}

// Show a hint when context menu is used
function showPopupHint() {
    const hint = document.createElement('div');
    hint.className = 'subtitle-ai-hint';
    hint.innerHTML = '🎬 Click the SubtitleAI Pro extension icon to generate subtitles!';
    document.body.appendChild(hint);
    
    setTimeout(() => {
        hint.remove();
    }, 4000);
}

// Add button when page loads or when navigating to a new video
const observer = new MutationObserver(() => {
    if (window.location.href.includes('youtube.com/watch')) {
        setTimeout(addFloatingButton, 2000); // Wait for page to load
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Initial load
if (window.location.href.includes('youtube.com/watch')) {
    setTimeout(addFloatingButton, 2000);
}
