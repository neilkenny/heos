import React, { Component } from 'react';

export class SongProgressComponent extends Component  {
  render() {
    return (
      <div className="progress-container">
        <progress id="song-progress"></progress>
      </div>
    );
  }
}