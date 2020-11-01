chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({fakePngDetectorColor: '#63C6FF'}, function() {
      console.log("Set color to #63C6FF");
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {schemes: [ "http", "https"]},
                })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
      });
});
