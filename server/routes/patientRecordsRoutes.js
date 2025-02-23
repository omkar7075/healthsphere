const express = require("express");
const router = express.Router();
const PatientRecord = require("../models/PatientRecord");
const { storePatientRecordOnBlockchain, getPatientRecordFromBlockchain } = require("../utils/PatientRecordBlockchain");

// Get all patient records
router.get("/", async (req, res) => {
  try {
    const records = await PatientRecord.find();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch patient records." });
  }
});

// Add a new patient record and store on blockchain
router.post("/", async (req, res) => {
  try {
    const { name, age, gender, medicalHistory, lastVisit } = req.body;

    // Store in MongoDB
    const newRecord = new PatientRecord({ name, age, gender, medicalHistory, lastVisit });
    const savedRecord = await newRecord.save();

    // Store on Blockchain
    const blockchainTx = await storePatientRecordOnBlockchain(name, age, gender, medicalHistory, lastVisit);

    res.status(201).json({ message: "Patient record added successfully!", blockchainTx, savedRecord });
  } catch (err) {
    res.status(500).json({ error: "Failed to add patient record." });
  }
});

// Retrieve a patient record from blockchain
router.get("/blockchain/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await getPatientRecordFromBlockchain(id);
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve patient record from blockchain." });
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
