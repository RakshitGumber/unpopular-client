import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../store/actions/user";
import { useDispatch } from "react-redux";

const initialState = {
  email: "",
  password: "",
};

const LoginPage = ({ setUser }) => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(login(formData)).then(() => {
      setUser(JSON.parse(localStorage.getItem("user")));
      navigate("../home");
    });
  };

  return (
    <>
      <div className="form-container">
        <h1 className="form-heading">Log In</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Enter Your Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter your Fancy Email"
            />
          </div>
          <div>
            <label>Enter Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Enter your Password"
            />
          </div>
          <button className="submit-button login">Log in</button>
        </form>
        <span>
          New User? <Link to="/user/signup">Click here</Link>
        </span>
      </div>
    </>
  );
};

export default LoginPage;
