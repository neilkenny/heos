import React, { Component } from 'react';
import PlayerListContainer from './PlayerListContainer';
import SongDetailsContainer from './SongDetailsContainer';
import { PlayerControlsComponent } from './PlayerControls';
import { VolumeControlsComponent } from './VolumeControls';

export class LeftPaneComponent extends Component  {
  render() {
    return (
      <div className="left-pane">
        <PlayerListContainer></PlayerListContainer>
        <SongDetailsContainer></SongDetailsContainer>
        <div className="bottom-section">
          <div className="bottom-controls">
            <PlayerControlsComponent></PlayerControlsComponent>
            <VolumeControlsComponent></VolumeControlsComponent>
          </div>
        </div>
      </div>
    );
  }
}

