const mongoose = require("mongoose");

const symptomSchema = new mongoose.Schema({
  description: { type: String, required: false },
  image: { type: String, required: false }, // Path to the uploaded image
  diagnosis: { type: String, required: true },
  precautions: { type: String, required: true },
  treatment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Symptom", symptomSchema);
