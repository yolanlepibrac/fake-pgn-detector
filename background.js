chrome.runtime.onInstalled.addListener(function() {
    // main js code running in background
    chrome.storage.local.set({fakePngDetectorColor: '#63C6FF'}, function() {
      console.log("Initialized color to #63C6FF");
    });
    chrome.storage.local.set({fakePngDetectorActiveEverywhere: false}, function() {
      console.log("Initialized active to true");
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
