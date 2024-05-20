import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../toolkit/actions/userActions";
import { resetUser } from "../../toolkit/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../../components";
import { errorToast } from "../../util";
import "./LoginPage.css";
import { ReactComponent as LoginSVG } from "../../assets/welcome-back.svg";

const initialState = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { userToken, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  useEffect(() => {
    if (userToken) {
      navigate("/home", { replace: true });
    }
  }, [userToken, navigate]);

  useEffect(() => {
    if (error) {
      errorToast(error);
      dispatch(resetUser());
    }
  }, [error, dispatch]);

  return (
    <>
      <Navbar />
      <div className="login-wrapper">
        <div className="login-container">
          <div className="login-left">
            <h2>Welcome back!</h2>
            <p>
              Sign in to your account to access your personalized dashboard and
              tools.
            </p>
            <LoginSVG className="svg" />
          </div>
          <div className="login-right">
            <div className="form-headers">
              <h2>Sign in to your account</h2>
              <p>Enter your email and password below to access your account.</p>
            </div>
            <form onSubmit={handleSubmit} className="login-form">
              <div>
                <label>Enter Your Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Enter your Fancy Email"
                  required
                />
              </div>
              <div>
                <label>Enter Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter your Password"
                  required
                />
              </div>
              <button className="submit-button login">Sign In</button>
            </form>
            <span className="form-help">
              New User? <Link to="/user/signup">Click here</Link>
            </span>
            <p className="bottom-right">Made By Rakshit Gumber</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
