import { useState } from "react";
import axios from "axios";
import "../CSS/AppointmentBooking.css";

const AppointmentBooking = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    doctor: "",
    date: "",
    time: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [blockchainTx, setBlockchainTx] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    setBlockchainTx("");

    try {
      const response = await axios.post("http://localhost:5000/api/appointments", formData);
      setSuccessMessage("Appointment booked successfully!");
      setBlockchainTx(response.data.blockchainTx);
      setFormData({
        name: "",
        email: "",
        phone: "",
        doctor: "",
        date: "",
        time: "",
      });
    } catch (err) {
      setErrorMessage("Failed to book appointment. Please try again.");
    }
  };

  return (
    <div className="appointment-booking-container">
      <h1 className="page-title">Appointment Booking System</h1>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {blockchainTx && <p className="blockchain-tx">Blockchain Tx: {blockchainTx}</p>}
      <form className="appointment-form" onSubmit={handleSubmit}>
        {/* Form fields remain unchanged */}
      </form>
    </div>
  );
};

export default AppointmentBooking;
