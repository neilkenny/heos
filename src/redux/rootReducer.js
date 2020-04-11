import { combineReducers } from 'redux';
import { playerReducers } from './player/playerReducers';
import { trackReducers } from './track/trackReducers';
import { progressReducers } from './progress/progressReducers';
import { playStateReducers } from './playState/playStateReducers';
import { groupReducers } from './group/groupReducers';

const rootReducer = combineReducers({
  players: playerReducers,
  track: trackReducers,
  progress: progressReducers,
  playState: playStateReducers,
  groups: groupReducers
});

export default rootReducer;