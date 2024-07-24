// customerRoutes.js
require('dotenv').config();

const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');

// Function to send email
const sendEmail = async (email, subject, text) => {
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  // Compose the email message
  const mailOptions = {
    from: 'Shopzy',
    to: email,
    subject: subject,
    text: text,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Register a new customer
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email is already registered
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      console.log('Email already registered:', email);
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create a new customer
    const newCustomer = new Customer({ name, email, password });

    // Generate a verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000); // 6-digit code

    // Store the verification code in the customer object
    newCustomer.verificationCode = verificationCode;

    // Save the customer to the database
    await newCustomer.save();

    // Debugging statement to verify data
    console.log('New Customer Registered:', newCustomer);

    // Send verification code email to the customer
    const subject = 'Email Verification Code';
    const text = `Your verification code is: ${verificationCode}`;
    sendEmail(newCustomer.email, subject, text);

    res.status(201).json({
      message: 'Registration successful. Please check your email for verification code.',
    });
  } catch (error) {
    console.log('Error during registration:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Endpoint to verify the email with the code
router.post('/verify', async (req, res) => {
  try {
    const { email, verificationCode } = req.body;

    // Find the customer with the given email and verification code
    const customer = await Customer.findOne({ email, verificationCode });
    if (!customer) {
      return res.status(404).json({ message: 'Invalid email or verification code' });
    }

    // Mark the customer as verified
    customer.verified = true;
    customer.verificationCode = undefined;

    await customer.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Email Verification Failed' });
  }
});

// Function to generate secret key
const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

const secretKey = generateSecretKey();

//Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the customer exists
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if the password is correct
    if (customer.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Check if the customer is verified
    if (!customer.verified) {
      return res.status(401).json({ message: 'Email not verified' });
    }

    // Generate a token
    const token = jwt.sign({ customerId: customer._id }, secretKey);
    console.log(token)
    // Return the token and customer's name
    res.status(200).json({ token, name: customer.name });
    console.log(customer.name)
    
  } catch (error) {
    res.status(500).json({ message: 'Login Failed' });
  }
});


// Function to send reset password code
const sendResetPasswordCode = async (email, resetCode) => {
  const subject = 'Password Reset Verification Code';
  const text = `Your password reset verification code is: ${resetCode}`;
  sendEmail(email, subject, text);
};

// Endpoint to request a password reset(forget password request)
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the customer exists
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Generate a verification code for password reset
    const resetCode = Math.floor(100000 + Math.random() * 900000); // 6-digit code

    // Store the verification code in the customer object
    customer.resetPasswordCode = resetCode;
    await customer.save();

    // Send verification code email to the customer
    sendResetPasswordCode(customer.email, customer.resetPasswordCode);

    res.status(200).json({
      message: 'Verification code for password reset sent to your email',
    });
  } catch (error) {
    console.log('Error during password reset request:', error);
    res.status(500).json({ message: 'Password reset request failed' });
  }
});

// Endpoint to reset password with verification code
router.post('/reset-password', async (req, res) => {
  try {
    const { email, resetCode, newPassword } = req.body;

    console.log('Reset Password Request:', { email, resetCode, newPassword });

    // Find the customer with the given email and verification code
    const customer = await Customer.findOne({ email, resetPasswordCode: resetCode });

    console.log('Customer Found:', customer);

    if (!customer) {
      return res.status(404).json({ message: 'Invalid email or verification code' });
    }

    // Update the customer's password
    customer.password = newPassword;
    customer.resetPasswordCode = undefined;
    await customer.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.log('Error resetting password:', error);
    res.status(500).json({ message: 'Password reset failed' });
  }
});



module.exports = router;
