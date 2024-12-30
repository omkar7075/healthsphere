const mongoose = require("mongoose");

const consultationSchema = new mongoose.Schema({
  doctorName: { type: String, required: true },
  specialty: { type: String, required: true },
  patientName: { type: String, required: true },
  consultationDate: { type: Date, required: true },
  consultationTime: { type: String, required: true },
  status: { type: String, default: "Pending" }, // Pending, Ongoing, Completed
});

module.exports = mongoose.model("Consultation", consultationSchema);
