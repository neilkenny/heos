import { combineReducers } from 'redux';
import { playerReducers } from './player/playerReducers';
import { trackReducers } from './track/trackReducers';
import { progressReducers } from './progress/progressReducers';
import { playStateReducers } from './playState/playStateReducers';

const rootReducer = combineReducers({
  players: playerReducers,
  track: trackReducers,
  progress: progressReducers,
  playState: playStateReducers
});

export default rootReducer;