chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.executeScript(
    null,
    { file: 'jquery-3.2.1.slim.min.js' },
    function () {
      chrome.tabs.executeScript(
        tab.id,
        { file: 'ermahgerd.js' }
      )
    }
  )
});
