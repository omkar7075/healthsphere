const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  task: { type: String, required: true },
  time: { type: String, required: true },
  status: { type: String, required: true, default: "Pending" }, // Default status is "Pending"
});

module.exports = mongoose.model("Schedule", scheduleSchema);
