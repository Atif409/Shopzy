// sellerRoutes.js
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Seller = require('../models/Seller');

// Endpoint to register a new seller
router.post('/register-seller', async (req, res) => {
  try {
    const { name, email, password, addresses } = req.body;

    // Check if the email is already registered
    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      console.log('Email already registered:', email);
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create a new seller
    const newSeller = new Seller({ name, email, password, addresses });

    // Generate and store the verification token
    newSeller.verificationToken = crypto.randomBytes(32).toString('hex');

    // Save the seller to the database
    await newSeller.save();

    // Debugging statement to verify data
    console.log('New Seller Registered:', newSeller);

    res.status(201).json({
      message: 'Seller registration successful.',
    });
  } catch (error) {
    console.log('Error during seller registration:', error);
    res.status(500).json({ message: 'Seller registration failed' });
  }
});

// Endpoint to login the seller
router.post('/login-seller', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the seller exists
    const seller = await Seller.findOne({ email });
    if (!seller) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if the password is correct
    if (seller.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate a token for the seller
    const token = jwt.sign({ sellerId: seller._id }, secretKey);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Seller login failed' });
  }
});

module.exports = router;
