import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../store/actions/user";
import { useDispatch } from "react-redux";
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
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(formData, navigate));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
