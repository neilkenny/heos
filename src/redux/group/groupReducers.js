import { GET_GROUPS_REQUEST, GET_GROUPS_RESPONSE } from "./groupTypes";


const initialState = [];

export const groupReducers = (state = initialState, action) => {
  switch (action.type){
    case GET_GROUPS_RESPONSE:
      return [
        ...
        action.payload
      ]
    default:
      return state;
  }
}