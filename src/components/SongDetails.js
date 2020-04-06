import React, { Component } from 'react';

class SongDetails extends Component  {

  constructor(props){
    super(props);
  }

  render() {
    return (
    <div className="song-details-container">
      <div className="song-data"><div className="title">Track:</div><div className="data" id="track-title">{this.props.title}</div></div>
      <div className="song-data"><div className="title">Album:</div><div className="data" id="track-album"></div></div>
      <div className="song-data"><div className="title">Artist:</div><div className="data" id="track-artist"></div></div>
    </div>
    );
  }
}

export default SongDetails;