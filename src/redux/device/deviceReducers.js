import { POPULATE_DEVICES_RESPONSE, POPULATE_DEVICES_REQUEST } from "./deviceTypes";

const initialState = {
  waitingForDevices: true,
  devices: []
};

export const devicesReducer = (state = initialState, action) => {
  switch(action.type){
    case POPULATE_DEVICES_REQUEST:
      return {
        ...state,
        waitingForDevices: true
      };
    case POPULATE_DEVICES_RESPONSE:
      return {
        devices: action.payload,
        waitingForDevices: false
      };
    default:
      return state;
  }
}