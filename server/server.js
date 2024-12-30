const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const testBookingRoutes = require("./routes/testBookingRoutes");
const prescriptionRoutes = require("./routes/prescriptionRoutes");
const healthRecordRoutes = require("./routes/healthRecordRoutes");
const articleRoutes = require("./routes/articleRoutes");
const labBookingRoutes = require("./routes/labBookingRoutes");
const patientRecordsRoutes = require("./routes/patientRecordsRoutes");
const pharmacyRoutes = require("./routes/pharmacyRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");
const symptomRoutes = require("./routes/symptomRoutes"); 
const consultationRoutes = require("./routes/consultationRoutes");
const patientRoutes = require("./routes/patientRoutes");
const userManageRoutes = require("./routes/userManageRoutes");
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads")); // Serve uploaded images
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/test-bookings", testBookingRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/health-records", healthRecordRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/lab-bookings", labBookingRoutes);
app.use("/api/patient-records", patientRecordsRoutes);
app.use("/api/pharmacy", pharmacyRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/symptom-checker", symptomRoutes);
app.use("/api/consultations", consultationRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/userManage", userManageRoutes);

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
