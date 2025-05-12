import React, { useState } from "react";

const LoginManagement = () => {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    // Normally, you would handle login with backend authentication here
    // For now, we'll simulate success or failure
    if (loginDetails.email === "user@example.com" && loginDetails.password === "password") {
      setMessage("Login Successful!");
      // Redirect to dashboard or next page after successful login (e.g., using react-router)
    } else {
      setMessage("Invalid credentials. Please try again.");
    }
  };

  // Handle password recovery
  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Simulate sending a password recovery email
    if (email) {
      setMessage(`Password recovery email sent to ${email}`);
    } else {
      setMessage("Please enter your email address.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-600 p-6">
      <div className="bg-gray-700 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          {isForgotPassword ? "Forgot Password" : "Login"}
        </h2>

        {isForgotPassword ? (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div>
              <label className="block text-gray-300">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mt-2 bg-gray-600 rounded-lg text-white border border-gray-500 focus:ring focus:ring-yellow-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 py-3 rounded-lg hover:bg-yellow-600 transition-all font-semibold"
            >
              Submit
            </button>
            <p className="mt-4 text-center text-gray-400">
              Remember your password?{" "}
              <span
                className="text-yellow-500 cursor-pointer"
                onClick={() => setIsForgotPassword(false)}
              >
                Back to login
              </span>
            </p>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-300">Email</label>
              <input
                type="email"
                value={loginDetails.email}
                onChange={(e) =>
                  setLoginDetails({ ...loginDetails, email: e.target.value })
                }
                className="w-full p-3 mt-2 bg-gray-600 rounded-lg text-white border border-gray-500 focus:ring focus:ring-yellow-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300">Password</label>
              <input
                type="password"
                value={loginDetails.password}
                onChange={(e) =>
                  setLoginDetails({ ...loginDetails, password: e.target.value })
                }
                className="w-full p-3 mt-2 bg-gray-600 rounded-lg text-white border border-gray-500 focus:ring focus:ring-yellow-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 py-3 rounded-lg hover:bg-yellow-600 transition-all font-semibold"
            >
              Login
            </button>
            <p className="mt-4 text-center text-gray-400">
              Forgot your password?{" "}
              <span
                className="text-yellow-500 cursor-pointer"
                onClick={() => setIsForgotPassword(true)}
              >
                Recover Password
              </span>
            </p>
          </form>
        )}

        {message && (
          <p className="mt-4 text-center text-white">{message}</p>
        )}
      </div>
    </div>
  );
};

export default LoginManagement;
