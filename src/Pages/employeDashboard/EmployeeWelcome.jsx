// src/pages/employee/EmployeeWelcome.jsx
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const EmployeeWelcome = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "loop" }}
        style={{
          background: "linear-gradient(270deg, #ff7e5f, #feb47b, #86a8e7, #91eae4)",
          backgroundSize: "600% 600%",
        }}
      />

      {/* Floating Shapes */}
      <motion.div
        className="absolute w-40 h-40 bg-white rounded-full opacity-20 top-10 right-10"
        animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
        transition={{ duration: 9, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute w-32 h-32 bg-white rounded-full opacity-10 bottom-20 left-20"
        animate={{ y: [0, -20, 0], x: [0, 15, 0] }}
        transition={{ duration: 11, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* Center Card */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-white p-12 md:p-16 rounded-3xl shadow-2xl text-center max-w-lg w-full"
        >
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold text-indigo-600 mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Welcome Employee!
          </motion.h1>

          <motion.p
            className="text-gray-700 text-lg md:text-xl mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Explore your assigned assets, track requests, and manage your profile easily.
          </motion.p>

          <div className="flex justify-center gap-4 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("my-assets")}
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-700 transition"
            >
              My Assets
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("my-requests")}
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-700 transition"
            >
              My Requests
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("profile")}
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-700 transition"
            >
              Profile
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EmployeeWelcome;
