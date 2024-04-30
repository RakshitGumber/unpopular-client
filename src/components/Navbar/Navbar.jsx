import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ user }) => {
  return (
    <nav className="main-nav">
      <Link to="/home">
        <h1 className="title">Unpopular</h1>
      </Link>
      <div className="ctas">
        {!user && (
          <button className="login-btn">
            <Link to="./user/login">Log in</Link>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
