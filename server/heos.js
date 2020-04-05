const heosApi = require('heos-api');
const events = require('../src/events');
const DeviceManager = require('./device');
let heosConnection; 
let playerId;
let currentTrack;
let playStatus;
let volume;
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
    
    // // '192.168.0.73'
    // self.connect = (deviceAddress) => {

    //   heosApi.connect(deviceAddress).then(connection => {
    //     heosConnection = connection;
    //     heosConnection.write('system', 'register_for_change_events', { enable: 'on' });
    //     heosConnection.write('system', 'prettify_json_response', { enable: 'on' });
        

    //     heosConnection.on({ commandGroup: 'system', command: 'check_account' }, console.log);
    //     heosConnection.on({ commandGroup: 'player', command: 'get_players' }, (event) => {
    //       // Set the playerId
    //       playerId = event.payload[0].pid;
    //       // subscript to the volume changed event
    //       heosConnection.on({ commandGroup: 'event', command: 'player_volume_changed' }, logEvent)
    //       // subscribe to the get play state event
    //       heosConnection.on({ commandGroup: 'player', command: 'get_play_state' }, self.playStateChangedEvent);
    //       // subscribe to the get playing progress event
    //       heosConnection.on({ commandGroup: 'event', command: 'player_now_playing_progress' }, ($event) => {
    //         self.postProgressEvent($event);
    //       });
    //       // subscribe to the get now playing media event
    //       heosConnection.on({ commandGroup: 'player', command: 'get_now_playing_media' }, ($event) => {
    //         currentTrack = $event.payload;
    //         self.trackUpdatedEvent($event);
    //       });
    //       // subscribe to the player state changed event
    //       heosConnection.on({ commandGroup: 'event', command: 'player_state_changed' }, ($event) => {
    //         self.playStateChangtedEvent($event);
    //       });
    //       // subscribe to the get now playing changed event
    //       heosConnection.on({ commandGroup: 'event', command: 'player_now_playing_changed' }, ($event) => {
    //         heosConnection.write('player', 'get_now_playing_media', { pid: playerId} );  
    //       });

    //       // subscribe to the get now playing changed event
    //       heosConnection.on({ commandGroup: 'player', command: 'get_volume' }, self.volumeChangedEvent);

    //       // send request to get now playing media
    //       heosConnection.write('player', 'get_now_playing_media', { pid: playerId} );
    //       // get the current volume level
    //       self.getVolume();
    //       self.getPlayState();
    //       socket.emit(events.SUCCESSFUL_CONNECTION, deviceAddress);
    //     });

    //     heosConnection.write('system', 'check_account');
    //     heosConnection.write('player', 'get_players');
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    //   socket.on('next_track', () => {
    //     console.log('Next');
    //     heosConnection.write('player', 'play_next', {pid: playerId});
    //   });

    //   socket.on('get_play_state', () => {
    //     self.getPlayState();
    //   });

    //   socket.on('increase_volume', () => {
    //     self.increaseVolume();
    //   });

    //   socket.on('decrease_volume', () => {
    //     self.decreaseVolume();
    //   });

    //   socket.on('previous_track', () => {
    //     console.log('Previous');
    //     heosConnection.write('player', 'play_previous', {pid: playerId});
    //   });

    //   socket.on('toggle_play_pause', () => {
    //     console.log('Toggle Play Pause');
    //     if(playStatus == 'play') {
    //       heosConnection.write('player', 'set_play_state', {pid: playerId, state: 'pause'});
    //     }
    //     else {
    //       heosConnection.write('player', 'set_play_state', {pid: playerId, state: 'play'});
    //     }

    //   });
    // }
}

module.exports = HeosManager;