window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
let finalTranscript = '';
let recognition = new window.SpeechRecognition();
let active = false;
recognition.interimResults = true;
recognition.maxAlternatives = 10;
recognition.continuous = true;
recognition.lang = 'si';
recognition.onresult = (event) => {
    let interimTranscript = '';
    for (let i = event.resultIndex, len = event.results.length; i < len; i++) {

        let transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
            finalTranscript += transcript;
        } else {
            interimTranscript += transcript;
        }

    }
    responses();
};

// $( "#start" ).click(function() {

// });
//
// $( "#stop" ).click(function() {
//     recognition.stop();
// });
//

$( "#btn-mic" ).click(function() {
    $("#active-mic").toggle();
    $("#inactive-mic").toggle();
    $("#mic-text").toggle();
    if(!active){
        finalTranscript = '';
        recognition.start();
    }else{
        recognition.stop();
    }
    active = !active;
});


function responses() {

    if(finalTranscript !== null && finalTranscript !== ""){
        $("#app-content").append('<div class="row"><div class="col s12 right-align"><div class="card">'
            + finalTranscript + '</div></div></div>');

        let res;

        switch (finalTranscript.toLowerCase()) {
            case "හලෝ":
            case "හෙලෝ":
            case "හායි":
            case "හලෝ සිරිසේන":
            case "හෙලෝ සිරිසේන":
            case "හායි සිරිසේන":
                res = hi();
                responsiveVoice.speak(res,"Sinhala");
                printResponse(res);
                break;
            case "කොහොමද":
            case "කොහොමද හලෝ":
            case "ඔයාට කොහොමද":
                res = howAreYou();
                responsiveVoice.speak(res,"Sinhala");
                printResponse(res);
                break;
            case "good morning":
                res = morning();
                responsiveVoice.speak(res);
                printResponse(res);
                break;
            case "සුභ උදෑසනක්":
                res = subaUdasanak();
                responsiveVoice.speak(res,"Sinhala");
                printResponse(res);
                break;


        }

    }
}

function hi() {
    let greetings = ["හායි","හලෝ","හෙලෝ"];
    return greetings[randomNumber(greetings.length)]
}
function howAreYou() {
    let greetings = ["හොඳින් ඉන්නවා","මම හොඳින් ඉන්නවා","ඔයාට මොකටද?","ඇයි අහන්නේ" ];
    return greetings[randomNumber(greetings.length)]
}
function morning() {
    let greetings = [
        "Good Morning!",
        "The morning has arrived and bring with it new hope and optimism. Good morning!",
        "The morning is like a blank page. You need to fill the colours on it. Good morning!",
        "The night was wonderful and was full of wonderful dreams. Now, wake up and make those dreams come true. Good morning!",
        "It is a pleasant morning. May all your dreams come true. Good morning!",
        "May the lovely day bring you new opportunities. Good Morning!",
        "Always be happy. It will increase your lifespan. Good Morning!"
    ];
    return greetings[randomNumber(greetings.length)]
}

function subaUdasanak() {
    let greetings = ["සුභ උදෑසනක්","එසේම වේවා","පාඩුවේ ඉන්න දීලා පලයං යන්න" ];
    return greetings[randomNumber(greetings.length)]
}

function randomNumber(max) { // min and max included
    return Math.floor(Math.random() * max);
}

function printResponse(res) {
    $("#app-content").append('<div class="row"><div class="col s12"><div class="card">'
        + res + '</div></div></div>');
}
