const express = require("express");
const router = express.Router();
const PatientRecord = require("../models/PatientRecord");

// Get all patient records
router.get("/", async (req, res) => {
  try {
    const records = await PatientRecord.find();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch patient records." });
  }
});

// Add a new patient record
router.post("/", async (req, res) => {
  try {
    const newRecord = new PatientRecord(req.body);
    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (err) {
    res.status(500).json({ error: "Failed to add patient record." });
  }
});

// Update an existing patient record
router.put("/:id", async (req, res) => {
  try {
    const updatedRecord = await PatientRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedRecord);
  } catch (err) {
    res.status(500).json({ error: "Failed to update patient record." });
  }
});

// Delete a patient record
router.delete("/:id", async (req, res) => {
  try {
    await PatientRecord.findByIdAndDelete(req.params.id);
    res.json({ message: "Patient record deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete patient record." });
  }
});

module.exports = router;
