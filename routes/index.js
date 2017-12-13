var express = require('express');
var router = express.Router();
const { spawn } = require('child_process');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/music/:action', (req, res) => {
  const options = parseOptions(req.params.action.toLowerCase());
  console.log(options)
  if (options.length === 0) {
    res.sendStatus(200);
    return;
  }
  const command = spawn('clementine', options, {
    detached: true,
    stdio: 'ignore'
  });
  
  // command.on('close', (code, signal) => {
  //   const optionsStr = options && options.length ? options.join(' ') : ''
  //   this
  //     .logger
  //     .info(`finished executing command to ${this.bin} with ${optionsStr}`);
  // });

  command.unref();

  res.sendStatus(200);
});

const parseOptions = (action) => {
  let options = [];
  let flag = '';

  switch (action) {
    case 'play':
      flag = '-p';
      break;
    case 'stop':
      flag = '-s';
      break;
    case 'pause':
      flag = '-u';
      break;
    case 'volume-up':
      flag = '--volume-up';
      break;
    case 'volume-down':
      flag = '--volume-down';
      break;
    case 'next':
      flag = '-f';
      break;
    case 'previous':
      flag = '-r';
      break;
  }

  if (action.startsWith('set-volume')) {
    const split = action.split('-');
    flag = '-v ' + split[2];
  }

  if (action.startsWith('seek-by')) {
    const split = action.split('-');
    options = ['--seek-by', split[2]];
  }

  if (options.length) {
    return options;
  }

  return [flag];
}


module.exports = router;
