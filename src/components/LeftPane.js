import React, { Component } from 'react';
import PlayerListContainer from './PlayerListContainer';
import SongDetailsContainer from './SongDetailsContainer';
import PlayerControlsContainer from './PlayerControlsContainer';
import VolumeControlsContainer from './VolumeControlsContainer';

export class LeftPaneComponent extends Component  {
  render() {
    return (
      <div className="left-pane">
        <PlayerListContainer></PlayerListContainer>
        <SongDetailsContainer></SongDetailsContainer>
        <div className="bottom-section">
          <div className="bottom-controls">
            <PlayerControlsContainer></PlayerControlsContainer>
            <VolumeControlsContainer></VolumeControlsContainer>
          </div>
        </div>
      </div>
    );
  }
}

