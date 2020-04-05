import React, { Component } from 'react';
import DeviceList from './DeviceList';
import { connect } from 'react-redux';
import { requestDevices, fetchDevicesResponse, successfulConnection } from '../redux/device/deviceActions';
import { getSocket } from '../socket';
import events from '../events';

const socket = getSocket();

class DeviceListContainer extends Component {
  constructor(props){
    super(props);

    socket.on(events.FETCH_DEVICES_RESPONSE, this.onDevicesFetched);
    socket.on(events.SUCCESSFUL_CONNECTION, this.onSuccessfulConnection);
  }

  componentDidMount(){
    this.props.requestDevices();
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    console.log('UPDATEING COMPONENT');
    console.log(prevProps);
    console.log(prevState);
    console.log(snapshot);

  }
  
  render() {
    return <DeviceList devices={this.props.devices}></DeviceList>
  }

  onDevicesFetched = (newDeviceList) => {
    this.props.fetchDevicesResponse(newDeviceList);

    newDeviceList.forEach((device) => {
      socket.emit(events.CONNECT_TO_DEVICE, device.address);
    });
  }

  onSuccessfulConnection = (deviceAddress) => {
    this.props.successfulConnection(deviceAddress);
  }
}


const mapStateToProps = (state) => {
  return {
    devices: state.devices.devices
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  
  return {
    requestDevices: () => dispatch(requestDevices()),
    fetchDevicesResponse: (deviceList) => dispatch(fetchDevicesResponse(deviceList)),
    successfulConnection: (deviceAddress) => dispatch(successfulConnection(deviceAddress))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceListContainer);