// contentScript.js
// Listen for messages from the extension
// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'get_page_content') {
      const content = document.documentElement.innerHTML;
      sendResponse({ content });
    }
  });
  
