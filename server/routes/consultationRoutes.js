const express = require("express");
const router = express.Router();
const Consultation = require("../models/Consultation");
const { storeConsultationOnBlockchain } = require("../utils/ConsultationBlockchain");

// WebRTC Signaling for video calls
const io = require("socket.io")(5001, {
  cors: { origin: "*" }
});

// WebRTC signaling
io.on("connection", (socket) => {
  socket.on("offer", (data) => socket.broadcast.emit("offer", data));
  socket.on("answer", (data) => socket.broadcast.emit("answer", data));
  socket.on("ice-candidate", (data) => socket.broadcast.emit("ice-candidate", data));
});

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
      doctorName, specialty, patientName, consultationDate, consultationTime
    });

    const savedConsultation = await newConsultation.save();
    
    // Store consultation on blockchain
    const blockchainTx = await storeConsultationOnBlockchain(doctorName, patientName, specialty, consultationDate, consultationTime);

    res.status(201).json({ ...savedConsultation._doc, blockchainTx });
  } catch (err) {
    res.status(500).json({ error: "Failed to add consultation." });
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
