
const getCurrentStorage = () => {
    return new Promise(function(resolve) {
        chrome.storage.sync.get(function(result) {
            resolve(result);
        });
    });
}

 const editImages = async () => {
    const imagesOfWebsite = document.getElementsByTagName("img")
    const storage  = await getCurrentStorage();
    for (imageHtml of imagesOfWebsite) { 
        const backgroundImage = window.getComputedStyle(imageHtml).background
        if(backgroundImage.includes("linear-gradient(45deg, rgb(239, 239, 239) 25%, rgba(239, 239, 239, 0) 25%, rgba(239, 239, 239, 0) 75%, rgb(239, 239, 239) 75%, rgb(239, 239, 239)) repeat scroll 0px 0px / 21px 21px padding-box border-box, rgb(255, 255, 255) linear-gradient(45deg, rgb(239, 239, 239) 25%, rgba(239, 239, 239, 0) 25%, rgba(239, 239, 239, 0) 75%, rgb(239, 239, 239) 75%, rgb(239, 239, 239))")){
            const color = storage.fakePngDetectorColor
            imageHtml.style.background = `linear-gradient(45deg,${color} 25%,rgba(239,239,239,0) 25%,rgba(239,239,239,0) 75%,${color} 75%,${color}) repeat scroll 0px 0px / 21px 21px padding-box border-box, rgb(255, 255, 255) linear-gradient(45deg,${color} 25%,white 25%,white 75%,${color} 75%,${color})`
            imageHtml.style.backgroundPosition = "0 0,10px 10px"
            imageHtml.style.backgroundSize = "21px 21px"
        }

    }
}

editImages()
document.addEventListener('DOMNodeInserted', editImages);

