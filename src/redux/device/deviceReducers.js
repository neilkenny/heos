import { FETCH_DEVICES_REQUEST, FETCH_DEVICES_RESPONSE, SUCCESSFUL_CONNECTION } from "./deviceTypes";

const initialState = {
  waitingForDevices: true,
  devices: []
};

export const devicesReducer = (state = initialState, action) => {
  console.log('DEVICES_REDUCER: ' + action.type);
  switch(action.type){
    case FETCH_DEVICES_REQUEST:
      return {
        ...state,
        waitingForDevices: true
      };
    case FETCH_DEVICES_RESPONSE:
      return {
        ...state,
        devices: action.payload,
        waitingForDevices: false
      };

    case SUCCESSFUL_CONNECTION:
      const device = state.devices.find((device) => device.address === action.payload);
      device.connected = true;
      const newState = Object.assign({}, state);
      return newState;

    default:
      return state;
  }
}