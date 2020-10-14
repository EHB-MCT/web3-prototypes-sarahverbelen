let gatherData = document.getElementById('gatherData');
gatherData.onclick = function(element) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(
        tabs[0].id, true);
  });
};