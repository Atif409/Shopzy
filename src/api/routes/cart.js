const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Products');

// Add item to cart
router.post('/add', async (req, res) => {
  const { customerId, productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ customer: customerId });

    if (!cart) {
      cart = new Cart({ customer: customerId, items: [{ product: productId, quantity }] });
    } else {
      const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart', error });
  }
});

// Remove item from cart
router.post('/remove', async (req, res) => {
  const { customerId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ customer: customerId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.product.toString() !== productId);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart', error });
  }
});

// Update item quantity in cart
router.post('/update', async (req, res) => {
  const { customerId, productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ customer: customerId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
    } else {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error updating item quantity', error });
  }
});

// Get cart contents
router.get('/:customerId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ customer: req.params.customerId }).populate('items.product');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error });
  }
});

module.exports = router;
