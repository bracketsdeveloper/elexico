import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const EditProfile = ({ user, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: {
            street: '',
            city: '',
            state: '',
            postalCode: '',
            country: '',
        }
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                address: { ...user.address },
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('address.')) {
            const addressField = name.split('.')[1];
            setFormData((prevData) => ({
                ...prevData,
                address: {
                    ...prevData.address,
                    [addressField]: value,
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData); // Call onUpdate with the formData
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border rounded w-full px-3 py-2"
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border rounded w-full px-3 py-2"
                />
            </div>
            <h3>Address:</h3>
            <div>
                <label>Street:</label>
                <input
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleChange}
                    required
                    className="border rounded w-full px-3 py-2"
                />
            </div>
            <div>
                <label>City:</label>
                <input
                    type="text"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleChange}
                    required
                    className="border rounded w-full px-3 py-2"
                />
            </div>
            <div>
                <label>State:</label>
                <input
                    type="text"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleChange}
                    required
                    className="border rounded w-full px-3 py-2"
                />
            </div>
            <div>
                <label>Postal Code:</label>
                <input
                    type="text"
                    name="address.postalCode"
                    value={formData.address.postalCode}
                    onChange={handleChange}
                    required
                    className="border rounded w-full px-3 py-2"
                />
            </div>
            <div>
                <label>Country:</label>
                <input
                    type="text"
                    name="address.country"
                    value={formData.address.country}
                    onChange={handleChange}
                    required
                    className="border rounded w-full px-3 py-2"
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update Profile</button>
        </form>
    );
};

export default EditProfile;
