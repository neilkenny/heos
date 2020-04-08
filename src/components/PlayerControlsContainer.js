import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSocket } from '../socket';
import events from '../events';
import { 
  playStateResponse, 
  playStateChanged, 
  togglePlayPause 
} from '../redux/playState/playStateActions';

const socket = getSocket();

class PlayerControlsContainer extends Component  {
constructor(props){
  super(props);

  this.onPlayStateChanged = this.onPlayStateChanged.bind(this);
  this.onPlayStateResponse = this.onPlayStateResponse.bind(this);
  this.togglePlayPause = this.togglePlayPause.bind(this);


  socket.on(events.PLAY_STATE_RESPONSE, this.onPlayStateResponse);
  socket.on(events.PLAY_STATE_CHANGED, this.onPlayStateChanged);

  this.requestPlayState();

}

  render() {
    return (
      <div className="player-controls">
        <div>
          <i className="fas fa-5x fa-chevron-circle-left clickable" onClick={this.previousTrack}></i>
          <i className={'fas fa-5x clickable ' + (this.props.playState == 'play' ? 'fa-pause' : 'fa-play')} onClick={this.togglePlayPause}></i>
          <i className="fas fa-5x fa-chevron-circle-right clickable" onClick={this.nextTrack}></i>
        </div>
      </div>
    );
  }

  requestPlayState(){
    socket.emit(events.PLAY_STATE_REQUEST);
  }

  onPlayStateChanged(playState){
    this.props.playStateChanged(playState);
  }

  onPlayStateResponse(playState){
    this.props.playStateResponse(playState);
  }

  nextTrack = () => {

  }

  previousTrack = () => {

  }

  togglePlayPause = () => {
    this.props.togglePlayPause();
  }

}

const mapStateToProps = (state) => {
  return {
    playState: state.playState.playState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    playStateResponse: (playState) => dispatch(playStateResponse(playState)),
    playStateChanged: (playState) => dispatch(playStateChanged(playState)),
    togglePlayPause: () => dispatch(togglePlayPause())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerControlsContainer)