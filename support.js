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
            setInterval(receivemsg(), 500);
        }
        else {
            window.alert("Error " + this.statusText);
        }
    }
}
function submitmsg(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("post", "http://51.15.59.130:46260/send", true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    var msg = document.getElementById("chatinput").value;
    document.getElementById("chatinput").value = null;
    xmlhttp.send("{\"message\":\"" + escape(msg) + "\"}");
    createmessage(true, msg, new Date( new Date().getTime() ) );
}
var msgs = [];
function receivemsg(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("get", "http://51.15.59.130:46260/fetch", true);
    xmlhttp.send(null);
    xmlhttp.onreadystatechange = function(){
        if (this.readyState == 4) {
            if (this.status == 200) {
                if (this.responseText === null)
                 return;
                else
                    var msg = JSON.parse(this.responseText);
                    msgs.push(msg.responses[0].message);
                    var mydate = new Date(msg.responses[0].date);
                    createmessage(false, msg.responses[0].message, mydate);
            }
            else {
                window.alert("Error " + this.statusText);
            }
        }
    };
}
function createmessage(sender, msg, mydate){
    var newmsgdiv = document.createElement("div");
    var msgdiv = document.createElement("div");
    var userphoto = document.createElement("img");
    var msgdate = document.createElement("div");
    userphoto.id = "supportimg";
    newmsgdiv.style.display = "flex";
    newmsgdiv.style.flexdirection = "row-reverse";
    newmsgdiv.style.borderTop = "1em";
    msgdiv.innerHTML = msg;
    msgdiv.className = "chatmessage";
    if (sender === true)
    {
        userphoto.src = "supportprofilepic.png";
        newmsgdiv.appendChild(userphoto);
        newmsgdiv.appendChild(msgdiv);
    }
    else
    {
        userphoto.src = jsonData.support.picture;
        newmsgdiv.appendChild(msgdiv);
        newmsgdiv.appendChild(userphoto);
    }
    msgdate.innerHTML = mydate.toLocaleString();
    msgdate.style.fontSize = "0.8em";
    msgdate.style.textAlign = "right";
    msgdiv.appendChild(msgdate); 
    var parent = document.getElementById("chatarea");
    parent.appendChild(newmsgdiv);
}