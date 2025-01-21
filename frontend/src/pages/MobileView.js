// src/components/MobileView.js
import React, { useContext } from 'react';
import { IoHomeOutline, IoCartOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import Context from '../context';

const MobileView = () => {
  const { cartProductCount } = useContext(Context);
  const location = useLocation();

  // Function to determine if the link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 shadow-lg md:hidden">
      <div className="flex justify-around items-center h-16">
        {/* Home Icon */}
        <Link to="/" aria-label="Home">
          <div className={`flex flex-col items-center ${isActive('/') ? 'text-white' : 'text-gray-400'} hover:text-white transition-colors`}>
            <IoHomeOutline size={24} />
            <span className="text-xs">Home</span>
          </div>
        </Link>

        {/* Cart Icon */}
        <Link to="/my-cart" aria-label="Cart" className="relative">
          <div className={`flex flex-col items-center ${isActive('/my-cart') ? 'text-white' : 'text-gray-400'} hover:text-white transition-colors`}>
            <IoCartOutline size={24} />
            {cartProductCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                {cartProductCount}
              </span>
            )}
            <span className="text-xs">Cart</span>
          </div>
        </Link>

        {/* User Icon */}
        <Link to="/dashboard" aria-label="User Profile">
          <div className={`flex flex-col items-center ${isActive('/dashboard') ? 'text-white' : 'text-gray-400'} hover:text-white transition-colors`}>
            <FaRegUser size={24} />
            <span className="text-xs">Profile</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MobileView;
