import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import airplane from "../../assets/images/plane.jpg";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${airplane})` }}
    >
      {/* Overlay for darkening the background */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">AirFleet.com</h1>
        <h2 className="text-3xl md:text-4xl mb-6">ARE YOU READY TO FLY?</h2>
        <p className="text-lg mb-8">Please Sign in</p>

        <div className="space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg text-lg transition duration-300"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/register")}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg text-lg transition duration-300"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
