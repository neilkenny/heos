import React, { Component } from 'react';
import { getNowPlaying, getCurrentTrackResponse } from "../redux/track/trackActions";
import events from '../events';
import { connect } from 'react-redux';
import { getSocket } from '../socket';
import SongDetails from './SongDetails';

const socket = getSocket();

class SongDetailsContainer extends Component {
  
  constructor(props){
    super(props);
    socket.on(events.CURRENT_TRACK_DETAILS, this.onTrackDetailsReceieved);
  }

  componentDidMount(){
    this.props.getNowPlaying();
  }

  render(){
    return <SongDetails song={this.props.trackDetails}></SongDetails>
  }

  onTrackDetailsReceieved = (trackDetails) => {
    this.props.getCurrentTrackResponse(trackDetails);
  }
}

const mapStateToProps = (state) => {
  return {
    trackDetails: state.track.nowPlaying
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  
  return {
    getNowPlaying: () => dispatch(getNowPlaying()),
    getCurrentTrackResponse: (trackDetails) => dispatch(getCurrentTrackResponse(trackDetails))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongDetailsContainer);