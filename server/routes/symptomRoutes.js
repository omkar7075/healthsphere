const express = require("express");
const multer = require("multer");
const Symptom = require("../models/Symptom");
const analyzeImageOrText = require("../utils/analyzeImage");
const {
  storeSymptomOnBlockchain,
  getSymptomsFromBlockchain
} = require("../utils/SymptomBlockchain");

const router = express.Router();

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Get all symptom records from blockchain
router.get("/", async (req, res) => {
  try {
    const symptoms = await getSymptomsFromBlockchain();
    res.json(symptoms);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch symptom records." });
  }
});

// Add a new symptom record
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { description } = req.body;
    let analysisResult = {
      diagnosis: "General Checkup",
      precautions: "Stay hydrated, eat healthy.",
      treatment: "Consult a physician.",
    };

    // Analyze the input using AI
    if (req.file || description) {
      analysisResult = await analyzeImageOrText(req.file?.path, description);
    }

    // Store symptom analysis on blockchain
    const blockchainTx = await storeSymptomOnBlockchain(
      description || "",
      analysisResult.diagnosis,
      analysisResult.precautions,
      analysisResult.treatment
    );

    res.status(201).json({ ...analysisResult, blockchainTx });
  } catch (err) {
    console.error("Error adding symptom record:", err.message);
    res.status(500).json({ error: "Failed to add symptom record." });
  }
});

module.exports = router;
