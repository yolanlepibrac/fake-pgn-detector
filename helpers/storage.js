const setCurrentStorage = (color) => {
    return new Promise((resolve) => {
        chrome.storage.local.set({fakePngDetectorColor:color}, (result) =>{
            resolve(result);
        });
    });
}

const getCurrentStorage = () => {
    return new Promise(function(resolve) {
        chrome.storage.local.get(function(result) {
            resolve(result);
        });
    });
}
