import React, { useState } from 'react';
import axios from 'axios';
import Banner from '../assets/images/Banner.png';
import LoginBG from '../assets/images/login.jpg';
import Logo from '../assets/images/AirFleet.png';

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    role: 'Passenger',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    emergencyContact: '',
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const response = await axios.post('https://airplane-management-system-chi.vercel.app/api/auth/login', {
          email: formData.email,
          password: formData.password,
        });

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('PassID', response.data.userId); // Set the PassID in localStorage
        localStorage.setItem('crewEmail', response.data.email); // Set the PassID in localStorage

        setMessage('Login successful! Redirecting...');
        if (response.data.role === 'Admin') {
          window.location.href = '/admin/dashboard';
        } else if (response.data.role === 'Passenger') {
          window.location.href = '/passenger/dashboard';
        } else if (response.data.role === 'Crew') {
          window.location.href = '/crew/dashboard';
        } else {
          setMessage('Access denied. Unauthorized role.');
        }
      } else {
        const response = await axios.post('https://airplane-management-system-chi.vercel.app/api/auth/register', {
          role: formData.role,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          contactDetails: {
            phone: formData.phone,
            emergencyContact: formData.emergencyContact,
          },
        });

        setMessage('Registration successful! Please login to continue.');
        setIsLogin(true);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred.');
    }
  };

  return (
    <div
      className="relative flex flex-col  w-full h-screen bg-cover bg-center justify-center items-center px-5 transition-all duration-500 ease-in-out"
      style={{
        backgroundImage: `url(${LoginBG})`,
      }}
    >
      {/* Overlay for Blur and Filter Effects */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md transition-all duration-700 ease-in"></div>

      {/* Container */}
      <div className="relative flex flex-col m-12 px-2 py-1 lg:flex-row w-full max-w-5xl bg-white shadow-lg rounded-3xl overflow-hidden transform transition-all duration-700 ease-in-out hover:shadow-2xl sm:m-4 lg:m-6">
        {/* Form Section */}
        <div className="relative flex-1 p-8 sm:p-5 lg:p-8 flex flex-col justify-center overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 scrollbar-hide lg:scrollbar-thumb-transparent">
          {/* Small Image */}
          <img
            src={Logo}
            alt="Small Logo"
            className="absolute top-4 left-4 w-12 h-12 transition-all duration-300 ease-in-out hover:rotate-12 hover:scale-110"
          />

          <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold text-gray-800 mb-4 mt-5 transform transition-all duration-500 ease-in-out">
            {isLogin ? 'Welcome To' : 'Register To'}
            <span className="text-secondary"> AirFleet!</span>
          </h2>
          <div className="flex justify-center gap-4 mb-6">
            <button
              className={`py-2 px-6 rounded-full font-semibold transition-all duration-300 transform ${
                isLogin
                  ? 'bg-secondary text-white scale-105 shadow-md'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300 hover:scale-105'
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`py-2 px-6 rounded-full font-semibold transition-all duration-300 transform ${
                !isLogin
                  ? 'bg-secondary text-white scale-105 shadow-md'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300 hover:scale-105'
              }`}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>

          {message && (
            <p className="text-sm text-red-600 mb-4 animate-pulse">
              {message}
            </p>
          )}

          {isLogin ? (
            <form 
              className="space-y-4 transition-all duration-700 ease-in-out transform" 
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 md:p-3  border border-gray-300 rounded-md text-gray-800 bg-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-gray-800 transition-all duration-300 ease-in-out hover:shadow-md"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-2 md:p-3  border border-gray-300 rounded-md text-black bg-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-gray-800 transition-all duration-300 ease-in-out hover:shadow-md"
                required
              />
              
              {/* Forgot Password Link */}
              <a
                href="/forgot-password"
                className="text-secondary text-sm mt-2 hover:underline transition-all duration-300 ease-in-out"
              >
                Forgot Password?
              </a>
              
              <button
                type="submit"
                className="w-full py-3 bg-secondary text-white font-bold rounded-full hover:bg-gray-800 transition-all duration-300 ease-in-out transform hover:scale-[1.02] active:scale-95"
              >
                Login
              </button>
            </form>
          ) : (
            <form 
              className="space-y-4 transition-all duration-700 ease-in-out transform" 
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full p-2 md:p-3  border border-gray-300 text-gray-800 rounded-md bg-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-gray-800 transition-all duration-300 ease-in-out hover:shadow-md"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full p-2 md:p-3 border border-gray-300  text-gray-800 rounded-md bg-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-gray-800 transition-all duration-300 ease-in-out hover:shadow-md"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 md:p-3  border border-gray-300  text-gray-800 rounded-md bg-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-gray-800 transition-all duration-300 ease-in-out hover:shadow-md"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-2 md:p-3  border border-gray-300 text-gray-800 rounded-md bg-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-gray-800 transition-all duration-300 ease-in-out hover:shadow-md"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-2 md:p-3  border border-gray-300 text-gray-800 rounded-md bg-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-gray-800 transition-all duration-300 ease-in-out hover:shadow-md"
                required
              />
              <input
                type="text"
                name="emergencyContact"
                placeholder="Emergency Contact"
                value={formData.emergencyContact}
                onChange={handleInputChange}
                className="w-full p-2 md:p-3  border border-gray-300 text-gray-800 rounded-md bg-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-gray-800 transition-all duration-300 ease-in-out hover:shadow-md"
                required
              />
              <button
                type="submit"
                className="w-full py-3 bg-secondary text-white font-bold rounded-full hover:bg-gray-800 transition-all duration-300 ease-in-out transform hover:scale-[1.02] active:scale-95"
              >
                Register
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

export default LoginRegister;
