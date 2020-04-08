import React, { Component } from 'react';
import AlbumArtContainer from './AlbumArtContainer';

export class RightPaneComponent extends Component  {
  render() {
    return (
      <div className="right-pane">
        <AlbumArtContainer></AlbumArtContainer>
      </div>
    );
  }
}

