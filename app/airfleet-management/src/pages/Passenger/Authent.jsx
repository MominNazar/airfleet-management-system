import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate instead of useHistory

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordRecovery, setIsPasswordRecovery] = useState(false);
  const [emailForRecovery, setEmailForRecovery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Mocked user credentials
  const userCredentials = {
    email: "user@example.com",
    password: "password123",
  };

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();

    if (email === userCredentials.email && password === userCredentials.password) {
      setSuccessMessage("Login successful!");
      setErrorMessage("");
      localStorage.setItem("loggedIn", true); // Store login status
      navigate("/passenger/dashboard"); // Redirect to the dashboard page using navigate
    } else {
      setErrorMessage("Invalid email or password.");
      setSuccessMessage("");
    }
  };

  // Handle Password Recovery
  const handlePasswordRecovery = (e) => {
    e.preventDefault();

    if (emailForRecovery === userCredentials.email) {
      setSuccessMessage("Password recovery email sent!");
      setErrorMessage("");
      // Logic to trigger an email would go here (currently mocked)
    } else {
      setErrorMessage("Email not found.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="login-container min-h-screen bg-gray-800 text-white flex items-center justify-center p-6">
      <div className="max-w-sm w-full bg-gray-700 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-center">
          {isPasswordRecovery ? "Recover Your Password" : "Login"}
        </h2>

        {/* Error and Success Messages */}
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

        {/* Login Form */}
        {!isPasswordRecovery ? (
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-lg" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 bg-gray-600 text-white rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-lg" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-3 bg-gray-600 text-white rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-yellow-500 text-white rounded-lg mt-4"
            >
              Login
            </button>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setIsPasswordRecovery(true)}
                className="text-yellow-500 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          </form>
        ) : (
          // Password Recovery Form
          <form onSubmit={handlePasswordRecovery}>
            <div className="mb-4">
              <label className="block text-lg" htmlFor="emailForRecovery">
                Enter Your Email Address
              </label>
              <input
                type="email"
                id="emailForRecovery"
                className="w-full p-3 bg-gray-600 text-white rounded-lg"
                value={emailForRecovery}
                onChange={(e) => setEmailForRecovery(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-yellow-500 text-white rounded-lg mt-4"
            >
              Recover Password
            </button>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setIsPasswordRecovery(false)}
                className="text-yellow-500 hover:underline"
              >
                Back to Login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
