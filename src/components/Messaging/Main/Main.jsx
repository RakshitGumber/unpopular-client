import React, { useState, useEffect } from "react";
import "./Main.css";
import { Loader } from "../../index";

import { FaPaperPlane } from "react-icons/fa6";
import { useParams } from "react-router-dom";

export default function Main({ socket }) {
  const [message, setMessage] = useState("");
  const { roomId } = useParams();
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!socket) return;

    socket.on("message-from-server", (data) => {
      setChat([...chat, { message: data, received: true }]);
    });

    socket.on("typing-from-server", () => setTyping(true));
    socket.on("typed-from-server", () => setTyping(false));
  }, [socket, chat]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.length === 0) return;
    socket.emit("chat-message", { message, roomId });
    setChat([...chat, { message, received: false }]);
    setMessage("");
  };

  const handleInput = (e) => {
    let timeOut;
    setMessage(e.target.value);
    socket.emit("typing", { roomId });
    if (timeOut) {
      clearTimeout(timeOut);
    }
    timeOut = setTimeout(() => {
      socket.emit("typed");
    }, 1000);
  };

  if (!socket) return <Loader />;

  return (
    <div className="chat-wrapper">
      <div className="top">
        {chat.map((data) => (
          <div className={data.received ? "left-bubble" : "right-bubble"}>
            <p className="chat-bubble">{data.message}</p>
          </div>
        ))}
      </div>
      <div className="bottom">
        {typing && <span>Typing...</span>}
        <form onSubmit={handleSubmit} className="msg-input-form">
          <input
            type="text"
            placeholder="Write your message"
            value={message}
            onChange={handleInput}
          />
          <button type="submit">
            <FaPaperPlane size="20" />
          </button>
        </form>
      </div>
    </div>
  );
}
