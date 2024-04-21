const express = require('express');
const router = express.Router();
const { verifyToken } = require('./jwtUtils');
const Seller = require('../models/Seller');

router.post('/accept-connection-request/:requestId', verifyToken, async (req, res) => {
    try {
        const { requestId } = req.params;
        const currentSellerId = req.sellerId;

        // Find the target seller's connection request
        const targetSeller = await Seller.findById(currentSellerId);
        const requestIndex = targetSeller.connectionRequests.findIndex(req => req._id === requestId);
        if (requestIndex === -1) {
            return res.status(404).json({ message: 'Connection request not found' });
        }

        // Accept the connection request
        const request = targetSeller.connectionRequests[requestIndex];
        targetSeller.connections.push(request.seller);
        targetSeller.connectionRequests.splice(requestIndex, 1);
        await targetSeller.save();

        res.status(200).json({ message: 'Connection request accepted successfully' });
    } catch (error) {
        console.log('Error accepting connection request:', error);
        res.status(500).json({ message: 'Failed to accept connection request' });
    }
});

module.exports = router;
