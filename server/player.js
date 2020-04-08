var events = require('../src/events');

class PlayerManager {

  constructor(io, connection, player){
    this.io = io;
    this.player = player;
    this.playerId = this.player.pid;
    this.heosConnection = connection;

    this.registerEvents = this.registerEvents.bind(this);
    
    this.onPlayStateChanged = this.onPlayStateChanged.bind(this);
    this.getPlayingNow = this.getPlayingNow.bind(this);
    
    this.emitTrackUpdate = this.emitTrackUpdate.bind(this);

    this.registerEvents();
    this.getPlayState();
    this.getPlayingNow();
  }

  onSocketConnected(socket){
    this.socket = socket;
    socket.on(events.GET_NOW_PLAYING, () => {
      socket.emit(events.CURRENT_TRACK_DETAILS, this.currentTrack);
    });
  }

  registerEvents(){
    const me = this;

    // subscribe to the get play state event
    this.heosConnection.on({ commandGroup: 'player', command: 'get_play_state' }, this.onPlayStateChanged);

    // subscribe to the get playing progress event
    this.heosConnection.on({ commandGroup: 'event', command: 'player_now_playing_progress' }, ($event) => {
      me.emitProgressUpdate($event);
    });

    // subscribe to the get now playing media event
    this.heosConnection.on({ commandGroup: 'player', command: 'get_now_playing_media' }, ($event) => {
      me.currentTrack = $event.payload;
      me.emitTrackUpdate();
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

  getPlayState(){
    this.heosConnection.write('player', 'get_play_state', { pid: this.playerId});
  }

  onPlayStateChanged($event) {
    this.playState = $event.heos.message.parsed.state;
    this.io.emit('play_state_changed', this.playState);
  };

  emitProgressUpdate($event) {
    this.io.emit(events.PROGRESS_UPDATE, $event.heos.message.parsed);
  };

  emitTrackUpdate() {
    this.io.emit(events.CURRENT_TRACK_DETAILS, this.currentTrack);
  };

}

module.exports = PlayerManager;