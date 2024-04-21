const express = require('express');
const router = express.Router();
const { verifyToken } = require('./jwtUtils');
const Seller = require('../models/Seller');

router.post('/send-connection-request/:sellerId', verifyToken, async (req, res) => {
    try {
        const { sellerId } = req.params;
        const { message } = req.body;
        const currentSellerId = req.sellerId;
        // Check if the seller to connect with exists
        const targetSeller = await Seller.findById(sellerId);
        if (!targetSeller) {
            return res.status(404).json({ message: 'Seller not found' });
        }
        // Add connection request to the target seller's requests
        targetSeller.connectionRequests.push({
            seller: currentSellerId,
            message
        });
        await targetSeller.save();

        res.status(200).json({ message: 'Connection request sent successfully' });
    } catch (error) {
        console.log('Error sending connection request:', error);
        res.status(500).json({ message: 'Failed to send connection request' });
    }
});

module.exports = router;
