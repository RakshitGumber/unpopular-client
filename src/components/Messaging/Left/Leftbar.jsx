import "./Leftbar.css";
import "../common.css";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import React, { useContext, useEffect, useState } from "react";
import { getRooms } from "../../../toolkit/actions/messagesActions";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../../components";
import { ControlContext } from "..";
import { IoArrowBack, IoClose, IoAdd } from "react-icons/io5";

function Leftbar({ socket }) {
  const [thisRooms, setThisRoom] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, rooms } = useSelector((state) => state.message);
  const [pageLoading, setPageLoading] = useState(true);
  const { showLeftBar, setShowLeftBar } = useContext(ControlContext);
  const [newRoomPanel, setNewRoomPanel] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [roomNameInvalid, setRoomNameInvalid] = useState(false);

  const createNewRoom = () => {
    if (!roomNameInvalid) {
      const roomId = uuidv4();
      socket.emit("new-room-created", { roomId, roomName });
      navigate(`${roomId}/?name=${roomName}`);
    }
  };

  const handleChange = (e) => {
    const roomNameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
    setRoomName(e.target.value);
    if (roomNameRegex.test(roomName)) {
      setRoomNameInvalid(false);
    } else {
      setRoomNameInvalid(true);
    }
  };

  useEffect(() => {
    dispatch(getRooms());
  }, [dispatch]);

  useEffect(() => {
    if (loading) setPageLoading(true);
    if (!loading) {
      setThisRoom(rooms);
      setPageLoading(false);
    }
  }, [loading, rooms]);

  useEffect(() => {
    if (!socket) return;

    socket.on("new-room-created-by-server", ({ roomId, roomName }) => {
      setPageLoading(false);
      setThisRoom([...thisRooms, { roomId, roomName }]);
    });
  }, [socket, thisRooms]);

  if (pageLoading) return <Loader />;

  return (
    <div
      className={`msg-panel-wrapper left-msg-panel ${
        showLeftBar && "show-left-panel"
      }`}
    >
      <div className="flex">
        <button
          className="icn-btn left-btn"
          onClick={() => {
            setShowLeftBar(false);
          }}
        >
          <IoArrowBack size={24} />
        </button>
        <Link to="../home" className="flex">
          <button className="icn-btn back-btn">
            <IoClose size={24} />
          </button>
        </Link>
      </div>
      <div className="rooms">
        {thisRooms.map(({ _id, name, lastMessage, timestamp, msgCount }) => (
          <Link
            key={_id}
            to={`${_id}?name=${name}`}
            onClick={() => setShowLeftBar((prev) => !prev)}
          >
            <div className="left">
              <p>{name}</p>
              <p className="weak">
                {lastMessage ??
                  "Last Message lorem ipsum dolor sit amet la la la hahaha nha anha nah"}
              </p>
            </div>
            <div className="right">
              <p className="timestamp">{timestamp ?? "9:00"}</p>
              <p className="msg-count">
                {msgCount ?? Math.trunc(Math.random() * 10)}
              </p>
            </div>
          </Link> // Make sure to use unique keys for links
        ))}
      </div>
      <button
        className="icn-btn add-btn"
        onClick={() => setNewRoomPanel(!newRoomPanel)}
      >
        <IoAdd size={24} />
      </button>
      {newRoomPanel && (
        <form onSubmit={createNewRoom}>
          <label>Room Name</label>
          <input
            type="text"
            placeholder="room name"
            value={roomName}
            onChange={handleChange}
            className={roomNameInvalid ? "invalid-input" : ""}
          />
          <button type="submit">create</button>
        </form>
      )}
    </div>
  );
}

export default Leftbar;
