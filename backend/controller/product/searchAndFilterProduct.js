const productModel = require("../../models/productModel");

async function searchAndFilterProductController(req, res) {
    try {
        const { search, category } = req.query;

        // Construct the query filter
        const filter = {};
        if (category) filter.category = category;
        if (search) filter.productName = { $regex: search, $options: 'i' }; // Case-insensitive search

        // Fetch filtered products from the database
        const products = await productModel.find(filter);

        res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch products",
            error: true,
            success: false,
        });
    }
}

module.exports = searchAndFilterProductController;
