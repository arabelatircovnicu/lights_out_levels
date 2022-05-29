import React from "react";
import "./Button.css";
import lightOn from "./Light_On.png";
import lightOff from "./Light_Off.png";
import imageStyle from "./Button.css";

const { Component } = require("react");

class Button extends Component {
  constructor(props) {
    super(props);
    this.HandleClick = this.HandleClick.bind(this);
  }

  HandleClick() {
    this.props.flipCellsAroundMe();
  }

  render() {
    var src = this.props.Text === 1 ? lightOn : lightOff;

    return (
      <td onClick={this.HandleClick}>
        <img
          src={src}
          alt="Logo"
          className={imageStyle}
          height="80px"
          width="80px"
          style={{ backgroundColor: "green" }}
        />
      </td>
    );
  }
}

export default Button;
