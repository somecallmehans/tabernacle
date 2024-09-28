import React from "react";
import { Navigate } from "react-router-dom";

import auth from "../helpers/authHelpers";

const getAccessToken = () => {
  return auth.getToken();
};

const isAuthenticated = () => {
  return !!getAccessToken();
};

export default function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  return children;
}
