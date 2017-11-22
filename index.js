const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// init parser
if (annyang) {
  // Let's define our first command. First the text we expect, and then the function it should call
  var commands = {
    'show tps report': function() {
      $('#tpsreport').animate({bottom: '-100px'});
    }
  };

  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();
}

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