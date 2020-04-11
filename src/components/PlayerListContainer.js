import React, { Component } from 'react';
import PlayerList from './PlayerList';
import { connect } from 'react-redux';
import { requestPlayers, fetchPlayersResponse, playerVolumeChanged } from '../redux/player/playerActions';
import { getSocket } from '../socket';
import events from '../events';

const socket = getSocket();

class PlayerListContainer extends Component {
  constructor(props){
    super(props);

    this.onPlayersReceived = this.onPlayersReceived.bind(this);
    this.onPlayerVolumeChanged = this.onPlayerVolumeChanged.bind(this);
    
    socket.on(events.GET_PLAYERS_RESPONSE, this.onPlayersReceived);
    socket.on(events.PLAYER_VOLUME_CHANGED, this.onPlayerVolumeChanged);
  }

  componentDidMount(){
    this.props.requestPlayers();
  }

  render() {
    return <PlayerList players={this.props.players}></PlayerList>
  }

  onPlayersReceived = (newDeviceList) => {
    this.props.fetchPlayersResponse(newDeviceList);
  }

  onPlayerVolumeChanged(playerId, level) {
    this.props.playerVolumeChanged(playerId, level);
  }
}


const mapStateToProps = (state) => {
  return {
    players: state.players
  }
}

const mapDispatchToProps = (dispatch) => {
  
  return {
    requestPlayers: () => dispatch(requestPlayers()),
    fetchPlayersResponse: (deviceList) => dispatch(fetchPlayersResponse(deviceList)),
    playerVolumeChanged: (playerId, level) => dispatch(playerVolumeChanged(playerId, level))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerListContainer);