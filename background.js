chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({fakePngDetectorColor: '#63C6FF'}, function() {
      console.log("The color is green.");
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
