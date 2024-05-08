import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../toolkit/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";

const initialState = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  profilepic: "",
  username: "",
  email: "",
  password: "",
};

const SignupPage = () => {
  // const [showFirstPage, setShowFirstPage] = useState(true);
  // const [showSecondPage, setShowSecondPage] = useState(false);
  // const [showThirdPage, setShowThirdPage] = useState(false);

  const { userInfo, success } = useSelector(
    (state) => state.user
  );

  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    formData.email = formData.email.toLowerCase();
    dispatch(signup(formData));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // All the naviagtion and other logic for registration request
  useEffect(() => {
    // Just send him to login if user was created
    if (success) navigate("../login");
    // If the user has details then he is logged in, send him to main screen
    if (userInfo) navigate("../home");
    //
  }, [navigate, userInfo, success]);

  return (
    <div className="form-container">
      <h1 className="form-heading">Sign Up</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="firstName"
          onChange={handleChange}
          placeholder="Eg. John"
          required
        />
        <input
          type="text"
          name="lastName"
          onChange={handleChange}
          placeholder="Eg. Doe"
          required
        />
        <input
          type="text"
          name="username"
          onChange={handleChange}
          placeholder="Eg. JohnDoe"
          required
        />
        <input
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Eg. john@doe.com"
          required
        />
        <input
          type="date"
          name="dateOfBirth"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <FileBase
          type="file"
          multiple={false}
          onDone={({ base64 }) =>
            setFormData({ ...formData, profilepic: base64 })
          }
          className="image-input"
        />
        <button className="login-btn">Sign Up</button>
      </form>
      <span>
        Already a User? <Link to="/user/login">Click here</Link>
      </span>
    </div>
  );
};

export default SignupPage;
