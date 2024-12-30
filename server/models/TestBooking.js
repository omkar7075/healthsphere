const mongoose = require("mongoose");

const testBookingSchema = new mongoose.Schema({
  testName: { type: String, required: true },
  price: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("TestBooking", testBookingSchema);
