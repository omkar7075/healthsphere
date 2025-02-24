const express = require("express");
const router = express.Router();
const {
  addScheduleToBlockchain,
  updateScheduleOnBlockchain,
  deleteScheduleFromBlockchain,
  getAllSchedulesFromBlockchain
} = require("../utils/ScheduleBlockchain");

// Get all schedules
router.get("/", async (req, res) => {
  try {
    const schedules = await getAllSchedulesFromBlockchain();
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch schedules from blockchain." });
  }
});

// Add a new schedule
router.post("/", async (req, res) => {
  try {
    const { task, time } = req.body;
    const txHash = await addScheduleToBlockchain(task, time);
    res.status(201).json({ message: "Schedule added successfully!", blockchainTx: txHash });
  } catch (err) {
    res.status(500).json({ error: "Failed to add schedule." });
  }
});

// Update a schedule
router.put("/:id", async (req, res) => {
  try {
    const { newStatus } = req.body;
    const txHash = await updateScheduleOnBlockchain(req.params.id, newStatus);
    res.json({ message: "Schedule updated successfully!", blockchainTx: txHash });
  } catch (err) {
    res.status(500).json({ error: "Failed to update schedule." });
  }
});

// Delete a schedule
router.delete("/:id", async (req, res) => {
  try {
    const txHash = await deleteScheduleFromBlockchain(req.params.id);
    res.json({ message: "Schedule deleted successfully!", blockchainTx: txHash });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete schedule." });
  }
});

module.exports = router;
