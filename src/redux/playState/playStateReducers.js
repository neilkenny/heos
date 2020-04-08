import { 
  PLAY_STATE_RESPONSE, 
  PLAY_STATE_CHANGED
} from './playStateTypes';

const initialState = {
  playState: undefined
};

export const playStateReducers = (state = initialState, action) => {
  switch(action.type){
    case PLAY_STATE_RESPONSE:
    case PLAY_STATE_CHANGED:
      return {
        ...state,
        playState: action.payload
      };

    default: 
      return state;
  }
}