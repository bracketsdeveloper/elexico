const productModel = require("../../models/productModel");

async function deleteProductController(req, res) {
    try {
        const { productId } = req.body;
        if (!productId) {
            throw new Error("Product ID is required");
        }

        const deletedProduct = await productModel.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found",
                error: true,
                success: false,
            });
        }

        res.status(200).json({
            message: "Product deleted successfully",
            error: false,
            success: true,
            data: deletedProduct,
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = deleteProductController;
