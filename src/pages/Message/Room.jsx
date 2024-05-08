import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { MessagingMain } from "../../components";

const Room = ({ socket }) => {
  const params = useParams();

  useEffect(() => {
    if (!socket) return;
    socket.emit(`join-room`, { roomId: params.roomId });
  }, [params, socket]);

  return (
    <div>
      <MessagingMain socket={socket} />
    </div>
  );
};

export default Room;
