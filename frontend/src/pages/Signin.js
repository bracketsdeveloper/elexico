// frontend/src/components/Signin.js
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const statesInIndia = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "India"
    }
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('address.')) {
      const fieldName = name.split('.')[1];
      setData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [fieldName]: value
        }
      }));
    } else {
      setData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirm_password) {
      toast.error("Password and Confirm Password didn't match");
      return;
    }

    try {
      const response = await fetch(SummaryApi.signUp.url, {
        method: SummaryApi.signUp.method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          address: data.address
        })
      });

      const dataApi = await response.json();

      if (response.ok) {
        toast.success("User created successfully");
        navigate('/login');
      } else {
        toast.error(dataApi.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <section
      id="signup"
      className="min-h-screen bg-gray-900 flex items-center justify-center"
    >
      <div className="container max-w-md mx-auto px-4 py-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          {/* Heading */}
          <h2 className="text-2xl font-bold text-red-600 text-center mb-6">
            Sign Up
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Name
              </label>
              <div className="bg-gray-100 border border-gray-300 rounded p-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={data.name}
                  onChange={handleOnChange}
                  required
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Email
              </label>
              <div className="bg-gray-100 border border-gray-300 rounded p-2">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Password
              </label>
              <div className="bg-gray-100 border border-gray-300 rounded p-2 flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
                  value={data.password}
                  onChange={handleOnChange}
                  required
                  className="w-full bg-transparent outline-none"
                />
                <div
                  className="cursor-pointer text-gray-600 ml-2"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Confirm Password
              </label>
              <div className="bg-gray-100 border border-gray-300 rounded p-2 flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirm_password"
                  placeholder="Confirm Password"
                  value={data.confirm_password}
                  onChange={handleOnChange}
                  required
                  className="w-full bg-transparent outline-none"
                />
                <div
                  className="cursor-pointer text-gray-600 ml-2"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Street
              </label>
              <div className="bg-gray-100 border border-gray-300 rounded p-2">
                <input
                  type="text"
                  name="address.street"
                  placeholder="Enter your full Address"
                  value={data.address.street}
                  onChange={handleOnChange}
                  required
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                City
              </label>
              <div className="bg-gray-100 border border-gray-300 rounded p-2">
                <input
                  type="text"
                  name="address.city"
                  placeholder="Enter your city"
                  value={data.address.city}
                  onChange={handleOnChange}
                  required
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

            {/* State */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                State
              </label>
              <div className="bg-gray-100 border border-gray-300 rounded p-2">
                <select
                  name="address.state"
                  value={data.address.state}
                  onChange={handleOnChange}
                  required
                  className="w-full bg-transparent outline-none"
                >
                  <option value="">Select State</option>
                  {statesInIndia.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Postal Code */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Postal Code
              </label>
              <div className="bg-gray-100 border border-gray-300 rounded p-2">
                <input
                  type="text"
                  name="address.postalCode"
                  placeholder="Enter postal code"
                  value={data.address.postalCode}
                  onChange={handleOnChange}
                  required
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

            {/* Country */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Country
              </label>
              <div className="bg-gray-100 border border-gray-300 rounded p-2">
                <input
                  type="text"
                  value={data.address.country}
                  readOnly
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white rounded px-6 py-2 w-full max-w-[150px] mt-3 transition-transform transform hover:scale-105 mx-auto block"
            >
              Sign Up
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-4 text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-red-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signin;
