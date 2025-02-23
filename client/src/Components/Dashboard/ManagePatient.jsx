import { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/ManagePatient.css";

const ManagePatient = () => {
  const [patients, setPatients] = useState([]);
  const [blockchainPatient, setBlockchainPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
    medicalHistory: "",
  });

  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/patients");
      if (Array.isArray(response.data)) {
        setPatients(response.data);
      } else {
        throw new Error("Unexpected API response format.");
      }
    } catch (err) {
      setError("Unable to fetch patient data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatientFromBlockchain = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/patients/blockchain/${id}`);
      setBlockchainPatient(response.data);
    } catch (err) {
      setError("Failed to fetch blockchain patient data.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/patients/${id}`);
      alert("Patient deleted successfully!");
      fetchPatients();
    } catch (err) {
      alert("Failed to delete patient.");
    }
  };

  const handleAddPatient = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/patients", newPatient);
      setPatients((prev) => [...prev, response.data.savedPatient]);
      alert(`Patient added! Blockchain Tx: ${response.data.blockchainTx}`);
      setNewPatient({ name: "", age: "", gender: "", medicalHistory: "" });
    } catch (err) {
      alert("Failed to add patient.");
    }
  };

  return (
    <div className="manage-patient-container">
      <h2>Manage Patients</h2>

      {/* Add Patient Form */}
      <form className="add-patient-form" onSubmit={handleAddPatient}>
        <h3>Add New Patient</h3>
        <input type="text" name="name" value={newPatient.name} onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })} placeholder="Name" required />
        <input type="number" name="age" value={newPatient.age} onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })} placeholder="Age" required />
        <select name="gender" value={newPatient.gender} onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <textarea name="medicalHistory" value={newPatient.medicalHistory} onChange={(e) => setNewPatient({ ...newPatient, medicalHistory: e.target.value })} placeholder="Medical History" required />
        <button type="submit">Add Patient</button>
      </form>

      {/* Blockchain Patient Fetch */}
      <input type="text" placeholder="Enter Patient ID" onBlur={(e) => fetchPatientFromBlockchain(e.target.value)} />
      {blockchainPatient && <pre>{JSON.stringify(blockchainPatient, null, 2)}</pre>}

      {/* Patient List */}
      <div className="patient-list">
        {patients.map((patient) => (
          <div key={patient._id}>{patient.name}</div>
        ))}
      </div>
    </div>
  );
};

export default ManagePatient;
