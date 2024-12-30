const express = require("express");
const router = express.Router();
const Schedule = require("../models/Schedule");

// Get all schedules
router.get("/", async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch schedules." });
  }
});

// Add a new schedule
router.post("/", async (req, res) => {
  try {
    const newSchedule = new Schedule(req.body);
    const savedSchedule = await newSchedule.save();
    res.status(201).json(savedSchedule);
  } catch (err) {
    res.status(500).json({ error: "Failed to add schedule." });
  }
});

// Update a schedule
router.put("/:id", async (req, res) => {
  try {
    const updatedSchedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedSchedule);
  } catch (err) {
    res.status(500).json({ error: "Failed to update schedule." });
  }
});

// Delete a schedule
router.delete("/:id", async (req, res) => {
  try {
    await Schedule.findByIdAndDelete(req.params.id);
    res.json({ message: "Schedule deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete schedule." });
  }
});

module.exports = router;
