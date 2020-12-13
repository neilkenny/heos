import React, { Component } from 'react';
import PlayerListContainer from './PlayerListContainer';
import SongDetailsContainer from './SongDetailsContainer';



export default class MainPaneComponent extends Component  {
  render() {
    return (
      <>
        <div className="main-pane">
          <SongDetailsContainer></SongDetailsContainer>
          <div class="pull-to-bottom">
           <PlayerListContainer></PlayerListContainer>
          </div>
        </div>
      </>
    );
  }
}

