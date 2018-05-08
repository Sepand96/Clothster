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
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("get", "http://51.15.59.130:46260/support", true);
    xmlhttp.send(null);
    xmlhttp.onreadystatechange = processsupportinfo;
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
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("post", "http://51.15.59.130:46260/send", true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    var msg = document.getElementById("chatmsg").value;
    xmlhttp.send("{\"message\":\"" + escape(msg) + "\"}");
    var newmsgdiv = document.createElement("div");
    var msgdiv = document.createElement("div");
    var userphoto = document.createElement("img");
    userphoto.id = "supportimg";
    userphoto.src = "supportprofilepic.png"
    newmsgdiv.appendChild(userphoto);
    newmsgdiv.appendChild(msgdiv);
    newmsgdiv.style.display = "flex";
    msgdiv.innerHTML = msg;
    var parent = document.getElementById("chatarea");
    parent.appendChild(newmsgdiv);
}
var msgs = [];
function receivemsg(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("get", "http://51.15.59.130:46260/fetch", true);
    xmlhttp.send(null);
    xmlhttp.onreadystatechange = processsupportinfo;
}