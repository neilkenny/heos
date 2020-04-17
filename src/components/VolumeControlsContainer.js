import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSocket } from '../socket';

const socket = getSocket();

export class VolumeControlsContainer extends Component  {

  constructor(props){
    super(props);
    
  }
  
  render() {
    return (
      <div className="volume-controls">
        <i className="fas fa-3x fa-chevron-up clickable" onClick={this.volumeUp}></i>
        <div id="current-volume-level" className="volume-text"></div>
        <i className="fas fa-3x fa-chevron-down clickable" onClick={this.volumeDown}></i>
      </div>
    );
  }

  volumeUp = () => {
    alert('Volume Up');
  }

  volumeDown = () => {

  }
}

const mapStateToProps = (state) => {
  return {

  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VolumeControlsContainer)
