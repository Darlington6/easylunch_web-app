import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/login", formData);
      window.location.href = "/index.html";
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Something went wrong!";
      alert(errorMessage);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="form-title">Log In</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-input"
            placeholder="Enter your email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-input"
            placeholder="Enter your password"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="form-button">Log In</button>
        <div className="form-options">
          <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
        </div>
        <div className="form-divider">OR</div>
        <a href="http://localhost:5000/api/auth/google" className="google-login-button">
          Sign In with Google
        </a>
        <p className="switch-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
