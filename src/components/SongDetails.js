import React, { Component } from 'react';

export class SongDetailsComponent extends Component  {
  render() {
    return (
    <div className="song-details-container">
      <div className="song-data"><div className="title">Track:</div><div className="data" id="track-title"></div></div>
      <div className="song-data"><div className="title">Album:</div><div className="data" id="track-album"></div></div>
      <div className="song-data"><div className="title">Artist:</div><div className="data" id="track-artist"></div></div>
    </div>
    );
  }
}