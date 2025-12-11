import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* 3D Orbiting Balls */}
      <div className="relative w-24 h-24">
        <div className="absolute w-6 h-6 bg-blue-500 rounded-full top-0 left-1/2 -translate-x-1/2 animate-orbit1"></div>
        <div className="absolute w-6 h-6 bg-red-500 rounded-full top-0 left-1/2 -translate-x-1/2 animate-orbit2"></div>
        <div className="absolute w-6 h-6 bg-green-500 rounded-full top-0 left-1/2 -translate-x-1/2 animate-orbit3"></div>
      </div>

      {/* Loading Text */}
      <p className="absolute bottom-10 text-gray-700 text-lg font-medium animate-pulse">
        Loading...
      </p>

      <style jsx>{`
        @keyframes orbit1 {
          0% {
            transform: rotate(0deg) translateX(50px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(50px) rotate(-360deg);
          }
        }
        @keyframes orbit2 {
          0% {
            transform: rotate(120deg) translateX(50px) rotate(-120deg);
          }
          100% {
            transform: rotate(480deg) translateX(50px) rotate(-480deg);
          }
        }
        @keyframes orbit3 {
          0% {
            transform: rotate(240deg) translateX(50px) rotate(-240deg);
          }
          100% {
            transform: rotate(600deg) translateX(50px) rotate(-600deg);
          }
        }

        .animate-orbit1 {
          animation: orbit1 2s linear infinite;
        }
        .animate-orbit2 {
          animation: orbit2 2s linear infinite;
        }
        .animate-orbit3 {
          animation: orbit3 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Loading;
