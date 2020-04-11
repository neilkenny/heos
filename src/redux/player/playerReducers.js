import { GET_PLAYERS_REQUEST, GET_PLAYERS_RESPONSE, PLAYER_VOLUME_CHANGED } from "./playerTypes";

const initialState = [

];

export const playerReducers = (state = initialState, action) => {
  switch(action.type){
    case GET_PLAYERS_REQUEST:
      return {
        ...state
      };
    case GET_PLAYERS_RESPONSE:
      return [
        ...
        action.payload
      ]
    case PLAYER_VOLUME_CHANGED:
      const player = state.find((player) => player.pid === action.payload.playerId);
      state.splice(state.indexOf(player), 1);

      player.volume = action.payload.level;
      return [
        ...state, 
        player
      ].sort((a, b) => a.name > b.name ? 1 : -1);
   
    default:
      return state;
  }
}