// frontend/src/components/VerticalCardProduct.js
import React, { useContext, useEffect, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const VerticalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);

  const { fetchUserAddToCart, setCartProductCount } = useContext(Context);
  const user = useSelector((state) => state?.user?.user);

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setData(categoryProduct?.data || []);
    setLoading(false);
  };

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
        const dataResponse = await response.json();
        if (dataResponse.success) {
          toast.success('Product added to cart');
          fetchUserAddToCart();
        } else {
          toast.error(dataResponse.message);
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

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="container mx-auto px-7 my-6 relative bg-transparent">
      {/* Heading */}
      <h2 className="text-3xl font-semibold py-6 text-white text-center mb-2">
        {heading}
      </h2>
      <p className="text-center text-gray-200 mb-8">
        Explore a wide range of products in this category.
      </p>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
          {loadingList.map((_, index) => (
            <div
              key={index}
              className="w-full h-64 bg-gray-500/30 rounded-sm shadow-md animate-pulse"
            ></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
          {data.map((product, index) => {
            const {
              _id,
              productImage,
              productName,
              category,
              price,
              selling,
            } = product;
            
            // Calculate discount percentage if applicable
            let discountPercentage = 0;
            if (price && selling && price > selling) {
              discountPercentage = Math.round(((price - selling) / price) * 100);
            }

            return (
              <div
                key={index}
                className="bg-transparent border border-gray-300/50 rounded-2xl shadow-sm 
                           hover:border-gray-300 transition-colors p-3"
              >
                {/* Clickable Image for ProductDetails */}
                <div className="relative h-48 w-full bg-gray-200 flex items-center justify-center rounded cursor-pointer">
                  <Link
                    to={`/product/${_id}`}
                    className="absolute top-0 left-0 w-full h-full z-10"
                  />
                  <img
                    src={productImage[0]}
                    className="object-contain max-h-full w-full hover:scale-105 transition-transform z-0"
                    alt={productName}
                  />
                </div>

                {/* Product Details + Add to Cart */}
                <div className="flex flex-col mt-3">
                  <div>
                    <h2 className="font-semibold text-red-500 text-lg line-clamp-1">
                      {productName}
                    </h2>
                    <p className="text-gray-300 text-base line-clamp-1">
                      {category}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-red-600 font-medium text-base">
                        {displayINRCurrency(selling)}
                      </p>
                      <p className="text-sm text-gray-400 line-through">
                        {displayINRCurrency(price)}
                      </p>
                    </div>
                    {discountPercentage > 0 && (
                      <p className="text-sm text-green-400 mt-1">
                        {discountPercentage}% off
                      </p>
                    )}
                  </div>
                  <button
                    className="mt-2 bg-red-600 text-white text-base py-1 rounded-full 
                               hover:bg-red-700 transition-colors"
                    onClick={(e) => handleAddToCart(e, _id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VerticalCardProduct;
