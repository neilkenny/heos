import { Component } from "react";

export default class SectionWrapperComponent extends Component {

  constructor(props){
    super(props)
  }

  render(){
    return (
      <div className="section-wrapper">
        <div className="section-name">
          {this.props.name}
        </div>
        {this.props.children}
      </div>
    )
  }

}