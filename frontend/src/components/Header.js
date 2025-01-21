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
  const user = useSelector(state => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const { cartProductCount } = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search?.split("=")[0]);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  useEffect(() => {
    if (!user?._id) {
      setMenuDisplay(false);
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      const response = await fetch(SummaryApi.logout_user.url, {
        method: SummaryApi.logout_user.method,
        credentials: 'include',
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        dispatch(setUserDetails(null)); // Clear user data from Redux
        navigate('/'); // Redirect to home or login page after logout
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
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
            onChange={handleSearch}
            value={search}
            type="text"
            placeholder="Search products..."
            className="w-full h-10 pl-4 pr-14 rounded-full text-sm border border-gray-300 placeholder-gray-500 focus:outline-none focus:border-black transition-colors"
          />
          <button
            onClick={() => search && navigate(`/search?q=${search}`)}
            className="absolute right-0 w-14 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
          >
            <FaSearch />
          </button>
        </div>

        {/* Right Side Menu */}
        <div className="flex items-center space-x-8">
          {/* Cart Icon */}
          <Link to="/my-cart" className="relative">
            <FaCartPlus className="text-2xl text-black hover:text-gray-700 transition-colors" />
            {cartProductCount > 0 && (
              <div className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center rounded-full bg-black">
                <p className="text-white text-xs font-bold">
                  {cartProductCount}
                </p>
              </div>
            )}
          </Link>

          {/* User Menu Icon */}
          {user?._id && (
            <div className="relative">
              <button
                onClick={() => setMenuDisplay(prev => !prev)}
                className="text-xl text-black hover:text-gray-700 transition-colors"
              >
                <LuUserCircle />
              </button>

              {/* Dropdown Menu */}
              {menuDisplay && (
                <div className="absolute right-0 top-12 w-48 bg-white shadow-lg rounded-lg border border-gray-100">
                  <nav className="flex flex-col p-2">
                    {user?.role === ROLE.ADMIN && (
                      <Link
                        to="/admin-panel"
                        className="block px-4 py-2 text-sm text-black hover:bg-gray-100 rounded-md"
                        onClick={() => setMenuDisplay(false)}
                      >
                        Admin Panel
                      </Link>
                    )}
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-black hover:bg-gray-100 rounded-md"
                      onClick={() => setMenuDisplay(false)}
                    >
                      Dashboard
                    </Link>
                  </nav>
                </div>
              )}
            </div>
          )}

          {/* Login / Logout Button */}
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
