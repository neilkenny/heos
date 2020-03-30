import React, { Component } from 'react';
import { LeftPaneComponent } from './components/LeftPane';
import { RightPaneComponent } from './components/RightPane';
import { SongProgressComponent } from './components/SongProgress';

export default class App extends Component {
  render() {
    return (
    <div class="container">
      <LeftPaneComponent></LeftPaneComponent>
      <RightPaneComponent></RightPaneComponent>
      <SongProgressComponent></SongProgressComponent>
    </div>

    )
  }
}