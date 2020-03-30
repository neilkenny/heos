import { POPULATE_DEVICES_REQUEST, POPULATE_DEVICES_RESPONSE } from './deviceTypes';
import events from '../../events';
import { getSocket } from '../../socket';

const socket = getSocket();

export const populateDevicesRequest = () => {
  return {
    type: POPULATE_DEVICES_REQUEST,
    waitingForDevices: true
  };
};

export const populateDevicesResponse = (devices) => {
  return {
    type: POPULATE_DEVICES_RESPONSE,
    payload: devices  
  }  
};

export const requestDevices = () => {
  
  return (dispatch) => {
    dispatch(populateDevicesRequest());
    socket.emit(events.DISCOVER_DEVICES);
    
    socket.on(events.DEVICES_DISCOVERED, (deviceInfo) => {
      dispatch(populateDevicesResponse(deviceInfo))
    });
  }
};

