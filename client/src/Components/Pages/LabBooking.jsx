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

  const [labBookings, setLabBookings] = useState([]); // Ensure it's initialized as an array
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchLabBookings = async () => {
    try {
      const response = await axios.get("https://healthsphere-ln4c.onrender.com/api/lab-bookings");
      if (Array.isArray(response.data)) {
        setLabBookings(response.data); // Ensure response is an array
      } else {
        setLabBookings([]); // Reset to an empty array if the response is invalid
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
      await axios.post("https://healthsphere-ln4c.onrender.com/api/lab-bookings", formData);
      setSuccessMessage("Lab booking added successfully!");
      fetchLabBookings();
      setFormData({
        name: "",
        email: "",
        phone: "",
        testType: "",
        appointmentDate: "",
        appointmentTime: "",
      });
    } catch (err) {
      setErrorMessage("Failed to add lab booking.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://healthsphere-ln4c.onrender.com/api/lab-bookings/${id}`);
      setSuccessMessage("Lab booking deleted successfully!");
      fetchLabBookings();
    } catch (err) {
      setErrorMessage("Failed to delete lab booking.");
    }
  };

  return (
    <div className="lab-booking-container">
      <h2>Lab Test Booking</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form className="lab-booking-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="testType">Select Test Type</label>
          <select
            id="testType"
            name="testType"
            value={formData.testType}
            onChange={handleChange}
            required
          >
            <option value="">--Select a Test--</option>
            <option value="Blood Test">Blood Test</option>
            <option value="Urine Test">Urine Test</option>
            <option value="COVID-19 Test">COVID-19 Test</option>
            <option value="X-Ray">X-Ray</option>
            <option value="MRI">MRI</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="appointmentDate">Appointment Date</label>
          <input
            type="date"
            id="appointmentDate"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="appointmentTime">Appointment Time</label>
          <input
            type="time"
            id="appointmentTime"
            name="appointmentTime"
            value={formData.appointmentTime}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Book Appointment
        </button>
      </form>
      <div className="bookings-list">
        <h3>Existing Bookings</h3>
        {labBookings.length > 0 ? (
          labBookings.map((booking) => (
            <div key={booking._id} className="booking-card">
              <p>
                <strong>Name:</strong> {booking.name}
              </p>
              <p>
                <strong>Email:</strong> {booking.email}
              </p>
              <p>
                <strong>Phone:</strong> {booking.phone}
              </p>
              <p>
                <strong>Test Type:</strong> {booking.testType}
              </p>
              <p>
                <strong>Appointment Date:</strong> {booking.appointmentDate}
              </p>
              <p>
                <strong>Appointment Time:</strong> {booking.appointmentTime}
              </p>
              <button
                className="delete-button"
                onClick={() => handleDelete(booking._id)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No bookings available.</p>
        )}
      </div>
    </div>
  );
};

export default LabBooking;
