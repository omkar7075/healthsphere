import { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/LabBooking.css";

const LabBooking = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    testType: "",
    appointmentDate: "",
    appointmentTime: "",
  });

  const [labBookings, setLabBookings] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [blockchainTx, setBlockchainTx] = useState("");

  const fetchLabBookings = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/lab-bookings");
      if (Array.isArray(response.data)) {
        setLabBookings(response.data);
      } else {
        throw new Error("Unexpected response format.");
      }
    } catch (err) {
      setErrorMessage("Failed to fetch lab bookings.");
    }
  };

  useEffect(() => {
    fetchLabBookings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/lab-bookings", formData);
      setLabBookings((prev) => [...prev, response.data]);
      setBlockchainTx(response.data.blockchainTx);
      setSuccessMessage("Lab booking added successfully and stored on Blockchain!");
      setFormData({ name: "", email: "", phone: "", testType: "", appointmentDate: "", appointmentTime: "" });
    } catch (err) {
      setErrorMessage("Failed to add lab booking.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/lab-bookings/${id}`);
      setLabBookings((prev) => prev.filter((booking) => booking._id !== id));
      setSuccessMessage("Lab booking deleted successfully!");
    } catch (err) {
      setErrorMessage("Failed to delete lab booking.");
    }
  };

  return (
    <div className="lab-booking-container">
      <h2>Lab Test Booking</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {blockchainTx && <p className="blockchain-tx">Blockchain Tx: {blockchainTx}</p>}

      <form className="lab-booking-form" onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required />
        <select name="testType" value={formData.testType} onChange={handleChange} required>
          <option value="">--Select a Test--</option>
          <option value="Blood Test">Blood Test</option>
          <option value="Urine Test">Urine Test</option>
          <option value="COVID-19 Test">COVID-19 Test</option>
          <option value="X-Ray">X-Ray</option>
          <option value="MRI">MRI</option>
        </select>
        <input type="date" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} required />
        <input type="time" name="appointmentTime" value={formData.appointmentTime} onChange={handleChange} required />
        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
};

export default LabBooking;
