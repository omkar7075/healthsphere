import { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/GivePrescription.css";

const GivePrescription = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [blockchainPrescription, setBlockchainPrescription] = useState(null);
  const [prescriptionData, setPrescriptionData] = useState({
    patientName: "",
    age: "",
    symptoms: "",
    diagnosis: "",
    prescription: "",
    notes: "",
  });

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/prescriptions");
        if (Array.isArray(response.data)) {
          setPrescriptions(response.data);
        } else {
          throw new Error("Invalid data format received from the server.");
        }
      } catch (err) {
        alert("Failed to fetch prescriptions.");
      }
    };

    fetchPrescriptions();
  }, []);

  const fetchPrescriptionFromBlockchain = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/prescriptions/blockchain/${id}`);
      setBlockchainPrescription(response.data);
    } catch (err) {
      alert("Failed to fetch blockchain prescription data.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/prescriptions", prescriptionData);
      setPrescriptions((prev) => [...prev, response.data.savedPrescription]);
      alert(`Prescription added! Blockchain Tx: ${response.data.blockchainTx}`);
      setPrescriptionData({ patientName: "", age: "", symptoms: "", diagnosis: "", prescription: "", notes: "" });
    } catch (err) {
      alert("Failed to add prescription.");
    }
  };

  return (
    <div className="give-prescription-container">
      <h2>Give Prescription</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="patientName" placeholder="Patient Name" value={prescriptionData.patientName} onChange={(e) => setPrescriptionData({ ...prescriptionData, patientName: e.target.value })} required />
        <input type="number" name="age" placeholder="Age" value={prescriptionData.age} onChange={(e) => setPrescriptionData({ ...prescriptionData, age: e.target.value })} required />
        <textarea name="symptoms" placeholder="Symptoms" value={prescriptionData.symptoms} onChange={(e) => setPrescriptionData({ ...prescriptionData, symptoms: e.target.value })} required />
        <textarea name="diagnosis" placeholder="Diagnosis" value={prescriptionData.diagnosis} onChange={(e) => setPrescriptionData({ ...prescriptionData, diagnosis: e.target.value })} required />
        <textarea name="prescription" placeholder="Prescription" value={prescriptionData.prescription} onChange={(e) => setPrescriptionData({ ...prescriptionData, prescription: e.target.value })} required />
        <button type="submit">Submit Prescription</button>
      </form>
    </div>
  );
};

export default GivePrescription;
