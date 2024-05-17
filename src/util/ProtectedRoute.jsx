import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { FeedControlContext } from "../components";

const ProtectedRoute = ({ token }) => {
  const [showCreate, setShowCreate] = useState(false);
  const [editing, setEditing] = useState(false);
  const [postValue, setPostValue] = useState({});

  const isAuthenticated = (token) => {
    return !!token;
  };

  if (!isAuthenticated(token)) {
    return <Navigate to="/" replace />;
  }

  return (
    <FeedControlContext.Provider
      value={{
        showCreate,
        setShowCreate,
        editing,
        setEditing,
        postValue,
        setPostValue,
      }}
    >
      <Outlet />
    </FeedControlContext.Provider>
  );
};

export default ProtectedRoute;
