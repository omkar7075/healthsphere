import { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/HealthRecords.css";

const HealthRecords = () => {
  const [records, setRecords] = useState([]); // Ensure records is an array
  const [newRecord, setNewRecord] = useState({
    date: "",
    doctor: "",
    diagnosis: "",
    prescription: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchRecords = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/health-records");

      // Ensure response is an array
      if (Array.isArray(response.data)) {
        setRecords(response.data);
      } else {
        setRecords([]); // Reset to an empty array if the response is invalid
        throw new Error("Unexpected API response format.");
      }
    } catch (err) {
      console.error("Error fetching health records:", err.message);
      setErrorMessage("Failed to fetch health records.");
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecord((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddRecord = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/health-records", newRecord);
      setRecords((prev) => [...prev, response.data]);
      setSuccessMessage("Record added successfully!");
      setNewRecord({ date: "", doctor: "", diagnosis: "", prescription: "" });
    } catch (err) {
      console.error("Error adding health record:", err.message);
      setErrorMessage("Failed to add record.");
    }
  };

  const handleDeleteRecord = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/health-records/${id}`);
      setRecords((prev) => prev.filter((record) => record._id !== id));
      setSuccessMessage("Record deleted successfully!");
    } catch (err) {
      console.error("Error deleting health record:", err.message);
      setErrorMessage("Failed to delete record.");
    }
  };

  return (
    <div className="health-records-container">
      <h1 className="page-title">Health Records Management</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <div className="records-section">
        <h2>Existing Records</h2>
        {records.length > 0 ? (
          <ul className="records-list">
            {records.map((record) => (
              <li key={record._id} className="record-item">
                <p>
                  <strong>Date:</strong> {record.date}
                </p>
                <p>
                  <strong>Doctor:</strong> {record.doctor}
                </p>
                <p>
                  <strong>Diagnosis:</strong> {record.diagnosis}
                </p>
                <p>
                  <strong>Prescription:</strong> {record.prescription}
                </p>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteRecord(record._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No health records found.</p>
        )}
      </div>
      <div className="add-record-section">
        <h2>Add New Record</h2>
        <form className="add-record-form" onSubmit={handleAddRecord}>
          <input
            type="date"
            name="date"
            value={newRecord.date}
            onChange={handleInputChange}
            placeholder="Date"
            required
          />
          <input
            type="text"
            name="doctor"
            value={newRecord.doctor}
            onChange={handleInputChange}
            placeholder="Doctor's Name"
            required
          />
          <input
            type="text"
            name="diagnosis"
            value={newRecord.diagnosis}
            onChange={handleInputChange}
            placeholder="Diagnosis"
            required
          />
          <textarea
            name="prescription"
            value={newRecord.prescription}
            onChange={handleInputChange}
            placeholder="Prescription"
            required
          />
          <button type="submit" className="add-record-button">
            Add Record
          </button>
        </form>
      </div>
    </div>
  );
};

export default HealthRecords;