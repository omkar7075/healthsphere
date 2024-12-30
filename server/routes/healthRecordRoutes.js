const express = require("express");
const router = express.Router();
const HealthRecord = require("../models/HealthRecord");

// Get all health records
router.get("/", async (req, res) => {
  try {
    const records = await HealthRecord.find();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch health records." });
  }
});

// Add a new health record
router.post("/", async (req, res) => {
  try {
    const newRecord = new HealthRecord(req.body);
    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (err) {
    res.status(500).json({ error: "Failed to add health record." });
  }
});

// Update a health record
router.put("/:id", async (req, res) => {
  try {
    const updatedRecord = await HealthRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedRecord);
  } catch (err) {
    res.status(500).json({ error: "Failed to update health record." });
  }
});

// Delete a health record
router.delete("/:id", async (req, res) => {
  try {
    await HealthRecord.findByIdAndDelete(req.params.id);
    res.json({ message: "Health record deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete health record." });
  }
});

module.exports = router;
