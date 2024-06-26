import React, { useEffect, useState } from "react";
import { updateUser } from "../../toolkit/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FileBase from "react-file-base64";
import "./EditProfile.css";
import { errorToast, ShowImage, successToast } from "../../util";
import { IoClose } from "react-icons/io5";
import { resetUser } from "../../toolkit/slices/userSlice";

const initialState = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  profilepic: "",
  username: "",
  email: "",
  password: "",
  location: "",
  desc: "",
};

const EditProfile = ({ setEditing }) => {
  const [formData, setFormData] = useState(initialState);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userInfo, success, error } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.settings);

  useEffect(() => {
    setFormData((prev) => {
      return {
        ...prev,
        profilepic: userInfo.profilepic,
      };
    });
  }, [userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id, formData }));
    setEditing(false);
  };

  const toastConfig = {
    theme: theme === "light-theme" ? "light" : "dark",
  };

  useEffect(() => {
    if (success) {
      successToast("User updated successfully", toastConfig);
      dispatch(resetUser());
    }
    if (error) {
      errorToast("Sorry an unexpected error occurred", toastConfig);
      dispatch(resetUser());
    }
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="update-form-container">
      <form className="update-form">
        <div className="row">
          <div className="left">
            <div className="img-container">
              <ShowImage
                image={formData.profilepic}
                firstname={userInfo.firstName}
                lastname={userInfo.lastName}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setFormData({ ...formData, profilepic: "" });
                }}
                className="icn-btn"
              >
                <IoClose size={24} />
              </button>
            </div>
          </div>
          <div className="right">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              onChange={handleChange}
              placeholder={userInfo.firstName}
            />
            <label htmlFor="lastName">Last Name</label>

            <input
              type="text"
              name="lastName"
              onChange={handleChange}
              placeholder={userInfo.lastName}
            />
          </div>
        </div>
        <FileBase
          type="file"
          value={formData.images}
          onDone={(image) => {
            image.forEach(({ base64 }) => {
              setFormData({
                ...formData,
                images: [...formData.images, base64],
              });
            });
          }}
        />
        <div>
          <label htmlFor="dateOfBirth">Date Of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            onChange={handleChange}
            placeholder={userInfo.dateOfBirth?.value}
          />
        </div>
        <div>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            onChange={handleChange}
            placeholder={userInfo.location?.value ?? "Your Location"}
          />
        </div>
        <div>
          <label htmlFor="desc">Bio</label>
          <input
            type="text"
            name="desc"
            onChange={handleChange}
            placeholder={userInfo.desc ?? "Your Bio"}
          />
        </div>

        <div className="row">
          <button className="btn" type="submit" onClick={handleSubmit}>
            Save Changes
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setEditing(false);
            }}
            className="btn"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
