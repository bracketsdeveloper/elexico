const productModel = require("../../models/productModel");

const searchProduct = async(req, res) => {
    try {
        const query = req.query.q || '';
        console.log('Search query:', query);

        const regex = new RegExp(query, 'i', 'g');
        console.log('Regex:', regex);

        const products = await productModel.find({
            "$or": [
                { productName: regex },
                { category: regex }
            ]
        });
        console.log('Products found:', products);

        res.json({
            data: products,
            message: "Search Product list",
            error: false,
            success: true
        });
    } catch(err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = searchProduct;
