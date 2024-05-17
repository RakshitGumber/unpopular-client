import React from "react";
import "./SpButton.css";

const SpButton = (props) => (
  <button
    className={`spbutton ${props.red === "true" && "sp-red"} ${
      props.square === "true" && "square"
    }`}
    disabled={props.disabled}
    onClick={props.onClick}
    {...props}
  >
    <span className="spbutton-content">{props.text || props.children}</span>
  </button>
);

export default SpButton;
