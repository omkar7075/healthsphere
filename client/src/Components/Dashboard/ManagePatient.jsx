import { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/ManagePatient.css";

const ManagePatient = () => {
  const [patients, setPatients] = useState([]); // Ensure patients is an array
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

      // Ensure response is an array
      if (Array.isArray(response.data)) {
        setPatients(response.data);
      } else {
        setPatients([]); // Reset to empty array if the response is invalid
        throw new Error("Unexpected API response format.");
      }
    } catch (err) {
      console.error("Error fetching patients:", err.message);
      setError("Unable to fetch patient data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/patients/${id}`);
      alert("Patient deleted successfully!");
      fetchPatients();
    } catch (err) {
      console.error("Error deleting patient:", err.message);
      alert("Failed to delete patient.");
    }
  };

  const handleAddPatient = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/patients", newPatient);
      setPatients((prev) => [...prev, response.data]); // Update state with the new patient
      alert("Patient added successfully!");
      setNewPatient({ name: "", age: "", gender: "", medicalHistory: "" });
    } catch (err) {
      console.error("Error adding patient:", err.message);
      alert("Failed to add patient.");
    }
  };

  if (loading) return <div className="loading">Loading Patients...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="manage-patient-container">
      <h2>Manage Patients</h2>

      {/* Add Patient Form */}
      <form className="add-patient-form" onSubmit={handleAddPatient}>
        <h3>Add New Patient</h3>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={newPatient.name}
            onChange={(e) =>
              setNewPatient({ ...newPatient, name: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            value={newPatient.age}
            onChange={(e) =>
              setNewPatient({ ...newPatient, age: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            value={newPatient.gender}
            onChange={(e) =>
              setNewPatient({ ...newPatient, gender: e.target.value })
            }
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="medicalHistory">Medical History</label>
          <textarea
            id="medicalHistory"
            value={newPatient.medicalHistory}
            onChange={(e) =>
              setNewPatient({ ...newPatient, medicalHistory: e.target.value })
            }
            required
          ></textarea>
        </div>
        <button type="submit" className="add-button">
          Add Patient
        </button>
      </form>

      {/* Patient List */}
      <div className="patient-list">
        {patients.length > 0 ? (
          patients.map((patient) => (
            <div className="patient-card" key={patient._id}>
              <h3>{patient.name}</h3>
              <p>
                <strong>Age:</strong> {patient.age}
              </p>
              <p>
                <strong>Gender:</strong> {patient.gender}
              </p>
              <p>
                <strong>Medical History:</strong> {patient.medicalHistory}
              </p>
              <button
                onClick={() => handleDelete(patient._id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No patients available</p>
        )}
      </div>
    </div>
  );
};

export default ManagePatient;
