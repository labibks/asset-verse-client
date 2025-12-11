import React from "react";
import { useNavigate } from "react-router";
import { FiHome } from "react-icons/fi";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-9xl font-extrabold text-indigo-500 animate-bounce">
        404
      </h1>

      <h2 className="text-3xl font-semibold mt-4 text-gray-700">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-500 mt-2 text-center max-w-md">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      {/* Go Home Button */}
      <button
        onClick={() => navigate("/")}
        className="mt-8 flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition transform hover:scale-105 shadow-lg"
      >
        <FiHome size={20} /> Go Home
      </button>
    </div>
  );
};

export default NotFound;
