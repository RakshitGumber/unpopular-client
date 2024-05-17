import "./Rightbar.css";
import "../common.css";
import React, { useContext } from "react";

import { ControlContext } from "..";
import { IoArrowForward } from "react-icons/io5";

function Rightbar({ socket }) {
  const { showRightBar, setShowRightBar } = useContext(ControlContext);

  return (
    <div
      className={`msg-panel-wrapper right-msg-panel ${
        showRightBar && "show-right-msg"
      }`}
    >
      <button
        className="icn-btn"
        onClick={() => setShowRightBar((prev) => !prev)}
      >
        <IoArrowForward size={24} />
      </button>
    </div>
  );
}

export default Rightbar;
