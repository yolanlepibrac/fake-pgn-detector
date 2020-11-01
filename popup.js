let changeColor = document.getElementById('changeColor');

const randomColor = () => {
    return Math.floor(Math.random* 255)
}

changeColor.onclick = function(element) {
    console.log(1)
    let color = element.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'document.body.style.backgroundColor = "' + color + '";'});
    });
    chrome.storage.sync.set({fakePngDetectorColor: rgba(randomColor(), randomColor(), randomColor(), 1)}, function() {
        console.log("The color is green.");
    });
};
