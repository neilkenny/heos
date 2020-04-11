import React, { Component } from 'react';
import { connect } from 'react-redux';
import VolumeSlider from './VolumeSlider';
import { setGroupVolume } from  '../redux/group/groupActions';

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
              <VolumeSlider currentVolume={group.volume} volumeChanged={(level) => this.onGroupVolumeChanged(group.gid, level)}></VolumeSlider> 
            </div>
            )})
        }
      </div>
    );
  }

  onGroupVolumeChanged(groupId, level){
    this.props.setGroupVolume(groupId, level);
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setGroupVolume: (groupId, level) => dispatch(setGroupVolume(groupId, level))
  }
}

export default connect(null, mapDispatchToProps)(GroupList);