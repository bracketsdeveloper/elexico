// frontend/src/components/CategoryWiseProductDisplay.js
import React, { useContext, useEffect, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import addToCart from '../helpers/addToCart';
import { Link } from 'react-router-dom';
import Context from '../context';
import scrollToTop from '../helpers/scrollToTop';

const CategoryWiseProductDisplay = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);

  const { fetchUserAddToCart, setCartProductCount } = useContext(Context);
  const user = useSelector((state) => state?.user?.user);

  const handleAddToCart = async (e, productId) => {
    e.preventDefault();

    if (user?._id) {
      try {
        const response = await fetch(SummaryApi.addToCart.url, {
          method: SummaryApi.addToCart.method,
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId }),
        });

        const data = await response.json();
        if (data.success) {
          toast.success('Product added to cart');
          fetchUserAddToCart();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error('Error adding product to cart');
        console.error('Error:', error);
      }
    } else {
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const existingItem = cartItems.find((item) => item.productId === productId);

      if (existingItem) {
        toast.error('Already exists in Cart');
        return;
      }

      cartItems.push({ productId, quantity: 1 });
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      setCartProductCount(cartItems.length);
      toast.success('Product added to cart');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setData(categoryProduct?.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="container mx-auto px-4 py-8 my-6 relative bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold py-6 text-red-600">{heading}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading
          ? loadingList.map((_, index) => (
              <div
                key={index}
                className="w-full h-80 bg-gray-200 rounded-lg shadow-lg animate-pulse"
              ></div>
            ))
          : data.map((product, index) => {
              // Calculate discount percentage if applicable
              let discountPercentage = 0;
              if (product?.price && product?.selling && product.price > product.selling) {
                discountPercentage = Math.round(((product.price - product.selling) / product.price) * 100);
              }

              return (
                <div
                  key={index}
                  className="w-full h-full bg-gray-900 text-white rounded-lg shadow-lg 
                             transition-transform transform hover:scale-105"
                >
                  <Link
                    to={`/product/${product?._id}`}
                    onClick={scrollToTop}
                    className="block"
                  >
                    <div className="bg-gray-800 h-64 p-4 flex items-center justify-center rounded-t-lg">
                      <img
                        src={product.productImage[0]}
                        className="object-contain h-full hover:scale-110 transition-transform"
                        alt={product.name}
                      />
                    </div>
                  </Link>
                  <div className="p-3 grid gap-3 bg-gray-800 rounded-b-lg">
                    <h2 className="font-semibold md:text-lg text-base text-ellipsis line-clamp-1">
                      {product?.productName}
                    </h2>
                    <p className="capitalize text-red-400">{product?.category}</p>
                    <div className="flex gap-3">
                      <p className="text-red-400 font-semibold">
                        {displayINRCurrency(product?.selling)}
                      </p>
                      <p className="text-gray-400 line-through">
                        {displayINRCurrency(product?.price)}
                      </p>
                    </div>
                    {discountPercentage > 0 && (
                      <p className="text-sm text-green-400">
                        {discountPercentage}% off
                      </p>
                    )}
                    <button
                      className="text-sm bg-red-500 py-1 text-white rounded-full hover:bg-red-600 
                                 transition-colors mt-3"
                      onClick={(e) => handleAddToCart(e, product?._id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryWiseProductDisplay;
