function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

function sendMessage() {
    let userInput = document.getElementById("userInput").value;
    if (userInput.trim() === "") return;
    
    let chatBox = document.getElementById("chatBox");
    chatBox.innerHTML += `<div class='user'>${userInput}</div>`;
    document.getElementById("userInput").value = "";
    
    setTimeout(() => {
        let response = getResponse(userInput);
        chatBox.innerHTML += `<div class='bot'>${response}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 500);
}

function getResponse(input) {
    const responses = {
        "hello": "Hello! How can I assist you?",
        "who are you?": "I am Jarvis, your virtual assistant!",
        "how are you?": "I'm just a program, but I'm doing great!",
        "bye": "Goodbye! Have a great day!"
    };
    return responses[input.toLowerCase()] || "I'm not sure how to respond to that.";
}

function startVoiceRecognition() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();
    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById("userInput").value = transcript;
        sendMessage();
    };
}
