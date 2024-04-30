import React from "react";
import "./Landing.css";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="landing-wrapper">
      <h1>Landing</h1>
      <Link to="user/login">Login</Link>
    </div>
  );
};

export default Landing;
