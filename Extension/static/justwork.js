var err = document.getElementById('noroom');

document.getElementById('start').onclick = () =>{
    err.style.display = 'none';
    var kod = document.getElementById('code').value;
    if(kod.length >= 6){
        chrome.runtime.sendMessage({'inject': kod.toString()}, onResp);
    }
}

function onResp(message){
    console.log(message);
    if(message == 'no_room'){
        // some css
        err.style.display = 'initial';
    }
}