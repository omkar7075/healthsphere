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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await axios.post("https://healthsphere-ln4c.onrender.com/api/appointments", formData);
      setSuccessMessage("Appointment booked successfully!");
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
      <form className="appointment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email address"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="doctor">Select Doctor</label>
          <select
            id="doctor"
            name="doctor"
            value={formData.doctor}
            onChange={handleInputChange}
            required
          >
            <option value="">-- Select Doctor --</option>
            <option value="Dr. John Doe">Dr. John Doe</option>
            <option value="Dr. Jane Smith">Dr. Jane Smith</option>
            <option value="Dr. Emily Brown">Dr. Emily Brown</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="date">Appointment Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Appointment Time</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentBooking;
