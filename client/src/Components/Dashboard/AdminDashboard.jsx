import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ManageUsers from "../Dashboard/ManageUsers";
import PatientRecords from "../Pages/PatientRecords";
import LabBooking from "../Pages/LabBooking";
import axios from "axios";
import "../CSS/AdminDashboard.css";

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("manageUsers");
  const [blockchainRecords, setBlockchainRecords] = useState([]);
  const navigate = useNavigate();

  const fetchBlockchainRecords = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/patient-records");
      setBlockchainRecords(response.data);
    } catch (error) {
      console.error("Error fetching blockchain records:", error.message);
    }
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "patientRecords":
        return <PatientRecords />;
      case "labBooking":
        return <LabBooking />;
      case "blockchainRecords":
        return (
          <div>
            <h2>Blockchain Patient Records</h2>
            <button onClick={fetchBlockchainRecords}>Fetch Records</button>
            {blockchainRecords.map((record, index) => (
              <div key={index}>
                <p><strong>Patient:</strong> {record.patientName}</p>
                <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
              </div>
            ))}
          </div>
        );
      default:
        return <ManageUsers />;
    }
  };

  return (
    <div className="admin-dashboard-container">
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
          <li onClick={() => setActiveComponent("blockchainRecords")}>Blockchain Records</li>
        </ul>
      </div>
      <div className="main-content">{renderComponent()}</div>
    </div>
  );
};

export default AdminDashboard;
