// backend/controller/product/getProductsByIds.js
const Product = require("../../models/productModel");

const getProductsByIds = async (req, res) => {
  try {
    const { productIds } = req.body;

    if (!Array.isArray(productIds) || productIds.length === 0) {
      return res.status(400).json({
        message: "Product IDs are required",
        error: true,
        success: false,
      });
    }

    const products = await Product.find({ _id: { $in: productIds } });

    res.json({
      data: products,
      message: "Products fetched successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(500).json({
      message: err?.message || "An error occurred while fetching products.",
      error: true,
      success: false,
    });
  }
};

module.exports = getProductsByIds;
