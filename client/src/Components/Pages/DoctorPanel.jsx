import { useState } from "react";
import "../CSS/DoctorPanel.css";

const DoctorPanel = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "John Doe",
      date: "2024-12-19",
      time: "10:00 AM",
      status: "Pending",
    },
    {
      id: 2,
      patientName: "Jane Smith",
      date: "2024-12-20",
      time: "11:30 AM",
      status: "Confirmed",
    },
  ]);

  const updateAppointmentStatus = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === id ? { ...appointment, status: newStatus } : appointment
      )
    );
  };

  return (
    <div className="doctor-panel-container">
      <h1>Doctor Panel</h1>
      <div className="appointments-table">
        <div className="table-header">
          <div>Patient Name</div>
          <div>Date</div>
          <div>Time</div>
          <div>Status</div>
          <div>Action</div>
        </div>
        {appointments.map((appointment) => (
          <div className="table-row" key={appointment.id}>
            <div>{appointment.patientName}</div>
            <div>{appointment.date}</div>
            <div>{appointment.time}</div>
            <div className={`status ${appointment.status.toLowerCase()}`}>
              {appointment.status}
            </div>
            <div>
              {appointment.status === "Pending" && (
                <button
                  className="action-btn confirm"
                  onClick={() => updateAppointmentStatus(appointment.id, "Confirmed")}
                >
                  Confirm
                </button>
              )}
              {appointment.status === "Confirmed" && (
                <button
                  className="action-btn complete"
                  onClick={() => updateAppointmentStatus(appointment.id, "Completed")}
                >
                  Complete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorPanel;
