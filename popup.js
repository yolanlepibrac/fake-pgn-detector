// Popup control the menu opened when click on extension icon

const initializedPopupColorPicker = async () => {
        document.addEventListener('DOMContentLoaded', async () => {
        let colorPicker = document.getElementById('fakePngDetector-colorPicker');
        function handleChangeColor(event) {
            if(event.target){
                setCurrentStorage(event.target.value)
                setCurrentColorToPng(event.target.value)
            }
        }
        colorPicker.addEventListener("input", handleChangeColor, false);
        const currentStorage = await getCurrentStorage()
        colorPicker.value = currentStorage.fakePngDetectorColor
    });
}


const setCurrentColorToPng = (inputColor) => {
    // imagesOfWebsite is declared here to allow multiple changes of color
    let imagesOfWebsite = []
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.executeScript({code: `getCurrentColorAndSetToPng()`});
    });
}

initializedPopupColorPicker()