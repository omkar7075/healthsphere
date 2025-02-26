const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { registerUserOnBlockchain, authenticateUserOnBlockchain } = require("../utils/AuthBlockchain");
const router = express.Router();
const { JWT_SECRET } = process.env;

// Register User on Blockchain
router.post("/register/:userType", async (req, res) => {
  const { email, password } = req.body;
  const { userType } = req.params;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already exists" });

    const newUser = new User({ email, password, userType });
    await newUser.save();

    // Store user data on blockchain
    const blockchainTx = await registerUserOnBlockchain(email, password, userType);

    res.status(201).json({ message: "User registered successfully!", blockchainTx });
  } catch (err) {
    res.status(500).json({ error: "Error registering user" });
  }
});

// Login User from Blockchain
router.post("/login/:userType", async (req, res) => {
  const { email, password } = req.body;
  const { userType } = req.params;

  try {
    const user = await User.findOne({ email, userType });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // Authenticate user on blockchain
    const isBlockchainAuthenticated = await authenticateUserOnBlockchain(email, password);
    if (!isBlockchainAuthenticated) return res.status(400).json({ error: "Blockchain authentication failed" });

    const token = jwt.sign({ id: user._id, userType }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Error logging in user" });
  }
});

module.exports = router;