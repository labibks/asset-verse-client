// src/pages/public/RegisterHR.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const RegisterHR = () => {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    companyLogo: "",
    email: "",
    password: "",
    dateOfBirth: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const apiBase = import.meta.env.VITE_API_URL;
      const response = await fetch(
        `${apiBase}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            dateOfBirth: formData.dateOfBirth,
            role: "hr",
            companyName: formData.companyName,
            companyLogo: formData.companyLogo,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // Save token & role
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", data.user.role);

      // Redirect based on role
      if (data.user.role === "hr") window.location.href = "/dashboard/hr";
      else if (data.user.role === "employee")
        window.location.href = "/dashboard/employee";
      else window.location.href = "/";
    } catch (err) {
      console.error("Registration Error:", err);
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full bg-white p-10 rounded-xl shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
          Register as HR Manager
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4 font-semibold">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            name="companyLogo"
            placeholder="Company Logo URL"
            value={formData.companyLogo}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password (min 6 characters)"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <motion.button
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Register
          </motion.button>
        </form>

        <p className="mt-4 text-center text-sm text-indigo-800">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 font-semibold">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterHR;
