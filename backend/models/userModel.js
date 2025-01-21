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
            required: false, // Make address fields optional
        },
        city: {
            type: String,
            required: false,
        },
        state: {
            type: String,
            required: false,
        },
        postalCode: {
            type: String,
            required: false,
        },
        country: {
            type: String,
            required: false,
        }
    },
    resetPasswordToken: String,
    resetPasswordExpiry: Date
}, {
    timestamps: true
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
