const express = require("express");
const router = express.Router();
const TestBooking = require("../models/TestBooking");

// Add a new test booking
router.post("/", async (req, res) => {
  try {
    const newBooking = new TestBooking(req.body);
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(500).json({ error: "Failed to add booking" });
  }
});

// Get all test bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await TestBooking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// Update a test booking
router.put("/:id", async (req, res) => {
  try {
    const updatedBooking = await TestBooking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedBooking);
  } catch (err) {
    res.status(500).json({ error: "Failed to update booking" });
  }
});

// Delete a test booking
router.delete("/:id", async (req, res) => {
  try {
    await TestBooking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete booking" });
  }
});

module.exports = router;
