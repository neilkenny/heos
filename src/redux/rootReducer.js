import { combineReducers } from 'redux';
import { devicesReducer } from './device/deviceReducers'

const rootReducer = combineReducers({
  devices: devicesReducer
});

export default rootReducer;