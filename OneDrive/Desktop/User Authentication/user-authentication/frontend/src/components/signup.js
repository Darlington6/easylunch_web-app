import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/signup", formData);
    //   alert(res.data.message || "Sign-up successful!");
      window.location.href = "/login";
    } catch (err) {
      const errorMessage = err.response?.data?.error || "An error occurred during sign-up!";
      alert(errorMessage);
    }
  };


  // Google Signup
  const handleGoogleSignup = () => {
    window.location.href = "http://localhost:5000/api/auth/google/callback";
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2 className="form-title">Sign Up</h2>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            className="form-input"
            placeholder="Enter your full name"
            onChange={handleChange}
            required
          />
        </div>
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="form-input"
            placeholder="Confirm your password"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="form-button">Sign Up</button>
        <div className="form-divider">OR</div>
        <button type="button" onClick={handleGoogleSignup} className="google-signup-button">
          Sign Up with Google
        </button>
        <p className="switch-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
