import React, { useContext } from "react";
import "./Nav.css";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoOptions } from "react-icons/io5";
import { ControlContext } from "..";

function Nav({ roomName }) {
  const { setShowLeftBar, setShowRightBar } = useContext(ControlContext);

  return (
    <div className="msg-nav-wrapper">
      <button onClick={() => setShowLeftBar((prev) => !prev)}>
        <FaBarsStaggered size={24} />
      </button>
      {roomName}
      <button onClick={() => setShowRightBar((prev) => !prev)}>
        <IoOptions size={24} />
      </button>
    </div>
  );
}

export default Nav;
