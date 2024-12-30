import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "", userType: "patient" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUserTypeChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      userType: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { userType, email, password } = formData;
      const response = await axios.post(`http://localhost:5000/api/auth/login/${userType}`, { email, password });

      alert("Login successful!");
      localStorage.setItem("token", response.data.token);

      const dashboardPath =
        userType === "patient"
          ? "/patient-dashboard"
          : userType === "doctor"
          ? "/doctor-dashboard"
          : "/admin-dashboard";

      navigate(dashboardPath);
    } catch (error) {
      console.error("Login error:", error.message);
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="userType">Select User Type</label>
          <select name="userType" id="userType" value={formData.userType} onChange={handleUserTypeChange}>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={formData.email}
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
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="register-link">
          Don't have an account?{" "}
          <span onClick={handleRegisterRedirect} className="register-link-text">
            Register
          </span>
          .
        </p>
      </form>
    </div>
  );
};

export default Login;
