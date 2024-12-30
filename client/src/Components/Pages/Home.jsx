import React from "react";
import { Link } from "react-router-dom";
import "../CSS/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to HealthSphere</h1>
        <p>Your comprehensive healthcare solution</p>
      </header>
      <div className="home-cards">
        <div className="card">
          <h2>Patient Portal</h2>
          <p>Access your health records, book appointments, and consult doctors.</p>
          <Link to="/patient-dashboard" className="card-button">
            Patient Dashboard
          </Link>
        </div>
        <div className="card">
          <h2>Doctor Portal</h2>
          <p>Manage your appointments, view patient details, and more.</p>
          <Link to="/doctor-dashboard" className="card-button">
            Doctor Dashboard
          </Link>
        </div>
        <div className="card">
          <h2>Admin Panel</h2>
          <p>Manage users, oversee system operations, and maintain security.</p>
          <Link to="/admin-dashboard" className="card-button">
            Admin Dashboard
          </Link>
        </div>
      </div>
      <footer className="home-footer">
        <p>&copy; {new Date().getFullYear()} HealthSphere. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
