// frontend/src/components/Cart.js
import React, { useContext, useEffect, useRef, useState, useCallback } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';
import displayINRCurrency from '../helpers/displayCurrency';
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const context = useContext(Context);
  const user = useSelector(state => state?.user?.user);
  const navigate = useNavigate();

  // Check cart product count directly from context
  const loadingCart = new Array(context.cartProductCount).fill(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      if (user?._id) {
        // User is logged in, fetch cart from backend
        const response = await fetch(SummaryApi.myCart.url, {
          method: SummaryApi.myCart.method,
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          const responseData = await response.json();
          throw new Error(responseData.message || 'Failed to fetch data');
        }

        const responseData = await response.json();
        if (responseData.success) {
          setData(responseData.data);
        } else {
          throw new Error(responseData.message);
        }
      } else {
        // User is not logged in, get cart from localStorage
        const localCart = JSON.parse(localStorage.getItem('cartItems')) || [];
        if (localCart.length === 0) {
          setData([]);
          return;
        }

        // Fetch product details for items in localCart
        const productIds = localCart.map(item => item.productId);
        const response = await fetch(SummaryApi.getProductsByIds.url, {
          method: SummaryApi.getProductsByIds.method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ productIds })
        });

        if (!response.ok) {
          const responseData = await response.json();
          throw new Error(responseData.message || 'Failed to fetch products');
        }

        const responseData = await response.json();
        if (responseData.success) {
          const products = responseData.data;
          // Merge quantity from localCart
          const cartItems = localCart.map(item => {
            const product = products.find(p => p._id === item.productId);
            return {
              _id: item.productId,
              productId: product,
              quantity: item.quantity
            };
          });
          setData(cartItems);
        } else {
          throw new Error(responseData.message);
        }
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [context.cartProductCount, user?._id]);

  const updateQty = async (id, qty) => {
    if (user?._id) {
      // Update quantity in backend
      try {
        const response = await fetch(SummaryApi.updateCartProduct.url, {
          method: SummaryApi.updateCartProduct.method,
          credentials: 'include',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ _id: id, quantity: qty })
        });

        const responseData = await response.json();
        if (responseData.success) {
          fetchData();
        } else {
          toast.error(responseData.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      // Update quantity in localStorage
      const localCart = JSON.parse(localStorage.getItem('cartItems')) || [];
      const index = localCart.findIndex(item => item.productId === id);
      if (index !== -1) {
        localCart[index].quantity = qty;
        localStorage.setItem('cartItems', JSON.stringify(localCart));
        fetchData();
        context.setCartProductCount(localCart.length);
      }
    }
  };

  const increaseQty = useCallback((id, qty) => updateQty(id, qty + 1), []);
  const decreaseQty = useCallback((id, qty) => qty > 1 && updateQty(id, qty - 1), []);

  const deleteCartProduct = async (id) => {
    if (user?._id) {
      // Delete from backend cart
      try {
        const response = await fetch(SummaryApi.deleteCartProduct.url, {
          method: SummaryApi.deleteCartProduct.method,
          credentials: 'include',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ _id: id })
        });

        const responseData = await response.json();
        if (responseData.success) {
          fetchData();
          context.fetchUserAddToCart();
          toast.success(responseData.message);
        } else {
          toast.error(responseData.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      // Delete from localStorage cart
      let localCart = JSON.parse(localStorage.getItem('cartItems')) || [];
      localCart = localCart.filter(item => item.productId !== id);
      localStorage.setItem('cartItems', JSON.stringify(localCart));
      fetchData();
      context.setCartProductCount(localCart.length);
    }
  };

  const handleCheckout = () => {
    if (!user?._id) {
        // User is not logged in, redirect to login page
        toast.warn("Please log in to proceed with checkout.");
        navigate('/login'); // Redirect to login page
        return;
    }

    // Proceed with checkout if user is logged in
    const message = data.map(product =>
      `${product?.productId?.productName} - (${product?.quantity} * ${displayINRCurrency(product?.productId?.selling)}) - ${displayINRCurrency(product?.productId?.selling * product?.quantity)}`
    ).join('\n');

    const totalPrice = data.reduce((prev, cur) => prev + (cur.quantity * cur?.productId?.selling), 0);

    // Add user's email to the WhatsApp message
    const emailMessage = user?.email ? `\nUser Email: ${user.email}` : '';

    const url = `https://api.whatsapp.com/send?phone=918951936369&text=${encodeURIComponent(
      `Hey, I saw these products on your website elexicodigital.com and want to check out\n${emailMessage}.\nCheckout details:\n${message}\nTotal Price: ${displayINRCurrency(totalPrice)}`
    )}`;

    window.location.href = url;
  };

  const totalQty = data.reduce((previous, current) => previous + current.quantity, 0);
  const totalPrice = data.reduce((prev, cur) => prev + (cur.quantity * cur?.productId?.selling), 0);

  return (
    <div className="container mx-auto px-4 py-6 bg-gray-900 min-h-screen text-white rounded-lg shadow-md">
      {/* No Data */}
      {data.length === 0 && !loading && (
        <div className="text-center text-lg text-red-500 my-6 bg-gray-800 py-4 rounded">
          No products in your cart.
        </div>
      )}

      <div className="flex flex-col lg:flex-row lg:gap-5 justify-between">
        {/* Product List */}
        <div className="w-full max-w-4xl">
          {loading ? (
            loadingCart.map((_, index) => (
              <div
                key={index}
                className="w-full bg-gray-800 h-32 border border-gray-600 m-3 animate-pulse rounded-lg"
              />
            ))
          ) : (
            data.map((product) => (
              <div
                key={product?.productId?._id}
                className="w-full bg-gray-800 h-auto my-2 border border-gray-700 rounded-lg grid grid-cols-[128px,1fr] p-4 relative"
              >
                {/* Product Image */}
                <div className="w-32 h-32 bg-gray-700">
                  <img
                    src={product?.productId?.productImage[0]}
                    className="w-full h-full object-scale-down mix-blend-multiply rounded-md"
                    alt={product?.productId?.productName}
                  />
                </div>
                <div className="px-4 py-2 relative">
                  {/* Delete Button */}
                  <button
                    className="absolute top-2 right-2 text-red-500 rounded-full p-2 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                    onClick={() => deleteCartProduct(product._id)}
                    aria-label={`Delete ${product?.productId?.productName}`}
                  >
                    <MdDelete />
                  </button>

                  {/* Product Info */}
                  <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1 text-red-400">
                    {product?.productId?.productName}
                  </h2>
                  <p className="capitalize text-red-500">
                    {product?.productId?.category}
                  </p>

                  {/* Price Info */}
                  <div className="flex justify-between mt-4">
                    <p className="font-medium text-lg">
                      {displayINRCurrency(product?.productId?.selling)}
                    </p>
                    <p className="text-red-400 font-semibold text-lg">
                      {displayINRCurrency(
                        product?.productId?.selling * product?.quantity
                      )}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white w-6 h-6 flex justify-center items-center rounded"
                      aria-label={`Decrease quantity of ${product?.productId?.productName}`}
                      onClick={() => decreaseQty(product._id, product?.quantity)}
                    >
                      -
                    </button>
                    <span>{product?.quantity}</span>
                    <button
                      className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white w-6 h-6 flex justify-center items-center rounded"
                      aria-label={`Increase quantity of ${product?.productId?.productName}`}
                      onClick={() => increaseQty(product._id, product?.quantity)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary Section */}
        <div className="m-3 w-full lg:mt-4 max-w-sm">
          {loading ? (
            <div className="h-36 bg-gray-800 border-gray-600 animate-pulse rounded-lg" />
          ) : (
            data.length > 0 && (
              <div className="h-auto bg-gray-800 rounded-lg shadow-lg p-4">
                <h1 className="text-white bg-red-600 px-4 py-2 rounded-t-lg text-center">
                  Summary
                </h1>
                <div className="mt-4">
                  <div className="flex justify-between text-lg font-medium text-red-400">
                    <p>No of items :</p>
                    <p>{totalQty}</p>
                  </div>
                  <div className="mt-4">
                    <p className="text-lg font-semibold text-red-400">
                      Product Details:
                    </p>
                    {data.map((product) => (
                      <div key={product?.productId?._id} className="mb-2">
                        <p className="text-md font-medium text-white">
                          {product?.productId?.productName} - ({product?.quantity} x{" "}
                          {displayINRCurrency(product?.productId?.selling)}) ={" "}
                          {displayINRCurrency(
                            product?.productId?.selling * product?.quantity
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-lg font-medium text-white mt-3">
                    <p>Total Price :</p>
                    <p>{displayINRCurrency(totalPrice)}</p>
                  </div>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white p-4 mt-4 w-full rounded-lg transition-colors"
                    onClick={handleCheckout}
                  >
                    CheckOut
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
