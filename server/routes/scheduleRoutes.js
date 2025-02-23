const express = require("express");
const router = express.Router();
const { ethers } = require("ethers");
const Schedule = require("../models/Schedule");

// Ethereum Smart Contract Configuration
const provider = new ethers.JsonRpcProvider(process.env.ETH_NODE_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractABI = require("../blockchain/SchedulingEngineABI.json");
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Get all schedules
router.get("/", async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch schedules." });
  }
});

// Add a new schedule
router.post("/", async (req, res) => {
  const { task, time } = req.body;

  try {
    const newSchedule = new Schedule({ task, time });
    const savedSchedule = await newSchedule.save();

    // Store on Blockchain
    const tx = await contract.addSchedule(task, time);
    await tx.wait();

    res.status(201).json({ schedule: savedSchedule, blockchainTx: tx.hash });
  } catch (err) {
    res.status(500).json({ error: "Failed to add schedule." });
  }
});

// Update schedule status
router.put("/:id", async (req, res) => {
  const { status } = req.body;
  try {
    const updatedSchedule = await Schedule.findByIdAndUpdate(req.params.id, { status }, { new: true });

    // Update Blockchain
    const tx = await contract.updateSchedule(req.params.id, status);
    await tx.wait();

    res.status(200).json({ schedule: updatedSchedule, blockchainTx: tx.hash });
  } catch (err) {
    res.status(500).json({ error: "Failed to update schedule." });
  }
});

// Delete a schedule
router.delete("/:id", async (req, res) => {
  try {
    await Schedule.findByIdAndDelete(req.params.id);

    // Delete from Blockchain
    const tx = await contract.deleteSchedule(req.params.id);
    await tx.wait();

    res.status(200).json({ message: "Schedule deleted successfully.", blockchainTx: tx.hash });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete schedule." });
  }
});

module.exports = router;
