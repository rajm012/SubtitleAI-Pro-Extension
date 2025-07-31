// background.js - Service worker for the extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'openPopup') {
        // Note: chrome.action.openPopup() requires user interaction
        // This is handled by the content script button click
        console.log('Open popup requested');
    }
});

// Add context menu item with proper error handling
chrome.runtime.onInstalled.addListener(() => {
    try {
        chrome.contextMenus.create({
            id: 'generateSubtitles',
            title: '🎬 Generate AI Subtitles',
            contexts: ['page'],
            documentUrlPatterns: [
                'https://*.youtube.com/watch*',
                'https://*.youtu.be/*'
            ]
        });
        console.log('Context menu created successfully');
    } catch (error) {
        console.log('Context menu creation failed:', error);
    }
});

// Handle context menu clicks with error checking
if (chrome.contextMenus && chrome.contextMenus.onClicked) {
    chrome.contextMenus.onClicked.addListener((info, tab) => {
        if (info.menuItemId === 'generateSubtitles') {
            // Send message to content script to show popup trigger
            chrome.tabs.sendMessage(tab.id, { action: 'showPopupHint' });
        }
    });
}
