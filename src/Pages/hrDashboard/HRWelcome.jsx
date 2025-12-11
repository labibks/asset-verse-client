import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { Briefcase, Users, Package, ArrowRight, Star } from "lucide-react";

const HRWelcome = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="w-full"
    >
      {/* Main Card */}
      <div className="bg-white backdrop-blur-xl p-10 rounded-2xl shadow-2xl border border-white/40 max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-indigo-600 mb-3">
          Welcome to HR Dashboard
        </h1>

        <p className="text-gray-600 max-w-xl mx-auto">
          Manage assets, employees, and requests seamlessly. Your dashboard is
          ready — choose where to go!
        </p>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-xl shadow-lg bg-gradient-to-br from-indigo-500 to-blue-500 text-white cursor-pointer"
          >
            <Briefcase size={40} className="mx-auto mb-3" />
            <h3 className="font-semibold text-lg">Manage Assets</h3>
            <p className="text-sm mt-1 opacity-90">
              Add or monitor company assets.
            </p>
            <Link to="asset-list">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="mt-4 bg-white/20 px-4 py-1 rounded-lg text-sm"
              >
                Open <ArrowRight size={14} className="inline" />
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-xl shadow-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white cursor-pointer"
          >
            <Users size={40} className="mx-auto mb-3" />
            <h3 className="font-semibold text-lg">Employees</h3>
            <p className="text-sm mt-1 opacity-90">
              Track and manage employees.
            </p>
            <Link to="employee-list">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="mt-4 bg-white/20 px-4 py-1 rounded-lg text-sm"
              >
                View <ArrowRight size={14} className="inline" />
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-xl shadow-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white cursor-pointer"
          >
            <Package size={40} className="mx-auto mb-3" />
            <h3 className="font-semibold text-lg">Requests</h3>
            <p className="text-sm mt-1 opacity-90">
              Approve or reject asset requests.
            </p>
            <Link to="all-requests">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="mt-4 bg-white/20 px-4 py-1 rounded-lg text-sm"
              >
                Manage <ArrowRight size={14} className="inline" />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        <div className="mt-10 flex justify-center items-center gap-2 text-indigo-600 font-semibold">
          <Star size={18} />
          <span>Your HR space is fully optimized</span>
        </div>
      </div>
    </motion.div>
  );
};

export default HRWelcome;





