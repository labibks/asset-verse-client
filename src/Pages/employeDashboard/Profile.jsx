import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { motion } from "framer-motion";
import { FaUserCircle, FaEdit, FaUpload } from "react-icons/fa";
import { useNavigate } from "react-router";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
  });
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [companies] = useState(["Company A", "Company B"]); // dummy companies
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setEditMode(false);
    console.log("Updated profile:", formData, photo);
    // later: send update to backend
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center py-4">
        My Profile
      </h2>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg"
      >
        <div className="flex flex-col items-center mb-6 text-indigo-500">
          <div className="relative">
            {photo ? (
              <img
                src={photo}
                alt={user.displayName}
                className="w-24 h-24 rounded-full mb-4 object-cover"
              />
            ) : (
              <FaUserCircle className="w-24 h-24 text-gray-400 mb-4" />
            )}
            {editMode && (
              <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1 rounded-full cursor-pointer">
                <FaUpload />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <h3 className="text-xl font-semibold">{user?.displayName}</h3>
          <p className="text-gray-500">{user?.email}</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!editMode}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                editMode ? "focus:ring-indigo-400" : "bg-gray-100"
              }`}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Current Company Affiliations
            </label>
            <ul className="list-disc list-inside text-gray-600">
              {companies.map((company, idx) => (
                <li key={idx}>{company}</li>
              ))}
            </ul>
          </div>

          {editMode ? (
            <button
              onClick={handleSave}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300 transition flex items-center justify-center gap-2"
            >
              <FaEdit /> Edit Profile
            </button>
          )}
        </div>
      </motion.div>

      {/* Home Page Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotateY: 10 }}
        whileTap={{ scale: 0.95, rotateY: -10 }}
        onClick={() => navigate("/")}
        className="mt-10 px-8 py-4 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        Go to Home
      </motion.button>
    </div>
  );
};

export default Profile;
