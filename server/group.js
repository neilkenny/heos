const events = require('../src/events');

class GroupManager {

  constructor(io, connection){
    this.io  = io;
    this.heosConnection = connection;

    this.registerEvents();

    this.getGroups();
  }

  registerEvents(){
    const me = this;

    this.heosConnection.on({ commandGroup: 'group', command: 'get_groups' }, (event) => {
      me.groups = event.payload;
      me.groups.forEach((group) => this.getGroupVolume(group.gid));
    });

    this.heosConnection.on({ commandGroup: 'group', command: 'get_volume' }, (event) => {
      console.log(event);
      const groupVolume = event.heos.message.parsed;
      const group = me.groups.find((group) => group.gid === groupVolume.gid);
      group.volume = groupVolume.level;
    });
  }

  onSocketConnection(socket){
    const me = this;
    this.socket = socket;
    socket.on(events.GET_GROUPS_REQUEST, () => {
      me.socket.emit(events.GET_GROUPS_RESPONSE, this.groups);
    });
  }

  getGroups(){
    this.heosConnection.write('group', 'get_groups');
  }

  getGroupVolume(groupId){
    this.heosConnection.write('group', 'get_volume', { gid: groupId });
  }

}

module.exports = GroupManager;