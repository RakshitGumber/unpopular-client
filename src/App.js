import React, { useRef, useState, useEffect } from "react";
import { io } from "socket.io-client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Followers, Following, Pending } from "./components";
import {
  Landing,
  LoginPage,
  SignupPage,
  Home,
  UserDetails,
  People,
  PostView,
  MessagePage,
  Room,
} from "./pages";
import NotFound from "./pages/NotFound";

const App = () => {
  const token = useRef(localStorage.getItem("token"));

  const [user, setUser] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io(`http://localhost:8080`));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="user/login" element={<LoginPage setUser={setUser} />} />
        <Route path="user/signup" element={<SignupPage />} />
        {token && (
          <>
            <Route
              path="home"
              element={
                token.length !== 0 ? <Home /> : <Navigate to="../user/login" />
              }
            />
            <Route path="user/:id/" element={<UserDetails />}>
              <Route
                path="followers"
                element={
                  token.length !== 0 ? (
                    <Followers />
                  ) : (
                    <Navigate to="../user/login" />
                  )
                }
              />
              <Route
                path="following"
                element={
                  token.length !== 0 ? (
                    <Following />
                  ) : (
                    <Navigate to="../user/login" />
                  )
                }
              />
              <Route
                path="posts"
                element={
                  token.length !== 0 ? (
                    <Pending />
                  ) : (
                    <Navigate to="../user/login" />
                  )
                }
              />
            </Route>
            <Route path="people/*" element={<People />}>
              <Route
                path=":id/followers"
                element={
                  token.length !== 0 ? (
                    <Followers />
                  ) : (
                    <Navigate to="../user/login" />
                  )
                }
              />
              <Route
                path=":id/following"
                element={
                  token.length !== 0 ? (
                    <Following />
                  ) : (
                    <Navigate to="../user/login" />
                  )
                }
              />
              <Route
                path=":id/pending"
                element={
                  token.length !== 0 ? (
                    <Pending />
                  ) : (
                    <Navigate to="../user/login" />
                  )
                }
              />
            </Route>
            <Route path="/chat/*" element={<MessagePage socket={socket} />}>
              <Route path=":roomId" element={<Room socket={socket} />} />
            </Route>
            <Route path="posts/:id" element={<PostView />} />
          </>
        )}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
