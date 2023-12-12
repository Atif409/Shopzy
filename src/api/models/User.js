const mongoose = require('monngose');

const userSchema = new mongoose.Schema({
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
    verfied: {
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

const User = mongoose.model("user", userSchema);
module.exports = User;