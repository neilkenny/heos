import React, { Component } from 'react';
import VolumeSlider from './VolumeSlider';
import {connect } from 'react-redux';
import { setPlayerVolume } from '../redux/player/playerActions';

export class PlayerList extends Component {
  constructor(props){
    super(props);
    this.onVolumeChanged = this.onVolumeChanged.bind(this);
  }

  render(){
    return !this.props.players.length ? <div>Searching for HEOS devices...</div> : (
      <div>
        {this.props.players.sort((a, b) => a.name > b.name ? 1 : -1).map((player) => {
          return (
            <div key={player.ip}>
              <p>{player.name} - {player.model} ({player.ip})</p>
              <VolumeSlider currentVolume={player.volume} volumeChanged={(level) => this.onVolumeChanged(player.pid, level)}></VolumeSlider>
            </div>
            )})
        }
      </div>
    );
  }

  onVolumeChanged(playerId, level){
    this.props.setVolume(playerId, level);
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setVolume: (playerId, level) => dispatch(setPlayerVolume(playerId, level))
  };
}

export default connect(null, mapDispatchToProps)(PlayerList)