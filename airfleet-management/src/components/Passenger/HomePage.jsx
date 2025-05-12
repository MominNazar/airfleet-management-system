import React from "react";
import Layout from "./Layout";
import Button from "./Button";
import bgImage from "../../assets/home.png";

const HomePage = () => {
  return (
    <Layout>
      <div
        className="relative bg-cover bg-center h-screen text-white"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <h1 className="text-5xl font-bold mb-6">AirFleet.com</h1>
          <p className="text-xl font-semibold mb-4">ARE YOU READY TO FLY?</p>
          <p className="text-lg mb-8">Please sign in or sign up to manage your flights</p>
          <div className="flex space-x-4">
            <Button text="Sign In" onClick={() => console.log("Sign In")} />
            <Button text="Sign Up" onClick={() => console.log("Sign Up")} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
