const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        default: false
    },
    verificationToken: String,
    adresses: [
        {
            name: String,
            mobileNo: String,
            houseNo: String,
            street: String,
            landmark: String,
            city: String,
            country: String,
            postalCode: String
        }
    ],
    orders: [{
        type: mongoose.Schema.ObjectId,
        ref: "Order"
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Seller = mongoose.model("seller", sellerSchema);
module.exports = Seller;