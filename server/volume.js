
class VolumeManager { 
  constructor(connection, playerId){
    this.heosConnection = connection;
    this.playerId = playerId;
    this.getVolume = this.getVolume.bind(this);
    this.decreaseVolume = this.decreaseVolume.bind(this);
    this.increaseVolume = this.increaseVolume.bind(this);
    this.onVolumeChanged = this.onVolumeChanged.bind(this);
  }

  registerEvents(){
    const me = this;

    // subscribe to the get now playing changed event
    this.heosConnection.on({ commandGroup: 'player', command: 'get_volume' }, this.onVolumeChanged);

    // subscript to the volume changed event
    this.heosConnection.on({ commandGroup: 'event', command: 'player_volume_changed' }, console.log);
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

}