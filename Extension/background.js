chrome.runtime.onMessage.addListener(getData);

var dane;

function getData(message, sender,sendResponse){  
  if(message['getdata']){
    sendResponse({'data' : dane});
    return true;
  }
  else if(message['inject']){
    fetch('https://quizizz-api-kermitskill.vercel.app/start?pin=' + message['inject'].toString(), { method: 'GET' })
    .then(function (response) {
        response.json().then((data)=>{
          dane = data;
          if(dane['error']){
            sendResponse('no_room');
          }else{
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
        })
    })
    return true;
  }
}