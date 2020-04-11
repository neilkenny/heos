import React, { Component } from 'react';
import VolumeSlider from './VolumeSlider';

export class GroupList extends Component {
  constructor(props){
    super(props);
  }

  componentDidUpdate(){
    console.log('GroupList Updated');
  }

  render(){
    return !this.props.groups.length ? <div>Searching for Groups...</div> : (
      <div>
        {this.props.groups.sort((a, b) => a.name > b.name ? 1 : -1).map((group) => {
          return (
            <div key={group.gid}>
              <p>{group.name}</p>
              {/* <VolumeSlider currentVolume={player.volume} playerId={player.pid}></VolumeSlider> */}
            </div>
            )})
        }
      </div>
    );
  }
}

export default GroupList