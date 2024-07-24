// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  images: [{
    type: String,
  }],
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller', 
    required: true,
  },
}, { timestamps: true }); // Moved timestamps: true here

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
