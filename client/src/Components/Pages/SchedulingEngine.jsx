import { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/SchedulingEngine.css";

const SchedulingEngine = () => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/schedules");
      setSchedule(response.data);
    } catch (err) {
      console.error("Error fetching schedules:", err.message);
      setError("Unable to fetch schedules.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/schedules/${id}`, { newStatus });
      alert(`Schedule updated! Blockchain Tx: ${response.data.blockchainTx}`);
      fetchSchedules();
    } catch (err) {
      console.error("Error updating schedule:", err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/schedules/${id}`);
      alert(`Schedule deleted! Blockchain Tx: ${response.data.blockchainTx}`);
      fetchSchedules();
    } catch (err) {
      console.error("Error deleting schedule:", err.message);
    }
  };

  if (loading) return <div className="loading">Loading schedules...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="scheduling-engine-container">
      <h1>Scheduling Engine</h1>
      <div className="schedule-table">
        <div className="schedule-header">
          <div>Task</div>
          <div>Time</div>
          <div>Status</div>
          <div>Action</div>
        </div>
        {schedule.map((item, index) => (
          <div className="schedule-row" key={index}>
            <div>{item.task}</div>
            <div>{item.time}</div>
            <div className={`status ${item.status.toLowerCase()}`}>
              {item.status}
            </div>
            <div>
              <button onClick={() => updateStatus(index, "Confirmed")} className="confirm-btn">
                Confirm
              </button>
              <button onClick={() => deleteTask(index)} className="delete-btn">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchedulingEngine;
