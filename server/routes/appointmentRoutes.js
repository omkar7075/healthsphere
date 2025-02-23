const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const {
  bookAppointmentOnBlockchain,
  cancelAppointmentOnBlockchain,
} = require("../utils/AppointmentBlockchain");

// Add an appointment with blockchain
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, doctor, date, time } = req.body;

    // Save to MongoDB
    const newAppointment = new Appointment({ name, email, phone, doctor, date, time });
    const savedAppointment = await newAppointment.save();

    // Save to Blockchain
    const blockchainTx = await bookAppointmentOnBlockchain(name, email, phone, doctor, date, time);

    res.status(201).json({ ...savedAppointment._doc, blockchainTx });
  } catch (err) {
    res.status(500).json({ error: "Failed to book appointment" });
  }
});

// Cancel an appointment with blockchain
router.delete("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ error: "Appointment not found" });

    // Remove from Blockchain
    const blockchainTx = await cancelAppointmentOnBlockchain(req.params.id);

    // Remove from MongoDB
    await Appointment.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Appointment canceled successfully", blockchainTx });
  } catch (err) {
    res.status(500).json({ error: "Failed to cancel appointment" });
  }
});

module.exports = router;
