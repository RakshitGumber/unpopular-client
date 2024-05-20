import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../toolkit/actions/userActions";
import { sendRequest } from "../../toolkit/actions/followerActions";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import {
  Loader,
  Sidebar,
  Navbar,
  BottomBar,
  EditProfile,
  RightPanel,
} from "../../components";
import "./UserDetails.css";
import { ShowImage } from "../../util";
import {
  FaPencil,
  FaLocationDot,
  FaRegCalendar,
  FaBriefcase,
} from "react-icons/fa6";
import moment from "moment";

const UserDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { userGet, loading, userInfo } = useSelector((state) => state.user);
  const [editable, setEditable] = useState(false);
  const [editing, setEditing] = useState(false);
  const [isFollowing] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const location = useLocation();

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (userGet) {
      if (userInfo._id === userGet._id) {
        setEditable(true);
      } else {
        if (loading) return;
        setEditable(false);
      }
    }
  }, [userGet, userInfo, loading]);

  const sendFollowRequest = () => {
    dispatch(sendRequest({ id: userInfo._id, userId: id }));
    setIsPending(true);
  };

  let aboutData = [];
  if (userGet) {
    if (userGet.location?.isPublic && userGet.location.value)
      aboutData.push({
        id: 0,
        icon: <FaLocationDot />,
        text: userGet.location.value,
      });
    if (userGet.dateOfBirth?.isPublic && userGet.dateOfBirth.value)
      aboutData.push({
        id: 1,
        icon: <FaRegCalendar />,
        text: moment(userGet.dateOfBirth.value).format("Do MMM y"),
      });

    if (userGet.desc)
      aboutData.push({
        id: 2,
        icon: <FaBriefcase />,
        text: userGet.desc,
      });
  }

  return (
    <div className="user-details-wrapper">
      <Navbar hidden />
      <Sidebar />
      <div className="main">
        {loading || !userGet ? (
          <Loader />
        ) : (
          <>
            <h1>Profile</h1>
            <div className="prof-header">
              <div className="mask" />
              <div className="pic">
                <ShowImage
                  image={userGet.profilepic}
                  firstname={userGet.firstName}
                  lastname={userGet.lastName}
                />
                <div className="status" />
              </div>
              <div className="bottom">
                <div className="user-info">
                  <div>
                    <p className="strong">
                      {userGet.firstName} {userGet.lastName}
                    </p>
                    <p className="weak">@{userGet.username}</p>
                  </div>
                  {editable ? (
                    <button
                      onClick={() => {
                        setEditing(true);
                      }}
                    >
                      <FaPencil size={24} />
                    </button>
                  ) : isPending ? (
                    <button>Pending</button>
                  ) : isFollowing ? (
                    <button>Following</button>
                  ) : (
                    <button onClick={sendFollowRequest}>Follow</button>
                  )}
                </div>
              </div>
            </div>
            {/* <button onClick={logout}>Log Out</button> */}
            <div className="content">
              <div className="prof-about">
                <h3>About me</h3>
                {aboutData.map((item) => (
                  <span key={item.id}>
                    {item.icon}&emsp;{item.text}
                  </span>
                ))}
              </div>
              <div className="switch-section">
                <div className="headers">
                  <Link
                    className={
                      location.pathname.includes("posts") ? "selected" : ""
                    }
                    to={`posts`}
                  >
                    Posts
                  </Link>
                  <Link
                    className={
                      location.pathname.includes("followers") ? "selected" : ""
                    }
                    to={`followers`}
                  >
                    Followers
                  </Link>
                  <Link
                    className={
                      location.pathname.includes("following") ? "selected" : ""
                    }
                    to={`following`}
                  >
                    Following
                  </Link>
                </div>
                <div
                  className={`switch-content ${
                    location.pathname.includes("posts") ? "no-padding" : ""
                  }`}
                >
                  <Outlet />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {editing && <EditProfile setEditing={setEditing} />}
      <RightPanel />
      <BottomBar />
    </div>
  );
};

export default UserDetails;
