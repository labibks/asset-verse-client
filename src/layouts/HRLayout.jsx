// src/layouts/HRLayout.jsx
import React, { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router";
import TopRequestedBarChart from "../Pages/hrDashboard/TopRequestedBarChart";
import PieReturnableChart from "../Pages/hrDashboard/PieReturnableChart";

const HRLayout = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const activeClass = "bg-blue-500 text-white p-2 rounded font-semibold shadow";
  const normalClass = "hover:bg-blue-100 p-2 rounded text-indigo-500";

  // check if route is /hr (default)
  const isDashboard = location.pathname === "/dashboard/hr";

  return (
    <div className="flex min-h-screen">
      {/* SIDEBAR */}
      <aside
        className={`bg-gray-100 w-64 p-4 space-y-4 
        absolute md:relative md:block
        transition-transform duration-300 
        ${open ? "translate-x-0" : "-translate-x-64"}
        md:translate-x-0`}
      >
        <h3 className="text-lg font-bold mb-4 text-indigo-500">HR Dashboard</h3>

        <nav className="flex flex-col space-y-2">
          <NavLink
            to="/dashboard/hr"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="asset-list"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
          >
            Asset List
          </NavLink>

          <NavLink
            to="add-asset"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
          >
            Add Asset
          </NavLink>

          <NavLink
            to="all-requests"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
          >
            All Requests
          </NavLink>

          <NavLink
            to="employee-list"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
          >
            My Employees
          </NavLink>

          <NavLink
            to="upgrade-package"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
          >
            Upgrade Package
          </NavLink>

          <NavLink
            to="profile"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
          >
            Profile
          </NavLink>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Navbar */}
        <div className="md:hidden bg-blue-700 text-white flex justify-between items-center p-4">
          <button
            onClick={() => setOpen(!open)}
            className="text-white font-bold"
          >
            ☰
          </button>
          <span className="font-bold">AssetVerse</span>
        </div>

        <main className="p-4 flex-1">
          {/* ➤ When route is /hr → show default dashboard with charts */}
          {isDashboard ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TopRequestedBarChart />
              <PieReturnableChart />
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

export default HRLayout;
