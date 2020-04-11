import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGroups, getGroupsResponse } from '../redux/group/groupActions';
import { getSocket } from '../socket';
import GroupList from './GroupList';
import events from '../events';

const socket = getSocket();

class GroupListContainer extends Component {
  constructor(props){
    super(props);

    this.onGroupsReceived = this.onGroupsReceived.bind(this);
    this.onGroupVolumeChanged = this.onGroupVolumeChanged.bind(this);
    
    socket.on(events.GET_GROUPS_RESPONSE, this.onGroupsReceived);
  }

  componentDidMount(){
    this.props.getGroups();
  }

  render() {
    return <GroupList groups={this.props.groups}></GroupList>
  }

  onGroupsReceived = (newDeviceList) => {
    this.props.getGroupsResponse(newDeviceList);
  }

  onGroupVolumeChanged(playerId, level) {
    this.props.groupVolumeChanged(playerId, level);
  }
}


const mapStateToProps = (state) => {
  return {
    groups: state.groups
  }
}

const mapDispatchToProps = (dispatch) => {
  
  return {
    getGroups: () => dispatch(getGroups()),
    getGroupsResponse: (groups) => dispatch(getGroupsResponse(groups))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupListContainer);