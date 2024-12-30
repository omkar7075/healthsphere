const express = require("express");
const router = express.Router();
const Prescription = require("../models/Prescription");

// Add a new prescription
router.post("/", async (req, res) => {
  try {
    const newPrescription = new Prescription(req.body);
    const savedPrescription = await newPrescription.save();
    res.status(201).json(savedPrescription);
  } catch (err) {
    res.status(500).json({ error: "Failed to add prescription." });
  }
});

// Get all prescriptions
router.get("/", async (req, res) => {
  try {
    const prescriptions = await Prescription.find();
    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch prescriptions." });
  }
});

// Update a prescription
router.put("/:id", async (req, res) => {
  try {
    const updatedPrescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedPrescription);
  } catch (err) {
    res.status(500).json({ error: "Failed to update prescription." });
  }
});

// Delete a prescription
router.delete("/:id", async (req, res) => {
  try {
    await Prescription.findByIdAndDelete(req.params.id);
    res.json({ message: "Prescription deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete prescription." });
  }
});

module.exports = router;
