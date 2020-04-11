const events = require('../src/events');

class GroupManager {

  constructor(io, connection){
    this.io  = io;
    this.heosConnection = connection;

    this.setGroupVolume = this.setGroupVolume.bind(this);

    this.registerEvents();

    this.getGroups();
  }

  registerEvents(){
    const me = this;

    this.heosConnection.on({ commandGroup: 'group', command: 'get_groups' }, (event) => {
      me.groups = event.payload;
      me.groups.forEach((group) => this.getGroupVolume(group.gid));
    });

    this.heosConnection.on({ commandGroup: 'group', command: 'get_volume' }, this.setGroupVolume);

    this.heosConnection.on({commandGroup: 'event', command: 'group_volume_changed'}, this.setGroupVolume);
  }

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

  getGroups(){
    this.heosConnection.write('group', 'get_groups');
  }

  getGroupVolume(groupId){
    this.heosConnection.write('group', 'get_volume', { gid: groupId });
  }

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