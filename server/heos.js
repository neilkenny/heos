const heosApi = require('heos-api');
const events = require('../src/events');
const DeviceManager = require('./device');
let heosConnection; 
let playerId;
let socket;

  const logEvent = (event) => {
    var message = event.heos.message.parsed;
    var eventType = event.heos.command.command;
    switch(eventType){
      case 'player_now_playing_progress': {
        logProgress(message);
      }
    }
    //console.log(eventType + ": " + event.heos.message.unparsed);
  };

  const pad = (num, size) => {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  };

  const getTime = (posInMilliseconds) => {
    let currentPosSeconds = posInMilliseconds / 1000;
    let minute = (currentPosSeconds - (currentPosSeconds % 60)) / 60;
    let second = currentPosSeconds % 60;
    return pad(minute, 2) + ':' + pad(second, 2);
  };

  function HeosManager(io) {
    var self = this;

    self.getPlayState = () => {
      // send request to get the play state
      heosConnection.write('player', 'get_play_state', { pid: playerId} );
    };

    self.init = (s) => {
      socket = s;
      self.deviceManager = new DeviceManager(io, socket);
    };
}

module.exports = HeosManager;