import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppointmentBooking from "../Pages/AppointmentBooking";
import PharmacyDelivery from "../Pages/PharmacyDelivery";
import LabBooking from "../Pages/LabBooking";
import HealthRecords from "../Pages/HealthRecords";
import SymptomChecker from "../Pages/SymptomChecker";
import HealthWellness from "../Pages/HealthWellness";
import VideoConsultation from "../Pages/VideoConsultation";
import axios from "axios";
import "../CSS/PatientDashboard.css";

const PatientDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("healthRecords");
  const [blockchainRecords, setBlockchainRecords] = useState([]);
  const navigate = useNavigate();

  const fetchBlockchainRecords = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/patient/records");
      setBlockchainRecords(response.data);
    } catch (error) {
      console.error("Error fetching blockchain records:", error.message);
    }
  };

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
      case "blockchainRecords":
        return (
          <div className="blockchain-records">
            <h2>Blockchain Health Records</h2>
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
        return <HealthRecords />;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    sessionStorage.removeItem("userToken");
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

export default PatientDashboard;
