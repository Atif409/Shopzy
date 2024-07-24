const mongoose = require('mongoose');

const borrowRequestSchema = new mongoose.Schema({
  requester: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
  responder: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true },  
  quantity: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'shipped', 'returned', 'completed', 'rejected'], default: 'pending' },
  returnDate: { type: Date },
  feedbackRequester: { type: String },
  feedbackResponder: { type: String },
  penalty: { type: Number, default: 0 },
  deposit: { type: Number, default: 0 }
});

module.exports = mongoose.model('BorrowRequest', borrowRequestSchema);
