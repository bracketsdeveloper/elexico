const AddToCart = require("../../models/cartProduct");

const updateAddToCartProduct = async (req, res) => {
    try {
        const currentUserId = req.userId;
        const addToCartProductId = req.body._id;
        const qty = req.body.quantity;

        // Ensure the product ID and quantity are provided
        if (!addToCartProductId || !qty) {
            return res.status(400).json({
                message: "Product ID and quantity are required",
                error: true,
                success: false,
            });
        }

        // Find the product in the cart first
        const product = await AddToCart.findOne({ _id: addToCartProductId, userId: currentUserId });

        if (!product) {
            return res.status(404).json({
                message: "Product not found in the cart",
                error: true,
                success: false,
            });
        }

        // Update the product quantity
        const updateProduct = await AddToCart.updateOne(
            { _id: addToCartProductId, userId: currentUserId },
            { $set: { quantity: qty } }
        );

        res.json({
            message: "Product updated successfully",
            data: updateProduct,
            success: true,
            error: false,
        });
    } catch (err) {
        res.status(500).json({
            message: err?.message || err,
            error: true,
            success: false,
        });
    }
};

module.exports = updateAddToCartProduct;
