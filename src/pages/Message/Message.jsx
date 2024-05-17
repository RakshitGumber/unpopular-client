import React, { useState } from "react";
import { MessagingLeft, MessagingRight, Navbar } from "../../components";
import { Outlet, useLocation } from "react-router-dom";

import "./Message.css";
import { ControlContext } from "../../components/Messaging";
import { FaBarsStaggered } from "react-icons/fa6";

const Message = ({ socket }) => {
  const [showLeftBar, setShowLeftBar] = useState(false);
  const [showRightBar, setShowRightBar] = useState(false);
  const { pathname } = useLocation();

  return (
    <ControlContext.Provider
      value={{ showLeftBar, setShowLeftBar, showRightBar, setShowRightBar }}
    >
      <Navbar />
      <div className="message-wrapper">
        <MessagingLeft socket={socket} />
        <div className="message-cont">
          {pathname === "/chat" && (
            <button className="icn-btn" onClick={() => setShowLeftBar(true)}>
              <FaBarsStaggered size={24} />
            </button>
          )}
          <Outlet />
        </div>
        <MessagingRight socket={socket} />
      </div>
    </ControlContext.Provider>
  );
};

export default Message;
