const mongoose = require('mongoose');

const addToCartSchema = new mongoose.Schema({
    productId: {
        ref:'product',
        type: String,
        required: true,
        index: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    userId: {
        type: String,
        required: true,
        index: true
    }
}, {
    timestamps: true,
    versionKey: false // Optional: Disable the __v version key
});

// Create the model
const AddToCart = mongoose.model('AddToCart', addToCartSchema);

module.exports = AddToCart;
