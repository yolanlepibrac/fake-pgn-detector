
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

document.addEventListener('DOMContentLoaded', async () => {
    let colorPicker = document.getElementById('colorPicker');
    function watchColorPicker(event) {
        if(event.target){
            setCurrentStorage(event.target.value)
            editImages(event.target.value)
        }
    }
    colorPicker.addEventListener("input", watchColorPicker, false);
    const defaultColor = await getCurrentStorage()
    colorPicker.value = defaultColor.fakePngDetectorColor
});


const editImages = (inputColor) => {
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