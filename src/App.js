import React from 'react';
import { LeftPaneComponent } from './components/LeftPane';
import { RightPaneComponent } from './components/RightPane';
import SongProgressContainer from './components/SongProgress';

function AppComponent({  devices, requestDevices }) {

  return  (
    <div className="container">
      <LeftPaneComponent></LeftPaneComponent>
      <RightPaneComponent></RightPaneComponent>
      <SongProgressContainer></SongProgressContainer>
    </div>

    )
}

export default AppComponent;