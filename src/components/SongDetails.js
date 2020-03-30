import React, { Component } from 'react';

export class SongDetailsComponent extends Component  {
  render() {
    return (
    <div class="song-details-container">
      <div class="song-data"><div class="title">Track:</div><div class="data" id="track-title"></div></div>
      <div class="song-data"><div class="title">Album:</div><div class="data" id="track-album"></div></div>
      <div class="song-data"><div class="title">Artist:</div><div class="data" id="track-artist"></div></div>
    </div>
    );
  }
}