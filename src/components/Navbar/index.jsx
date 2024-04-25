import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Navbar = ({ user }) => {
  return (
    <nav className="main-nav">
      <Link to="/home">
        <h1 className="title">Unpopular</h1>
      </Link>
      <div className="ctas">
        {user ? (
          <>
            <Link to={`./user/${user.user._id}`}>
              <img
                src={
                  user.user.profilepic ??
                  `https://ui-avatars.com/api/?name=${user.user.username}`
                }
                alt="not found"
                width="50px"
              />
            </Link>
            <Link to={`/user/${user.user._id}/followers`}>People</Link>
          </>
        ) : (
          <button className="login-btn">
            <Link to="./user/login">Log in</Link>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
