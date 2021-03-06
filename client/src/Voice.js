
var voice = undefined;
var voices = undefined;

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const speechRecognizer = new SpeechRecognition()
speechRecognizer.continuous = true
speechRecognizer.lang = "en-US"
speechRecognizer.start()
SpeechInit(speechRecognizer)

function getVoices() {
  if (typeof speechSynthesis === 'undefined') {
      return;
  }
  voices = speechSynthesis.getVoices();
  if(voices.length > 0) {
      selectVoice('Google UK English Female');
  }
}
function selectVoice(name) {
  for (let i = 0; i < voices.length; i++) {
      if (voices[i].name === name) {
          voice = voices[i];
      }
  }
}
getVoices();
if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = getVoices;
}

const SpeechInit = (speechRecognizer) => {
  speechRecognizer.onaudiostart = function(event) {
    console.log('onaudiostart')
  }

  speechRecognizer.onaudioend = function(event) {
      console.log('onaudioend')
  }

  speechRecognizer.onend = function(event) {
      console.log('onend')
      speechRecognizer.start()
  }

  speechRecognizer.onnomatch = function(event) {
      console.log('onnomatch')
  }

  speechRecognizer.onsoundstart = function(event) {
      console.log('onsoundstart')
  }

  speechRecognizer.onsoundend = function(event) {
      console.log('onsoundend')
  }

  speechRecognizer.onspeechstart = function(event) {
      console.log('onspeechstart')
  }

  speechRecognizer.onspeechend = function(event) {
      console.log('onspeechend')
      speechRecognizer.stop()
  }

  speechRecognizer.onerror = function(event){
      console.log(event)
  }

  speechRecognizer.onresult = event => {
    for(let i=event.resultIndex; i < event.results.length; i++){
        var transcript = event.results[i][0].transcript
        if(event.results[i].isFinal){
            transcript = transcript.trim().toLowerCase()
            console.log(transcript)
            let utterThis = new SpeechSynthesisUtterance(transcript)
            utterThis.voice = voice
            speechSynthesis.speak(utterThis)
            switch (transcript) {
              case "right":
                  break
              case "left":
                  break
              case "down":
                  break
              case "up":
                  break
              default:
            }
        }
    }
  }
}