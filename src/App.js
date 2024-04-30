import React, { createContext, useEffect, useState } from "react";
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
} from "./pages";
import NotFound from "./pages/NotFound";

export const UserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))?.user
  );

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="user/login" element={<LoginPage setUser={setUser} />} />
          <Route path="user/signup" element={<SignupPage />} />
          {user && (
            <>
              <Route
                path="home"
                element={
                  user.length !== 0 ? <Home /> : <Navigate to="../user/login" />
                }
              />
              <Route path="user/:id/" element={<UserDetails />}>
                <Route
                  path="followers"
                  element={
                    user.length !== 0 ? (
                      <Followers />
                    ) : (
                      <Navigate to="../user/login" />
                    )
                  }
                />
                <Route
                  path="following"
                  element={
                    user.length !== 0 ? (
                      <Following />
                    ) : (
                      <Navigate to="../user/login" />
                    )
                  }
                />
                <Route
                  path="posts"
                  element={
                    user.length !== 0 ? (
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
                    user.length !== 0 ? (
                      <Followers />
                    ) : (
                      <Navigate to="../user/login" />
                    )
                  }
                />
                <Route
                  path=":id/following"
                  element={
                    user.length !== 0 ? (
                      <Following />
                    ) : (
                      <Navigate to="../user/login" />
                    )
                  }
                />
                <Route
                  path=":id/pending"
                  element={
                    user.length !== 0 ? (
                      <Pending />
                    ) : (
                      <Navigate to="../user/login" />
                    )
                  }
                />
              </Route>
            </>
          )}
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
