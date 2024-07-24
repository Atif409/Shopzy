// models/Message.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  sender: {
    id: { type: Schema.Types.ObjectId, required: true },
    model: { type: String, required: true, enum: ['Customer', 'Seller'] },
  },
  receiver: {
    id: { type: Schema.Types.ObjectId, required: true },
    model: { type: String, required: true, enum: ['Customer', 'Seller'] },
  },
  text: { type: String },
  image: { type: String },
  timestamp: { type: Date, default: Date.now },
});

// Static method to populate sender and receiver
messageSchema.statics.populateReferences = function (query) {
  return query.populate('sender.id').populate('receiver.id');
};

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
