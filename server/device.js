const discover = require('../ssdpClient');
const events = require('../src/events');
const heosApi = require('heos-api');
const DenonIdentifier = 'urn:schemas-denon-com:device:ACT-Denon:1';
const PlayerManager = require('./player');

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

  registerEvents(){
    this.heosConnection.on({ commandGroup: 'player', command: 'get_players' }, this.onGetPlayers);
  }

  /**
   * A socket connection has been established
   */
  socketConnected(socket) {
    this.socket = socket;
    
    socket.on(events.FETCH_DEVICES_REQUEST, () => {
      socket.emit(events.FETCH_DEVICES_RESPONSE, this.devices);
    });
  
    socket.on(events.CONNECT_TO_DEVICE, this.connectToDevice);
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
      }
      
      me.io.emit(events.NEW_DEVICE_DISCOVERED, rinfo);
    });
  
    discover.search(DenonIdentifier);
  }
  
  
  /**
  * Connect to a HEOS device using the provided IP address
  */
  connectToDevice(deviceAddress) {
    heosApi.connect(deviceAddress).then((connection) => this.onConnected(connection, deviceAddress))
    .catch(error => {
      console.log(error);
    });
  }

  /**
   * Called when we establish a connection to a device
   * @param {*} connection 
   */
  onConnected(connection, deviceAddress){
    this.heosConnection = connection;
    this.heosConnection.write('system', 'register_for_change_events', { enable: 'on' });
    this.heosConnection.write('system', 'prettify_json_response', { enable: 'on' });
    this.socket.emit(events.SUCCESSFUL_CONNECTION, deviceAddress);
    this.getPlayers();
  }

  /**
   * get a reference to any players
   */
  getPlayers(){
    this.heosConnection.write('player', 'get_players');
  }

  // called when we receive a response from players
  onGetPlayers(event) {
    const me = this;
    event.payload.forEach((playerData) => {
      me.players.push(new PlayerManager(me.heosConnection, playerData.pid));
    })
  };
}

module.exports = DeviceMananger;