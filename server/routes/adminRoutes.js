const express = require("express");
const {
  storeUserOnBlockchain,
  storePatientRecordOnBlockchain,
  storeLabBookingOnBlockchain,
  getPatientRecordsFromBlockchain,
  getLabBookingsFromBlockchain
} = require("../utils/AdminDashboardBlockchain");

const router = express.Router();

// Store a new user
router.post("/users", async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const blockchainTx = await storeUserOnBlockchain(name, email, role);
    res.status(201).json({ blockchainTx });
  } catch (err) {
    res.status(500).json({ error: "Failed to add user." });
  }
});

// Store a new patient record
router.post("/patient-records", async (req, res) => {
  try {
    const { patientName, diagnosis, prescription } = req.body;
    const blockchainTx = await storePatientRecordOnBlockchain(patientName, diagnosis, prescription);
    res.status(201).json({ blockchainTx });
  } catch (err) {
    res.status(500).json({ error: "Failed to add patient record." });
  }
});

// Get all patient records from blockchain
router.get("/patient-records", async (req, res) => {
  try {
    const records = await getPatientRecordsFromBlockchain();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch patient records." });
  }
});

// Store a new lab booking
router.post("/lab-bookings", async (req, res) => {
  try {
    const { testName, userEmail } = req.body;
    const blockchainTx = await storeLabBookingOnBlockchain(testName, userEmail);
    res.status(201).json({ blockchainTx });
  } catch (err) {
    res.status(500).json({ error: "Failed to add lab booking." });
  }
});

// Get all lab bookings from blockchain
router.get("/lab-bookings", async (req, res) => {
  try {
    const bookings = await getLabBookingsFromBlockchain();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch lab bookings." });
  }
});

module.exports = router;
