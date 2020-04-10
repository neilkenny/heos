import { getSocket } from '../../socket';
import events from '../../events';
import { GET_NOW_PLAYING_REQUEST, GET_NOW_PLAYING_RESPONSE} from './trackTypes';

const socket = getSocket();

export const getNowPlayingRequest = () => {
  return {
    type: GET_NOW_PLAYING_REQUEST
  }
}

export const getCurrentTrackResponse = (trackInfo) => {
  return {
    type: GET_NOW_PLAYING_RESPONSE,
    payload: trackInfo
  }
}

export const getNowPlaying = () => {
  return (dispatch) => {
    dispatch(getNowPlayingRequest());
    socket.emit(events.GET_NOW_PLAYING);
  }
}
