

const shadeColor = (color, percent) => {

    var R = parseInt(color.substring(1,3),16);
    var G = parseInt(color.substring(3,5),16);
    var B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}

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
    console.log(storage)
    for (imageHtml of imagesOfWebsite) { 
        const backgroundImage = window.getComputedStyle(imageHtml).background
        if(backgroundImage.includes("linear-gradient(45deg, rgb(239, 239, 239) 25%, rgba(239, 239, 239, 0) 25%, rgba(239, 239, 239, 0) 75%, rgb(239, 239, 239) 75%, rgb(239, 239, 239)) repeat scroll 0px 0px / 21px 21px padding-box border-box, rgb(255, 255, 255) linear-gradient(45deg, rgb(239, 239, 239) 25%, rgba(239, 239, 239, 0) 25%, rgba(239, 239, 239, 0) 75%, rgb(239, 239, 239) 75%, rgb(239, 239, 239))")){
            const color = shadeColor(storage.fakePngDetectorColor,100)
            imageHtml.style.background = `linear-gradient(45deg,${color} 25%,rgba(239,239,239,0) 25%,rgba(239,239,239,0) 75%,${color} 75%,${color}),linear-gradient(45deg,${color} 25%,white 25%,white 75%,${color} 75%,${color})`
            imageHtml.style.backgroundPosition = "0 0,10px 10px"
            imageHtml.style.backgroundSize = "21px 21px"
        }

    }
}

editImages()
document.addEventListener('DOMNodeInserted', editImages);

