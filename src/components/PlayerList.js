import React, { Component } from 'react';
import VolumeSlider from './VolumeSlider';

export class PlayerList extends Component {
  constructor(props){
    super(props);
    console.log('LOGGING PROPS', this.props);
  }

  componentDidUpdate(){
    console.log('PlayerList Updated');
  }

  render(){
    return !this.props.players.length ? <div>Searching for HEOS devices...</div> : (
      <div>
        {this.props.players.map((player) => {
          return (
            <div key={player.ip}>
              <p>{player.name} - {player.model} ({player.ip})</p>
              <VolumeSlider currentVolume={player.volume} playerId={player.pid}></VolumeSlider>
            </div>
            )})
        }
      </div>
    );
  }
}

export default PlayerList