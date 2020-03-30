import React, { Component } from 'react';

export class PlayerControlsComponent extends Component  {
  render() {
    return (
      <div class="player-controls">
        <div>
          <i class="fas fa-5x fa-chevron-circle-left clickable" onclick="previousTrack()"></i>
          <i id="play-pause-icon" class="fas fa-5x fa-pause clickable" onclick="togglePlayPause()"></i>
          <i class="fas fa-5x fa-chevron-circle-right clickable" onclick="nextTrack()"></i>
        </div>
      </div>
    );
  }
}

