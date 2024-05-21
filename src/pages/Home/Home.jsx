import React, { useEffect } from "react";
import "./Home.css";
import { Sidebar, Feed, RightPanel, BottomBar, Navbar } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { defToast } from "../../util";
import { resetUser } from "../../toolkit/slices/userSlice";

const Home = () => {
  const { success, userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (success && userInfo) {
      defToast(`Hi ${userInfo.username}`);
      dispatch(resetUser());
    }
  }, [success, userInfo, dispatch]);

  return (
    <div className="home-page">
      <main className="content">
        <Navbar hidden />
        <Sidebar />
        <Feed />
        <RightPanel />
        <BottomBar />
      </main>
    </div>
  );
};

export default Home;
