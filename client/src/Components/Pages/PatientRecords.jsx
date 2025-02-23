import { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/PatientRecords.css";

const PatientRecords = () => {
  const [patientRecords, setPatientRecords] = useState([]);
  const [blockchainPatient, setBlockchainPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newRecord, setNewRecord] = useState({
    name: "",
    age: "",
    gender: "",
    medicalHistory: "",
    lastVisit: "",
  });

  useEffect(() => {
    const fetchPatientRecords = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/patient-records");
        if (Array.isArray(response.data)) {
          setPatientRecords(response.data);
        } else {
          throw new Error("Invalid data format received from the server.");
        }
      } catch (err) {
        setError("Unable to fetch patient records.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatientRecords();
  }, []);

  const fetchPatientFromBlockchain = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/patient-records/blockchain/${id}`);
      setBlockchainPatient(response.data);
    } catch (err) {
      setError("Failed to fetch blockchain patient data.");
    }
  };

  const handleAddRecord = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/patient-records", newRecord);
      setPatientRecords((prev) => [...prev, response.data.savedRecord]);
      alert(`Patient record added! Blockchain Tx: ${response.data.blockchainTx}`);
      setNewRecord({ name: "", age: "", gender: "", medicalHistory: "", lastVisit: "" });
    } catch (err) {
      alert("Failed to add patient record.");
    }
  };

  return (
    <div className="patient-records-container">
      <h2>Patient Records</h2>
      <form onSubmit={handleAddRecord}>
        <input type="text" name="name" value={newRecord.name} onChange={(e) => setNewRecord({ ...newRecord, name: e.target.value })} placeholder="Name" required />
        <input type="number" name="age" value={newRecord.age} onChange={(e) => setNewRecord({ ...newRecord, age: e.target.value })} placeholder="Age" required />
        <input type="text" name="gender" value={newRecord.gender} onChange={(e) => setNewRecord({ ...newRecord, gender: e.target.value })} placeholder="Gender" required />
        <textarea name="medicalHistory" value={newRecord.medicalHistory} onChange={(e) => setNewRecord({ ...newRecord, medicalHistory: e.target.value })} placeholder="Medical History" required />
        <input type="date" name="lastVisit" value={newRecord.lastVisit} onChange={(e) => setNewRecord({ ...newRecord, lastVisit: e.target.value })} required />
        <button type="submit">Add Record</button>
      </form>
    </div>
  );
};

export default PatientRecords;
