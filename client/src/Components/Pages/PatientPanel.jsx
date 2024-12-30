import { useState } from "react";
import "../CSS/PatientPanel.css";

const PatientPanel = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctorName: "Dr. Sarah Johnson",
      date: "2024-12-20",
      time: "10:00 AM",
      status: "Confirmed",
    },
    {
      id: 2,
      doctorName: "Dr. Mark Lee",
      date: "2024-12-22",
      time: "12:30 PM",
      status: "Pending",
    },
  ]);

  return (
    <div className="patient-panel-container">
      <h1>Patient Dashboard</h1>
      <div className="appointments-table">
        <div className="table-header">
          <div>Doctor Name</div>
          <div>Date</div>
          <div>Time</div>
          <div>Status</div>
        </div>
        {appointments.map((appointment) => (
          <div className="table-row" key={appointment.id}>
            <div>{appointment.doctorName}</div>
            <div>{appointment.date}</div>
            <div>{appointment.time}</div>
            <div className={`status ${appointment.status.toLowerCase()}`}>
              {appointment.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientPanel;
