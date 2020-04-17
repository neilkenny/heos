import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSocket } from '../socket';
import events from '../events';
import { songProgressUpdate } from '../redux/progress/progressActions';
import { VolumeControlsContainer } from './VolumeControlsContainer';

const socket = getSocket();

class SongProgressContainer extends Component  {

  constructor(props){
    super(props);
    this.onSongProgressUpdated = this.onSongProgressUpdated.bind(this);
    this.startProgressBar = this.startProgressBar.bind(this);
    this.stopProgressBar = this.stopProgressBar.bind(this);

    this.state = {
      songPosition: undefined
    }
    socket.on(events.PROGRESS_UPDATE, this.onSongProgressUpdated);
  }

  static lastRefreshed;
  static lastAccurateUpdate;

  static getDerivedStateFromProps(props, prevState){
    if(SongProgressContainer.lastRefreshed != SongProgressContainer.lastAccurateUpdate){
      SongProgressContainer.lastAccurateUpdate = SongProgressContainer.lastRefreshed;
      return { songPosition: props.progress.cur_pos }
    }
    else{
      return { songPosition: prevState.songPosition };
    }
    
  }

  render() {
    return (
      <div className="progress-container">
        {this.state.songPosition}
        <progress id="song-progress" value={this.state.songPosition} max={this.props.progress.duration}></progress>
        {this.props.progress.duration}
      </div>
    );
  }

  componentDidUpdate(){
    if(this.props.playState == 'play' && !this.isPlaying) {
      this.startProgressBar();
    }
    else if(this.props.playState != 'play' && this.isPlaying) {
      this.stopProgressBar();
    }
  }

  stopProgressBar(){
    clearInterval(this.intervalSubscription);
    this.isPlaying = false;
  }

  startProgressBar(){
    const me = this;
    this.isPlaying = true;
    this.intervalSubscription = setInterval(() => {
      if(me.state.songPosition){
        me.setState({songPosition: me.state.songPosition + 100})
      }
    }, 100);
  }

  onSongProgressUpdated(event){
    SongProgressContainer.lastRefreshed = new Date();
    console.log(event);
    this.props.updateProgress(event);
  }
}

const mapStateToProps = (state) => {
  return {
    progress: state.progress.progress,
    playState: state.playState.playState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProgress: (progress) => dispatch(songProgressUpdate(progress))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongProgressContainer)