import React from "react";
import "./Home.css";
import { Sidebar, Feed, RightPanel, BottomBar, TopBar } from "../../components";

const Home = () => {
  return (
    <div className="home-page">
      <main className="content">
        <TopBar />
        <Sidebar />
        <Feed />
        <RightPanel />
        <BottomBar />
      </main>
    </div>
  );
};

export default Home;
