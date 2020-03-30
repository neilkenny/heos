import React, { Component } from 'react';

export class VolumeControlsComponent extends Component  {
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
