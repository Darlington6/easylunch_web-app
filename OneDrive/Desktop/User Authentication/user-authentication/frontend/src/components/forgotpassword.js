import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState(""); // Use the email state directly

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the email format
    if (!email) {
      alert("Please enter your email address.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });

      // Handle success response
      alert("If the email exists, a reset link has been sent.");
    } catch (err) {
      // Handle backend error responses
      const errorMessage = err.response?.data?.error || "Something went wrong. Please try again.";
      alert(errorMessage);
    }
  };

  return (
    <div className="forgot-password-container">
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <h2>Forgot Password?</h2>
        <p>Enter your email to receive a password reset link.</p>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update the email state
          />
        </div>
        <button type="submit" className="form-button">Submit</button>
      </form>
    </div>
  );
};

export default ForgotPassword;