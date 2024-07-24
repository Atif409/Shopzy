require('dotenv').config();
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const Seller = require('../models/Seller'); 
const SellerConnection = require('../models/SellerConnection');

// Function to send email
const sendEmail = async (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'Shopzy',
    to: email,
    subject: subject,
    text: text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Register a new Seller
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, category } = req.body;

    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      console.log('Email already registered:', email);
      return res.status(400).json({ message: 'Email already registered' });
    }

    const newSeller = new Seller({ name, email, password, category });

    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    newSeller.verificationCode = verificationCode;

    await newSeller.save();

    console.log('New Seller Registered:', newSeller);

    const subject = 'Email Verification Code';
    const text = `Your verification code is: ${verificationCode}`;
    sendEmail(newSeller.email, subject, text);

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
    const seller = await Seller.findOne({ email, verificationCode });
    if (!seller) {
      return res.status(404).json({ message: 'Invalid email or verification code' });
    }

    seller.verified = true;
    seller.verificationCode = undefined;

    await seller.save();

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

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const seller = await Seller.findOne({ email });
    if (!seller) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (seller.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    if (!seller.verified) {
      return res.status(401).json({ message: 'Email not verified' });
    }

    const token = jwt.sign({ sellerId: seller._id }, secretKey);
    console.log(token)
    res.status(200).json({ token, name: seller.name, sellerId: seller._id });
    
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

// Endpoint to request a password reset (forget password request)
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const seller = await Seller.findOne({ email });
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000);
    seller.resetPasswordCode = resetCode;
    await seller.save();

    sendResetPasswordCode(seller.email, seller.resetPasswordCode);

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
    const seller = await Seller.findOne({ email, resetPasswordCode: resetCode });

    console.log('Seller Found:', seller);

    if (!seller) {
      return res.status(404).json({ message: 'Invalid email or verification code' });
    }

    seller.password = newPassword;
    seller.resetPasswordCode = undefined;
    await seller.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.log('Error resetting password:', error);
    res.status(500).json({ message: 'Password reset failed' });
  }
});

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Token is required' });

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.sellerId = decoded.sellerId;
    next();
  });
};

// Endpoint to get seller details
router.get('/details', verifyToken, async (req, res) => {
  try {
    const seller = await Seller.findById(req.sellerId).select('-password');
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }
    res.status(200).json({ seller });
  } catch (error) {
    console.error('Error fetching seller details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint to get all sellers
// Add this route in your server code
router.get('/all', async (req, res) => {
  try {
    const { category } = req.query;

    let sellers;
    if (category) {
      sellers = await Seller.find({ category });
    } else {
      sellers = await Seller.find();
    }

    res.status(200).json(sellers);
  } catch (error) {
    console.error('Error fetching sellers:', error);
    res.status(500).json({ message: 'Failed to fetch sellers' });
  }
});

// Send a connection request
router.post('/connect', verifyToken, async (req, res) => {
  try {
    const { receiverId } = req.body;
    const senderId = req.sellerId;

    const sender = await Seller.findById(senderId);
    const receiver = await Seller.findById(receiverId);

    if (sender.category !== receiver.category) {
      return res.status(400).json({ message: 'Sellers must be in the same category to connect' });
    }

    const newConnection = new SellerConnection({ sender: senderId, receiver: receiverId });
    await newConnection.save();

    res.status(200).json({ message: 'Connection request sent' });
  } catch (error) {
    console.error('Error sending connection request:', error);
    res.status(500).json({ message: 'Failed to send connection request' });
  }
});

// Accept a connection request
router.post('/accept-connection', verifyToken, async (req, res) => {
  try {
    const { connectionId } = req.body;
    const connection = await SellerConnection.findById(connectionId);
    const receiver = await Seller.findById(req.sellerId);
    const sender = await Seller.findById(connection.sender);

    if (receiver.category !== sender.category) {
      return res.status(400).json({ message: 'Sellers must be in the same category to connect' });
    }

    if (!connection || connection.receiver.toString() !== req.sellerId) {
      return res.status(404).json({ message: 'Connection request not found' });
    }

    connection.status = 'accepted';
    await connection.save();

    res.status(200).json({ message: 'Connection request accepted' });
  } catch (error) {
    console.error('Error accepting connection request:', error);
    res.status(500).json({ message: 'Failed to accept connection request' });
  }
});

// Reject a connection request
router.post('/reject-connection', verifyToken, async (req, res) => {
  try {
    const { connectionId } = req.body;
    const connection = await SellerConnection.findById(connectionId);
    const receiver = await Seller.findById(req.sellerId);
    const sender = await Seller.findById(connection.sender);

    if (receiver.category !== sender.category) {
      return res.status(400).json({ message: 'Sellers must be in the same category to connect' });
    }

    if (!connection || connection.receiver.toString() !== req.sellerId) {
      return res.status(404).json({ message: 'Connection request not found' });
    }

    connection.status = 'rejected';  
    await connection.save();

    res.status(200).json({ message: 'Connection request rejected' });
  } catch (error) {
    console.error('Error rejecting connection request:', error);
    res.status(500).json({ message: 'Failed to reject connection request' });
  }
});

// Cancel a connection request
router.post('/cancel-connection', verifyToken, async (req, res) => {
  try {
    const { receiverId } = req.body;
    const senderId = req.sellerId;

    const connection = await SellerConnection.findOneAndDelete({ sender: senderId, receiver: receiverId, status: 'pending' });

    if (!connection) {
      return res.status(404).json({ message: 'Connection request not found or already processed' });
    }

    res.status(200).json({ message: 'Connection request cancelled' });
  } catch (error) {
    console.error('Error cancelling connection request:', error);
    res.status(500).json({ message: 'Failed to cancel connection request' });
  }
});

// Fetch pending connection requests for the authenticated seller
router.get('/pending-requests', verifyToken, async (req, res) => {
  try {
    const sellerId = req.sellerId; 
    const pendingRequests = await SellerConnection.find({ 
      status: 'pending', 
      receiver: sellerId 
    }).populate('sender', 'name email'); 

    res.status(200).json(pendingRequests);
  } catch (error) {
    console.error('Error fetching pending requests:', error);
    res.status(500).json({ message: 'Failed to fetch pending requests' });
  }
});

// List all connections and pending requests for a seller
router.get('/connections', verifyToken, async (req, res) => {
  try {
    const connections = await SellerConnection.find({
      $or: [{ sender: req.sellerId }, { receiver: req.sellerId }],
      status: { $in: ['accepted', 'pending'] },
    }).populate('sender receiver', 'name email');

    res.status(200).json(connections);
  } catch (error) {
    console.error('Error fetching connections:', error);
    res.status(500).json({ message: 'Failed to fetch connections' });
  }
});


module.exports = router;
