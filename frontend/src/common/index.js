const backendDomain = 'https://elexico.vercel.app' //  'http://localhost:8080'||
const SummaryApi = {
    signUp : {
        url : `${backendDomain}/api/signup`,
        method : "post"
    },
    signIn : {
        url : `${backendDomain}/api/signin`,
        method : "post"
    },
    current_user : {
        url : `${backendDomain}/api/user-details`,
        method : "get"
    },
    logout_user : {
        url : `${backendDomain}/api/userLogout`,
        method : "get"
    },
    allUser :{
        url : `${backendDomain}/api/all-user`,
        method : "get"
    },
    updateUser : {
        url : `${backendDomain}/api/update-user`,
        method : "post"
    },
    uploadProduct : {
        url : `${backendDomain}/api/upload-product`,
        method : "post"
    },
    allProduct :{
        url : `${backendDomain}/api/get-product`,
        method : "get"
    },
    updateProduct : {
        url : `${backendDomain}/api/update-product`,
        method : 'post'
    },
    categoryProduct : {
        url : `${backendDomain}/api/get-categoryProduct`,
        method : 'get'
    },
    categorywiseProducts : {
        url : `${backendDomain}/api/category-product`,
        method : 'post'
    },
    productdetails : {
        url : `${backendDomain}/api/product-details`,
        method :'post'
    },
    addToCart : {
        url: `${backendDomain}/api/addtocart`,
        method : 'post'
    },
    cartCount : {
        url : `${backendDomain}/api/countAddToCart`,
        method : "get"
    },
    myCart : {
        url : `${backendDomain}/api/my-cart`,
        method:"get"
    },
    updateCartProduct : {
        url :`${backendDomain}/api/update-cart-product`,
        method : "post"
    },
    deleteCartProduct : {
        url : `${backendDomain}/api/delete-cart-product`,
        method : "post"
    },
    searchProduct :{
        url:`${backendDomain}/api/search`,
        method : "get"
    },
    deleteProduct: {
        url: `${backendDomain}/api/delete-product`,
        method: 'post',
    },
    filterProduct : {
        url: `${backendDomain}/api/filter-product`,
        method : "post"
    },
    resetPassword : {
        url: `${backendDomain}/api/forgot-password`,
        method : "post"
    },
    forgotPassword : {
        url : `${backendDomain}/api/reset-password`,
        method : "post"
    },deleteProduct: {
        url: `${backendDomain}/api/delete-product`,
        method: 'post',
    },searchFilterProducts: {
        url: `${backendDomain}/api/search-filter-products`,
        method: 'get',
    },getProductsByIds: {
        url: `${backendDomain}/api/get-products-by-ids`,
        method: 'post'
    },
}

export default SummaryApi