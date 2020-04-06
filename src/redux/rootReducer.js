import { combineReducers } from 'redux';
import { playerReducers } from './player/playerReducers';
import { trackReducers } from './track/trackReducers';

const rootReducer = combineReducers({
  players: playerReducers,
  track: trackReducers
});

export default rootReducer;