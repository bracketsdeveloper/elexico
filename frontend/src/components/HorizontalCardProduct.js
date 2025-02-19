// frontend/src/components/HorizontalCardProduct.js
import React, { useContext, useEffect, useRef, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);
  const scrollElement = useRef();

  const { fetchUserAddToCart, setCartProductCount } = useContext(Context);
  const user = useSelector((state) => state?.user?.user);

  // Fetch data
  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setData(categoryProduct?.data || []);
    setLoading(false);
  };

  // Handle "Add to Cart"
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
      // If user is not logged in, store in localStorage
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const existingItem = cartItems.find((item) => item.productId === productId);

      if (existingItem) {
        toast.error('Already in cart');
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  // Scroll to the right in horizontal container
  const scrollRight = () => {
    if (scrollElement.current) {
      scrollElement.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // Scroll to the left in horizontal container
  const scrollLeft = () => {
    if (scrollElement.current) {
      scrollElement.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  return (
    <div className="my-10 px-6">
      {/* Heading */}
      <h2 className="text-3xl font-semibold text-center text-white mb-2">
        {heading}
      </h2>
      <p className="text-center text-gray-200 mb-8">
        Choose from an array of advanced solutions, just like the example shown.
      </p>

      {/* Carousel Container */}
      <div className="relative p-4">
        {data.length > 1 && (
          <button
            className="hidden md:flex absolute top-1/2 left-3 transform -translate-y-1/2 z-10
                       text-gray-300 hover:text-gray-100 bg-transparent hover:bg-white/10
                       rounded-full p-2 focus:outline-none"
            onClick={scrollLeft}
            aria-label="Scroll Left"
          >
            <FaAngleLeft size={20} />
          </button>
        )}

        {data.length > 1 && (
          <button
            className="hidden md:flex absolute top-1/2 right-3 transform -translate-y-1/2 z-10
                       text-gray-300 hover:text-gray-100 bg-transparent hover:bg-white/10
                       rounded-full p-2 focus:outline-none"
            onClick={scrollRight}
            aria-label="Scroll Right"
          >
            <FaAngleRight size={20} />
          </button>
        )}

        {/* Cards */}
        <div
          className="flex items-stretch gap-6 overflow-x-auto scrollbar-hide"
          ref={scrollElement}
        >
          {loading
            ? loadingList.map((_, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[320px] h-64 bg-gray-500/30 
                             animate-pulse rounded-md"
                ></div>
              ))
            : data.map((product, index) => {
                const { _id, productImage, productName, category, price, selling } = product;

                // Calculate discount percentage
                let discountPercentage = 0;
                if (price && selling && price > selling) {
                  discountPercentage = Math.round(
                    ((price - selling) / price) * 100
                  );
                }

                return (
                  <div
                    key={index}
                    className="flex-shrink-0 w-[500px] h-64 bg-transparent 
                               rounded-md border border-gray-300/50 hover:border-gray-300 
                               transition-colors p-3"
                  >
                    <Link to={`/product/${_id}`} className="flex h-full">
                      {/* Image Area */}
                      <div className="w-2/3 flex items-center justify-center bg-gray-200 rounded">
                        <img
                          src={productImage[0]}
                          alt={productName}
                          className="object-contain max-h-full hover:scale-105 
                                     transition-transform"
                        />
                      </div>

                      {/* Info Area */}
                      <div className="w-2/3 pl-3 flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-red-500 text-lg line-clamp-1">
                            {productName}
                          </h3>
                          <p className="text-gray-300 text-base line-clamp-2">
                            {category}
                          </p>

                          {/* Price and Discount */}
                          <p className="text-base text-gray-400 mt-1">
                            {displayINRCurrency(selling)}{' '}
                            <span className="line-through ml-1">
                              {displayINRCurrency(price)}
                            </span>
                          </p>
                          {discountPercentage > 0 && (
                            <p className="text-sm text-green-400 mt-1">
                              {discountPercentage}% off
                            </p>
                          )}
                        </div>

                        <button
                          className="mt-2 bg-red-600 text-white text-base py-1 px-2 rounded 
                                     hover:bg-red-700 transition-colors focus:outline-none"
                          onClick={(e) => handleAddToCart(e, _id)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </Link>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
