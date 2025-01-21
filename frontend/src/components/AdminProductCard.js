import React, { useState } from 'react';
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import AdminEditProduct from './AdminEditProduct';
import AdminDeleteProduct from './AdminDeleteProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import SummaryApi from '../common';

const AdminProductCard = ({ data, fetchdata }) => {
    const [editProduct, setEditProduct] = useState(false);
    const [deleteProduct, setDeleteProduct] = useState(false);

    // Function to handle product deletion
    const handleDeleteProduct = async () => {
        try {
            const response = await fetch(SummaryApi.deleteProduct.url, {
                method: SummaryApi.deleteProduct.method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ productId: data._id }),
            });
            const responseData = await response.json();

            if (responseData.success) {
                toast.success(responseData.message);
                fetchdata(); // Refresh product list after deletion
            } else {
                toast.error(responseData.message);
            }
        } catch (error) {
            toast.error("Failed to delete the product");
        }
        setDeleteProduct(false); // Close delete confirmation modal
    };

    return (
        <div className="bg-white p-4 rounded shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out">
            <div className="w-40">
                <div className="w-32 h-32 flex justify-center items-center">
                    <img
                        src={data.productImage[0] || '/default-image.png'}
                        alt={data.productName}
                        width={140}
                        height={140}
                        className="object-fill mx-auto h-full"
                    />
                </div>
                <h1 className="mt-2 font-semibold text-ellipsis line-clamp-2">{data.productName}</h1>
                <div>
                    <p className="font-semibold">{displayINRCurrency(data.selling)}</p>
                </div>
                <div className="flex space-x-4 mt-2">
                    {/* Edit Product Button */}
                    <div
                        className="p-2 bg-green-400 rounded-full text-white hover:bg-green-600 cursor-pointer"
                        onClick={() => setEditProduct(true)}
                    >
                        <FaRegEdit />
                    </div>

                    {/* Delete Product Button */}
                    <div
                        className="p-2 bg-red-500 rounded-full text-white hover:bg-red-700 cursor-pointer"
                        onClick={() => setDeleteProduct(true)}
                    >
                        <FaTrashAlt />
                    </div>
                </div>
            </div>

            {/* Edit Product Modal */}
            {editProduct && (
                <AdminEditProduct
                    productData={data}
                    onClose={() => setEditProduct(false)}
                    fetchdata={fetchdata}
                />
            )}

            {/* Delete Product Confirmation Modal */}
            {deleteProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-lg font-bold">Delete Product</h2>
                        <p>Are you sure you want to delete this product?</p>
                        <div className="flex justify-end space-x-4 mt-4">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                onClick={() => setDeleteProduct(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                onClick={handleDeleteProduct}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProductCard;
