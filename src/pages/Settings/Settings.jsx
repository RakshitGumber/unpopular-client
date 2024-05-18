import React, { useState } from "react";
import "./Settings.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Navbar } from "../../components/index";
import { setTheme } from "../../toolkit/slices/settingsSlice";
import { IoArrowBackSharp } from "react-icons/io5";
import { updateUser } from "../../toolkit/actions/userActions";

const Settings = () => {
  const [showDateOfBirth, setShowDateOFBirth] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleTheme = (e) => {
    dispatch(setTheme(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        id,
        formData: {
          location: { isPublic: showLocation },
          dateOfBirth: { isPublic: showDateOfBirth },
        },
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
            <div>
              <label htmlFor="showDateOFBirth">
                Display date of birth on profile
              </label>
              <input
                type="checkbox"
                name="showDateOFBirth"
                value={showDateOfBirth}
                onChange={() => setShowDateOFBirth(!showDateOfBirth)}
              />
            </div>
            <div>
              <label htmlFor="showLocation">Display location on profile</label>
              <input
                type="checkbox"
                name="showLocation"
                value={showLocation}
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
                className="btn"
              >
                Discard Changes
              </button>
            </div>
          </form>
        </div>
        <div className="theme-settings">
          <h2>Change Theme</h2>
          <select name="theme" onChange={handleTheme}>
            <option value="light-theme" default>
              Light Mode
            </option>
            <option value="dark-theme">Dark Mode</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Settings;
