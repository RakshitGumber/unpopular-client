import React, { useState, useRef, useEffect, useContext } from "react";
import "./Sidebar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  IoPeopleOutline,
  IoPersonCircleOutline,
  IoChatboxOutline,
  IoCompassOutline,
  IoAddSharp,
} from "react-icons/io5";
import CreateFeed from "../Feed/CreateFeed";
import { useOutsideClick, ShowImage } from "../../util";
import { UserContext } from "../../App";

function Sidebar() {
  const iconSize = 32;
  const [showUserActions, setShowUserActions] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const actionsRef = useRef(null);
  const userRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  // Custome hook to detect if the person clicked outside
  useOutsideClick(actionsRef, () => setShowUserActions(false), {
    notOnRef: userRef,
  });

  const data = [
    {
      id: 0,
      name: "Feed",
      path: "/home",
      icon: <IoCompassOutline size={iconSize} />,
    },
    {
      id: 1,
      name: "Messages",
      path: `/user/${user._id}/chat/`,
      icon: <IoChatboxOutline size={iconSize} />,
    },
    {
      id: 3,
      name: "Friends",
      path: `/people/${user._id}/followers`,
      morePaths: [
        `/people/${user._id}/following`,
        `/people/${user._id}/pending`,
      ],
      icon: <IoPeopleOutline size={iconSize} />,
    },
    {
      id: 2,
      name: "Profile",
      path: `/user/${user._id}/posts`,
      morePaths: [`/user/${user._id}/followers`, `/user/${user._id}/following`],
      icon: <IoPersonCircleOutline size={iconSize} />,
    },
  ];

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="sidebar-wrapper">
      <h1>U</h1>
      <div className="user-wrapper">
        <div ref={userRef} className="user">
          <ShowImage
            image={user.profilepic}
            firstname={user.firstName}
            lastname={user.lastName}
          />
          <div
            className="user-info"
            onClick={() => setShowUserActions(!showUserActions)}
          >
            <p className="strong">
              {user.firstName} {user.lastName}
            </p>
            <p className="weak">@{user.username}</p>
          </div>
        </div>
      </div>
      <div className="elements">
        <div
          className="btn"
          onClick={() => {
            setShowCreate(true);
          }}
        >
          <IoAddSharp />
          <span className="name">Create</span>
        </div>
        {data.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={
              location.pathname === item.path ||
              item.morePaths?.includes(location.pathname)
                ? "selected"
                : ""
            }
          >
            <div className="btn">
              {item.icon}
              <span className="name">{item.name}</span>
            </div>
          </Link>
        ))}
      </div>
      {showUserActions && (
        <div ref={actionsRef} className="user-actions">
          <button
            className="action"
            onClick={() => {
              localStorage.removeItem("user");
              navigate("../");
            }}
          >
            Log Out
          </button>
        </div>
      )}
      {showCreate && <CreateFeed />}
    </div>
  );
}

export default Sidebar;
