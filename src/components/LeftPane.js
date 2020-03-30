import React, { Component } from 'react';
import { DeviceListComponent } from './DeviceList';
import { SongDetailsComponent } from './SongDetails';
import { PlayerControlsComponent } from './PlayerControls';
import { VolumeControlsComponent } from './VolumeControls';

export class LeftPaneComponent extends Component  {
  render() {
    return (
      <div class="left-pane">
        <DeviceListComponent></DeviceListComponent>
        <SongDetailsComponent></SongDetailsComponent>
        <div class="bottom-section">
          <div class="bottom-controls">
            <PlayerControlsComponent></PlayerControlsComponent>
            <div class="discover">
              <button onclick="discoverDevices()">Discover</button>
            </div>
            <VolumeControlsComponent></VolumeControlsComponent>
          </div>
        </div>
      </div>
    );
  }
}

