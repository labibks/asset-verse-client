import React from "react";
import { createBrowserRouter } from "react-router";

// Layouts
import PublicLayout from "../layouts/PublicLayout";
import EmployeeLayout from "../layouts/EmployeeLayout";
import HRLayout from "../layouts/HRLayout";

// Public Pages
import Home from "../pages/public/Home";
import Login from "../pages/public/Login";
import RegisterHR from "../pages/public/RegisterHR";
import RegisterEmployee from "../pages/public/RegisterEmployee";
import NotFound from "../pages/public/NotFound";

// Employee Dashboard Pages
import RequestAsset from "../pages/employeDashboard/RequestAsset";
import MyTeam from "../pages/employeDashboard/MyTeam";
import EmployeeProfile from "../pages/employeDashboard/Profile";
import EmployeeWelcome from "../Pages/employeDashboard/EmployeeWelcome"

// HR Dashboard Pages
import AssetList from "../Pages/hrDashboard/AssetList";
import AddAsset from "../Pages/hrDashboard/AddAsset";
import AllRequests from "../Pages/hrDashboard/AllRequests";
import MyEmployeeList from "../Pages/hrDashboard/MyEmployeeList";
import UpgradePackage from "../Pages/hrDashboard/UpgradePackage";

// Private Route Components
import EmployeePrivateRoute from "./EmployeePrivateRoute";
import HRPrivateRoute from "./HRPrivateRoute";
import ProfileHr from "../Pages/hrDashboard/ProfileHr";
import HRWelcome from "../Pages/hrDashboard/HRWelcome";
import MyAssets from "../Pages/employeDashboard/MyAssets";
import ReturnAssignedAssets from "../Pages/employeDashboard/ReturnAssignedAssets";

export const router = createBrowserRouter([
  // ======================
  // PUBLIC ROUTES
  // ======================
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register-hr", element: <RegisterHR /> },
      { path: "register-employee", element: <RegisterEmployee /> },
      { path: "*", element: <NotFound /> },
    ],
  },

  // ======================
  // EMPLOYEE DASHBOARD
  // ======================
  {
    path: "/dashboard/employee",
    element: (
      <EmployeePrivateRoute>
        <EmployeeLayout />
      </EmployeePrivateRoute>
    ),
    children: [
      {path: "", element: <EmployeeWelcome/>},
      { path: "request-asset", element: <RequestAsset /> },
      { path: "my-assets", element: <MyAssets /> },
      { path: "return-asset", element: <ReturnAssignedAssets /> },
      { path: "my-team", element: <MyTeam /> },
      { path: "profile", element: <EmployeeProfile /> },
    ],
  },

  // ======================
  // HR DASHBOARD
  // ======================
  {
    path: "/dashboard/hr",
    element: (
      <HRPrivateRoute>
        <HRLayout />
      </HRPrivateRoute>
    ),
    children: [
      {path: "", element: <HRWelcome/>},
      { path: "asset-list", element: <AssetList /> },
      { path: "add-asset", element: <AddAsset /> },
      { path: "all-requests", element: <AllRequests /> },
      { path: "employee-list", element: <MyEmployeeList /> },
      { path: "upgrade-package", element: <UpgradePackage /> },
      { path: "profile", element: < ProfileHr/> },
    ],
  },
  {path: "*",Component: <NotFound></NotFound>},
]);

export default router;
