import React, { createRef, useEffect, useState } from "react";
import {
  Feed,
  Followers,
  Following,
  Pending,
  UserActionsControlContext,
} from "./components";
import {
  Landing,
  LoginPage,
  SignupPage,
  Home,
  UserDetails,
  People,
  PostView,
  Settings,
} from "./pages";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "./util";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
  const { userToken } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.settings);

  function changeFavicon(text, theme) {
    const canvas = document.createElement("canvas");
    canvas.height = 64;
    canvas.width = 64;
    canvas.classList.add("dark-theme");
    const ctx = canvas.getContext("2d");
    ctx.font = "64px Montserrat";
    ctx.fillStyle = theme === "dark-theme" ? "#16161d" : "white";
    ctx.rect(0, 0, 64, 64);
    ctx.fill();
    ctx.textAlign = "center";
    ctx.textBaseline = "center";
    ctx.fillStyle = theme === "dark-theme" ? "white" : "#16161d";
    ctx.fillText(text, 32, 54);

    const link = document.createElement("link");
    const oldLinks = document.querySelectorAll('link[rel="shortcut icon"]');
    oldLinks.forEach((e) => e.parentNode.removeChild(e));
    link.id = "dynamic-favicon";
    link.rel = "shortcut icon";
    link.href = canvas.toDataURL();
    document.head.appendChild(link);
  }

  useEffect(() => {
    changeFavicon("U", theme);
    if (theme === "light-theme") {
      document.body.classList.remove("dark-theme");
    } else {
      document.body.classList.remove("light-theme");
    }
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
          path: "user/:id/settings",
          element: <Settings />,
        },
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

  const [showUserActions, setShowUserActions] = useState(false);
  const sidebarRef = createRef();
  const sidebarIconRef = createRef();
  const navbarIconRef = createRef();

  return (
    <UserActionsControlContext.Provider
      value={{
        showUserActions,
        setShowUserActions,
        sidebarRef,
        sidebarIconRef,
        navbarIconRef,
      }}
    >
      <RouterProvider router={router} />
    </UserActionsControlContext.Provider>
  );
};

export default App;
