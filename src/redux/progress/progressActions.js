import { SONG_PROGRESS_UPDATE } from './progressTypes';

export const songProgressUpdate = (progress) => {
  return {
    type: SONG_PROGRESS_UPDATE,
    payload: progress
  }
}