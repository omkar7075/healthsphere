const express = require("express");
const User = require("../models/UserManage");
const {
  registerUserOnBlockchain,
  updateUserOnBlockchain,
  deleteUserOnBlockchain,
  verifyUserOnBlockchain
} = require("../utils/UserManageBlockchain");

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users." });
  }
});

// Register User on Blockchain
router.post("/", async (req, res) => {
  const { name, email, role, password } = req.body;

  try {
    const newUser = new User({ name, email, role, password });
    await newUser.save();

    // Store user data on blockchain
    const blockchainTx = await registerUserOnBlockchain(name, email, role, password);

    res.status(201).json({ message: "User registered successfully!", blockchainTx });
  } catch (err) {
    res.status(500).json({ error: "Failed to add user." });
  }
});

// Update User
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    // Update user data on blockchain
    const blockchainTx = await updateUserOnBlockchain(name, email, role);

    res.status(200).json({ updatedUser, blockchainTx });
  } catch (err) {
    res.status(500).json({ error: "Failed to update user." });
  }
});

// Delete User
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ error: "User not found." });

  try {
    await User.findByIdAndDelete(id);

    // Delete user data from blockchain
    const blockchainTx = await deleteUserOnBlockchain(user.email);

    res.status(200).json({ message: "User deleted successfully.", blockchainTx });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user." });
  }
});

module.exports = router;
