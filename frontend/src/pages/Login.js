// frontend/src/components/MultiStepLogin.js
import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const MultiStepLogin = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Go to next step
  const nextStep = () => {
    if (step === 1 && !formData.email) {
      toast.error('Please enter your email.');
      return;
    }
    if (step === 2 && !formData.password) {
      toast.error('Please enter your password.');
      return;
    }
    setStep(step + 1);
  };

  // Go to previous step
  const prevStep = () => {
    setStep(step - 1);
  };

  // Toggle password visibility
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
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
          body: JSON.stringify({
            productId: item.productId,
            quantity: item.quantity,
          }),
        });

        const data = await response.json();
        if (!data.success) {
          console.error(
            `Failed to add product ${item.productId} to cart: ${data.message}`
          );
        }
      } catch (error) {
        console.error(
          `Error adding product ${item.productId} to cart: ${error.message}`
        );
      }
    }
    // Clear local cart after merging
    localStorage.removeItem('cartItems');
  };

  // Submit login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(SummaryApi.signIn.url, {
        method: SummaryApi.signIn.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(
          responseData.message || `HTTP error! status: ${response.status}`
        );
      }

      if (responseData.success) {
        toast.success(responseData.message);
        await mergeCarts();
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

  // Renders the content of each step
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <label className="block text-lg font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 mb-2 rounded text-black outline-none"
              style={{ backgroundColor: '#f4f4f4' }}
            />
          </div>
        );
      case 2:
        return (
          <div>
            <label
              className="block text-lg font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative mb-2">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 pr-10 rounded text-black outline-none"
                style={{ backgroundColor: '#f4f4f4' }}
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-2 top-2 text-black cursor-pointer"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-gray-300 hover:text-white"
            >
              Forgot password?
            </Link>
          </div>
        );
      case 3:
        // Optional final review step
        return (
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">Confirm Details</h2>
            <p className="mb-2">
              <strong>Email:</strong> {formData.email}
            </p>
            <p className="mb-2">
              <strong>Password:</strong>{' '}
              {formData.password
                ? '*'.repeat(formData.password.length)
                : '(not set)'}
            </p>
            <p className="text-sm text-gray-200 mt-2">
              Click <strong>Login</strong> to proceed
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-black text-white rounded shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleLogin}>
          {/* Step Content */}
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            {step > 1 && step < 4 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
              >
                Back
              </button>
            )}
            {step < 3 && (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto px-4 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200 transition"
              >
                Next
              </button>
            )}
            {step === 3 && (
              <button
                type="submit"
                className="ml-auto px-4 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200 transition"
              >
                Login
              </button>
            )}
          </div>
        </form>

        {/* Sign-up Link */}
        <p className="mt-6 text-center">
          Don&apos;t have an account?{' '}
          <Link
            to="/sign-up"
            className="text-white font-semibold hover:text-gray-200"
          >
            Sign-up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default MultiStepLogin;