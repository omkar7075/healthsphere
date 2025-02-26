import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ManageUsers from "../Dashboard/ManageUsers";
import PatientRecords from "../Pages/PatientRecords";
import LabBooking from "../Pages/LabBooking";
import axios from "axios";
import { getContractInstance } from "../Contrcats/web3Provider";
import "../CSS/AdminDashboard.css";

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("manageUsers");
  const [blockchainRecords, setBlockchainRecords] = useState([]);
  const [adminCount, setAdminCount] = useState(null);
  const navigate = useNavigate();

  /** Fetch blockchain patient records from backend */
  const fetchBlockchainRecords = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/patient-records");
      setBlockchainRecords(response.data);
    } catch (error) {
      console.error("Error fetching blockchain records:", error.message);
    }
  };

  /** Fetch Admin Count from Smart Contract */
  const fetchAdminCount = async () => {
    try {
      const contract = await getContractInstance("AdminDashboard");
      const count = await contract.getAdminCount();
      setAdminCount(count.toString());
    } catch (error) {
      console.error("Error fetching admin count:", error);
    }
  };

  /** Component Renderer */
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
            {blockchainRecords.length > 0 ? (
              blockchainRecords.map((record, index) => (
                <div key={index} className="record-card">
                  <p><strong>Patient:</strong> {record.patientName}</p>
                  <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
                </div>
              ))
            ) : (
              <p>No blockchain records found.</p>
            )}
          </div>
        );
      case "adminCount":
        return (
          <div>
            <h2>Admin Count from Blockchain</h2>
            <button onClick={fetchAdminCount}>Get Admin Count</button>
            {adminCount !== null && <p>Total Admins: {adminCount}</p>}
          </div>
        );
      default:
        return <ManageUsers />;
    }
  };

  /** Logout Handler */
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    sessionStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <div className="admin-dashboard-container">
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
          <li onClick={() => setActiveComponent("manageUsers")}>Manage Users</li>
          <li onClick={() => setActiveComponent("patientRecords")}>Patient Records</li>
          <li onClick={() => setActiveComponent("labBooking")}>Lab Booking</li>
          <li onClick={() => setActiveComponent("blockchainRecords")}>Blockchain Records</li>
          <li onClick={() => setActiveComponent("adminCount")}>Admin Count</li>
          <li onClick={handleLogout} className="logout-item">Logout</li>
        </ul>
      </div>
      <div className="main-content">{renderComponent()}</div>
    </div>
  );
};

export default AdminDashboard;
