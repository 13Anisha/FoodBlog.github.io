var data = document.getElementsByClassName("collapsible");

for (let i = 0; i < data.length; i++) {
    data[i].addEventListener("click", function () {
        
        var content = this.nextElementSibling;

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}



function getTime() {
    let today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return hours + ":" + minutes;
}

function firstBotMessage() {
    let firstMessage = "How can I help you?";
    document.getElementById("botStarterMessage").innerHTML = '<p class="botText" style="margin-top: 10px; margin-bottom: 10px;"><span>' + firstMessage + '</span></p>';

    let time = getTime();
    document.getElementById("chat-timestamp").innerHTML += time;
   
}

firstBotMessage();

function getHardResponse(userText) {
    let botResponse = getBotResponse(userText);
    let botHtml = '<p class="botText" style="margin-top: 10px; margin-bottom: 10px;"><span>' + botResponse + '</span></p>';
    document.getElementById("chatbox").innerHTML += botHtml;
}

function getResponse() {
    let userText = document.getElementById("textInput").value;

    if (!userText.trim()) return;

    let userHtml = '<p class="userText" style="margin-top: 10px; margin-bottom: 10px;"><span>' + userText + '</span></p>';

    document.getElementById("textInput").value = "";
    document.getElementById("chatbox").innerHTML += userHtml;

    setTimeout(() => {
        getHardResponse(userText);
    }, 1000);
}




function sendButton() {
    getResponse();
}

document.getElementById("textInput").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        getResponse();
    }
});





