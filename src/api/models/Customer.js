const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobileNo: {
        type: String,
        unique: true,
        sparse: true 
    },
    password: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        default: false
    },
    verificationCode: String, 
    addresses: [
        {
            fullName: String, 
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
