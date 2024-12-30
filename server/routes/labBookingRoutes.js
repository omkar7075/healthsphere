const express = require("express");
const router = express.Router();
const LabBooking = require("../models/LabBooking");

// Get all lab bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await LabBooking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch lab bookings." });
  }
});

// Add a new lab booking
router.post("/", async (req, res) => {
  try {
    const newBooking = new LabBooking(req.body);
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(500).json({ error: "Failed to add lab booking." });
  }
});

// Update a lab booking
router.put("/:id", async (req, res) => {
  try {
    const updatedBooking = await LabBooking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedBooking);
  } catch (err) {
    res.status(500).json({ error: "Failed to update lab booking." });
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
