const setCurrentStorage = (color) => {
    return new Promise((resolve) => {
        chrome.storage.sync.set({fakePngDetectorColor:color}, (result) =>{
            resolve(result);
        });
    });
}

const getCurrentStorage = () => {
    return new Promise(function(resolve) {
        chrome.storage.sync.get(function(result) {
            resolve(result);
        });
    });
}
