"use client";
import React from "react";
import { useRouter } from "next/navigation";

const ThankYouPage: React.FC = () => {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
      {/* Animated Graphic */}
      <div className="relative">
        <div className="absolute -top-10 -left-10 bg-white rounded-full w-40 h-40 blur-2xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 bg-indigo-300 rounded-full w-60 h-60 blur-2xl opacity-30 animate-pulse"></div>
        <div className="p-10 rounded-full bg-white/10 border-4 border-white/20 shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="white"
            className="w-24 h-24 animate-bounce"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.75v7.25m-6.364-3.137a9.2 9.2 0 0112.728 0M12 19.75V12.5m-6.364 3.138a9.2 9.2 0 0112.728 0"
            />
          </svg>
        </div>
      </div>

      {/* Thank You Message */}
      <div className="mt-8 text-center">
        <h1 className="text-4xl font-extrabold mb-4">Thank You!</h1>
        <p className="text-lg">
          Your information has been successfully submitted. We appreciate your
          visit!
        </p>
      </div>

      {/* Back to Home Button */}
      <button
        onClick={handleBackToHome}
        className="mt-8 px-6 py-3 bg-white text-blue-600 rounded-lg shadow hover:bg-gray-100 transition duration-300"
      >
        Back to Home
      </button>
    </div>
  );
};

export default ThankYouPage;
