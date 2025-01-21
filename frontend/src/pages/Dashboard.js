import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import EditProfile from './EditProfile'; // Import the EditProfile component

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await fetch(SummaryApi.current_user.url, {
                    method: SummaryApi.current_user.method,
                    credentials: 'include', // Include cookies if required for authentication
                });

                const data = await response.json();

                if (data.success) {
                    setUser(data.data); // Set user data
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                console.error("Error fetching current user details:", error);
                toast.error('Failed to fetch user details');
            }
        };

        fetchCurrentUser();
    }, []);

    const handleUpdateUser = async (updatedUser) => {
        try {
            const response = await fetch(SummaryApi.updateUser.url, {
                method: SummaryApi.updateUser.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(updatedUser),
            });

            const data = await response.json();

            if (data.success) {
                setUser(updatedUser); // Update user state with the new values
                toast.success(data.message);
                setIsEditing(false); // Close the edit form
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error updating user:", error);
            toast.error('Failed to update user');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">User Dashboard</h1>
            {isEditing ? (
                <EditProfile user={user} onUpdate={handleUpdateUser} /> // Pass user data and update function
            ) : (
                <div className="user-info bg-white shadow-md rounded-lg p-6">
                    {user && (
                        <>
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800">{user.name}</h2>
                            <p className="text-gray-600 mb-2"><strong>Email:</strong> {user.email}</p>
                            
                            {/* Check if user.address exists before rendering address fields */}
                            {user.address ? (
                                <>
                                    <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-2">Address:</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <p className="text-gray-600"><strong>Street:</strong> {user.address.street}</p>
                                        <p className="text-gray-600"><strong>City:</strong> {user.address.city}</p>
                                        <p className="text-gray-600"><strong>State:</strong> {user.address.state}</p>
                                        <p className="text-gray-600"><strong>Postal Code:</strong> {user.address.postalCode}</p>
                                        <p className="text-gray-600"><strong>Country:</strong> {user.address.country}</p>
                                    </div>
                                </>
                            ) : (
                                <p className="text-gray-600">Address information is not available.</p>
                            )}

                            <button 
                                onClick={() => setIsEditing(true)} 
                                className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition-all"
                            >
                                Edit Profile
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
