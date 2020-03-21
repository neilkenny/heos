const heos = require('heos-api');
let heosConnection; 
let playerId;
let currentTrack;
let playStatus;
let volume;
let socket;


module.exports = (io) => {

  logEvent = (event) => {
    var message = event.heos.message.parsed;
    var eventType = event.heos.command.command;
    switch(eventType){
      case 'player_now_playing_progress': {
        logProgress(message);
      }
    }
    //console.log(eventType + ": " + event.heos.message.unparsed);
  };

  pad = (num, size) => {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  };

  getTime = (posInMilliseconds) => {
    let currentPosSeconds = posInMilliseconds / 1000;
    let minute = (currentPosSeconds - (currentPosSeconds % 60)) / 60;
    let second = currentPosSeconds % 60;
    return pad(minute, 2) + ':' + pad(second, 2);
  };

  function HeosManager() {
    var self = this;
    
    self.discoverDevices = () => {
     
    }
    
    self.logVolumeChange = (event) => {
    
    };
    
    self.postProgressEvent = (event) => {
      io.emit('progress_update', event.heos.message.parsed);
      self.trackUpdatedEvent({payload: currentTrack});
    };

    self.volumeChangedEvent = ($event) => {
      volume = $event.heos.message.parsed.level;
      io.emit('volume_changed', volume);
    }

    self.trackUpdatedEvent = (event) => {
      io.emit('track_updated', event.payload);
    };

    self.playStateChangedEvent = (event) => {
      playStatus = event.heos.message.parsed.state;
      io.emit('play_state_changed', playStatus);
    };

    self.getPlayState = () => {
      // send request to get the play state
      heosConnection.write('player', 'get_play_state', { pid: playerId} );
    };

    self.getVolume = () => {
      heosConnection.write('player', 'get_volume', { pid: playerId} );
    }

    self.increaseVolume = () => {
      heosConnection.write('player', 'volume_up', { pid: playerId, step: 1} );
      self.getVolume();
    };

    self.decreaseVolume = () => {
      heosConnection.write('player', 'volume_down', { pid: playerId, step: 1} );
      self.getVolume();
    };
    
    // '192.168.0.73'
    self.connect = (deviceAddress, s) => {
      socket = s;

      heos.connect(deviceAddress).then(connection => {
        heosConnection = connection;
        heosConnection.write('system', 'register_for_change_events', { enable: 'on' });
        heosConnection.write('system', 'prettify_json_response', { enable: 'on' });
        

        heosConnection.on({ commandGroup: 'system', command: 'check_account' }, console.log);
        heosConnection.on({ commandGroup: 'player', command: 'get_players' }, (event) => {
          // Set the playerId
          playerId = event.payload[0].pid;
          // subscript to the volume changed event
          heosConnection.on({ commandGroup: 'event', command: 'player_volume_changed' }, logEvent)
          // subscribe to the get play state event
          heosConnection.on({ commandGroup: 'player', command: 'get_play_state' }, self.playStateChangedEvent);
          // subscribe to the get playing progress event
          heosConnection.on({ commandGroup: 'event', command: 'player_now_playing_progress' }, ($event) => {
            self.postProgressEvent($event);
          });
          // subscribe to the get now playing media event
          heosConnection.on({ commandGroup: 'player', command: 'get_now_playing_media' }, ($event) => {
            currentTrack = $event.payload;
            self.trackUpdatedEvent($event);
          });
          // subscribe to the player state changed event
          heosConnection.on({ commandGroup: 'event', command: 'player_state_changed' }, ($event) => {
            self.playStateChangtedEvent($event);
          });
          // subscribe to the get now playing changed event
          heosConnection.on({ commandGroup: 'event', command: 'player_now_playing_changed' }, ($event) => {
            heosConnection.write('player', 'get_now_playing_media', { pid: playerId} );  
          });

          // subscribe to the get now playing changed event
          heosConnection.on({ commandGroup: 'player', command: 'get_volume' }, self.volumeChangedEvent);

          // send request to get now playing media
          heosConnection.write('player', 'get_now_playing_media', { pid: playerId} );
          // get the current volume level
          self.getVolume();
          self.getPlayState();
        });

        heosConnection.write('system', 'check_account');
        heosConnection.write('player', 'get_players');
      })
      .catch(error => {
        console.log(error);
      });

      socket.on('next_track', () => {
        console.log('Next');
        heosConnection.write('player', 'play_next', {pid: playerId});
      });

      socket.on('get_play_state', () => {
        self.getPlayState();
      });

      socket.on('increase_volume', () => {
        self.increaseVolume();
      });

      socket.on('decrease_volume', () => {
        self.decreaseVolume();
      });

      socket.on('previous_track', () => {
        console.log('Previous');
        heosConnection.write('player', 'play_previous', {pid: playerId});
      });

      socket.on('toggle_play_pause', () => {
        console.log('Toggle Play Pause');
        if(playStatus == 'play') {
          heosConnection.write('player', 'set_play_state', {pid: playerId, state: 'pause'});
        }
        else {
          heosConnection.write('player', 'set_play_state', {pid: playerId, state: 'play'});
        }

      });
    }

    return self;
  }

  return new HeosManager();
}