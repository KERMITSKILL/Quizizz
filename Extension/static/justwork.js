document.getElementById('start').onclick = () =>{
    var kod = document.getElementById('code').value;
    console.log(kod.length);
    if(kod.length >= 6){
        chrome.runtime.sendMessage({'inject': kod.toString()});
    }
}
