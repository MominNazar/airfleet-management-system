import React, { useState } from 'react';
import './LoginRegister.css';
import background from '../assets/images/background.jpg'; // Add a nice background image here

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle state

  return (
    <div
      className="auth-container"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="auth-box">
        <div className="toggle-buttons">
          <button
            className={`toggle-btn ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`toggle-btn ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        {isLogin ? (
          <div className="form-container">
            <h2>Login</h2>
            <form>
              <input type="text" placeholder="Username" />
              <input type="password" placeholder="Password" />
              <button type="submit">Login</button>
            </form>
          </div>
        ) : (
          <div className="form-container">
            <h2>Register</h2>
            <form>
              <input type="text" placeholder="Name" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button type="submit">Register</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginRegister;
