import events from '../../events';
import { getSocket } from '../../socket';
import { 
  GET_PLAYERS_REQUEST, 
  GET_PLAYERS_RESPONSE, 
  SET_PLAYER_VOLUME_REQUEST, 
  PLAYER_VOLUME_CHANGED 
} from './playerTypes';


const socket = getSocket();

export const fetchPlayersRequest = () => {
  return {
    type: GET_PLAYERS_REQUEST,
    waitingForPlayers: true
  };
};

export const fetchPlayersResponse = (device) => {
  return {
    type: GET_PLAYERS_RESPONSE,
    payload: device
  }  
};

export const setPlayerVolumeRequest = (playerId, level) => {
  return {
    type: SET_PLAYER_VOLUME_REQUEST,
    payload: { playerId, level }
  }
};

export const playerVolumeChanged = (playerId, level) => {
  return {
    type: PLAYER_VOLUME_CHANGED,
    payload: { playerId, level }
  }
}

export const requestPlayers = () => {
  
  return (dispatch) => {
    dispatch(fetchPlayersRequest());
    socket.emit(events.GET_PLAYERS_REQUEST);
  }
};

export const setPlayerVolume = (playerId, level) => {
  return (dispatch) => {
    if(level <= 20){
      setPlayerVolumeRequest(playerId, level);
      socket.emit(events.SET_VOLUME, playerId, level);
    }
    
  }
}