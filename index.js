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

recognition.onstart = () => {
  console.log("voice recognition activated");
}

recognition.onend = () => {
  console.log("voice recognition ended");
  recognition.start();
}

recognition.onerror = (event) => {
  console.error(event);
}