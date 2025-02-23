import { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/SchedulingEngine.css";

const SchedulingEngine = () => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get("https://healthsphere-ln4c.onrender.com/api/schedules");
        setSchedule(response.data);
      } catch (err) {
        console.error("Error fetching schedules:", err.message);
        setError("Unable to fetch schedules. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`https://healthsphere-ln4c.onrender.com/api/schedules/${id}`, { status: newStatus });
      setSchedule((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, status: newStatus } : item
        )
      );
    } catch (err) {
      console.error("Error updating schedule:", err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`https://healthsphere-ln4c.onrender.com/api/schedules/${id}`);
      setSchedule((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err.message);
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
        {schedule.map((item) => (
          <div className="schedule-row" key={item._id}>
            <div>{item.task}</div>
            <div>{item.time}</div>
            <div className={`status ${item.status.toLowerCase()}`}>
              {item.status}
            </div>
            <div>
              <button
                onClick={() =>
                  updateStatus(
                    item._id,
                    item.status === "Pending" ? "Confirmed" : "Pending"
                  )
                }
                className={`action-btn ${
                  item.status === "Pending" ? "confirm" : "revert"
                }`}
              >
                {item.status === "Pending" ? "Confirm" : "Revert"}
              </button>
              <button
                onClick={() => deleteTask(item._id)}
                className="delete-btn"
              >
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
