// Popup control the menu opened when click on extension icon

const initializedPopupColorPicker = async () => {
        document.addEventListener('DOMContentLoaded', async () => {
        let colorPicker = document.getElementById('fakePngDetector-colorPicker');
        function handleChangeColor(event) {
            if(event.target){
                setColorToStorage(event.target.value)
                setCurrentColorToPng(event.target.value)
            }
        }
        colorPicker.addEventListener("input", handleChangeColor, false);
        const currentStorage = await getCurrentStorage()
        colorPicker.value = currentStorage.fakePngDetectorColor
    });
}


const setCurrentColorToPng = (inputColor) => {
    chrome.tabs.query({}, (tabs) => {
        tabs.map((_tab, index) => {
            chrome.tabs.executeScript(tabs[index].id, {code: `getCurrentColorAndSetToPng()`});
        })
    });
}

document.addEventListener('DOMContentLoaded', async () =>  {
    const currentStorage = await getCurrentStorage()
    const checkboxActive = document.getElementById('active')
    checkboxActive.checked = currentStorage.fakePngDetectorActive
    checkboxActive.addEventListener('change', (event) => {
        if(event.target.value){
            setCurrentColorToPng(currentStorage.fakePngDetectorColor)
        }else {
            setCurrentColorToPng("#63C6FF")
        }
        setActiveToStorage(event.target.checked)
      })
});


initializedPopupColorPicker()