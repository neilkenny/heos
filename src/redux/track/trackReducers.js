import { GET_NOW_PLAYING_RESPONSE } from "./trackTypes";


const initialState = {
  nowPlaying: {}
};

export const trackReducers = (state = initialState, action) => {
  switch(action.type){
    case GET_NOW_PLAYING_RESPONSE:
      return {
        ...state,
        nowPlaying: action.payload
      };

      default: return state;
  }
}