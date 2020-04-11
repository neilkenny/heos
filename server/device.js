const discover = require('../ssdpClient');
const events = require('../src/events');
const heosApi = require('heos-api');
const DenonIdentifier = 'urn:schemas-denon-com:device:ACT-Denon:1';
const PlayerManager = require('./player');
const GroupManager = require('./group');

class DeviceMananger {
  
  constructor(io){
    this.devices = [];
    this.io = io;
    this.players = [];
    this.socketConnected = this.socketConnected.bind(this);
    this.discoverDevices = this.discoverDevices.bind(this);
    this.connectToDevice = this.connectToDevice.bind(this);
    this.onConnected = this.onConnected.bind(this);
    this.registerEvents = this.registerEvents.bind(this);
    this.getPlayers = this.getPlayers.bind(this);
    this.onGetPlayers = this.onGetPlayers.bind(this);
  }

  registerEvents(connection){
    connection.on({ commandGroup: 'player', command: 'get_players' }, this.onGetPlayers);
  }

  /**
   * A socket connection has been established
   */
  socketConnected(socket) {
    this.socket = socket;
    
    socket.on(events.GET_PLAYERS_REQUEST, () => {
      socket.emit(events.GET_PLAYERS_RESPONSE, this.players.map(pm => Object.assign(pm.player, { volume: pm.volumeManager.volume })));
    });

    this.groupManager.onSocketConnection(socket);

    this.players.forEach((pm) => {
      pm.onSocketConnected(this.socket);
    })
  }

  /**
  * Discover Denon devices on the network
  */
  discoverDevices() {
    const me = this;
    discover.on('response', function (headers, statusCode, rinfo) {
      console.log('Got a response to an m-search.');
      if(!me.devices.find(device => device.address === rinfo.address)){
        me.devices.push(rinfo);
        me.connectToDevice(rinfo.address);
      }
      
      me.io.emit(events.NEW_DEVICE_DISCOVERED, rinfo);
    });
  
    discover.search(DenonIdentifier);
  }
  
  
  /**
  * Connect to a HEOS device using the provided IP address
  */
  connectToDevice(deviceAddress) {
    heosApi.connect(deviceAddress).then(this.onConnected).catch(console.log);
  }

  /**
   * Called when we establish a connection to a device
   * @param {*} connection 
   */
  onConnected(connection){
    if(!this.connection){
      this.connection = connection;
      connection.write('system', 'register_for_change_events', { enable: 'on' });
      connection.write('system', 'prettify_json_response', { enable: 'on' });
  
      this.groupManager = new GroupManager(this.io, connection);
  
      this.getPlayers(connection);
    }
  }

  /**
   * get a reference to any players
   */
  getPlayers(connection){
    this.registerEvents(connection);
    connection.write('player', 'get_players');
  }

  // called when we receive a response from players
  onGetPlayers(event) {
    const me = this;
    event.payload.forEach((playerData) => {
      if(!me.players.find((player) => player.player.pid === playerData.pid)){
        me.players.push(new PlayerManager(me.io, me.connection, playerData));
      }
    });
  };
}

module.exports = DeviceMananger;