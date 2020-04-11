import {
  GET_GROUPS_REQUEST,
  GET_GROUPS_RESPONSE,
  SET_GROUP_VOLUME
} from './groupTypes';
import events from '../../events';

import { getSocket } from '../../socket';

const socket = getSocket();

export const getGroupsRequest= () => {
  return {
    type: GET_GROUPS_REQUEST
  }
}

export const setGroupVolumeRequest= () => {
  return {
    type: SET_GROUP_VOLUME
  }
}

export const getGroupsResponse = (groups) => {
  return {
    type: GET_GROUPS_RESPONSE,
    payload: groups
  }
}

export const getGroups = () => {
  return (dispatch) => {
    dispatch(getGroupsRequest());
    socket.emit(events.GET_GROUPS_REQUEST);
  }
}

export const setGroupVolume = (groupId, level) => {
  return (dispatch) => {
    dispatch(setGroupVolumeRequest());
    socket.emit(events.SET_GROUP_VOLUME, groupId, level)
  }
}