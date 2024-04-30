import React, { useContext } from "react";
import "./Home.css";
import { Sidebar, Feed, RightPanel } from "../../components";
import { UserContext } from "../../App";
import { Loader } from "../../components";

const Home = () => {
  return (
    <div className="home-page">
      <main className="content">
        <Sidebar />
        <Feed />
        <RightPanel />
      </main>
    </div>
  );
};

export default Home;
