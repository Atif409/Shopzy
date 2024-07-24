const mongoose = require('mongoose');

const sellerConnectionSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }  
});

module.exports = mongoose.model('SellerConnection', sellerConnectionSchema);
