import { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/PatientRecords.css";

const PatientRecords = () => {
  const [patientRecords, setPatientRecords] = useState([]);
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
        const response = await axios.get("https://healthsphere-ln4c.onrender.com/api/patient-records");
        if (Array.isArray(response.data)) {
          setPatientRecords(response.data);
        } else {
          throw new Error("Invalid data format received from the server.");
        }
      } catch (err) {
        console.error("Error fetching patient records:", err.message);
        setError("Unable to fetch patient records. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatientRecords();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecord((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddRecord = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://healthsphere-ln4c.onrender.com/api/patient-records", newRecord);
      setPatientRecords((prev) => [...prev, response.data]);
      setNewRecord({
        name: "",
        age: "",
        gender: "",
        medicalHistory: "",
        lastVisit: "",
      });
    } catch (err) {
      console.error("Error adding patient record:", err.message);
      setError("Failed to add patient record.");
    }
  };

  const handleDeleteRecord = async (id) => {
    try {
      await axios.delete(`https://healthsphere-ln4c.onrender.com/api/patient-records/${id}`);
      setPatientRecords((prev) => prev.filter((record) => record._id !== id));
    } catch (err) {
      console.error("Error deleting patient record:", err.message);
      setError("Failed to delete patient record.");
    }
  };

  if (loading) {
    return <div className="loading">Loading Patient Records...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="patient-records-container">
      <h2>Patient Records</h2>
      <div className="add-record-form">
        <h3>Add New Record</h3>
        <form onSubmit={handleAddRecord}>
          <input
            type="text"
            name="name"
            placeholder="Patient Name"
            value={newRecord.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={newRecord.age}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="gender"
            placeholder="Gender"
            value={newRecord.gender}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="medicalHistory"
            placeholder="Medical History"
            value={newRecord.medicalHistory}
            onChange={handleInputChange}
            required
          />
          <input
            type="date"
            name="lastVisit"
            placeholder="Last Visit"
            value={newRecord.lastVisit}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Add Record</button>
        </form>
      </div>
      <div className="patient-records">
        {patientRecords.map((record) => (
          <div className="record-card" key={record._id}>
            <h3>{record.name}</h3>
            <p>
              <strong>Age:</strong> {record.age}
            </p>
            <p>
              <strong>Gender:</strong> {record.gender}
            </p>
            <p>
              <strong>Medical History:</strong> {record.medicalHistory}
            </p>
            <p>
              <strong>Last Visit:</strong> {record.lastVisit}
            </p>
            <button onClick={() => handleDeleteRecord(record._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientRecords;
