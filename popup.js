// Popup control the menu opened when click on extension icon

const handleChangeColor = (event) => {
    if(event.target){
        setColorToStorage(event.target.value)
        relaunchContentScript()
    }
}

const handleChangeCheckbox = (event) => {
    setActiveToStorage(event.target.checked)
    if(event.target.checked){
        relaunchContentScript()
    }else {
        refreshTab()
    }
}

const refreshTab = () => {
    chrome.tabs.getSelected(null, (tab) => {
        var code = 'window.location.reload();';
        chrome.tabs.executeScript(tab.id, {code: code});
    })
}
const initializedPopup = async () => {
    
    document.addEventListener('DOMContentLoaded', async () => {
        const currentStorage = await getCurrentStorage()
        const colorPicker = document.getElementById('fakePngDetector-colorPicker');
        const checkboxActive = document.getElementById('fakePngDetector-activeEverywhere')
        
        colorPicker.addEventListener("input", handleChangeColor, false);
        colorPicker.value = currentStorage.fakePngDetectorColor

        checkboxActive.checked = currentStorage.fakePngDetectorActiveEverywhere
        checkboxActive.addEventListener('change', handleChangeCheckbox, false)
    });
}


const relaunchContentScript = () => {
    chrome.tabs.query({}, (tabs) => {
        tabs.map((_tab, index) => {
            chrome.tabs.executeScript(tabs[index].id, {code: `getCurrentColorAndSetToPng()`});
        })
    });
}

initializedPopup()