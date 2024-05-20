import React, { useRef, useContext } from "react";
import "./Sidebar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  IoPeopleOutline,
  IoPersonCircleOutline,
  IoCompassOutline,
  IoAddSharp,
  IoSettingsSharp,
  IoExit,
} from "react-icons/io5";
import CreateFeed from "../Feed/CreateFeed";
import { useOutsideClick, ShowImage } from "../../util";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../toolkit/slices/userSlice";
import { FeedControlContext, UserActionsControlContext } from "..";

function Sidebar() {
  const iconSize = useRef(32);
  const {
    setShowUserActions,
    sidebarRef,
    showUserActions,
    sidebarIconRef,
    navbarIconRef,
  } = useContext(UserActionsControlContext);

  const { showCreate, setShowCreate } = useContext(FeedControlContext);
  const actionsRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();

  // Custome hook to detect if the person clicked outside
  useOutsideClick(actionsRef, () => setShowUserActions(!showUserActions), {
    notOnRefs: [sidebarRef, sidebarIconRef, navbarIconRef],
  });

  const data = [
    {
      id: 0,
      name: "Feed",
      path: "/home",
      morePaths: ["/posts/"],
      icon: <IoCompassOutline size={iconSize.current} />,
    },

    {
      id: 3,
      name: "People",
      path: `/people/${user?._id}/followers`,
      morePaths: [
        `/people/${user?._id}/following`,
        `/people/${user?._id}/pending`,
      ],
      icon: <IoPeopleOutline size={iconSize.current} />,
    },
    {
      id: 2,
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
    <>
      <div className="sidebar-wrapper">
        <h1>U</h1>
        <div className="user-wrapper">
          <div ref={sidebarRef} className="user">
            <ShowImage
              image={user?.profilepic}
              firstname={user?.firstName}
              lastname={user?.lastName}
              onClick={() => setShowUserActions(!showUserActions)}
              ref={sidebarIconRef}
            />
            <div
              className="user-info"
              onClick={() => setShowUserActions(!showUserActions)}
            >
              <p className="strong">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="weak">@{user?.username}</p>
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
            <IoAddSharp size={iconSize.current} />
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
      </div>
      {showCreate && <CreateFeed setShowCreate={setShowCreate} />}
      {showUserActions && (
        <div ref={actionsRef} className="user-actions">
          <button
            className="action"
            onClick={() => {
              dispatch(logout());
              navigate("/", { replace: true });
            }}
          >
            <IoExit />
            Log Out
          </button>
          <button
            className="action"
            onClick={() => {
              navigate(`../user/${user?._id}/settings`);
            }}
          >
            <IoSettingsSharp />
            Settings
          </button>
        </div>
      )}
    </>
  );
}

export default Sidebar;
