import React, { Component } from 'react';

export class DeviceList extends Component {
  constructor(props){
    super(props);
    console.log('LOGGING PROPS', this.props);
  }

  componentDidUpdate(){
    console.log('DeviceListComponentUpdated');
  }

  render(){
    return !this.props.devices.length ? <div>Searching for devices...</div> : (
      <div>
        {this.props.devices.map((device) => <p key={device.address}>{device.address}</p>)}
      </div>
    );
  }
}

export default DeviceList