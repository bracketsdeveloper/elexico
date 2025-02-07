import React, { useContext, useState, useEffect } from 'react';
import Logo from './Logo';
import { FaSearch, FaCartPlus } from "react-icons/fa";
import { LuUserCircle } from "react-icons/lu";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/Role';
import Context from '../context';

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartProductCount } = useContext(Context);

  // Initial search query from URL if present
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialSearch = params.get("q") || "";

  // Local state for the search input
  const [search, setSearch] = useState(initialSearch);

  // If user is not logged in, ensure any menu states (if any) are reset
  useEffect(() => {
    if (!user?._id) {
      // If there was a dropdown state or anything, reset it here
    }
  }, [user]);

  // Handle logout
  const handleLogout = async () => {
    try {
      const response = await fetch(SummaryApi.logout_user.url, {
        method: SummaryApi.logout_user.method,
        credentials: 'include',
      });
      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        dispatch(setUserDetails(null));
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  // Update local search input state as user types
  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  // Trigger navigation/search only when clicking the search icon
  const handleSearchClick = () => {
    if (search.trim()) {
      navigate(`/search?q=${search.trim()}`);
    } else {
      navigate("/search");
    }
  };

  // Directly navigate user to admin or user dashboard
  const handleUserIconClick = () => {
    if (user?.role === ROLE.ADMIN) {
      navigate('/admin-panel');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <header className="bg-white shadow-md border-b md:sticky top-0 z-50 h-16 flex justify-center items-center">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="cursor-pointer">
          <Link to={'/'}>
            <Logo />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center w-full justify-center max-w-lg relative">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={handleInputChange}
            className="w-full h-10 pl-4 pr-14 rounded-full text-sm border border-gray-300 placeholder-gray-500 focus:outline-none focus:border-black transition-colors"
          />
          <button
            onClick={handleSearchClick}
            className="absolute right-0 w-14 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
          >
            <FaSearch />
          </button>
        </div>

        {/* Right Side Menu */}
        <div className="md:flex items-center space-x-8 hidden ">
          {/* Cart Icon */}
          <Link to="/my-cart" className="relative">
            <FaCartPlus className="text-2xl text-black hover:text-gray-700 transition-colors" />
            {cartProductCount > 0 && (
              <div className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center rounded-full bg-black">
                <p className="text-white text-xs font-bold">{cartProductCount}</p>
              </div>
            )}
          </Link>

          {/* User Icon -> Direct navigation to dashboard or admin panel */}
          {user?._id && (
            <button
              onClick={handleUserIconClick}
              className="text-xl text-black hover:text-gray-700 transition-colors"
            >
              <LuUserCircle />
            </button>
          )}

          {/* Login / Logout */}
          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="font-semibold text-black hover:text-gray-700 transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="font-semibold text-black hover:text-gray-700 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
