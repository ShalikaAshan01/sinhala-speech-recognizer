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

        $.ajax({
            type: 'GET',
            url: 'https://sinhalavoicerecognizer.000webhostapp.com/search.php?search='+ finalTranscript.toLowerCase(),
            dataType: 'json',
            success: function (data) {
                responsiveVoice.speak(data.response,"Sinhala");
                printResponse(data.response);
            },
            error: function() {
                let res = "මේ සදහා කිසිදු ප්‍රතිචාරයක් නොමැත.කරුණාකර අලුත් ප්‍රතිචාරයක් ඇතුලත් කරන්න";
                responsiveVoice.speak(res,"Sinhala");
                printResponse(res);
            }
        });
    }
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
//db name
// id10487164_speech_recognizer
//user
// id10487164_speech_recognizer