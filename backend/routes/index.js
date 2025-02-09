const express = require('express');
const  router = express.Router()
const userSignUpController = require("../controller/user/userSignup");
const userSignInController = require('../controller/user/userSignin');
const authToken = require('../middleware/authToken');
const userDetailsController = require('../controller/user/userDetail');
const userLogout = require('../controller/user/userLogout');
const allUsers = require('../controller/user/allUsers');
const updateUser = require('../controller/user/updateUser');
const uploadProductController = require('../controller/product/uploadProduct');
const getProductController = require('../controller/product/getProduct');
const updateProductController = require('../controller/product/updateProduct');
const getCategoryProduct = require('../controller/product/getCategoryProduct');
const getcategorywiseProduct = require('../controller/product/getcategorywiseProduct');
const getProductDetails = require('../controller/product/getProductDetails');
const addToCartController = require('../controller/user/addToCartController');
const countAddToCart = require('../controller/user/countAddToCart');
const addToCartView = require('../controller/user/addToCartView');
const updateAddToCartProduct = require('../controller/user/updateAddToCart');
const deleteAddToCart = require('../controller/user/deleteAddToCart');
const searchProduct = require('../controller/product/searchProduct');
const filterProductController = require('../controller/product/filterProduct');
const forgetPasswordController = require('../controller/user/forgetPasswordController');
const resetPasswordController = require('../controller/user/resetPasswordController');
const deleteProductController = require('../controller/product/deleteProduct');
const searchAndFilterProductController = require('../controller/product/searchAndFilterProduct');
const getProductsByIds = require('../controller/product/getProductsByIds');


router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken ,userDetailsController)
router.get("/userLogout",userLogout)

//admin panel
router.get("/all-user",authToken, allUsers)
router.post("/update-user",authToken ,updateUser)


// reset password
router.post("/forgot-password",forgetPasswordController)
router.post("/reset-password",resetPasswordController)

router.post("/upload-product",authToken,uploadProductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)
router.get("/get-categoryProduct", getCategoryProduct)
router.post("/category-product",getcategorywiseProduct)
router.post("/product-details",getProductDetails)
router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)

//user add to cart
router.post("/addtocart",authToken, addToCartController)
router.get("/countAddToCart",authToken,countAddToCart)
router.get("/my-cart",authToken,addToCartView)
router.post("/update-cart-product",authToken, updateAddToCartProduct)
router.post("/delete-cart-product",authToken, deleteAddToCart)


router.post("/delete-product",  deleteProductController);
router.get("/search-filter-products", searchAndFilterProductController);

router.post("/get-products-by-ids", getProductsByIds);

const verifyEmailController = require('../controller/user/verifyEmail');



// Verify email route
router.get('/verify-email', verifyEmailController);



module.exports = router 