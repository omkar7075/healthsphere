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
import axios from "axios";

const DoctorDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("appointments");
  const [blockchainRecords, setBlockchainRecords] = useState([]);
  const navigate = useNavigate();

  const fetchBlockchainRecords = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/doctor/records");
      setBlockchainRecords(response.data);
    } catch (error) {
      console.error("Error fetching blockchain records:", error.message);
    }
  };

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
      case "blockchainRecords":
        return (
          <div className="blockchain-records">
            <h2>Blockchain Patient Records</h2>
            <button onClick={fetchBlockchainRecords} className="fetch-button">
              Fetch Records
            </button>
            {blockchainRecords.length > 0 ? (
              blockchainRecords.map((record, index) => (
                <div key={index} className="record-card">
                  <p><strong>Patient:</strong> {record.patientName}</p>
                  <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
                  <p><strong>Prescription:</strong> {record.prescription}</p>
                  <p><strong>Notes:</strong> {record.notes}</p>
                  <p><strong>Timestamp:</strong> {new Date(record.timestamp * 1000).toLocaleString()}</p>
                </div>
              ))
            ) : (
              <p>No blockchain records found.</p>
            )}
          </div>
        );
      default:
        return <AppointmentBooking />;
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    sessionStorage.removeItem("userToken");
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
          <li onClick={() => setActiveComponent("blockchainRecords")}>Blockchain Records</li>
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
