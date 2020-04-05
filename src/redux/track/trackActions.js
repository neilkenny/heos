import { getSocket } from '../../socket';
import events from '../../events';

const socket = getSocket();

export const trackChanged = (trackDetails) => {
  return {
    type: TRACK_CHANGED_EVENT,
    trackDetails: trackDetails
  }
}

socket.on(events.TRACK_CHANGED_EVENT, (trackDetails) => {
  
});