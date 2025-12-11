import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router"; // useNavigate import kora lagbe
import { AiOutlineHome } from "react-icons/ai"; // react-icons theke home icon

const EmployeeLayout = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate(); // navigate hook

  const activeClass =
    "bg-blue-200 text-blue-700 font-semibold rounded p-2 block";
  const normalClass = "hover:bg-blue-100 p-2 rounded text-indigo-500 block";

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`bg-gray-100 w-64 p-4 space-y-4 absolute md:relative md:block transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-indigo-500">
            Employee Dashboard
          </h3>
          {/* Home Icon */}
          <button
            onClick={() => navigate("/")} // home page
            className="text-indigo-500 hover:text-indigo-700 text-2xl"
            title="Go to Home"
          >
            <AiOutlineHome />
          </button>
        </div>

        <nav className="flex flex-col space-y-2">
          <NavLink
            to="my-assets"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
          >
            My Assets
          </NavLink>
          <NavLink
            to="request-asset"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
          >
            Request Asset
          </NavLink>
          <NavLink
            to="return-asset"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
          >
            Return Asset
          </NavLink>

          <NavLink
            to="my-team"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
          >
            My Team
          </NavLink>
          <NavLink
            to="profile"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
          >
            Profile
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar for Mobile */}
        <div className="md:hidden bg-blue-700 text-white flex justify-between items-center p-4">
          <button
            onClick={() => setOpen(!open)}
            className="text-white font-bold"
          >
            ☰
          </button>
          <span className="font-bold">AssetVerse</span>
        </div>
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default EmployeeLayout;
