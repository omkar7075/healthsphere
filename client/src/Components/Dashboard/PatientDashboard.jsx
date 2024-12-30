import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppointmentBooking from "../Pages/AppointmentBooking";
import PharmacyDelivery from "../Pages/PharmacyDelivery";
import LabBooking from "../Pages/LabBooking";
import HealthRecords from "../Pages/HealthRecords";
import SymptomChecker from "../Pages/SymptomChecker";
import HealthWellness from "../Pages/HealthWellness";
import VideoConsultation from "../Pages/VideoConsultation";
import "../CSS/PatientDashboard.css";

const PatientDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("healthRecords");
  const navigate = useNavigate();

  const renderComponent = () => {
    switch (activeComponent) {
      case "labBooking":
        return <LabBooking />;
      case "appointmentBooking":
        return <AppointmentBooking />;
      case "pharmacyDelivery":
        return <PharmacyDelivery />;
      case "symptomChecker":
        return <SymptomChecker />;
      case "videoConsultation":
        return <VideoConsultation />;
      case "healthWellness":
        return <HealthWellness />;
      case "healthRecords":
        return <HealthRecords />;
      default:
        return <HealthRecords />;
    }
  };

  const handleLogout = () => {
    // Clear any session data (e.g., JWT token) or localStorage/sessionStorage
    localStorage.removeItem("userToken"); // Example for JWT token
    sessionStorage.removeItem("userToken"); // Example if using session storage
    // Redirect the user to the login page
    navigate("/login");
  };

  return (
    <div className="patient-dashboard-container">
      <div className="sidebar">
        <h2>Patient Dashboard</h2>
        <ul>
          <li onClick={() => setActiveComponent("healthRecords")}>Health Records</li>
          <li onClick={() => setActiveComponent("labBooking")}>Lab Booking</li>
          <li onClick={() => setActiveComponent("appointmentBooking")}>Appointment Booking</li>
          <li onClick={() => setActiveComponent("pharmacyDelivery")}>Pharmacy Delivery</li>
          <li onClick={() => setActiveComponent("symptomChecker")}>Symptom Checker</li>
          <li onClick={() => setActiveComponent("videoConsultation")}>Video Consultation</li>
          <li onClick={() => setActiveComponent("healthWellness")}>Health & Wellness</li>
          {/* Add Logout Option */}
          <li onClick={handleLogout} className="logout-item">
            Logout
          </li>
        </ul>
      </div>
      <div className="main-content">{renderComponent()}</div>
    </div>
  );
};

export default PatientDashboard;
