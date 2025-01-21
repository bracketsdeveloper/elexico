// frontend/src/components/Login.js
import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(SummaryApi.signIn.url, {
        method: SummaryApi.signIn.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
      }

      if (responseData.success) {
        toast.success(responseData.message);
        await mergeCarts(); // Merge local cart with server cart
        navigate('/');
        fetchUserDetails();
        fetchUserAddToCart();
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Merge local cart with server cart after login
  const mergeCarts = async () => {
    const localCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (localCart.length === 0) return;

    for (const item of localCart) {
      try {
        const response = await fetch(SummaryApi.addToCart.url, {
          method: SummaryApi.addToCart.method,
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId: item.productId, quantity: item.quantity }),
        });

        const data = await response.json();
        if (!data.success) {
          console.error(`Failed to add product ${item.productId} to cart: ${data.message}`);
        }
      } catch (error) {
        console.error(`Error adding product ${item.productId} to cart: ${error.message}`);
      }
    }

    // Clear local cart after merging
    localStorage.removeItem('cartItems');
  };

  return (
    <section id="login" className=" bg-gray-900  min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="bg-gray-100 max-w-md mx-auto rounded-lg shadow-md p-6">
          {/* Heading */}
          <div className="flex justify-center items-center text-2xl mb-4 text-red-600">
            Login
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1" htmlFor="email">
                Email
              </label>
              <div className="bg-white border border-gray-300 rounded p-2">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  placeholder="Enter email"
                  required
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1" htmlFor="password">
                Password
              </label>
              <div className="bg-white border border-gray-300 rounded p-2 flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  placeholder="Enter password"
                  required
                  className="w-full bg-transparent outline-none"
                />
                <div
                  className="cursor-pointer text-gray-600 ml-2"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm text-red-500 hover:underline mt-1 inline-block"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white rounded px-6 py-2 w-full max-w-[150px] mt-3 transition-transform transform hover:scale-105"
            >
              Login
            </button>
          </form>

          {/* Sign-up Link */}
          <p className="mt-4 text-gray-600">
            Don't have an account?{' '}
            <Link to="/sign-up" className="text-red-600 hover:underline">
              Sign-up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
