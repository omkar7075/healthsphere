const express = require("express");
const router = express.Router();
const Consultation = require("../models/Consultation");

// Get all consultations
router.get("/", async (req, res) => {
  try {
    const consultations = await Consultation.find();
    res.json(consultations);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch consultations." });
  }
});

// Add a new consultation
router.post("/", async (req, res) => {
  try {
    const { doctorName, specialty, patientName, consultationDate, consultationTime } = req.body;

    const newConsultation = new Consultation({
      doctorName,
      specialty,
      patientName,
      consultationDate,
      consultationTime,
    });

    const savedConsultation = await newConsultation.save();
    res.status(201).json(savedConsultation);
  } catch (err) {
    res.status(500).json({ error: "Failed to add consultation." });
  }
});

// Update a consultation
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const updatedConsultation = await Consultation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(updatedConsultation);
  } catch (err) {
    res.status(500).json({ error: "Failed to update consultation." });
  }
});

// Delete a consultation
router.delete("/:id", async (req, res) => {
  try {
    await Consultation.findByIdAndDelete(req.params.id);
    res.json({ message: "Consultation deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete consultation." });
  }
});

module.exports = router;
