import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useSelector } from "react-redux";
import { ShowImage } from "../../util";
import { ToastContainer } from "react-toastify";
import { UserActionsControlContext } from "..";

const Navbar = (props) => {
  const token = useSelector((state) => state.user.userToken);
  const user = useSelector((state) => state.user.userInfo);
  const action = useContext(UserActionsControlContext);

  return (
    <>
      <nav
        className={`main-nav ${props.hidden ? "top-nav" : ""} ${
          props.className ?? ""
        }`}
      >
        <Link to={token ? "/home" : "../"}>
          <h1 className="title">Unpopular</h1>
        </Link>

        <div className="ctas">
          {!token &&
            window.location.pathname !== "/user/login" &&
            window.location.pathname !== "/user/signup" && (
              <Link to="./user/login">
                <button className="login-btn">Log in</button>
              </Link>
            )}
          {token && (
            <ShowImage
              firstname={user.firstName}
              lastname={user.lastName}
              image={user.profilepic}
              onClick={() => action?.setShowUserActions((prev) => !prev)}
            />
          )}
        </div>
      </nav>
      <ToastContainer />
    </>
  );
};

export default Navbar;
