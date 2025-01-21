const addToCartModel = require("../../models/cartProduct");

const addToCartView = async (req, res) => {
  try {
    const currentUser = req.userId;
    
    // Fetch all products for the current user
    const allProduct = await addToCartModel.find({ userId: currentUser }).populate("productId")
    
    // Send response with fetched products
    res.status(200).json({
      data: allProduct,
      success: true,
      error: false
    });

  } catch (err) {
    // Log the error for debugging purposes
    console.error("Error fetching cart products:", err);

    // Send error response
    res.status(500).json({
      message: err.message || "An error occurred while fetching cart products.",
      success: false,
      error: true
    });
  }
};

module.exports = addToCartView;
