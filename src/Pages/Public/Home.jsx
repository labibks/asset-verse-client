// src/pages/public/Home.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import img from '../../assets/alvaro-reyes-qWwpHwip31M-unsplash.jpg'
import {
  FaUsers,
  FaBoxOpen,
  FaChartLine,
  FaShieldAlt,
  FaRegLightbulb,
} from "react-icons/fa";

const packages = [
  {
    name: "Basic",
    employeeLimit: 5,
    price: 5,
    features: ["Track company assets", "Manage employees", "Basic support"],
  },
  {
    name: "Standard",
    employeeLimit: 10,
    price: 8,
    features: ["All Basic features", "Advanced analytics", "Priority support"],
  },
  {
    name: "Premium",
    employeeLimit: 20,
    price: 15,
    features: ["All Standard features", "Custom branding", "24/7 support"],
  },
];

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* 1️⃣ Hero Banner */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
          <motion.div
            initial={{ x: -120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="md:w-1/2 text-center md:text-left"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Simplify Your Company Asset Management
            </h1>
            <p className="text-lg md:text-xl mb-6 text-indigo-100">
              AssetVerse helps HR managers track, assign, and monitor company
              assets in one organized platform.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <Link
                to="/register-hr"
                className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded shadow hover:bg-gray-100 transition"
              >
                Join as HR
              </Link>
              <Link
                to="/register-employee"
                className="border border-white text-white px-6 py-3 rounded hover:bg-white hover:text-indigo-600 transition"
              >
                Join as Employee
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ x: 120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="md:w-1/2 flex justify-center"
          >
            <img
              src={img}
              alt="Asset Management"
              className="rounded-lg shadow-xl w-full max-w-md"
            />
          </motion.div>
        </div>
      </section>

      {/* 2️⃣ About Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12 text-indigo-500">
            Why AssetVerse?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded shadow hover:shadow-lg transition"
            >
              <FaUsers className="text-indigo-500 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-indigo-500">
                Employee Management
              </h3>
              <p className="text-indigo-500">
                Keep track of all employees, assign assets, and manage teams
                efficiently.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded shadow hover:shadow-lg transition"
            >
              <FaBoxOpen className="text-indigo-500 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-indigo-500">
                Asset Tracking
              </h3>
              <p className="text-indigo-500">
                Monitor all company assets, their status, and assignments in
                real-time.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded shadow hover:shadow-lg transition"
            >
              <FaChartLine className="text-indigo-500 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-indigo-500">
                Analytics
              </h3>
              <p className="text-indigo-500">
                Get insights into asset usage and optimize resource allocation
                for your company.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3️⃣ Packages Section */}
      <section className="py-24 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12 text-indigo-500">
            Our Plans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-8 rounded shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-2 text-indigo-500">
                  {pkg.name}
                </h3>
                <p className="text-indigo-600 font-bold text-2xl mb-4">
                  ${pkg.price}/month
                </p>
                <p className="mb-4 text-indigo-500">
                  Max Employees: {pkg.employeeLimit}
                </p>
                <ul className="mb-4 list-disc list-inside text-gray-700">
                  {pkg.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
                <button className="bg-indigo-500 text-white px-5 py-2 rounded hover:bg-indigo-600 transition">
                  Choose Plan
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4️⃣ Features Showcase */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12 text-indigo-500">
            Core Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded shadow hover:shadow-lg transition"
            >
              <FaShieldAlt className="text-indigo-500 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-indigo-500">
                Data Security
              </h3>
              <p className="text-indigo-500">
                All your company assets and information are securely stored.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded shadow hover:shadow-lg transition"
            >
              <FaRegLightbulb className="text-indigo-500 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-indigo-500">
                Smart Workflow
              </h3>
              <p className="text-indigo-500">
                Streamlined processes for faster and efficient asset management.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded shadow hover:shadow-lg transition"
            >
              <FaChartLine className="text-indigo-500 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-indigo-500">
                Insights & Analytics
              </h3>
              <p className="text-indigo-500">
                Visualize asset usage and employee performance metrics easily.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5️⃣ Testimonials */}
      <section className="py-24 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12 text-indigo-500">
            Trusted by Over 100 Companies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded shadow"
            >
              <p className="text-indigo-500">
                "AssetVerse simplified our asset tracking. Highly recommended!"
              </p>
              <p className="mt-2 font-semibold text-indigo-500">- Company A</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded shadow"
            >
              <p className="text-indigo-500">
                "Easy to manage employees and assign assets efficiently."
              </p>
              <p className="mt-2 font-semibold text-indigo-500">- Company B</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded shadow"
            >
              <p className="text-indigo-500">
                "A must-have tool for HR managers of any company."
              </p>
              <p className="mt-2 font-semibold text-indigo-500">- Company C</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6️⃣ How It Works */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12 text-indigo-500">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white p-8 rounded shadow"
            >
              <h3 className="text-xl font-semibold mb-2 text-indigo-500">
                1. Register
              </h3>
              <p className="text-indigo-500">
                Sign up as an HR Manager or Employee to begin immediately.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white p-8 rounded shadow"
            >
              <h3 className="text-xl font-semibold mb-2 text-indigo-500">
                2. Add Assets
              </h3>
              <p className="text-indigo-500">
                HR adds and assigns assets to employees effortlessly.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white p-8 rounded shadow"
            >
              <h3 className="text-xl font-semibold mb-2 text-indigo-500">
                3. Track & Manage
              </h3>
              <p className="text-indigo-500">
                Monitor all assets, approvals, and usage statistics in one
                place.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7️⃣ FAQ */}
      <section className="py-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12 text-indigo-500">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded shadow"
            >
              <h3 className="font-semibold mb-2 text-indigo-500">
                Can I manage multiple companies?
              </h3>
              <p className="text-indigo-500">
                Yes, employees can be affiliated with more than one company
                simultaneously.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded shadow"
            >
              <h3 className="font-semibold mb-2 text-indigo-500">
                Is there a limit on employees?
              </h3>
              <p className="text-indigo-500">
                Each package has a maximum employee limit, which can be upgraded
                anytime.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded shadow"
            >
              <h3 className="font-semibold mb-2 text-indigo-500">
                Are assets returnable?
              </h3>
              <p className="text-indigo-500">
                Yes, employees can return assigned assets if applicable.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded shadow"
            >
              <h3 className="font-semibold mb-2 text-indigo-500">
                Can I print the asset list?
              </h3>
              <p className="text-indigo-500">
                Employees can generate printable PDFs of their assigned assets.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8️⃣ Contact CTA */}
      <section className="py-24 bg-indigo-600 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 ">
          Start Managing Your Assets Today
        </h2>
        <p className="mb-8 text-lg text-indigo-100 ">
          Sign up now and make asset management effortless.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/register-hr"
            className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded shadow hover:bg-gray-100 transition"
          >
            Join as HR
          </Link>
          <Link
            to="/register-employee"
            className="border border-white text-white px-6 py-3 rounded hover:bg-white hover:text-indigo-600 transition"
          >
            Join as Employee
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
