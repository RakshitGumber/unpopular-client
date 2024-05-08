import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../../toolkit/actions/userActions";
import { sendRequest } from "../../toolkit/actions/followerActions";
import {
  Link,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import {
  Loader,
  Sidebar,
  RightPanel,
  TopBar,
  BottomBar,
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

const initialState = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  profilepic: "",
  username: "",
  email: "",
  password: "",
};

const UserDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { userGet, loading, userInfo } = useSelector((state) => state.user);
  const { following, pending } = useSelector((state) => state.people);
  const [editable, setEditable] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [isFollowing,] = useState(false);
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
        console.log(following, pending);
      }
    }
  }, [userGet, userInfo, following, loading, pending]);

  const sendFollowRequest = () => {
    dispatch(sendRequest({ id: userInfo._id, userId: id }));
    setIsPending(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateUser(id, formData));
    setEditing(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  let aboutData = [];
  if (userGet) {
    if (userGet.location)
      aboutData.push({
        id: 0,
        icon: <FaLocationDot />,
        text: userGet.location,
      });
    if (userGet.dateOfBirth)
      aboutData.push({
        id: 1,
        icon: <FaRegCalendar />,
        text: moment(userGet.dateOfBirth).format("Do MMM y"),
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
      <TopBar />
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

            {/* Editing function displys form */}
            {editing && (
              <>
                <input
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  placeholder={userGet.firstName}
                />
                <button type="submit" onClick={handleSubmit}>
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setEditing(false);
                  }}
                >
                  Cancel
                </button>
              </>
            )}
            {/* <button onClick={logout}>Log Out</button> */}
            <div className="content">
              <div className="prof-about">
                <h3>About me</h3>
                {userGet.bio && (
                  <>
                    <p className="weak">"{userGet.bio}"</p>
                  </>
                )}
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
                <div className="switch-content">
                  <Outlet />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <RightPanel />
      <BottomBar />
    </div>
  );
};

export default UserDetails;