// src/components/Navbar.jsx
import React, { useState, useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router";

const Navbar = () => {
  const { user, userRole, logoutUser } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const role = userRole?.toLowerCase();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              AssetVerse
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {!user && (
              <>
                <Link
                  to="/"
                  className="text-gray-700 hover:text-indigo-600 font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/register-employee"
                  className="text-gray-700 hover:text-indigo-600 font-medium"
                >
                  Join as Employee
                </Link>
                <Link
                  to="/register-hr"
                  className="text-gray-700 hover:text-indigo-600 font-medium"
                >
                  Join as HR Manager
                </Link>
                <Link
                  to="/login"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                >
                  Login
                </Link>
              </>
            )}

            {user && (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-10 h-10 rounded-full border"
                    />
                  ) : (
                    <FaUserCircle className="w-10 h-10 text-gray-600" />
                  )}
                  <span className="hidden sm:inline text-gray-700 font-medium">
                    {user.displayName || "User"}
                  </span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-1 z-20">
                    {role === "employee" ? (
                      <>
                        <Link
                          to="/dashboard/employee/my-assets"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          My Assets
                        </Link>
                        <Link
                          to="/dashboard/employee/my-team"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          My Team
                        </Link>
                        <Link
                          to="/dashboard/employee/request-asset"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Request Asset
                        </Link>
                        <Link
                          to="/dashboard/employee/return-asset"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Return Asset
                        </Link>

                        <Link
                          to="/dashboard/employee/profile"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Profile
                        </Link>
                      </>
                    ) : role === "hr" ? (
                      <>
                        <Link
                          to="/dashboard/hr/asset-list"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Asset List
                        </Link>
                        <Link
                          to="/dashboard/hr/add-asset"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Add Asset
                        </Link>
                        <Link
                          to="/dashboard/hr/all-requests"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          All Requests
                        </Link>
                        <Link
                          to="/dashboard/hr/employee-list"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Employee List
                        </Link>
                        <Link
                          to="/dashboard/hr/upgrade-package"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Upgrade Package
                        </Link>
                        <Link
                          to="/dashboard/hr/profile"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Profile
                        </Link>
                      </>
                    ) : null}

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 space-y-1 px-2">
            {!user && (
              <>
                <Link
                  to="/"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
                >
                  Home
                </Link>
                <Link
                  to="/register-employee"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
                >
                  Join as Employee
                </Link>
                <Link
                  to="/register-hr"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
                >
                  Join as HR Manager
                </Link>
                <Link
                  to="/login"
                  className="block px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                >
                  Login
                </Link>
              </>
            )}

            {user && (
              <>
                {role === "employee" ? (
                  <>
                    <Link
                      to="/dashboard/employee/my-assets"
                      className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
                    >
                      My Assets
                    </Link>
                    <Link
                      to="/dashboard/employee/my-team"
                      className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
                    >
                      My Team
                    </Link>
                    <Link
                      to="/dashboard/employee/request-asset"
                      className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
                    >
                      Request Asset
                    </Link>
                    <Link
                      to="/dashboard/employee/profile"
                      className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
                    >
                      Profile
                    </Link>
                  </>
                ) : role === "hr" ? (
                  <>
                    {/* ✔ FIXED HR ROUTES */}
                    <Link
                      to="/dashboard/hr/asset-list"
                      className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
                    >
                      Asset List
                    </Link>
                    <Link
                      to="/dashboard/hr/add-asset"
                      className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
                    >
                      Add Asset
                    </Link>
                    <Link
                      to="/dashboard/hr/all-requests"
                      className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
                    >
                      All Requests
                    </Link>
                    <Link
                      to="/dashboard/hr/employee-list"
                      className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
                    >
                      Employee List
                    </Link>
                    <Link
                      to="/dashboard/hr/upgrade-package"
                      className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
                    >
                      Upgrade Package
                    </Link>
                    <Link
                      to="/dashboard/hr/profile"
                      className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
                    >
                      Profile
                    </Link>
                  </>
                ) : null}

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-red-600 hover:bg-gray-100 rounded"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
