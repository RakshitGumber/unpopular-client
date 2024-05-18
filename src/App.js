import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Feed, Followers, Following, Pending } from "./components";
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
import { ProtectedRoute } from "./util";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
  const { userToken } = useSelector((state) => state.user);
  const [socket, setSocket] = useState(null);
  const { theme } = useSelector((state) => state.settings);

  useEffect(() => {
    setSocket(io(`http://localhost:8080`));
  }, []);

  useEffect(() => {
    if (theme === "light-theme") document.body.classList.remove("dark-theme");
    else document.body.classList.remove("light-theme");
    document.body.classList.add(theme);
  }, [theme]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "user",
      children: [
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "signup",
          element: <SignupPage />,
        },
        {
          element: <ProtectedRoute token={userToken} />,
          children: [
            {
              path: ":id",
              element: <UserDetails />,
              children: [
                { path: "followers", element: <Followers /> },
                { path: "following", element: <Following /> },
                { path: "posts", element: <Feed hideHeading /> },
              ],
            },
          ],
        },
      ],
    },
    {
      element: <ProtectedRoute token={userToken} />,
      children: [
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "people",
          element: <People />,
          children: [
            {
              path: ":id",
              children: [
                { path: "followers", element: <Followers /> },
                { path: "following", element: <Following /> },
                { path: "pending", element: <Pending /> },
              ],
            },
          ],
        },
        {
          path: "chat",
          element: <MessagePage socket={socket} />,
          children: [
            {
              path: ":roomId",
              element: <Room socket={socket} />,
            },
          ],
        },
        {
          path: "posts",
          children: [
            {
              path: ":id",
              element: <PostView />,
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
