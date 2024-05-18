import React from "react";
import { Link } from "react-router-dom";
import "./notfound.css";

const NotFound = () => {
  return (
    <div className="not-found-page-container">
      <h1>404</h1>
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default NotFound;
