const setColorToStorage = (color) => {
    return new Promise((resolve) => {
        chrome.storage.local.set({fakePngDetectorColor:color}, (result) =>{
            resolve(result);
        });
    });
}

const getCurrentStorage = () => {
    return new Promise((resolve) => {
        chrome.storage.local.get(function(result) {
            resolve(result);
        });
    });
}

const setActiveToStorage = (value) => {
    return new Promise((resolve) => {
        chrome.storage.local.set({fakePngDetectorActiveEverywhere:value}, (result) =>{
            resolve(result);
        });
    });
}

