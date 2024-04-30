import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../../store/actions/user";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Loader, Sidebar, RightPanel } from "../../components";
import "./UserDetails.css";
import { ShowImage } from "../../util";
import {
  FaPencil,
  FaLocationDot,
  FaRegCalendar,
  FaBriefcase,
} from "react-icons/fa6";
import moment from "moment";
import { UserContext } from "../../App";

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
  const userData = useSelector((state) => state.userReducer.userData);
  let user;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const location = useLocation();

  // Use effect
  useEffect(() => {
    setLoading(true);
    dispatch(getUser(id))
      .then((data) => {
        setLoading(false);
        console.log(data);
        if (
          JSON.parse(localStorage.getItem("user")).user._id === data.user._id
        ) {
          setEditable(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setLoading(false);
      });
  }, [dispatch, id]);

  // Function for logging out
  const logout = () => {
    localStorage.removeItem("user");
    navigate("../");
  };

  // Function for handling for submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateUser(id, formData));
    setEditing(false);
  };

  // Function for handling form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  let aboutData = [];
  if (userData) {
    user = userData.user;
    if (user.location)
      aboutData.push({
        id: 0,
        icon: <FaLocationDot />,
        text: user.location,
      });
    if (user.dateOfBirth)
      aboutData.push({
        id: 1,
        icon: <FaRegCalendar />,
        text: moment(user.dateOfBirth).format("Do MMM y"),
      });

    if (user.desc)
      aboutData.push({
        id: 2,
        icon: <FaBriefcase />,
        text: user.desc,
      });
  }

  return (
    <div div className="user-details-wrapper">
      <Sidebar />
      <div className="main">
        {loading || !userData ? (
          <Loader />
        ) : (
          <>
            <h1>Profile</h1>
            <div className="prof-header">
              <div className="mask" />
              <div className="pic">
                <ShowImage
                  image={user.profilepic}
                  firstname={user.firstName}
                  lastname={user.lastName}
                />
                <div className="status" />
              </div>
              <div className="bottom">
                <div className="user-info">
                  <div>
                    <p className="strong">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="weak">@{user.username}</p>
                  </div>
                  {editable && (
                    <button
                      onClick={() => {
                        setEditing(true);
                      }}
                    >
                      <FaPencil size={24} />
                    </button>
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
                  placeholder={user.firstName}
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
                {user.bio && (
                  <>
                    <p className="weak">"{user.bio}"</p>
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
    </div>
  );
  // sett all data to show user data
};

export default UserDetails;
