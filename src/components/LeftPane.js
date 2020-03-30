import React, { Component } from 'react';
import { DeviceListComponent } from './DeviceList';
import { SongDetailsComponent } from './SongDetails';
import { PlayerControlsComponent } from './PlayerControls';
import { VolumeControlsComponent } from './VolumeControls';

export class LeftPaneComponent extends Component  {
  render() {
    return (
      <div className="left-pane">
        <DeviceListComponent></DeviceListComponent>
        <SongDetailsComponent></SongDetailsComponent>
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

