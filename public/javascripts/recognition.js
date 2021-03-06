const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (annyang && SpeechRecognition) {
  const recognition = new SpeechRecognition();
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
  annyang.start({ autoRestart: true, continuous: false });


  // annyang.addCallback('soundstart', function() {
  //   console.log('sound detected');
  // });

  // annyang.addCallback('result', function(phrases) {
  //   console.log("I think the user said: ", phrases[0]);
  //   console.log("But then again, it could be any of the following: ", phrases);
  // });

  // annyang.addCallback('resultMatch', function(userSaid, commandText, phrases) {
  //   console.log(userSaid); // sample output: 'hello'
  //   console.log(commandText); // sample output: 'hello (there)'
  //   console.log(phrases); // sample output: ['hello', 'halo', 'yellow', 'polo', 'hello kitty']
  // });

  // annyang.addCallback('resultNoMatch', function(phrases) {
  //   console.log("I think the user said: ", phrases[0]);
  //   console.log("But then again, it could be any of the following: ", phrases);
  // });

} else {
  console.error("Speech Recognition is not supported");
}

export default annyang;