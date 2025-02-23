const express = require("express");
const router = express.Router();
const HealthRecord = require("../models/HealthRecord");
const { storeHealthRecordOnBlockchain } = require("../utils/HealthRecordBlockchain");

// Get all health records
router.get("/", async (req, res) => {
  try {
    const records = await HealthRecord.find();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch health records." });
  }
});

// Add a new health record and store it on blockchain
router.post("/", async (req, res) => {
  try {
    const { date, doctor, diagnosis, prescription } = req.body;

    const newRecord = new HealthRecord({ date, doctor, diagnosis, prescription });
    const savedRecord = await newRecord.save();

    // Store on blockchain
    const blockchainTx = await storeHealthRecordOnBlockchain(date, doctor, diagnosis, prescription);

    res.status(201).json({ ...savedRecord._doc, blockchainTx });
  } catch (err) {
    res.status(500).json({ error: "Failed to add health record." });
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
