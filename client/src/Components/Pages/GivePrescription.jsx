import { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/GivePrescription.css";

const GivePrescription = () => {
  const [prescriptionData, setPrescriptionData] = useState({
    patientName: "",
    age: "",
    symptoms: "",
    diagnosis: "",
    prescription: "",
    notes: "",
  });

  const [prescriptions, setPrescriptions] = useState([]); // Initialize as an array
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchPrescriptions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/prescriptions");
      // Ensure the response data is an array
      if (Array.isArray(response.data)) {
        setPrescriptions(response.data);
      } else {
        throw new Error("Invalid data format received from the server.");
      }
    } catch (err) {
      console.error("Error fetching prescriptions:", err.message);
      setErrorMessage("Failed to fetch prescriptions.");
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrescriptionData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/prescriptions", prescriptionData);
      setSuccessMessage("Prescription submitted successfully!");
      setPrescriptionData({
        patientName: "",
        age: "",
        symptoms: "",
        diagnosis: "",
        prescription: "",
        notes: "",
      });
      setPrescriptions((prev) => [...prev, response.data]); // Update state with new prescription
    } catch (err) {
      console.error("Error submitting prescription:", err.message);
      setErrorMessage("Failed to submit prescription.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/prescriptions/${id}`);
      setSuccessMessage("Prescription deleted successfully!");
      setPrescriptions((prev) => prev.filter((item) => item._id !== id)); // Update state after deletion
    } catch (err) {
      console.error("Error deleting prescription:", err.message);
      setErrorMessage("Failed to delete prescription.");
    }
  };

  return (
    <div className="give-prescription-container">
      <h2>Give Prescription</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form className="prescription-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="patientName">Patient Name</label>
          <input
            type="text"
            id="patientName"
            name="patientName"
            placeholder="Enter patient's name"
            value={prescriptionData.patientName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            placeholder="Enter patient's age"
            value={prescriptionData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="symptoms">Symptoms</label>
          <textarea
            id="symptoms"
            name="symptoms"
            placeholder="Enter symptoms"
            value={prescriptionData.symptoms}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="diagnosis">Diagnosis</label>
          <textarea
            id="diagnosis"
            name="diagnosis"
            placeholder="Enter diagnosis"
            value={prescriptionData.diagnosis}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="prescription">Prescription</label>
          <textarea
            id="prescription"
            name="prescription"
            placeholder="Enter prescription"
            value={prescriptionData.prescription}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="notes">Additional Notes</label>
          <textarea
            id="notes"
            name="notes"
            placeholder="Enter any additional notes"
            value={prescriptionData.notes}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className="submit-button">
          Submit Prescription
        </button>
      </form>

      <h3>Existing Prescriptions</h3>
      <ul className="prescription-list">
        {prescriptions.map((prescription) => (
          <li key={prescription._id}>
            <p>
              <strong>Patient:</strong> {prescription.patientName}
            </p>
            <p>
              <strong>Diagnosis:</strong> {prescription.diagnosis}
            </p>
            <p>
              <strong>Prescription:</strong> {prescription.prescription}
            </p>
            <button
              className="delete-button"
              onClick={() => handleDelete(prescription._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GivePrescription;
