import events from '../../events';
import { getSocket } from '../../socket';
import { FETCH_PLAYERS_REQUEST, FETCH_PLAYERS_RESPONSE } from './playerTypes';


const socket = getSocket();

export const fetchPlayersRequest = () => {
  return {
    type: FETCH_PLAYERS_REQUEST,
    waitingForPlayers: true
  };
};

export const fetchPlayersResponse = (device) => {
  return {
    type: FETCH_PLAYERS_RESPONSE,
    payload: device
  }  
};

export const requestDevices = () => {
  
  return (dispatch) => {
    dispatch(fetchPlayersRequest());
    socket.emit(events.FETCH_PLAYERS_REQUEST);
  }
};

