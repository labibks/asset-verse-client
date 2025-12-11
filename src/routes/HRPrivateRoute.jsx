// src/routes/HRPrivateRoute.jsx
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate } from "react-router";

const HRPrivateRoute = ({ children }) => {
  const { user, userRole, loading } = useContext(AuthContext);

  // Loading state
  if (loading) {
    return <div className="text-center text-xl p-10">Loading...</div>;
  }

  // Not logged in → redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // Logged in but not HR → redirect to employee dashboard
  if (userRole !== "hr") return <Navigate to="/employee/my-assets" replace />;

  // Everything ok → render children
  return children;
};

export default HRPrivateRoute;
