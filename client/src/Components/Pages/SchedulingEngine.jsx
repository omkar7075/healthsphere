import { useEffect, useState } from "react";
import axios from "axios";
import Web3 from "web3";
import SchedulingEngineABI from "../blockchain/SchedulingEngineABI.json";
import "../CSS/SchedulingEngine.css";

const web3 = new Web3(window.ethereum);
const contractAddress = "YOUR_SMART_CONTRACT_ADDRESS";
const contract = new web3.eth.Contract(SchedulingEngineABI, contractAddress);

const SchedulingEngine = () => {
  const [schedule, setSchedule] = useState([]);
  const [task, setTask] = useState("");
  const [time, setTime] = useState("");
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
      setError("Failed to fetch schedules.");
    } finally {
      setLoading(false);
    }
  };

  const addSchedule = async (e) => {
    e.preventDefault();
    try {
      const accounts = await web3.eth.requestAccounts();
      const tx = await contract.methods.addSchedule(task, time).send({ from: accounts[0] });

      await axios.post("http://localhost:5000/api/schedules", { task, time });
      alert(`Schedule added! Blockchain Tx: ${tx.transactionHash}`);
      fetchSchedules();
    } catch (err) {
      alert("Failed to add schedule.");
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/schedules/${id}`, { status: newStatus });
      fetchSchedules();
    } catch (err) {
      alert("Failed to update schedule.");
    }
  };

  const deleteSchedule = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/schedules/${id}`);
      fetchSchedules();
    } catch (err) {
      alert("Failed to delete schedule.");
    }
  };

  if (loading) return <div className="loading">Loading schedules...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="scheduling-engine-container">
      <h1>Scheduling Engine</h1>
      <form onSubmit={addSchedule}>
        <input type="text" placeholder="Task" value={task} onChange={(e) => setTask(e.target.value)} required />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        <button type="submit">Add Schedule</button>
      </form>

      <div className="schedule-table">
        {schedule.map((item) => (
          <div className="schedule-row" key={item._id}>
            <div>{item.task}</div>
            <div>{item.time}</div>
            <div>{item.status}</div>
            <div>
              <button onClick={() => updateStatus(item._id, item.status === "Pending" ? "Confirmed" : "Pending")}>
                {item.status === "Pending" ? "Confirm" : "Revert"}
              </button>
              <button onClick={() => deleteSchedule(item._id)}>Delete</button>
              {item.blockchainTx && <p>Blockchain Tx: {item.blockchainTx}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchedulingEngine;
