

class PlayerManager {

  constructor(connection, playerId){
    this.playerId = playerId;
    this.heosConnection = connection;

    this.registerEvents = this.registerEvents.bind(this);
    this.decreaseVolume = this.decreaseVolume.bind(this);
    this.increaseVolume = this.increaseVolume.bind(this);
    this.onVolumeChanged = this.onVolumeChanged.bind(this);
    this.onPlayStateChanged = this.onPlayStateChanged.bind(this);
    this.getPlayingNow = this.getPlayingNow.bind(this);
    this.getVolume = this.getVolume.bind(this);

    this.registerEvents();
  }

  registerEvents(){
    const me = this;

    // subscribe to the get now playing changed event
    this.heosConnection.on({ commandGroup: 'player', command: 'get_volume' }, this.onVolumeChanged);

    // subscript to the volume changed event
    this.heosConnection.on({ commandGroup: 'event', command: 'player_volume_changed' }, console.log);

    // subscribe to the get play state event
    this.heosConnection.on({ commandGroup: 'player', command: 'get_play_state' }, this.onPlayStateChanged);

    // subscribe to the get playing progress event
    this.heosConnection.on({ commandGroup: 'event', command: 'player_now_playing_progress' }, ($event) => {
      me.emitProgressUpdate($event);
    });

    // subscribe to the get now playing media event
    this.heosConnection.on({ commandGroup: 'player', command: 'get_now_playing_media' }, ($event) => {
      currentTrack = $event.payload;
      me.emitTrackUpdate($event);
    });
    // subscribe to the player state changed event
    this.heosConnection.on({ commandGroup: 'event', command: 'player_state_changed' }, ($event) => {
      me.onPlayStateChanged($event);
    });
    // subscribe to the get now playing changed event
    this.heosConnection.on({ commandGroup: 'event', command: 'player_now_playing_changed' }, ($event) => {
      me.heosConnection.write('player', 'get_now_playing_media', { pid: me.playerId} );  
    });
  }

  getPlayingNow(){
    // send request to get now playing media
    this.heosConnection.write('player', 'get_now_playing_media', { pid: this.playerId} );
  }

  getVolume() {
    this.heosConnection.write('player', 'get_volume', { pid: this.playerId} );
  }

  increaseVolume() {
    this.heosConnection.write('player', 'volume_up', { pid: this.playerId, step: 1} );
    this.getVolume();
  }

  decreaseVolume() {
    heosConnection.write('player', 'volume_down', { pid: this.playerId, step: 1} );
    self.getVolume();
  }

  onVolumeChanged($event) {
    this.volume = $event.heos.message.parsed.level;
    this.io.emit('volume_changed', volume);
  }

onPlayStateChanged($event) {
    this.playStatus = $event.heos.message.parsed.state;
    io.emit('play_state_changed', this.playStatus);
  };

  emitProgressUpdate($event) {
    io.emit('progress_update', $event.heos.message.parsed);
    this.emitTrackUpdate({payload: currentTrack});
  };

  emitTrackUpdate(event) {
    io.emit(events.TRACK_CHANGED, event.payload);
  };

}

module.exports = PlayerManager;