// src/components/Footer.jsx
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">AssetVerse</h2>
          <p className="text-sm">© 2025 AssetVerse. All rights reserved.</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <p className="text-sm">Email: support@assetverse.com</p>
          <p className="text-sm mt-1">Phone: +880 123 456 789</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-indigo-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-indigo-500">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register-employee" className="hover:text-indigo-500">
                Join as Employee
              </Link>
            </li>
            <li>
              <Link to="/register-hr" className="hover:text-indigo-500">
                Join as HR
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-600">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-blue-400">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-blue-700">
              <FaLinkedinIn />
            </a>
            <a href="#" className="hover:text-pink-500">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="bg-gray-800 text-gray-400 text-center py-3 mt-6 text-sm">
        Designed & Developed with ❤️ by AssetVerse Team
      </div>
    </footer>
  );
};

export default Footer;
