const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");

// Get all patients
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch patients." });
  }
});

// Add a new patient
router.post("/", async (req, res) => {
  try {
    const { name, age, gender, medicalHistory } = req.body;

    const newPatient = new Patient({ name, age, gender, medicalHistory });
    const savedPatient = await newPatient.save();
    res.status(201).json(savedPatient);
  } catch (err) {
    res.status(500).json({ error: "Failed to add patient." });
  }
});

// Update a patient
router.put("/:id", async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedPatient);
  } catch (err) {
    res.status(500).json({ error: "Failed to update patient." });
  }
});

// Delete a patient
router.delete("/:id", async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ message: "Patient deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete patient." });
  }
});

module.exports = router;
