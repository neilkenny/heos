import events from '../../events';
import { getSocket } from '../../socket';
import { FETCH_DEVICES_REQUEST, FETCH_DEVICES_RESPONSE, SUCCESSFUL_CONNECTION } from './deviceTypes';


const socket = getSocket();

export const fetchDevicesRequest = () => {
  return {
    type: FETCH_DEVICES_REQUEST,
    waitingForDevices: true
  };
};

export const fetchDevicesResponse = (device) => {
  return {
    type: FETCH_DEVICES_RESPONSE,
    payload: device
  }  
};

export const connectToDevice = (deviceAddress) => {
  return {
    type: FETCH_DEVICES_RESPONSE,
    payload: deviceAddress
  }  
};

export const successfulConnection = (deviceAddress) => {
  return {
    type: SUCCESSFUL_CONNECTION,
    payload: deviceAddress
  }  
};

export const requestDevices = () => {
  
  return (dispatch) => {
    dispatch(fetchDevicesRequest());
    socket.emit(events.FETCH_DEVICES_REQUEST);
  }
};

