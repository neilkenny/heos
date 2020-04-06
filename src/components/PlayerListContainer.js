import React, { Component } from 'react';
import PlayerList from './PlayerList';
import { connect } from 'react-redux';
import { requestDevices, fetchPlayersResponse } from '../redux/player/playerActions';
import { getSocket } from '../socket';
import events from '../events';

const socket = getSocket();

class PlayerListContainer extends Component {
  constructor(props){
    super(props);

    socket.on(events.FETCH_PLAYERS_RESPONSE, this.onPlayersReceived);
  }

  componentDidMount(){
    this.props.requestDevices();
  }

  render() {
    return <PlayerList players={this.props.players}></PlayerList>
  }

  onPlayersReceived = (newDeviceList) => {
    this.props.fetchPlayersResponse(newDeviceList);
  }
}


const mapStateToProps = (state) => {
  return {
    players: state.players.players
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  
  return {
    requestDevices: () => dispatch(requestDevices()),
    fetchPlayersResponse: (deviceList) => dispatch(fetchPlayersResponse(deviceList))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerListContainer);