import { combineReducers } from 'redux';
import { playerReducers } from './player/playerReducers';
import { trackReducers } from './track/trackReducers';
import { progressReducers } from './progress/progressReducers';

const rootReducer = combineReducers({
  players: playerReducers,
  track: trackReducers,
  progress: progressReducers
});

export default rootReducer;