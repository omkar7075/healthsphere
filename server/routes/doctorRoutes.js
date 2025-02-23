const express = require("express");
const {
  storeRecordOnBlockchain,
  getRecordsFromBlockchain
} = require("../utils/DoctorDashboardBlockchain");

const router = express.Router();

// Get all patient records from blockchain
router.get("/records", async (req, res) => {
  try {
    const records = await getRecordsFromBlockchain();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch patient records." });
  }
});

// Store a new patient record
router.post("/records", async (req, res) => {
  try {
    const { patientName, diagnosis, prescription, notes } = req.body;
    const blockchainTx = await storeRecordOnBlockchain(patientName, diagnosis, prescription, notes);
    res.status(201).json({ blockchainTx });
  } catch (err) {
    console.error("Error adding patient record:", err.message);
    res.status(500).json({ error: "Failed to add patient record." });
  }
});

module.exports = router;
