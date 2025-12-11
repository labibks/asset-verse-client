// src/routes/EmployeePrivateRoute.jsx
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate } from "react-router";

const EmployeePrivateRoute = ({ children }) => {
  const { user, userRole, loading } = useContext(AuthContext);

  // Show loading while fetching auth/role
  if (loading) {
    return <div className="text-center text-xl p-10">Loading...</div>;
  }

  // Not logged in → redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // Logged in but not employee → redirect to HR dashboard
  if (userRole !== "employee") return <Navigate to="/hr/asset-list" replace />;

  // Everything ok → render children
  return children;
};

export default EmployeePrivateRoute;
