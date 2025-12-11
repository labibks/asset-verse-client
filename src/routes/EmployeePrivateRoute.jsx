import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate } from "react-router";

const EmployeePrivateRoute = ({ children }) => {
  const { user, userRole, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="text-center text-xl p-10">Loading...</div>;
  }

  if (!user) return <Navigate to="/login" replace />;

  if (userRole !== "employee") return <Navigate to="/hr/asset-list" replace />;

  return children;
};

export default EmployeePrivateRoute;
