import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage.jsx";
import Navbar from "./components/Navbar/index.jsx";
import SignupPage from "./components/pages/SignupPage.jsx";
import Landing from "./components/pages/Landing.jsx";
import Home from "./components/pages/Home.jsx";
import UserDetails from "./components/pages/UserDetails.jsx";
import People from "./components/pages/People.jsx";
import Followers from "./components/Followers/Followers.jsx";
import Following from "./components/Followers/Following.jsx";
import Pending from "./components/Followers/Pending.jsx";

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="user/login" element={<LoginPage setUser={setUser} />} />
        <Route path="user/signup" element={<SignupPage />} />
        <Route path="home" element={<Home />} />
        <Route path="user/:id" element={<UserDetails />} />
        <Route path="user" element={<People />}>
          <Route path=":id/followers" element={<Followers />} />
          <Route path=":id/following" element={<Following />} />
          <Route path=":id/pending" element={<Pending />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
