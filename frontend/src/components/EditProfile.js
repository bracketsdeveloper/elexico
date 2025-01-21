// src/components/EditProfile.js
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../api/SummaryApi'; // Adjust the import path as necessary

const EditProfile = ({ user, onCancel }) => {
    const [data, setData] = useState({ ...user });

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        // Handle address fields separately
        if (name.startsWith('address.')) {
            const fieldName = name.split('.')[1]; // Get the field name after 'address.'
            setData(prev => ({
                ...prev,
                address: {
                    ...prev.address,
                    [fieldName]: value
                }
            }));
        } else {
            setData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(SummaryApi.updateUser.url, {
                method: SummaryApi.updateUser.method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();

            if (response.ok) {
                toast.success("Profile updated successfully");
                onCancel(); // Close the edit form
            } else {
                toast.error(responseData.message || "Failed to update profile");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Edit Profile</h2>
                
                {/* Name Field */}
                <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={data.name}
                        onChange={handleOnChange}
                        required
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                </div>

                {/* Email Field */}
                <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={data.email}
                        onChange={handleOnChange}
                        required
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                </div>

                {/* Address Fields */}
                <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="street">
                        Street
                    </label>
                    <input
                        type="text"
                        id="street"
                        name="address.street"
                        value={data.address.street}
                        onChange={handleOnChange}
                        required
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="city">
                        City
                    </label>
                    <input
                        type="text"
                        id="city"
                        name="address.city"
                        value={data.address.city}
                        onChange={handleOnChange}
                        required
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="state">
                        State
                    </label>
                    <input
                        type="text"
                        id="state"
                        name="address.state"
                        value={data.address.state}
                        onChange={handleOnChange}
                        required
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="postalCode">
                        Postal Code
                    </label>
                    <input
                        type="text"
                        id="postalCode"
                        name="address.postalCode"
                        value={data.address.postalCode}
                        onChange={handleOnChange}
                        required
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="country">
                        Country
                    </label>
                    <input
                        type="text"
                        id="country"
                        name="address.country"
                        value={data.address.country}
                        readOnly
                        className="w-full px-4 py-2 bg-gray-700 text-gray-400 rounded-md cursor-not-allowed"
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-white text-gray-900 font-semibold rounded-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        Update Profile
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-2 bg-gray-700 text-white font-semibold rounded-md hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );

};

export default EditProfile;
