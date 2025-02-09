// frontend/src/components/MultiStepSignup.js

import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import SummaryApi from "../common"; // your API endpoints
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const statesInIndia = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const MultiStepSignup = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "India",
    },
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const nextStep = () => {
    if (step === 1 && !formData.name) {
      toast.error("Name is required");
      return;
    }
    if (step === 2 && !formData.email) {
      toast.error("Email is required");
      return;
    }
    if (step === 3 && !formData.password) {
      toast.error("Password is required");
      return;
    }
    if (step === 4 && formData.password !== formData.confirm_password) {
      toast.error("Passwords do not match");
      return;
    }
    if (step === 5 && (!formData.address.street || !formData.address.city)) {
      toast.error("Address street and city are required");
      return;
    }
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      toast.error("Password and Confirm Password didn't match");
      return;
    }

    try {
      const response = await fetch(SummaryApi.signUp.url, {
        method: SummaryApi.signUp.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          address: formData.address,
        }),
      });

      const dataApi = await response.json();

      if (response.ok) {
        toast.success("User created successfully. Please verify your email.");
        navigate("/login");
      } else {
        toast.error(dataApi.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  // Each step's content
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <label className="block text-lg font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              className="border border-gray-300 rounded w-full p-2 bg-white text-black"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </div>
        );
      case 2:
        return (
          <div>
            <label className="block text-lg font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              className="border border-gray-300 rounded w-full p-2 bg-white text-black"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
        );
      case 3:
        return (
          <div>
            <label className="block text-lg font-semibold mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="border border-gray-300 rounded w-full p-2 pr-10 bg-white text-black"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
              />
              <span
                className="absolute right-2 top-2 cursor-pointer text-gray-700"
                onClick={togglePassword}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <label className="block text-lg font-semibold mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="confirm_password"
                className="border border-gray-300 rounded w-full p-2 pr-10 bg-white text-black"
                value={formData.confirm_password}
                onChange={handleChange}
                placeholder="Confirm password"
              />
              <span
                className="absolute right-2 top-2 cursor-pointer text-gray-700"
                onClick={togglePassword}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>
        );
      case 5:
        return (
          <div>
            <label className="block text-lg font-semibold mb-2">Street</label>
            <input
              type="text"
              name="address.street"
              className="border border-gray-300 rounded w-full p-2 mb-4 bg-white text-black"
              value={formData.address.street}
              onChange={handleChange}
              placeholder="Street address"
            />

            <label className="block text-lg font-semibold mb-2">City</label>
            <input
              type="text"
              name="address.city"
              className="border border-gray-300 rounded w-full p-2 bg-white text-black"
              value={formData.address.city}
              onChange={handleChange}
              placeholder="City"
            />
          </div>
        );
      case 6:
        return (
          <div>
            <label className="block text-lg font-semibold mb-2">State</label>
            <select
              name="address.state"
              className="border border-gray-300 rounded w-full p-2 mb-4 bg-white text-black"
              value={formData.address.state}
              onChange={handleChange}
            >
              <option value="">Select State</option>
              {statesInIndia.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>

            <label className="block text-lg font-semibold mb-2">
              Postal Code
            </label>
            <input
              type="text"
              name="address.postalCode"
              className="border border-gray-300 rounded w-full p-2 mb-4 bg-white text-black"
              value={formData.address.postalCode}
              onChange={handleChange}
              placeholder="Postal Code"
            />

            <label className="block text-lg font-semibold mb-2">Country</label>
            <input
              type="text"
              readOnly
              className="border border-gray-300 rounded w-full p-2 bg-white text-black"
              value={formData.address.country}
            />
          </div>
        );
      default:
        return (
          <div>
            <h2 className="text-xl font-semibold text-center">
              Review Your Details
            </h2>
            <ul className="list-disc ml-6 mt-4 text-base">
              <li>
                <strong>Name:</strong> {formData.name}
              </li>
              <li>
                <strong>Email:</strong> {formData.email}
              </li>
              <li>
                <strong>Street:</strong> {formData.address.street}
              </li>
              <li>
                <strong>City:</strong> {formData.address.city}
              </li>
              <li>
                <strong>State:</strong> {formData.address.state}
              </li>
              <li>
                <strong>Postal Code:</strong> {formData.address.postalCode}
              </li>
              <li>
                <strong>Country:</strong> {formData.address.country}
              </li>
            </ul>
            <p className="mt-4 text-center">
              If everything looks good, click <strong>Sign Up</strong>.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-black text-white rounded shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">Sign Up</h1>

        <form onSubmit={handleSubmit}>
          {/* Step Content */}
          <div className="mb-6">{renderStep()}</div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            {step > 1 && step < 8 && (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
              >
                <FaArrowLeft className="mr-2" />
                Prev
              </button>
            )}
            {step < 7 && (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto flex items-center px-4 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-transform"
              >
                Next
                <FaArrowRight className="ml-2" />
              </button>
            )}
            {step === 7 && (
              <button
                type="submit"
                className="ml-auto px-4 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-transform"
              >
                Sign Up
              </button>
            )}
          </div>
        </form>

        {/* Already have an account? */}
        <p className="mt-6 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-white font-semibold hover:text-gray-200"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default MultiStepSignup;
