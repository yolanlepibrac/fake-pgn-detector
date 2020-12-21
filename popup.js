// Popup control the menu opened when click on extension icon

const initializedPopupColorPicker = async () => {
        document.addEventListener('DOMContentLoaded', async () => {
        let colorPicker = document.getElementById('fakePngDetector-colorPicker');
        function handleChangeColor(event) {
            if(event.target){
                setColorToStorage(event.target.value)
                setCurrentColorToPng()
            }
        }
        colorPicker.addEventListener("input", handleChangeColor, false);
        const currentStorage = await getCurrentStorage()
        colorPicker.value = currentStorage.fakePngDetectorColor
    });
}


const setCurrentColorToPng = () => {
    chrome.tabs.query({}, (tabs) => {
        tabs.map((_tab, index) => {
            chrome.tabs.executeScript(tabs[index].id, {code: `getCurrentColorAndSetToPng()`});
        })
    });
}

const setColorToPng = () => {
    chrome.tabs.query({}, (tabs) => {
        tabs.map((_tab, index) => {
            chrome.tabs.executeScript(tabs[index].id, {code: `setTransparentColorToPng()`});
        })
    });
}

document.addEventListener('DOMContentLoaded', async () =>  {
    const currentStorage = await getCurrentStorage()
    const checkboxActive = document.getElementById('active')
    checkboxActive.checked = currentStorage.fakePngDetectorActiveEverywhere
    checkboxActive.addEventListener('change', (event) => {
        if(event.target.checked){
            setCurrentColorToPng()
        }else {
            setColorToPng()
        }
        setActiveToStorage(event.target.checked)
      })
});


initializedPopupColorPicker()