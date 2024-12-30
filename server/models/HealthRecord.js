const mongoose = require("mongoose");

const healthRecordSchema = new mongoose.Schema({
  date: { type: String, required: true },
  doctor: { type: String, required: true },
  diagnosis: { type: String, required: true },
  prescription: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("HealthRecord", healthRecordSchema);
