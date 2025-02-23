const express = require("express");
const router = express.Router();
const Medicine = require("../models/Medicine");
const { storeMedicineTransaction } = require("../utils/MedicineBlockchain");

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

// Process medicine purchase and store on blockchain
router.post("/purchase", async (req, res) => {
  try {
    const { buyer, medicineName, quantity, totalPrice } = req.body;

    // Store transaction on blockchain
    const blockchainTx = await storeMedicineTransaction(buyer, medicineName, quantity, totalPrice);

    res.status(201).json({ message: "Transaction stored on Blockchain!", blockchainTx });
  } catch (err) {
    res.status(500).json({ error: "Failed to process transaction." });
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
