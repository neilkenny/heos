import React, { Component } from 'react';

export class PlayerControlsComponent extends Component  {
  render() {
    return (
      <div className="player-controls">
        <div>
          <i className="fas fa-5x fa-chevron-circle-left clickable" onClick={this.previousTrack}></i>
          <i id="play-pause-icon" className="fas fa-5x fa-pause clickable" onClick={this.togglePlayPause}></i>
          <i className="fas fa-5x fa-chevron-circle-right clickable" onClick={this.nextTrack}></i>
        </div>
      </div>
    );
  }

  nextTrack = () => {

  }

  previousTrack = () => {

  }

  togglePlayPause = () => {

  }

}

