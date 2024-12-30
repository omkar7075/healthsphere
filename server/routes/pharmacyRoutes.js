const express = require("express");
const router = express.Router();
const Medicine = require("../models/Medicine");

// Get all medicines
router.get("/", async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch medicines." });
  }
});

// Add a new medicine
router.post("/", async (req, res) => {
  try {
    const newMedicine = new Medicine(req.body);
    const savedMedicine = await newMedicine.save();
    res.status(201).json(savedMedicine);
  } catch (err) {
    res.status(500).json({ error: "Failed to add medicine." });
  }
});

// Update a medicine
router.put("/:id", async (req, res) => {
  try {
    const updatedMedicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedMedicine);
  } catch (err) {
    res.status(500).json({ error: "Failed to update medicine." });
  }
});

// Delete a medicine
router.delete("/:id", async (req, res) => {
  try {
    await Medicine.findByIdAndDelete(req.params.id);
    res.json({ message: "Medicine deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete medicine." });
  }
});

module.exports = router;
