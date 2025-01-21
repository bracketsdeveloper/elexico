const addToCartModel = require("../../models/cartProduct");

const countAddToCart = async (req, res) => {
    try {
        const userId = req.userId;
        const count = await addToCartModel.countDocuments({ 
            userId : userId
         });

        res.json({
            data: { count : count },
            message: "ok",
            error: false,
            success: true
        });
    } catch (err) {
        console.error("Error counting cart items:", err);  // Log the error
        res.status(500).json({
            data: null,
            message: err.message || "An error occurred while counting cart items",
            success: false,
            error: true
        });
    }
};

module.exports = countAddToCart;
