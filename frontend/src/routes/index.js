import { createBrowserRouter, Route } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Forgotpwd from "../pages/Forgotpwd";
import Signin from "../pages/Signin";
import Dashboard from "../pages/Dashboard";
import AdminPanel from "../pages/AdminPanel";
import AllUser from "../pages/AllUser";
import Products from "../pages/Products";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import CategoryListMobile from "../components/CategoryListMobile";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";
import ResetPasswordForm from "../pages/ResetPasswordForm";
import AboutUs from "../pages/AboutUs";
import Cancel from "../pages/Cancel";
import RefundShipping from "../pages/RefundShipping";

const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                path:"",
                element:<Home/>
            },
            {
                path:"login",
                element:<Login/>
            },
            {
                path:'forgot-password',
                element:<Forgotpwd/>
            },
            {
                path: 'sign-up',
                element:<Signin/>
            },
            {
                path:'dashboard',
                element:<Dashboard/>
            },
            {
                path : "product-category",
                element: <CategoryProduct/>
            },
            {
                path : "product/:id",
                element : <ProductDetails/>
            },
            {
                path:'admin-panel',
                element:<AdminPanel/>,
                children:[
                    {
                        path:'all-users',
                        element:<AllUser/>
                    },
                    {
                        path:'all-products',
                        element:<Products/>
                    }
                ]
            },
            {
                path : "categories",
                element:<CategoryListMobile/>
            },
            {
                path : "my-Cart",
                element : <Cart/>
            },
            {
                path : "search",
                element : <SearchProduct/>
            },
            {
                path : "reset-password",
                element : <ResetPasswordForm/>
            },
            {
                path : "about-us",
                element:<AboutUs/>
            },
            {
                path : "cancellation",
                element : <Cancel/>
            },
            {
                path : "refund-shipping",
                element: <RefundShipping/>
            }
            
        ]
    }
])

export default router 