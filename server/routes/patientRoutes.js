const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");
const { storePatientOnBlockchain, getPatientFromBlockchain } = require("../utils/PatientBlockchain");

// Get all patients
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch patients." });
  }
});

// Add a new patient and store on blockchain
router.post("/", async (req, res) => {
  try {
    const { name, age, gender, medicalHistory } = req.body;

    // Store in MongoDB
    const newPatient = new Patient({ name, age, gender, medicalHistory });
    const savedPatient = await newPatient.save();

    // Store on Blockchain
    const blockchainTx = await storePatientOnBlockchain(name, age, gender, medicalHistory);

    res.status(201).json({ message: "Patient added successfully!", blockchainTx, savedPatient });
  } catch (err) {
    res.status(500).json({ error: "Failed to add patient." });
  }
});

// Retrieve a patient from blockchain
router.get("/blockchain/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await getPatientFromBlockchain(id);
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve patient record from blockchain." });
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
