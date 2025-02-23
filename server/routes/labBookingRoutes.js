const express = require("express");
const router = express.Router();
const LabBooking = require("../models/LabBooking");
const { storeLabBookingOnBlockchain } = require("../utils/LabBookingBlockchain");

// Get all lab bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await LabBooking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch lab bookings." });
  }
});

// Add a new lab booking and store it on blockchain
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, testType, appointmentDate, appointmentTime } = req.body;

    const newBooking = new LabBooking({ name, email, phone, testType, appointmentDate, appointmentTime });
    const savedBooking = await newBooking.save();

    // Store on blockchain
    const blockchainTx = await storeLabBookingOnBlockchain(name, email, phone, testType, appointmentDate, appointmentTime);

    res.status(201).json({ ...savedBooking._doc, blockchainTx });
  } catch (err) {
    res.status(500).json({ error: "Failed to add lab booking." });
  }
});

// Delete a lab booking
router.delete("/:id", async (req, res) => {
  try {
    await LabBooking.findByIdAndDelete(req.params.id);
    res.json({ message: "Lab booking deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete lab booking." });
  }
});

module.exports = router;
