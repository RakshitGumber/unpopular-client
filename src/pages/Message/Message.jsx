import React, { useState, useEffect } from "react";
import { MessagingLeft, MessagingRight } from "../../components";
import { Outlet } from "react-router-dom";

import "./Message.css";

const Message = () => {
  return (
    <div className="message-wrapper">
      <MessagingLeft />
      <div className="message-cont">
        <Outlet />
      </div>
      <MessagingRight />
    </div>
  );
};

export default Message;
