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
    chrome.tabs.query({}, (tabs) => {
        tabs.map((_tab, index) => {
            chrome.tabs.executeScript(tabs[index].id, {code: `getCurrentColorAndSetToPng()`});
        })
    });
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('active').addEventListener('change', (event) => {
        console.log(event.target.value)
        setCurrentStorage("red")
        setCurrentColorToPng("red")

      })
});


initializedPopupColorPicker()