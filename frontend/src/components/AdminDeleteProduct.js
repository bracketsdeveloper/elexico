import React, { useState } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const AdminDeleteProduct = ({ onClose, productData, fetchdata }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const response = await fetch(SummaryApi.deleteProduct.url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId: productData._id }),
            });

            const responseData = await response.json();
            if (responseData.success) {
                toast.success(responseData.message);
                fetchdata(); // Refresh the product list after deletion
                onClose(); // Close the modal after deletion
            } else {
                toast.error(responseData.message);
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error('Failed to delete product.');
        }
        setIsDeleting(false);
    };

    return (
        <div className="fixed bottom-0 top-0 right-0 left-0 bg-slate-200 flex justify-center items-center">
            <div className="fixed bg-slate-200 w-full bg-opacity-35 h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                <div className="bg-white p-4 rounded w-full max-w-md border-2 border-slate-500">
                    <div className="flex justify-between items-center">
                        <h2 className="font-bold text-lg">Delete Product</h2>
                        <div
                            className="border-2 border-red-600 text-2xl rounded-full px-2 hover:text-red-600 cursor-pointer"
                            onClick={onClose}
                        >
                            X
                        </div>
                    </div>
                    <div className="mt-4">
                        <p>Are you sure you want to delete the product "<strong>{productData.productName}</strong>"?</p>
                        <div className="flex justify-end space-x-4 mt-4">
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800"
                                onClick={handleDelete}
                                disabled={isDeleting}
                            >
                                {isDeleting ? 'Deleting...' : 'Yes, Delete'}
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                onClick={onClose}
                                disabled={isDeleting}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDeleteProduct;
