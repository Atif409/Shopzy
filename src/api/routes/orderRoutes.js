// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Customer = require('../models/Customer');
const Seller = require('../models/Seller');
const Product = require('../models/Products');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Function to generate secret key
const generateSecretKey = () => {
    return crypto.randomBytes(32).toString('hex');
};

const secretKey = generateSecretKey();
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Token is required' });

    jwt.verify(token, secretKey, async (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });

        if (decoded.customerId) {
            req.customerId = decoded.customerId;
        } else if (decoded.sellerId) {
            req.sellerId = decoded.sellerId;
        }

        next();
    });
};

// Customer places an order
router.post('/place-order', verifyToken, async (req, res) => {
    try {
        const { products, sellerId, totalAmount } = req.body;
        const customerId = req.customerId;

        const customer = await Customer.findById(customerId);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        const seller = await Seller.findById(sellerId);
        if (!seller) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        const order = new Order({
            customer: customerId,
            seller: sellerId,
            products,
            totalAmount
        });

        await order.save();
        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: 'Failed to place order' });
    }
});

// Seller accepts an order
router.post('/accept-order', verifyToken, async (req, res) => {
    try {
        const { orderId } = req.body;
        const sellerId = req.sellerId;

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (order.seller.toString() !== sellerId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        order.status = 'accepted';
        await order.save();

        res.status(200).json({ message: 'Order accepted successfully', order });
    } catch (error) {
        console.error('Error accepting order:', error);
        res.status(500).json({ message: 'Failed to accept order' });
    }
});

// Get all orders for a customer
router.get('/customer-orders', verifyToken, async (req, res) => {
    try {
        const customerId = req.customerId;

        const orders = await Order.find({ customer: customerId }).populate('products').populate('seller', 'name email');
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching customer orders:', error);
        res.status(500).json({ message: 'Failed to fetch customer orders' });
    }
});

// Get all orders for a seller
router.get('/seller-orders', verifyToken, async (req, res) => {
    try {
        const sellerId = req.sellerId;

        const orders = await Order.find({ seller: sellerId }).populate('products').populate('customer', 'name email');
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching seller orders:', error);
        res.status(500).json({ message: 'Failed to fetch seller orders' });
    }
});

module.exports = router;
