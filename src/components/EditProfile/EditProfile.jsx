import React, { useState } from "react";
import { updateUser } from "../../toolkit/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FileBase from "react-file-base64";
import "./EditProfile.css";
import { ShowImage } from "../../util";
import { IoClose } from "react-icons/io5";

const initialState = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  profilepic: "",
  username: "",
  email: "",
  password: "",
};

const EditProfile = ({ setEditing }) => {
  const [formData, setFormData] = useState(initialState);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(id, formData));
    setEditing(false);
  };

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
                image={userInfo.profilepic}
                firstname={userInfo.firstName}
                lastname={userInfo.lastName}
              />
              <button
                onClick={() => setFormData({ ...formData, profilepic: null })}
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
            placeholder={userInfo.dateOfBirth}
          />
        </div>
        <div>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            onChange={handleChange}
            placeholder={userInfo.location ?? "Your Location"}
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
            onClick={() => {
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
