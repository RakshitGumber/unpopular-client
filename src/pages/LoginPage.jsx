import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../toolkit/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  email: "",
  password: "",
};

const LoginPage = ({ setUser }) => {
  const { userInfo } = useSelector((state) => state.user);

  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(formData));
    await setUser(JSON.parse(localStorage.getItem("user")));
    navigate("../home");
  };

  useEffect(() => {
    if (userInfo) navigate("../home");
  }, [navigate, userInfo]);

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
