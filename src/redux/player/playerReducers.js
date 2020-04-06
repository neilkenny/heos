import { FETCH_PLAYERS_REQUEST, FETCH_PLAYERS_RESPONSE } from "./playerTypes";

const initialState = {
  waitingForPlayers: true,
  players: []
};

export const playerReducers = (state = initialState, action) => {
  switch(action.type){
    case FETCH_PLAYERS_REQUEST:
      return {
        ...state,
        waitingForPlayers: true
      };
    case FETCH_PLAYERS_RESPONSE:
      return {
        ...state,
        players: action.payload,
        waitingForPlayers: false
      };

    default:
      return state;
  }
}