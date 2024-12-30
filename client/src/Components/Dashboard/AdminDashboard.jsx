import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ManageUsers from "../Dashboard/ManageUsers";
import PatientRecords from "../Pages/PatientRecords";
import LabBooking from "../Pages/LabBooking";
import AppointmentBooking from "../Pages/AppointmentBooking";
import PharmacyDelivery from "../Pages/PharmacyDelivery";
import HealthWellness from "../Pages/HealthWellness";
import SymptomChecker from "../Pages/SymptomChecker";
import SchedulingEngine from "../Pages/SchedulingEngine";
import WebScraper from "../Pages/WebScraper";
import "../CSS/AdminDashboard.css";

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("manageUsers");
  const navigate = useNavigate();

  const renderComponent = () => {
    switch (activeComponent) {
      case "manageUsers":
        return <ManageUsers />;
      case "patientRecords":
        return <PatientRecords />;
      case "labBooking":
        return <LabBooking />;
      case "appointmentBooking":
        return <AppointmentBooking />;
      case "pharmacyDelivery":
        return <PharmacyDelivery />;
      case "symptomChecker":
        return <SymptomChecker />;
      case "healthWellness":
        return <HealthWellness />;
      case "schedulingEngine":
        return <SchedulingEngine />;
      case "webScraper":
        return <WebScraper />;
      default:
        return <ManageUsers />;
    }
  };

  const handleLogout = () => {
    // Clear session data (e.g., JWT token)
    localStorage.removeItem("userToken"); // Example: remove from localStorage
    sessionStorage.removeItem("userToken"); // Example: remove from sessionStorage
    // Redirect the user to the login page
    navigate("/login");
  };

  return (
    <div className="admin-dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
          <li
            className={activeComponent === "manageUsers" ? "active" : ""}
            onClick={() => setActiveComponent("manageUsers")}
          >
            Manage Users
          </li>
          <li
            className={activeComponent === "patientRecords" ? "active" : ""}
            onClick={() => setActiveComponent("patientRecords")}
          >
            Patient Records
          </li>
          <li
            className={activeComponent === "labBooking" ? "active" : ""}
            onClick={() => setActiveComponent("labBooking")}
          >
            Lab Booking
          </li>
          <li
            className={activeComponent === "appointmentBooking" ? "active" : ""}
            onClick={() => setActiveComponent("appointmentBooking")}
          >
            Appointment Booking
          </li>
          <li
            className={activeComponent === "pharmacyDelivery" ? "active" : ""}
            onClick={() => setActiveComponent("pharmacyDelivery")}
          >
            Pharmacy Delivery
          </li>
          <li
            className={activeComponent === "symptomChecker" ? "active" : ""}
            onClick={() => setActiveComponent("symptomChecker")}
          >
            Symptom Checker
          </li>
          <li
            className={activeComponent === "healthWellness" ? "active" : ""}
            onClick={() => setActiveComponent("healthWellness")}
          >
            Health & Wellness
          </li>
          <li
            className={activeComponent === "schedulingEngine" ? "active" : ""}
            onClick={() => setActiveComponent("schedulingEngine")}
          >
            Scheduling Engine
          </li>
          <li
            className={activeComponent === "webScraper" ? "active" : ""}
            onClick={() => setActiveComponent("webScraper")}
          >
            Web Scraper
          </li>
          {/* Logout option */}
          <li onClick={handleLogout} className="logout-item">
            Logout
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">{renderComponent()}</div>
    </div>
  );
};

export default AdminDashboard;
