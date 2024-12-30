import { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/VideoConsultation.css";

const VideoConsultation = () => {
  const [doctors, setDoctors] = useState([]); // Initialize as an array
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [consultationStarted, setConsultationStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch available doctors from the backend
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/consultations");
        if (Array.isArray(res.data)) {
          setDoctors(res.data);
        } else {
          throw new Error("Invalid data format received from the server.");
        }
      } catch (error) {
        console.error("Error fetching doctors:", error.message);
        setErrorMessage("Failed to fetch doctors. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const startConsultation = async () => {
    if (!selectedDoctor) {
      alert("Please select a doctor to start the consultation.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/consultations", {
        doctorName: selectedDoctor.doctorName,
        specialty: selectedDoctor.specialty,
        patientName: "John Doe", // Replace with actual patient data
        consultationDate: new Date().toISOString().split("T")[0],
        consultationTime: new Date().toLocaleTimeString(),
      });

      setConsultationStarted(true);
    } catch (error) {
      console.error("Error starting consultation:", error.message);
      setErrorMessage("Failed to start the consultation. Please try again.");
    }
  };

  if (loading) {
    return <div className="loading">Loading available doctors...</div>;
  }

  if (errorMessage) {
    return <div className="error-message">{errorMessage}</div>;
  }

  return (
    <div className="video-consultation-container">
      <h2 className="page-title">Online Doctor Video Consultations</h2>
      {!consultationStarted ? (
        <div className="doctor-selection">
          <h3>Select a Doctor</h3>
          <ul className="doctor-list">
            {doctors.map((doctor) => (
              <li
                key={doctor._id}
                className={`doctor-item ${
                  selectedDoctor?._id === doctor._id ? "selected" : ""
                }`}
                onClick={() => setSelectedDoctor(doctor)}
              >
                <div className="doctor-info">
                  <p className="doctor-name">{doctor.doctorName}</p>
                  <p className="doctor-specialty">{doctor.specialty}</p>
                </div>
              </li>
            ))}
          </ul>
          <button className="start-button" onClick={startConsultation}>
            Start Consultation
          </button>
        </div>
      ) : (
        <div className="consultation-room">
          <h3>Consultation with {selectedDoctor?.doctorName}</h3>
          <p>Specialty: {selectedDoctor?.specialty}</p>
          <div className="video-placeholder">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Video Call Placeholder"
              allow="camera; microphone"
              frameBorder="0"
              className="video-frame"
            ></iframe>
          </div>
          <button
            className="end-button"
            onClick={() => setConsultationStarted(false)}
          >
            End Consultation
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoConsultation;
