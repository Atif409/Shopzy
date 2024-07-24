const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const Customer = require('../models/Customer');
const Seller = require('../models/Seller');
const upload = require('../middleware/upload');

// Middleware to check if user is logged in
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Please log in to chat' });
};

// Send a message
router.post('/send', upload.single('image'), isLoggedIn, async (req, res) => {
  try {
    const { senderId, senderModel, receiverId, receiverModel, text } = req.body;
    const image = req.file ? req.file.path : null;

    // Validate sender and receiver models
    if (!['Customer', 'Seller'].includes(senderModel) || !['Customer', 'Seller'].includes(receiverModel)) {
      return res.status(400).json({ message: 'Invalid sender or receiver model' });
    }

    // Create new message
    const newMessage = new Message({
      sender: { id: senderId, model: senderModel },
      receiver: { id: receiverId, model: receiverModel },
      text,
      image,
    });

    // Save the message
    await newMessage.save();

    // Emit WebSocket event
    const io = req.app.get('socketio');
    io.emit('new message', newMessage);

    res.status(201).json({ message: 'Message sent successfully', newMessage });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send message', error });
  }
});

// Get messages between two users
router.get('/conversation', isLoggedIn, async (req, res) => {
  try {
    const { user1Id, user1Model, user2Id, user2Model } = req.query;

    // Validate models
    if (!['Customer', 'Seller'].includes(user1Model) || !['Customer', 'Seller'].includes(user2Model)) {
      return res.status(400).json({ message: 'Invalid user models' });
    }

    // Fetch messages where user1 is either sender or receiver and user2 is the counterpart
    const messages = await Message.find({
      $or: [
        { 'sender.id': user1Id, 'sender.model': user1Model, 'receiver.id': user2Id, 'receiver.model': user2Model },
        { 'sender.id': user2Id, 'sender.model': user2Model, 'receiver.id': user1Id, 'receiver.model': user1Model },
      ],
    });

    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch conversation', error });
  }
});

// Get all conversations for a user
router.get('/conversations', isLoggedIn, async (req, res) => {
  try {
    const { userId, userModel } = req.query;

    // Validate model
    if (!['Customer', 'Seller'].includes(userModel)) {
      return res.status(400).json({ message: 'Invalid user model' });
    }

    // Fetch all conversations for the user
    const messages = await Message.find({
      $or: [
        { 'sender.id': userId, 'sender.model': userModel },
        { 'receiver.id': userId, 'receiver.model': userModel },
      ],
    }).sort({ createdAt: -1 });

    // Group messages by conversation
    const conversations = messages.reduce((acc, message) => {
      const counterpartId = message.sender.id === userId ? message.receiver.id : message.sender.id;
      const counterpartModel = message.sender.id === userId ? message.receiver.model : message.sender.model;

      const key = `${counterpartModel}:${counterpartId}`;
      if (!acc[key]) {
        acc[key] = {
          id: key,
          user: { id: counterpartId, model: counterpartModel },
          latestMessage: message,
        };
      }

      return acc;
    }, {});

    res.status(200).json({ conversations: Object.values(conversations) });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch conversations', error });
  }
});

module.exports = router;
