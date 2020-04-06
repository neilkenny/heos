import React, { Component } from 'react';

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
        {this.props.players.map((player) => <p key={player.address}>{player.name} - {player.model} ({player.ip})</p>)}
      </div>
    );
  }
}

export default PlayerList