import React from 'react';
import { connect } from 'react-redux';
import { LeftPaneComponent } from './components/LeftPane';
import { RightPaneComponent } from './components/RightPane';
import { SongProgressComponent } from './components/SongProgress';
import { requestDevices } from './redux/device/deviceActions';

function AppComponent({  devices, requestDevices }) {

  return  (
    <div className="container">
      <LeftPaneComponent></LeftPaneComponent>
      <RightPaneComponent></RightPaneComponent>
      <SongProgressComponent></SongProgressComponent>
    </div>

    )
}
const mapStateToProps = (state, ownProps) => {
  return {
    devices: state.devices
  }
}
  
const mapDispatchToProps = (dispatch) => {
  return {
    requestDevices: () => dispatch(requestDevices())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);