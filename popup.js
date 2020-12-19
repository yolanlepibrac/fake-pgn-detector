// Popup control the menu opened when click on extension icon

const initializedPopupColorPicker = () => {
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
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {code: `
            imagesOfWebsite = document.getElementsByTagName("img");
            for (imageHtml of imagesOfWebsite) { 
                const backgroundImage = window.getComputedStyle(imageHtml).background;
                if(backgroundImage.includes("linear-gradient(45deg") && backgroundImage.includes("21px 21px")){
                    imageHtml.style.background = "linear-gradient(45deg,${inputColor} 25%,rgba(239,239,239,0) 25%,rgba(239,239,239,0) 75%,${inputColor} 75%,${inputColor}) repeat scroll 0px 0px / 21px 21px padding-box border-box, rgb(255, 255, 255) linear-gradient(45deg,${inputColor} 25%,white 25%,white 75%,${inputColor} 75%,${inputColor})";
                    imageHtml.style.backgroundPosition = "0 0,10px 10px";
                    imageHtml.style.backgroundSize = "21px 21px";
                }
            }
            `}
        );
    });
}

initializedPopupColorPicker()