const AddToCart = require("../../models/cartProduct");

const deleteAddToCart = async (req, res) => {
    try {
        const currentUserId = req.userId;
        const addToCartProductId = req.body._id;

        const deleteProduct = await AddToCart.findOneAndDelete({
            _id: addToCartProductId,
            userId: currentUserId
        });

        if (deleteProduct) {
            res.json({
                message: "Product deleted from Cart",
                error: false,
                success: true,
                data: deleteProduct
            });
        } else {
            res.json({
                message: "Product not found in Cart or does not belong to the user",
                error: true,
                success: false
            });
        }
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = deleteAddToCart;
