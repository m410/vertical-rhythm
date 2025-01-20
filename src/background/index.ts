
chrome.action.onClicked.addListener(function (tab) {
  if (tab?.id) {
    chrome.tabs.sendMessage(tab.id, 'toggle')
  }
})
