const express = require("express");
const router = express.Router();
const Prescription = require("../models/Prescription");
const { storePrescriptionOnBlockchain, getPrescriptionFromBlockchain } = require("../utils/PrescriptionBlockchain");

// Get all prescriptions
router.get("/", async (req, res) => {
  try {
    const prescriptions = await Prescription.find();
    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch prescriptions." });
  }
});

// Add a new prescription and store on blockchain
router.post("/", async (req, res) => {
  try {
    const { patientName, age, symptoms, diagnosis, prescription, notes } = req.body;

    // Store in MongoDB
    const newPrescription = new Prescription({ patientName, age, symptoms, diagnosis, prescription, notes });
    const savedPrescription = await newPrescription.save();

    // Store on Blockchain
    const blockchainTx = await storePrescriptionOnBlockchain(patientName, age, symptoms, diagnosis, prescription, notes);

    res.status(201).json({ message: "Prescription added successfully!", blockchainTx, savedPrescription });
  } catch (err) {
    res.status(500).json({ error: "Failed to add prescription." });
  }
});

// Retrieve a prescription from blockchain
router.get("/blockchain/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const prescription = await getPrescriptionFromBlockchain(id);
    res.json(prescription);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve prescription from blockchain." });
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
