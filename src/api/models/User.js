const mongoose = require('mongoose');
const Customer = require('../models/Customer');
const Seller = require('../models/Seller');

const userSchema = new mongoose.Schema({
  modelId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'modelType' },
  modelType: { type: String, required: true, enum: ['Customer', 'Seller'] },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
