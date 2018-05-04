function openchatbox() {
    document.getElementById("chat_button").style.display = "none";
    document.getElementById("chatbox").style.display = "flex";
    chatstart();
}
function closechatbox() {
    document.getElementById("chatbox").style.display = 'none';
    document.getElementById("chat_button").style.display = 'flex';
}
function chatstart() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("get", "http://51.15.59.130:46260/start", true);
    xmlhttp.send(null);
    xmlhttp.onreadystatechange = processchatstart;
}
function processchatstart() {
    if (this.readyState == 4) {
        if (this.status == 200) {
            getsupportinfo();
        }
        else {
            window.alert("Error " + xmlhttp.statusText);
        }
    }
}
function getsupportinfo() {
    var xmlhttp2 = new XMLHttpRequest();
    xmlhttp2.open("get", "http://51.15.59.130:46260/support", true);
    xmlhttp2.send(null);
    xmlhttp2.onreadystatechange = processsupportinfo;
}
function processsupportinfo() {
    if (this.readyState == 4) {
        if (this.status == 200) {
            jsonData = JSON.parse(this.responseText);
            document.getElementById("supportname").innerHTML = jsonData.support.first +" "+ jsonData.support.last;
            document.getElementById("supportimg").src = jsonData.support.picture;
        }
        else {
            window.alert("Error " + xmlhttp.statusText);
        }
    }
}
function submitmsg(){
    var xmlhttp3 = new XMLHttpRequest();
    xmlhttp3.open("post", "http://51.15.59.130:46260/send", true);
    var msg = document.getElementById("chatmsg").
    xmlhttp2.send(null);
    xmlhttp2.onreadystatechange = processsupportinfo;
}
