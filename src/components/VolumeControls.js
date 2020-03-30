import React, { Component } from 'react';

export class VolumeControlsComponent extends Component  {
  render() {
    return (
      <div class="volume-controls">
        <i class="fas fa-3x fa-chevron-up clickable" onClick={this.volumeUp}></i>
        <div id="current-volume-level" class="volume-text"></div>
        <i class="fas fa-3x fa-chevron-down clickable" onclick="volumeDown()"></i>
      </div>
    );
  }

  volumeUp = () => {
    alert('Volume Up');
  }
}
