var config = {
  uri: 'web@asterisk.lan',
  wsServers: 'wss://asterisk.lan:8089/ws',
  authorizationUser: 'web',
  password: 'web'
};

var ua = new SIP.UA(config);
var socket = io('https://dialer.lan');
var goodbye = new Audio('audio/goodbye.wav');
var session;

function dial(number) {
  return ua.invite('sip:' + number + '@asterisk.lan', {
     media: {
       constraints: { audio: true, video: false },
       render: {
         remote: document.getElementById('remote-video')
       }
     }
  });
}

function handleCommand(cmd) {
  switch (cmd[0].toLowerCase()) {
    case 'dial':
      if (cmd.length > 1)
        session = dial(cmd[1]);
        session.on('bye', function (request) {
          goodbye.play();
        });
    break;
    case 'bye':
      if (session)
        session.bye();
    break;
    case 'dtmf':
      if (cmd.length > 1 && session)
        session.dtmf(cmd[1]);
    break;
  }
}

function onMessage(message) {
  var cmd = message.split(/\s+/);
  console.log('[Command] ' + cmd);
  handleCommand(cmd);
}

socket.on('connect', function () {
  socket.on('message', onMessage);
});
