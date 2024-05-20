import React, { useState } from "react";
import "./Settings.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../../components/index";
import { setTheme } from "../../toolkit/slices/settingsSlice";
import { IoArrowBackSharp } from "react-icons/io5";
import { updateUser } from "../../toolkit/actions/userActions";

const Settings = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const [showLocation, setShowLocation] = useState(userInfo.location.isPublic);
  const [showDateOfBirth, setShowDateOFBirth] = useState(
    userInfo.dateOfBirth.isPublic
  );
  const { theme } = useSelector((state) => state.settings);

  const handleTheme = (theme) => {
    dispatch(setTheme(theme));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      isLocationPublic: showLocation,
      isDOBPublic: showDateOfBirth,
      dateOfBirth: userInfo.dateOfBirth.value,
      location: userInfo.location.value,
    };
    console.log(formData);
    dispatch(
      updateUser({
        id,
        formData,
      })
    );
  };

  return (
    <>
      <Navbar />
      <div className="setting-conatiner">
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate("../home");
            }}
          >
            <IoArrowBackSharp size="24" />
          </button>
          <h1>Settings</h1>
        </div>
        <div>
          <h2>Profile</h2>
          <form onSubmit={handleSubmit} className="profile-settings">
            <div className="option">
              <label htmlFor="showDateOFBirth">
                Display date of birth on profile
              </label>
              <input
                type="checkbox"
                name="showDateOFBirth"
                value={showDateOfBirth}
                checked={showDateOfBirth}
                onChange={() => setShowDateOFBirth(!showDateOfBirth)}
              />
            </div>
            <div className="option">
              <label htmlFor="showLocation">Display location on profile</label>
              <input
                type="checkbox"
                name="showLocation"
                value={showLocation}
                checked={showLocation}
                onChange={() => setShowLocation(!showLocation)}
              />
            </div>
            <div className="row">
              <button type="submit" className="btn">
                Save Changes
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowDateOFBirth(false);
                  setShowLocation(false);
                  navigate("../home");
                }}
                className="btn red"
              >
                Discard Changes
              </button>
            </div>
          </form>
        </div>
        <div className="theme-settings">
          <h2>Change Theme</h2>
          <div className="row">
            <button
              className={`btn ${theme === "dark-theme" ? "selected" : ""}`}
              onClick={() => handleTheme("dark-theme")}
            >
              Dark Theme
            </button>
            <button
              className={`btn ${theme === "light-theme" ? "selected" : ""}`}
              onClick={() => handleTheme("light-theme")}
            >
              Light Theme
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
