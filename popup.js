import {getCurrentStorage, setCurrentStorage} from "./helpers/storage"


document.addEventListener('DOMContentLoaded', async () => {
    // Get color picker of popup.html
    let colorPicker = document.getElementById('fakePngDetector-colorPicker');
    function handleChangeColor(event) {
        if(event.target){
            setCurrentStorage(event.target.value)
            editImages(event.target.value)
        }
    }
    // Attached handleChangeColor to picker
    colorPicker.addEventListener("input", handleChangeColor, false);
    // Set default color to picker Element (default color is declared in background)
    const currentStorage = await getCurrentStorage()
    colorPicker.value = currentStorage.fakePngDetectorColor
});


const editImages = (inputColor) => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {code: `
            let imagesOfWebsite = document.getElementsByTagName("img");
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