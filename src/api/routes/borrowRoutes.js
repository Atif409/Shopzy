require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Seller = require('../models/Seller');
const SellerConnection = require('../models/SellerConnection');
const BorrowRequest = require('../models/BorrowRequest');
const Product = require('../models/Products');

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

// Check if sellers are connected
const areSellersConnected = async (requesterId, responderId) => {
    const connection = await SellerConnection.findOne({
        $or: [
            { sender: requesterId, receiver: responderId, status: 'accepted' },
            { sender: responderId, receiver: requesterId, status: 'accepted' }
        ]
    });
    return !!connection;
};

// Send borrow request
router.post('/borrow-request', verifyToken, async (req, res) => {
    try {
        const { responderId, productId, quantity } = req.body;
        const requesterId = req.sellerId;

        const requester = await Seller.findById(requesterId);
        const responder = await Seller.findById(responderId);

        if (requester.category !== responder.category) {
            return res.status(400).json({ message: 'Sellers must be in the same category to borrow products' });
        }

        if (!await areSellersConnected(requesterId, responderId)) {
            return res.status(400).json({ message: 'Sellers are not connected' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const borrowRequest = new BorrowRequest({
            requester: requesterId,
            responder: responderId,
            product: productId,
            quantity
        });
        await borrowRequest.save();

        res.status(200).json({ message: 'Borrow request sent' });
    } catch (error) {
        console.error('Error sending borrow request:', error);
        res.status(500).json({ message: 'Failed to send borrow request' });
    }
});

// Approve borrow request
router.post('/approve-borrow-request', verifyToken, async (req, res) => {
    try {
        const { borrowRequestId, returnDate, deposit, penalty } = req.body;
        const borrowRequest = await BorrowRequest.findById(borrowRequestId);

        const responder = await Seller.findById(req.sellerId);
        const requester = await Seller.findById(borrowRequest.requester);

        if (responder.category !== requester.category) {
            return res.status(400).json({ message: 'Sellers must be in the same category to borrow products' });
        }

        if (!borrowRequest || borrowRequest.responder.toString() !== req.sellerId) {
            return res.status(404).json({ message: 'Borrow request not found' });
        }

        borrowRequest.status = 'accepted';
        borrowRequest.returnDate = new Date(returnDate);
        borrowRequest.deposit = deposit;
        borrowRequest.penalty = penalty;
        await borrowRequest.save();

        res.status(200).json({ message: 'Borrow request approved' });
    } catch (error) {
        console.error('Error approving borrow request:', error);
        res.status(500).json({ message: 'Failed to approve borrow request' });
    }
});

// Reject borrow request
router.post('/reject-borrow-request', verifyToken, async (req, res) => {
    try {
        const { borrowRequestId } = req.body;
        const borrowRequest = await BorrowRequest.findById(borrowRequestId);

        if (!borrowRequest || borrowRequest.responder.toString() !== req.sellerId) {
            return res.status(404).json({ message: 'Borrow request not found' });
        }

        borrowRequest.status = 'rejected';
        await borrowRequest.save();

        res.status(200).json({ message: 'Borrow request rejected' });
    } catch (error) {
        console.error('Error rejecting borrow request:', error);
        res.status(500).json({ message: 'Failed to reject borrow request' });
    }
});

// Ship product
router.post('/ship-product', verifyToken, async (req, res) => {
    try {
        const { borrowRequestId } = req.body;
        const borrowRequest = await BorrowRequest.findById(borrowRequestId);

        if (!borrowRequest || borrowRequest.responder.toString() !== req.sellerId) {
            return res.status(404).json({ message: 'Borrow request not found' });
        }

        borrowRequest.status = 'shipped';
        await borrowRequest.save();

        res.status(200).json({ message: 'Product shipped' });
    } catch (error) {
        console.error('Error shipping product:', error);
        res.status(500).json({ message: 'Failed to ship product' });
    }
});

// Return product
router.post('/return-product', verifyToken, async (req, res) => {
    try {
        const { borrowRequestId } = req.body;
        const borrowRequest = await BorrowRequest.findById(borrowRequestId);

        if (!borrowRequest || borrowRequest.requester.toString() !== req.sellerId) {
            return res.status(404).json({ message: 'Borrow request not found' });
        }

        borrowRequest.status = 'returned';
        await borrowRequest.save();

        res.status(200).json({ message: 'Product returned' });
    } catch (error) {
        console.error('Error returning product:', error);
        res.status(500).json({ message: 'Failed to return product' });
    }
});

// Confirm product return and complete transaction
router.post('/complete-borrow', verifyToken, async (req, res) => {
    try {
        const { borrowRequestId } = req.body;
        const borrowRequest = await BorrowRequest.findById(borrowRequestId);

        if (!borrowRequest || borrowRequest.responder.toString() !== req.sellerId) {
            return res.status(404).json({ message: 'Borrow request not found' });
        }

        borrowRequest.status = 'completed';
        await borrowRequest.save();

        res.status(200).json({ message: 'Borrow transaction completed' });
    } catch (error) {
        console.error('Error completing borrow transaction:', error);
        res.status(500).json({ message: 'Failed to complete borrow transaction' });
    }
});

// Leave feedback
router.post('/leave-feedback', verifyToken, async (req, res) => {
    try {
        const { borrowRequestId, feedback } = req.body;
        const borrowRequest = await BorrowRequest.findById(borrowRequestId);

        if (!borrowRequest) {
            return res.status(404).json({ message: 'Borrow request not found' });
        }

        if (borrowRequest.requester.toString() === req.sellerId) {
            borrowRequest.feedbackRequester = feedback;
        } else if (borrowRequest.responder.toString() === req.sellerId) {
            borrowRequest.feedbackResponder = feedback;
        } else {
            return res.status(400).json({ message: 'Unauthorized to leave feedback' });
        }

        await borrowRequest.save();

        res.status(200).json({ message: 'Feedback left successfully' });
    } catch (error) {
        console.error('Error leaving feedback:', error);
        res.status(500).json({ message: 'Failed to leave feedback' });
    }
});

// Handle non-return scenario
router.post('/handle-non-return', verifyToken, async (req, res) => {
    try {
        const { borrowRequestId } = req.body;
        const borrowRequest = await BorrowRequest.findById(borrowRequestId);

        if (!borrowRequest || borrowRequest.responder.toString() !== req.sellerId) {
            return res.status(404).json({ message: 'Borrow request not found' });
        }

        if (borrowRequest.status !== 'returned' && new Date() > borrowRequest.returnDate) {
            borrowRequest.status = 'completed';
            const penaltyAmount = borrowRequest.penalty;
            // Implement compensation logic, e.g., transfer funds from deposit to responder
            await borrowRequest.save();

            res.status(200).json({ message: 'Non-return handled, penalty applied' });
        } else {
            res.status(400).json({ message: 'Product has been returned or return date has not passed' });
        }
    } catch (error) {
        console.error('Error handling non-return:', error);
        res.status(500).json({ message: 'Failed to handle non-return' });
    }
});

module.exports = router;  