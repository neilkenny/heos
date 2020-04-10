const events = require('../src/events');
class VolumeManager { 
  constructor(io, connection, playerId){
    this.io = io;
    this.heosConnection = connection;
    this.playerId = playerId;
    this.getVolume = this.getVolume.bind(this);
    this.decreaseVolume = this.decreaseVolume.bind(this);
    this.increaseVolume = this.increaseVolume.bind(this);
    this.onVolumeChanged = this.onVolumeChanged.bind(this);

    this.registerEvents();

    this.getVolume();
  }

  registerEvents(){
    const me = this;

    // subscribe to the get now playing changed event
    this.heosConnection.on({ commandGroup: 'player', command: 'get_volume' }, this.onVolumeChanged);

    // subscript to the volume changed event
    this.heosConnection.on({ commandGroup: 'event', command: 'player_volume_changed' }, this.onVolumeChanged);
  }

  onSocketConnected(socket){
    const me = this;
    socket.on(events.GET_VOLUME, () => me.volume);
    socket.on(events.SET_VOLUME, (playerId, level) => {
      if(playerId === this.playerId && level != this.volume){
        me.setVolume(level);
      }
    });
  }

  getVolume() {
    this.heosConnection.write('player', 'get_volume', { pid: this.playerId} );
  }

  setVolume(level) {
    if(level <= 20){
      this.heosConnection.write('player', 'set_volume', { pid: this.playerId, level } );
    }
    
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
    const volumeEvent = $event.heos.message.parsed;
    if(volumeEvent.pid === this.playerId){
      this.volume = $event.heos.message.parsed.level;
      this.io.emit(events.PLAYER_VOLUME_CHANGED, this.playerId, this.volume);
    }
  }

}

module.exports = VolumeManager;