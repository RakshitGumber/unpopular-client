import React, { useEffect, useState } from "react";
import "./Home.css";
import {
  Sidebar,
  Feed,
  RightPanel,
  BottomBar,
  Navbar,
  UserActionsControlContext,
} from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { defToast } from "../../util";
import { resetUser } from "../../toolkit/slices/userSlice";

const Home = () => {
  const { success, userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showUserActions, setShowUserActions] = useState(false);

  useEffect(() => {
    if (success && userInfo) {
      defToast(`Hi ${userInfo.username}`);
      dispatch(resetUser());
    }
  }, [success, userInfo, dispatch]);

  return (
    <UserActionsControlContext.Provider
      value={{ showUserActions, setShowUserActions }}
    >
      <div className="home-page">
        <main className="content">
          <Navbar hidden showSearch />
          <Sidebar />
          <Feed />
          <RightPanel />
          <BottomBar />
        </main>
      </div>
    </UserActionsControlContext.Provider>
  );
};

export default Home;
