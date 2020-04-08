import { 
  PLAY_STATE_CHANGED, 
  PLAY_STATE_REQUEST, 
  PLAY_STATE_RESPONSE, 
  TOGGLE_PLAY_PAUSE_REQUEST
} from './playStateTypes';

import events from '../../events';
import {getSocket} from '../../socket';

const socket = getSocket();

export const playStateChanged = (playState) => {
  return {
    type: PLAY_STATE_CHANGED,
    payload: playState
  }
}

export const playStateRequest = () => {
  return {
    type: PLAY_STATE_REQUEST
  }
}

export const playStateResponse = (playState) => {
  return {
    type: PLAY_STATE_RESPONSE,
    payload: playState
  }
}

export const togglePlayPauseRequest = () => {
  return {
    type: TOGGLE_PLAY_PAUSE_REQUEST
  }
}

export const togglePlayPause = () => {
  return (dispatch) => {
    dispatch(togglePlayPauseRequest());
    socket.emit(events.TOGGLE_PLAY_PAUSE);
  }
}