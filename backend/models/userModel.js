// backend/models/userModel.js

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true, // Ensure name is required for new users
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true, // Password is required for new users
    },
    role: {
        type: String,
        default: 'GENERAL', // Default role to GENERAL if not provided
    },
    address: {
        street: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        postalCode: {
            type: String,
        },
        country: {
            type: String,
        }
    },
    resetPasswordToken: String,
    resetPasswordExpiry: Date,

    // NEW FIELDS FOR EMAIL VERIFICATION
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String
    },
    verificationTokenExpiry: {
        type: Date
    },
}, {
    timestamps: true
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
