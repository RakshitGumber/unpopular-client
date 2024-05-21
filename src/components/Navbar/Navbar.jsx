import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useSelector } from "react-redux";
import { ShowImage } from "../../util";
import { ToastContainer } from "react-toastify";
import { Indicator, LoadingContext, UserActionsControlContext } from "..";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = (props) => {
  const token = useSelector((state) => state.user.userToken);
  const user = useSelector((state) => state.user.userInfo);
  const { navbarIconRef, setShowUserActions } = useContext(
    UserActionsControlContext
  );
  const loading = useContext(LoadingContext);

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
              onClick={() => setShowUserActions((prev) => !prev && !prev)}
              ref={navbarIconRef}
            />
          )}
        </div>
      </nav>
      <ToastContainer />
      <AnimatePresence>
        {loading && (
          <motion.div
            className="indicator"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <Indicator />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
