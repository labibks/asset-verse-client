// src/pages/hr/ProfileHr.jsx
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { FiHome } from "react-icons/fi";
import { useNavigate } from "react-router";

const ProfileHr = () => {
  const { user, userRole } = useContext(AuthContext);
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    email: user?.email || "",
    phone: "+8801234567890",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = () => {
    // এখানে Firebase updateProfile বা backend API call করতে পারো
    console.log("Updated data:", formData);
    setEditMode(false);
  };

  const handleCancel = () => {
    setFormData({
      displayName: user?.displayName || "",
      email: user?.email || "",
      phone: "+8801234567890",
    });
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-xl p-8">
        <div className="flex flex-col items-center">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-indigo-600 mb-4"
            />
          ) : (
            <div className="w-32 h-32 rounded-full border-4 border-indigo-600 mb-4 flex items-center justify-center bg-indigo-100 text-indigo-600 text-4xl font-bold">
              {user?.displayName?.charAt(0) || "H"}
            </div>
          )}

          {editMode ? (
            <input
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              className="text-2xl font-bold text-gray-800 mb-1 text-center border-b-2 border-indigo-600 focus:outline-none"
            />
          ) : (
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              {user?.displayName || "HR Manager"}
            </h2>
          )}

          <p className="text-gray-500 mb-4">
            Role: <span className="font-semibold">{userRole || "hr"}</span>
          </p>
        </div>

        <div className="mt-6 border-t pt-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Full Name:</span>
            {editMode ? (
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                className="text-gray-800 border-b border-gray-300 focus:outline-none px-2 py-1"
              />
            ) : (
              <span className="text-gray-800">
                {user?.displayName || "N/A"}
              </span>
            )}
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Email:</span>
            {editMode ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="text-gray-800 border-b border-gray-300 focus:outline-none px-2 py-1"
              />
            ) : (
              <span className="text-gray-800">{user?.email || "N/A"}</span>
            )}
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Phone:</span>
            {editMode ? (
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="text-gray-800 border-b border-gray-300 focus:outline-none px-2 py-1"
              />
            ) : (
              <span className="text-gray-800">{formData.phone}</span>
            )}
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Joined Date:</span>
            <span className="text-gray-800">
              {user?.metadata?.creationTime
                ? new Date(user.metadata.creationTime).toLocaleDateString()
                : "N/A"}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Status:</span>
            <span className="text-green-600 font-semibold">Active</span>
          </div>
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          {editMode ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* HOME BUTTON */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition transform hover:scale-105 shadow-lg"
        >
          <FiHome /> Go Home
        </button>
      </div>
    </div>
  );
};

export default ProfileHr;
