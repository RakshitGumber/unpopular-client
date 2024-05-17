import React, { useContext, useRef } from "react";
import "./Bottom.css";
import {
  IoAddSharp,
  IoChatboxOutline,
  IoCompassOutline,
  IoPeopleOutline,
  IoPersonCircleOutline,
} from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import CreateFeed from "../../Feed/CreateFeed";
import { FeedControlContext } from "../..";

function Bottom() {
  const user = useSelector((state) => state.user.userInfo);
  const iconSize = useRef(30);
  const location = useLocation();
  const { showCreate, setShowCreate } = useContext(FeedControlContext);

  const data = [
    {
      id: 0,
      name: "Feed",
      path: "/home",
      icon: <IoCompassOutline size={iconSize.current} />,
    },
    {
      id: 1,
      name: "Messages",
      path: `/chat`,
      icon: <IoChatboxOutline size={iconSize.current} />,
    },
    {
      id: 2,
      name: "Friends",
      path: `/people/${user?._id}/followers`,
      morePaths: [
        `/people/${user?._id}/following`,
        `/people/${user?._id}/pending`,
      ],
      icon: <IoPeopleOutline size={iconSize.current} />,
    },
    {
      id: 3,
      name: "Profile",
      path: `/user/${user?._id}/posts`,
      morePaths: [
        `/user/${user?._id}/followers`,
        `/user/${user?._id}/following`,
      ],
      icon: <IoPersonCircleOutline size={iconSize.current} />,
    },
  ];

  return (
    <div className="bottom-bar">
      {data.map((item, index) => (
        <React.Fragment key={index}>
          {index === data.length / 2 && (
            <button
              className="btn"
              onClick={() => {
                setShowCreate(true);
              }}
            >
              <IoAddSharp size={iconSize.current} />
            </button>
          )}
          <Link to={item.path}>
            <div
              className={`btn ${
                location.pathname === item.path ||
                item.morePaths?.includes(location.pathname)
                  ? "selected"
                  : ""
              }`}
            >
              {item.icon}
            </div>
          </Link>
        </React.Fragment>
      ))}
      {showCreate && <CreateFeed setShowCreate={setShowCreate} />}
    </div>
  );
}

export default Bottom;
