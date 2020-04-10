import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import { setPlayerVolume } from '../redux/player/playerActions';


const Handle = Slider.Handle;
const wrapperStyle = { width: '80%', margin: 10 };

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

class VolumeSlider extends Component {
  constructor(props){
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  static isMouseDown;

  /**
   * Update the slider position to match the volume, but not if we
   * are dragging the slider. This allows us to update the slider when
   * the volume is changed externally
   * @param {*} props 
   */
  static getDerivedStateFromProps(props){
    if(!VolumeSlider.isMouseDown){
      return { sliderPosition: props.currentVolume }  
    }    
  }

  render(){
    return (
    <div style={wrapperStyle}>
      <Slider min={0} max={100} defaultValue={this.props.currentVolume} value={this.state.sliderPosition} handle={handle} onChange={this.handleChange} onAfterChange={(level) => this.props.setVolume(this.props.playerId, level)} />
    </div>
    )
  }

  componentDidMount(){
    const me = this;
    this.element = ReactDOM.findDOMNode(this);
    this.element.addEventListener('mousedown', () => {
      VolumeSlider.isMouseDown = true;
    });

    this.element.addEventListener('mouseup', () => {
      VolumeSlider.isMouseDown = false;
    });
    
  }

  componentDidUpdate(prevProps, prevState){

  }

  handleChange(level){
    console.log(this);
    this.setState({sliderPosition: level});
  }
}

const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return {
    setVolume: (playerId, level) => dispatch(setPlayerVolume(playerId, level))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VolumeSlider);