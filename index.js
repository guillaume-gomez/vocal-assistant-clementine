const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
  // event is a SpeechRecognitionEvent and it holds all the lines captured so far
  
  // get the current line
  var current = event.resultIndex; 

  // get the recognized text
  var transcript = event.results[current][0].transcript;

  console.log(transcript);
}

recognition.start();