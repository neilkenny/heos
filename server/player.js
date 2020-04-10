var events = require('../src/events');
const VolumeManager = require('./volume');

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

    this.volumeManager = new VolumeManager(io, connection, this.playerId);
  }

  onSocketConnected(socket){
    const me = this;
    this.socket = socket;

    socket.on(events.GET_NOW_PLAYING, () => {
      socket.emit(events.CURRENT_TRACK_DETAILS, this.currentTrack);
    });

    socket.on(events.PLAY_STATE_REQUEST, () => {
      socket.emit(events.PLAY_STATE_RESPONSE, this.playState);
    });

    socket.on(events.TOGGLE_PLAY_PAUSE, () => {
      const newState = me.playState === 'play' ? 'pause' : 'play';
      me.heosConnection.write('player', 'set_play_state', { pid: me.playerId, state: newState});
    });

    socket.on(events.NEXT_TRACK_REQUEST, () => {
      me.heosConnection.write('player', 'play_next', { pid: me.playerId} );
    });

    socket.on(events.PREVIOUS_TRACK_REQUEST, () => {
      me.heosConnection.write('player', 'play_previous', { pid: me.playerId} );
    });

    this.volumeManager.onSocketConnected(socket);
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
    this.io.emit(events.PLAY_STATE_CHANGED, this.playState);
  };

  emitProgressUpdate($event) {
    this.io.emit(events.PROGRESS_UPDATE, $event.heos.message.parsed);
  };

  emitTrackUpdate() {
    this.io.emit(events.CURRENT_TRACK_DETAILS, this.currentTrack);
  };

}

module.exports = PlayerManager;