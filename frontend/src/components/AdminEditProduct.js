// frontend/src/components/AdminEditProduct.js
import React, { useState } from 'react';
import productCategory from '../helpers/productCategory';
import { MdDriveFolderUpload, MdDelete } from "react-icons/md";
import uploadImage from '../helpers/uploadImage';
import DispImage from './DispImage';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const AdminEditProduct = ({ onClose, productData, fetchdata }) => {
    const [data, setData] = useState({
        ...productData,
        productName: productData?.productName || "",
        brandName: productData?.brandName || "",
        category: productData?.category || "",
        productImage: productData?.productImage || [],
        description: productData?.description || "",
        price: productData?.price || "",
        selling: productData?.selling || "",
        quantity: productData?.quantity || "",
    });

    const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
    const [fullScreenImage, setFullScreenImage] = useState("");

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUploadProduct = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const uploadImageCloudinary = await uploadImage(file);
            setData((prev) => ({
                ...prev,
                productImage: [...prev.productImage, uploadImageCloudinary.url],
            }));
        }
    };

    const handleDeleteProductImage = (index) => {
        const newProductImage = [...data.productImage];
        newProductImage.splice(index, 1);

        setData((prev) => ({
            ...prev,
            productImage: newProductImage,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!data.quantity) {
            toast.error("Please enter a quantity");
            return;
        }

        const response = await fetch(SummaryApi.updateProduct.url, {
            method: SummaryApi.updateProduct.method,
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();
        if (responseData.success) {
            toast.success(responseData.message);
            onClose();
            fetchdata();
        } else {
            toast.error(responseData.message);
        }
    };

    return (
        <div className='fixed bottom-0 top-0 right-0 left-0 bg-slate-200 flex justify-center items-center'>
            <div className='fixed bg-slate-200 w-full bg-opacity-35 h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
                <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] border-2 border-slate-500 overflow-hidden'>
                    <div className='flex justify-between items-center'>
                        <h2 className='font-bold text-lg'>Edit Product</h2>
                        <div
                            className='border-2 border-green-600 text-2xl rounded-full px-2 hover:text-red-600 cursor-pointer'
                            onClick={onClose}
                        >
                            X
                        </div>
                    </div>
                    <form
                        className='grid p-4 gap-2 overflow-y-scroll h-full'
                        onSubmit={handleSubmit}
                    >
                        <label htmlFor='productName'>Product Name:</label>
                        <input
                            required
                            name='productName'
                            className='p-2 bg-slate-100 border-2 rounded'
                            type='text'
                            id='productName'
                            placeholder='Enter Product Name'
                            value={data.productName}
                            onChange={handleOnChange}
                        />

                        <label htmlFor='brandName'>Brand Name:</label>
                        <input
                            required
                            name='brandName'
                            className='p-2 bg-slate-100 border-2 rounded'
                            type='text'
                            id='brandName'
                            placeholder='Enter Brand Name'
                            value={data.brandName}
                            onChange={handleOnChange}
                        />

                        <label htmlFor='category'>Category:</label>
                        <select
                            required
                            name='category'
                            value={data.category}
                            className='p-2 bg-slate-100 border-2 rounded'
                            onChange={handleOnChange}
                        >
                            <option value=''></option>
                            {productCategory.map((el, index) => (
                                <option value={el.value} key={el.value + index}>
                                    {el.label}
                                </option>
                            ))}
                        </select>

                        <label htmlFor='productImage'>Product Image:</label>
                        <label htmlFor='uploadImageInput'>
                            <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center'>
                                <div className='flex justify-center items-center text-slate-400 flex-col hover:cursor-pointer'>
                                    <MdDriveFolderUpload className='text-5xl' />
                                    <p className='text-sm'>Upload the Image</p>
                                    <input
                                        type='file'
                                        id='uploadImageInput'
                                        hidden
                                        onChange={handleUploadProduct}
                                    />
                                </div>
                            </div>
                        </label>
                        <div>
                            {data.productImage.length > 0 ? (
                                <div className='flex items-center gap-2'>
                                    {data.productImage.map((el, index) => (
                                        <div className='relative group' key={index}>
                                            <img
                                                src={el}
                                                alt={`Product Image ${index}`}
                                                width={180}
                                                height={200}
                                                className='bg-slate-100 cursor-pointer'
                                                onClick={() => {
                                                    setOpenFullScreenImage(true);
                                                    setFullScreenImage(el);
                                                }}
                                            />
                                            <MdDelete
                                                className='absolute bottom-0 right-0 text-white bg-red-600 text-2xl p-1 rounded-full hover:cursor-pointer'
                                                onClick={() => handleDeleteProductImage(index)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className='text-red-600 text-xs'>
                                    * Please Upload Product Image
                                </p>
                            )}
                        </div>

                        <label htmlFor='price' className='mt-3'>
                            Price:
                        </label>
                        <input
                            required
                            name='price'
                            className='p-2 bg-slate-100 border-2 rounded'
                            type='number'
                            id='price'
                            placeholder='Enter The Price'
                            value={data.price}
                            onChange={handleOnChange}
                        />

                        <label htmlFor='selling' className='mt-3'>
                            Selling Price:
                        </label>
                        <input
                            required
                            name='selling'
                            className='p-2 bg-slate-100 border-2 rounded'
                            type='number'
                            id='selling'
                            placeholder='Enter The Selling Price'
                            value={data.selling}
                            onChange={handleOnChange}
                        />

                        <label htmlFor='description' className='mt-3'>
                            Description:
                        </label>
                        <textarea
                            required
                            className='h-28 bg-slate-100 border-2 rounded resize-none p-1'
                            placeholder='Enter the Product Description'
                            rows={4}
                            onChange={handleOnChange}
                            name='description'
                            value={data.description}
                            id='description'
                        ></textarea>

                        <label htmlFor='quantity' className='mt-3'>
                            Quantity:
                        </label>
                        <input
                            required
                            name='quantity'
                            className='p-2 bg-slate-100 border-2 rounded'
                            type='text'
                            id='quantity'
                            placeholder='Enter Quantity (e.g., 500g, 1kg)'
                            value={data.quantity}
                            onChange={handleOnChange}
                        />

                        <button
                            type='submit'
                            className='px-3 py-2 bg-green-600 rounded mx-4 my-6 hover:bg-green-800'
                        >
                            Change Product Details
                        </button>
                    </form>
                </div>
                {openFullScreenImage && (
                    <DispImage
                        onClose={() => setOpenFullScreenImage(false)}
                        imageUrl={fullScreenImage}
                    />
                )}
            </div>
        </div>
    );
};

export default AdminEditProduct;
