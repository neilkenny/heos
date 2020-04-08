import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSocket } from '../socket';
import events from '../events';
import { songProgressUpdate } from '../redux/progress/progressActions';

const socket = getSocket();

class SongProgressContainer extends Component  {

  constructor(props){
    super(props);
    this.onSongProgressUpdated = this.onSongProgressUpdated.bind(this);

    socket.on(events.PROGRESS_UPDATE, this.onSongProgressUpdated)
  }

  render() {
    return (
      <div className="progress-container">
        <progress id="song-progress" value={this.props.progress.cur_pos} max={this.props.progress.duration}></progress>
      </div>
    );
  }

  onSongProgressUpdated(event){
    console.log(event);
    this.props.updateProgress(event);
  }
}

const mapStateToProps = (state) => {
  return {
    progress: state.progress.progress
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProgress: (progress) => dispatch(songProgressUpdate(progress))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongProgressContainer)