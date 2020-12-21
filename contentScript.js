// ContentScript run in a page context (defined in manifest)
// google background : "linear-gradient(45deg, rgb(239, 239, 239) 25%, rgba(239, 239, 239, 0) 25%, rgba(239, 239, 239, 0) 75%, rgb(239, 239, 239) 75%, rgb(239, 239, 239)) repeat scroll 0px 0px / 21px 21px padding-box border-box, rgb(255, 255, 255) linear-gradient(45deg, rgb(239, 239, 239) 25%, rgba(239, 239, 239, 0) 25%, rgba(239, 239, 239, 0) 75%, rgb(239, 239, 239) 75%, rgb(239, 239, 239))"

const hasGoogleGradientColor = (backgroundImage) => {
    const backgroundImageTrim = backgroundImage.replace(/\s/g, '');
    if(backgroundImageTrim.includes("21px21px")){
        return true
    }
    return false
}

const editImages = (color, activeEverywhere) => {
    const imagesOfWebsite = document.getElementsByTagName("img")
    for (imageHtml of imagesOfWebsite) { 
        const backgroundImage = window.getComputedStyle(imageHtml).background
        if(hasGoogleGradientColor(backgroundImage) || activeEverywhere){
            setBackgroundGradientToImage(imageHtml, color)
        }
    }
}

const setBackgroundGradientToImage = (imageHtml, color) => {
    imageHtml.style.background = `linear-gradient(45deg,${color} 25%,rgba(239,239,239,0) 25%,rgba(239,239,239,0) 75%,${color} 75%,${color}) repeat scroll 0px 0px / 21px 21px padding-box border-box, rgb(255, 255, 255) linear-gradient(45deg,${color} 25%,white 25%,white 75%,${color} 75%,${color})`
    imageHtml.style.backgroundPosition = "0 0,10px 10px"
    imageHtml.style.backgroundSize = "21px 21px"
}

const getCurrentColorAndSetToPng = async () => {
    const storage  = await getCurrentStorage();
    const color = storage.fakePngDetectorColor
    const activeEverywhere = storage.fakePngDetectorActiveEverywhere
    editImages(color, activeEverywhere)
}

getCurrentColorAndSetToPng()
document.addEventListener('DOMNodeInserted', getCurrentColorAndSetToPng);

