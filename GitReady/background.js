chrome.runtime.onMessage.addListener(getData);

var code;

function getData(message, sender,sendResponse){  
  if(message['getdata']){
    fetch('https://quizizz-api-kermitskill.vercel.app/start?pin=' + code.toString(), { method: 'GET' })
    .then(function (response) {
        response.json().then((data)=>{
          sendResponse({'data' : data});
        })
    })
    return true;
  }
  else if(message['inject']){
    code = message['inject'];
    chrome.tabs.query({ active: true, lastFocusedWindow: true })
    .then((tabs) => {
      console.log(tabs[0]);
      chrome.scripting.executeScript(
        {
          target: {tabId: tabs[0].id},
          files: ['content.js']
        }
      );
    })
  }
}