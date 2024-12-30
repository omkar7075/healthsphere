const mongoose = require("mongoose");

const userManageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["admin", "doctor", "patient"], required: true },
  password: { type: String, required: true }, // Hash the password in production
});

module.exports = mongoose.model("UserManage", userManageSchema);
