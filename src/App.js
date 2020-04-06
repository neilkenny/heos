import React from 'react';
import { connect } from 'react-redux';
import { LeftPaneComponent } from './components/LeftPane';
import { RightPaneComponent } from './components/RightPane';
import { SongProgressComponent } from './components/SongProgress';
import { requestDevices } from './redux/player/playerActions';

function AppComponent({  devices, requestDevices }) {

  return  (
    <div className="container">
      <LeftPaneComponent></LeftPaneComponent>
      <RightPaneComponent></RightPaneComponent>
      <SongProgressComponent></SongProgressComponent>
    </div>

    )
}

export default AppComponent;