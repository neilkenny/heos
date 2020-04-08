import { SONG_PROGRESS_UPDATE, PLAY_STATE_RESPONSE, PLAY_STATE_CHANGED } from './progressTypes';

const initialState = {
  progress: {}
};

export const progressReducers = (state = initialState, action) => {
  switch(action.type){
    case SONG_PROGRESS_UPDATE:
      return {
        ...state,
        progress: action.payload
      };
 
    default: 
      return state;
  }
}