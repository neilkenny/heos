import React, { Component } from 'react';
import { connect } from 'react-redux';

class AlbumArtContainer extends Component {

  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="image-container">
        <img id="track-img" src={this.props.albumArtUrl}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    albumArtUrl: state.track.nowPlaying.image_url
  }
}

export default connect(mapStateToProps)(AlbumArtContainer);