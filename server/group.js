const events = require('../src/events');

class GroupManager {

  constructor(io, connection){
    this.io  = io;
    this.heosConnection = connection;

    this.setGroupVolume = this.setGroupVolume.bind(this);

    this.registerEvents();

    this.getGroups();
  }

  /**
   * Register for group events
   */
  registerEvents(){
    const me = this;

    this.heosConnection.on({ commandGroup: 'group', command: 'get_groups' }, (event) => {
      me.groups = event.payload;
      me.groups.forEach((group) => this.getGroupVolume(group.gid));
    });

    this.heosConnection.on({ commandGroup: 'group', command: 'get_volume' }, this.setGroupVolume);

    this.heosConnection.on({commandGroup: 'event', command: 'group_volume_changed'}, this.setGroupVolume);
  }

  /**
   * A socket has been establisted, register socket events
   * @param {*} socket 
   */
  onSocketConnection(socket){
    const me = this;
    this.socket = socket;
    socket.on(events.GET_GROUPS_REQUEST, () => {
      me.socket.emit(events.GET_GROUPS_RESPONSE, this.groups);
    });

    socket.on(events.SET_GROUP_VOLUME, (gid, level) => {
      me.heosConnection.write('group', 'set_volume', {gid, level} )
    })
  }

  /**
   * get the list of groups
   */
  getGroups(){
    this.heosConnection.write('group', 'get_groups');
  }

  /**
   * Get the volume of a group
   * @param {*} groupId 
   */
  getGroupVolume(groupId){
    this.heosConnection.write('group', 'get_volume', { gid: groupId });
  }

  /**
   * Set the volume of a group
   * @param {*} event 
   */
  setGroupVolume(event) {
    const groupVolume = event.heos.message.parsed;
    const group = this.groups.find((group) => group.gid === groupVolume.gid);
    group.volume = groupVolume.level;
    if(groupVolume.level <= 20){
      this.io.emit(events.GET_GROUPS_RESPONSE, this.groups);
    }
    
  }

}

module.exports = GroupManager;