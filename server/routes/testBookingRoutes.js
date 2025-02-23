const express = require("express");
const router = express.Router();
const TestBooking = require("../models/TestBooking");
const { bookTestOnBlockchain, getTestBookingFromBlockchain } = require("../utils/TestBookingBlockchain");

// Get all test bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await TestBooking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch test bookings." });
  }
});

// Add a new test booking and store on blockchain
router.post("/", async (req, res) => {
  try {
    const { testName, price, userId } = req.body;

    // Store in MongoDB
    const newBooking = new TestBooking({ testName, price, userId });
    const savedBooking = await newBooking.save();

    // Store on Blockchain
    const blockchainTx = await bookTestOnBlockchain(testName, price, userId);

    res.status(201).json({ message: "Test booked successfully!", blockchainTx, savedBooking });
  } catch (err) {
    res.status(500).json({ error: "Failed to book test." });
  }
});

// Retrieve a test booking from blockchain
router.get("/blockchain/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await getTestBookingFromBlockchain(id);
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve test booking from blockchain." });
  }
});

// Delete a test booking
router.delete("/:id", async (req, res) => {
  try {
    await TestBooking.findByIdAndDelete(req.params.id);
    res.json({ message: "Test booking deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete test booking." });
  }
});

module.exports = router;
