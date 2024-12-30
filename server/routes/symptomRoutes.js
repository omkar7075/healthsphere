const express = require("express");
const multer = require("multer");
const Symptom = require("../models/Symptom");
const analyzeImageOrText = require("../utils/analyzeImage");
const path = require("path");

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

// Get all symptom records
router.get("/", async (req, res) => {
  try {
    const symptoms = await Symptom.find();
    res.json(symptoms);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch symptom records." });
  }
});

// Add a new symptom record (text or image input)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { description } = req.body;
    let analysisResult = {
      diagnosis: "General Checkup",
      precautions: "Stay hydrated, eat healthy.",
      treatment: "Consult a physician.",
    };

    // Analyze the input using Google Generative AI
    if (req.file || description) {
      analysisResult = await analyzeImageOrText(req.file?.path, description);
    }

    const newSymptom = new Symptom({
      description: description || null,
      image: req.file ? req.file.path : null,
      ...analysisResult,
    });

    const savedSymptom = await newSymptom.save();
    res.status(201).json(savedSymptom);
  } catch (err) {
    console.error("Error adding symptom record:", err.message);
    res.status(500).json({ error: "Failed to add symptom record." });
  }
});

// Delete a symptom record
router.delete("/:id", async (req, res) => {
  try {
    await Symptom.findByIdAndDelete(req.params.id);
    res.json({ message: "Symptom record deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete symptom record." });
  }
});

module.exports = router;
