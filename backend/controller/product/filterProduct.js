const productModel = require("../../models/productModel");

const filterProductController = async (req, res) => {
    try {
        const categoryList = req.body?.category || [];
        
        if (!Array.isArray(categoryList) || categoryList.length === 0) {
            return res.status(400).json({
                data: [],
                message: "Invalid category list",
                error: true,
                success: false
            });
        }

        const products = await productModel.find({
            category: { "$in": categoryList }
        });

        res.json({
            data: products,
            message: "Category product list",
            error: false,
            success: true
        });
    } catch (err) {
        res.status(500).json({
            data: err.message || err,
            message: "Internal Server Error",
            error: true,
            success: false
        });
    }
};

module.exports = filterProductController;
