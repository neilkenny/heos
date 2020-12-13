import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { getSocket } from '../socket';
import events from '../events';
import { songProgressUpdate } from '../redux/progress/progressActions';

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
  time;

  static getDerivedStateFromProps(props, prevState){
    const progress = (SongProgressContainer.lastRefreshed != SongProgressContainer.lastAccurateUpdate) ? props.progress.cur_pos : prevState.songPosition;
    if(SongProgressContainer.lastRefreshed != SongProgressContainer.lastAccurateUpdate){
      SongProgressContainer.lastAccurateUpdate = SongProgressContainer.lastRefreshed;
    }
    return { songPosition: progress }
  }

  render() {
    return (
      <div className="progress-container">
        {this.songPositionToTime(this.state.songPosition)}
        <progress id="song-progress" value={this.state.songPosition} max={this.props.progress.duration}></progress>
        {this.songPositionToTime(this.props.progress.duration)}
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

  songPositionToTime(songPos){
    let minutes, seconds;
    minutes = (songPos / 60000);
    seconds = (minutes - Math.floor(minutes)) * 60
    return `${Math.floor(minutes)}:${seconds < 10 ? '0' : ''}${Math.floor(seconds)}`;

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