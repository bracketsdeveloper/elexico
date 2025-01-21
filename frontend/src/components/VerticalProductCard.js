// frontend/src/components/VerticalProductCard.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import displayINRCurrency from '../helpers/displayCurrency';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import SummaryApi from '../common';

const VerticalProductCard = ({ loading, data = [] }) => {
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
        toast.error('Already in cart');
        return;
      }

      cartItems.push({ productId, quantity: 1 });
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      setCartProductCount(cartItems.length);
      toast.success('Product added to cart');
    }
  };

  return (
    <div className="my-10 px-6">
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {loadingList.map((_, index) => (
            <div
              key={index}
              className="bg-gray-200 h-64 rounded-md shadow animate-pulse"
            ></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((product, index) => (
            <div
              key={index}
              className="bg-white border rounded-md shadow hover:shadow-lg transition-shadow p-4 flex flex-col justify-between"
            >
              <Link to={`/product/${product?._id}`} className="block mb-3">
                <div className="flex items-center justify-center bg-gray-100 h-40 rounded">
                  <img
                    src={product?.productImage[0]}
                    alt={product?.productName}
                    className="object-contain h-full w-full hover:scale-105 transition-transform"
                  />
                </div>
              </Link>
              <div>
                <h3 className="text-red-600 font-bold text-sm mb-1 line-clamp-1">
                  {product?.productName}
                </h3>
                <p className="text-gray-700 text-xs mb-1">{product?.category}</p>
                <p className="text-xs text-gray-600">
                  {displayINRCurrency(product?.selling)}{' '}
                  <span className="line-through ml-1">
                    {displayINRCurrency(product?.price)}
                  </span>
                </p>
              </div>
              <button
                className="mt-3 bg-red-600 text-white text-sm py-1 px-2 rounded hover:bg-red-700 transition-colors w-full"
                onClick={(e) => handleAddToCart(e, product?._id)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VerticalProductCard;
