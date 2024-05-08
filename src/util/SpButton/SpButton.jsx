import React from "react";
import "./SpButton.css";

const SpButton = (props) => (
  <button className="spbutton" {...props}>
    <span className="spbutton-content">{props.text}</span>
  </button>
);

export default SpButton;
