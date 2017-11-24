const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

import annyang from "annyang";

if (annyang) {
  // Let's define our first command. First the text we expect, and then the function it should call
  // action is a variable and will get passed to the calling function
  var commands = {
    'music :action': (action) => {
      const url = 'http://localhost:3000/music/' + action;
      return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(() => {
        console.log('executed action');
      })
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
console.log("JFDJKLDKJKDJJKDLJFKLDJKFJ")