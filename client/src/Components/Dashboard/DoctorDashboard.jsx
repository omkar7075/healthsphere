import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/DoctorDashboard.css";
import AppointmentBooking from "../Pages/AppointmentBooking";
import LabBooking from "../Pages/LabBooking";
import HealthRecords from "../Pages/HealthRecords";
import PatientRecords from "../Pages/PatientRecords";
import ManagePatient from "../Dashboard/ManagePatient";
import VideoConsultation from "../Pages/VideoConsultation";
import GivePrescription from "../Pages/GivePrescription";

const DoctorDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("appointments");
  const navigate = useNavigate();

  const renderComponent = () => {
    switch (activeComponent) {
      case "appointments":
        return <AppointmentBooking />;
      case "labBookings":
        return <LabBooking />;
      case "healthRecords":
        return <HealthRecords />;
      case "patientRecords":
        return <PatientRecords />;
      case "managePatient":
        return <ManagePatient />;
      case "videoConsultation":
        return <VideoConsultation />;
      case "givePrescription":
        return <GivePrescription />;
      default:
        return <AppointmentBooking />;
    }
  };

  // Logout handler
  const handleLogout = () => {
    // Clear session data (e.g., JWT token)
    localStorage.removeItem("userToken"); // Example: remove from localStorage
    sessionStorage.removeItem("userToken"); // Example: remove from sessionStorage
    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="doctor-dashboard">
      <div className="sidebar">
        <h2>Doctor Dashboard</h2>
        <ul>
          <li onClick={() => setActiveComponent("appointments")}>Appointments</li>
          <li onClick={() => setActiveComponent("labBookings")}>Lab Bookings</li>
          <li onClick={() => setActiveComponent("healthRecords")}>Health Records</li>
          <li onClick={() => setActiveComponent("patientRecords")}>Patient Records</li>
          <li onClick={() => setActiveComponent("managePatient")}>Manage Patients</li>
          <li onClick={() => setActiveComponent("videoConsultation")}>Video Consultation</li>
          <li onClick={() => setActiveComponent("givePrescription")}>Prescriptions</li>
          {/* Logout option */}
          <li onClick={handleLogout} className="logout-item">
            Logout
          </li>
        </ul>
      </div>
      <div className="main-content">{renderComponent()}</div>
    </div>
  );
};

export default DoctorDashboard;
