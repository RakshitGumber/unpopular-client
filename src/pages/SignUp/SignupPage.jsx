import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../toolkit/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { Navbar } from "../../components";
import "./SignupPage.css";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { ReactComponent as WelcomeSVG } from "../../assets/welcome.svg";

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

  const { userInfo, success } = useSelector((state) => state.user);
  const [pageNumber, setPageNumber] = useState(0);

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
    // if (success) navigate("../user/login");
    // If the user has details then he is logged in, send him to main screen
    // if (userInfo) navigate("../home");
    //
  }, [navigate, userInfo, success]);

  return (
    <MotionConfig
      transition={{ duration: 0.5, ease: "easeInOut", type: "spring" }}
    >
      <Navbar />
      <div className="signup-wrapper">
        <div className="signup-container">
          <div className="signup-left">
            <h2>Sign up for your account</h2>
            <p>Fill out the form below to create your personalized account.</p>
            <WelcomeSVG className="svg" />
          </div>
          <div className="signup-right">
            <div className="form-headers">
              <h2>Create your Account</h2>
              <p>Enter your information below to get started.</p>
            </div>
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="signup-form"
            >
              <AnimatePresence mode="wait">
                {pageNumber === 0 && (
                  <motion.div
                    key="page1"
                    initial={{ opacity: 0, x: "-100%" }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: "-100%" }}
                    className="page1"
                  >
                    <div className="row">
                      <div>
                        <label htmlFor="firstName">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          onChange={handleChange}
                          placeholder="Eg. John"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          onChange={handleChange}
                          placeholder="Eg. Doe"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="username">Username</label>
                      <input
                        type="text"
                        name="username"
                        onChange={handleChange}
                        placeholder="Eg. JohnDoe"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        placeholder="Eg. john@doe.com"
                        required
                      />
                    </div>
                  </motion.div>
                )}
                {pageNumber === 1 && (
                  <motion.div
                    key="page2"
                    initial={{ opacity: 0, x: "100%" }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: "100%" }}
                    className="page2"
                  >
                    <div>
                      <label htmlFor="dateOfBirth">Date Of Birth</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        placeholder="Password"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="profilepic">Profile Pic</label>
                      <FileBase
                        name="profilepic"
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) =>
                          setFormData({ ...formData, profilepic: base64 })
                        }
                        className="image-input"
                      />
                    </div>
                    <button className="submit-button login">Sign Up</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
            <span className="form-help">
              Already a User? <Link to="/user/login">Click here</Link>
            </span>
            {pageNumber === 0 ? (
              <button
                className="icn-btn bottom-right"
                onClick={() =>
                  setPageNumber((prev) => Math.min(Math.max(prev + 1, 0), 1))
                }
              >
                <FaArrowRight size={24} />
              </button>
            ) : (
              <button
                className="icn-btn bottom-left"
                onClick={() =>
                  setPageNumber((prev) => Math.min(Math.max(prev - 1, 0), 1))
                }
              >
                <FaArrowLeft size={24} />
              </button>
            )}
          </div>
        </div>
      </div>
    </MotionConfig>
  );
};

export default SignupPage;
