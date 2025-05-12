import React, { useState } from 'react';
import axios from 'axios';
import LoginBG from '../assets/images/login.jpg';
import Logo from '../assets/images/AirFleet.png';
import Banner from '../assets/images/Banner.png';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://airplane-management-system-chi.vercel.app/api/auth/send-otp', { email });
      if (response.status === 200) {
        setOtpSent(true); // OTP is sent, switch to OTP verification form
        setMessage('OTP sent to your email!');
      }
    } catch (error) {
      setMessage('Error sending OTP. Please try again.');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://airplane-management-system-chi.vercel.app/api/auth/verify-otp', { email, otp });
      if (response.status === 200) {
        setMessage('OTP verified successfully! You can now reset your password.');
        // You can now allow user to reset the password here
      }
    } catch (error) {
      setMessage('Invalid OTP. Please try again.');
    }
  };

  return (
    <div
      className="relative flex flex-col w-full h-screen bg-cover bg-center justify-center items-center px-5"
      style={{
        backgroundImage: `url(${LoginBG})`,
      }}
    >
      {/* Overlay for Blur and Filter Effects */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md"></div>

      {/* Container */}
      <div className="relative flex flex-col m-12 px-2 py-1 lg:flex-row w-full max-w-5xl bg-white shadow-lg rounded-3xl overflow-hidden transform transition-all duration-700 ease-in-out hover:shadow-2xl sm:m-4 lg:m-6">
        {/* Form Section */}
        <div className="relative flex-1 p-8 sm:p-5 lg:p-8 flex flex-col justify-center overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 scrollbar-hide lg:scrollbar-thumb-transparent">
          {/* Logo */}
          <img
            src={Logo}
            alt="Logo"
            className="absolute top-4 left-4 w-12 h-12 transition-all duration-300 ease-in-out hover:rotate-12 hover:scale-110"
          />

          <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold text-gray-800 mb-4 mt-5 transform transition-all duration-500 ease-in-out">
            Forgot Your Password?
          </h2>

          {/* Message Display */}
          {message && (
            <p className="text-sm text-red-600 mb-4 animate-pulse">{message}</p>
          )}

          {/* OTP sending or verification form */}
          {!otpSent ? (
            <form
              className="space-y-4 transition-all duration-700 ease-in-out transform"
              onSubmit={handleSendOtp}
            >
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                className="w-full p-2 md:p-3 border border-gray-300 rounded-md text-gray-800 bg-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-gray-800 transition-all duration-300 ease-in-out hover:shadow-md"
                required
              />
              <button
                type="submit"
                className="w-full py-3 bg-secondary text-white font-bold rounded-full hover:bg-gray-800 transition-all duration-300 ease-in-out transform hover:scale-[1.02] active:scale-95"
              >
                Send OTP
              </button>
            </form>
          ) : (
            <form
              className="space-y-4 transition-all duration-700 ease-in-out transform"
              onSubmit={handleVerifyOtp}
            >
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={otp}
                onChange={handleOtpChange}
                className="w-full p-2 md:p-3 border border-gray-300 rounded-md text-gray-800 bg-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-gray-800 transition-all duration-300 ease-in-out hover:shadow-md"
                required
              />
              <button
                type="submit"
                className="w-full py-3 bg-secondary text-white font-bold rounded-full hover:bg-gray-800 transition-all duration-300 ease-in-out transform hover:scale-[1.02] active:scale-95"
              >
                Verify OTP
              </button>
            </form>
          )}
        </div>

        {/* Image Section */}
        <div className="hidden lg:flex flex-1 bg-gray-300 items-center justify-center relative">
          <img
            src={Banner}
            alt="Image"
            className="w-full h-full object-cover scale-105 transition-all duration-700 ease-in-out hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
