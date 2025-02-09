// frontend/src/components/ProductDetails.js
import React, { useContext, useEffect, useState } from 'react';
import { IoStarHalfOutline } from "react-icons/io5";
import { IoIosStar } from "react-icons/io";
import { useParams } from 'react-router-dom';
import SummaryApi from '../common';
import displayINRCurrency from '../helpers/displayCurrency';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDIsplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const ProductDetails = () => {
  const { fetchUserAddToCart } = useContext(Context);
  const user = useSelector((state) => state?.user?.user); // Check if logged in

  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    selling: "",
  });

  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");
  const params = useParams();

  const productImageListLoading = new Array(4).fill(null);

  // Fetch Product Details
  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.productdetails.url, {
        method: SummaryApi.productdetails.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ productId: params.id }),
      });

      const dataResponse = await response.json();
      setData(dataResponse.data);
      setActiveImage(dataResponse.data.productImage[0]);
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add to Cart (No login required)
  const handleAddToCart = async (e, productId) => {
    await addToCart(e, productId);
    fetchUserAddToCart();
  };

  // Buy (Login Required)
  const handleCheckout = () => {
    if (!user?._id) {
      toast.error("You must login to buy this product");
      return;
    }

    const message = `${data.productName} - ${displayINRCurrency(data.selling)}`;
    const url = `https://api.whatsapp.com/send?phone=918951936369&text=${encodeURIComponent(
      `Checkout details:\n${message}\nTotal Price: ${displayINRCurrency(data.selling)}`
    )}`;
    window.location.href = url;
  };

  useEffect(() => {
    fetchProductDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const handleMouseEnterProduct = (imgUrl) => {
    setActiveImage(imgUrl);
  };

  // Calculate discount percentage if applicable
  const discountPercentage =
    data.price && data.selling && data.price > data.selling
      ? Math.round(((data.price - data.selling) / data.price) * 100)
      : 0;

  return (
    <div className="mx-4 p-4 flex flex-col min-h-screen bg-gray-900 text-white">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-6 lg:gap-20">
        {/* Left: Product Images */}
        <div className="flex lg:flex-row flex-col">
          <div className="flex flex-col lg:flex-row-reverse gap-4 w-full">
            {/* Main Image */}
            <div className="relative h-[350px] sm:h-[400px] lg:h-96 w-full lg:w-96 p-3 bg-gray-800 rounded-xl shadow-lg">
              <img
                src={activeImage}
                className="h-full w-full object-cover rounded-md"
                alt="Product"
              />
            </div>

            {/* Thumbnails */}
            <div className="h-32 overflow-x-auto flex gap-4">
              {loading ? (
                <>
                  {productImageListLoading.map((_, index) => (
                    <div
                      key={index}
                      className="h-20 w-20 sm:h-24 sm:w-24 lg:h-32 lg:w-32 bg-gray-700 rounded animate-pulse"
                    ></div>
                  ))}
                </>
              ) : (
                <>
                  {data.productImage.map((imgUrl, index) => (
                    <div
                      key={imgUrl}
                      className="h-20 w-20 sm:h-24 sm:w-24 lg:h-32 lg:w-32 bg-gray-800 rounded p-1 border-2 border-red-500"
                    >
                      <img
                        src={imgUrl}
                        className="w-full h-full object-cover rounded cursor-pointer hover:border-white transition-all"
                        onMouseEnter={() => handleMouseEnterProduct(imgUrl)}
                        alt={`Thumbnail ${index + 1}`}
                      />
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right: Product Details */}
        {loading ? (
          <div className="grid gap-3 sm:gap-6">
            <div className="bg-gray-700 animate-pulse px-5 h-4 w-full rounded-full"></div>
            <div className="bg-gray-700 animate-pulse text-xl sm:text-2xl lg:text-4xl font-semibold h-6 rounded"></div>
            <div className="capitalize text-gray-400 bg-gray-700 animate-pulse min-w-[100px] h-6 rounded"></div>
            <div className="text-red-500 flex items-center gap-1 text-xl bg-gray-700 h-6 rounded animate-pulse"></div>
            <div className="flex items-center gap-2 text-xl sm:text-2xl font-medium bg-gray-700 h-6 rounded animate-pulse"></div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <div className="h-6 bg-gray-700 animate-pulse w-full sm:w-auto rounded"></div>
              <div className="h-6 bg-gray-700 animate-pulse w-full sm:w-auto rounded"></div>
            </div>
            <div>
              <div className="h-32 sm:h-52 bg-gray-700 animate-pulse w-full sm:w-96 rounded"></div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-5 px-2 sm:px-5">
            <p className="bg-red-500 text-white px-2 rounded-full inline-block w-fit">
              {data.brandName}
            </p>
            <h2 className="text-xl sm:text-2xl lg:text-4xl font-semibold text-white">
              {data.productName}
            </h2>
            <p className="capitalize text-gray-400">{data.category}</p>

            {/* Star Ratings (Static) */}
            <div className="text-yellow-400 flex items-center gap-1 text-xl">
              <IoIosStar />
              <IoIosStar />
              <IoIosStar />
              <IoIosStar />
              <IoStarHalfOutline />
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 text-xl sm:text-2xl font-medium">
              <p className="text-red-400">{displayINRCurrency(data.selling)}</p>
              <p className="text-gray-500 line-through">
                {displayINRCurrency(data.price)}
              </p>
            </div>
            {discountPercentage > 0 && (
              <p className="text-sm text-green-400">
                {discountPercentage}% off
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                className="border-2 border-red-500 rounded px-4 py-2 text-red-500 font-medium hover:bg-red-500 hover:text-white transition-colors"
                onClick={handleCheckout}
              >
                Buy
              </button>
              <button
                className="border-2 border-red-500 rounded px-4 py-2 bg-red-500 text-white font-medium hover:bg-transparent hover:text-red-500 transition-colors"
                onClick={(e) => handleAddToCart(e, data._id)}
              >
                Add To Cart
              </button>
            </div>

            {/* Description */}
            <div>
              <p className="text-gray-300 font-medium my-1">Description:</p>
              <p className="text-gray-200">{data.description}</p>
            </div>
          </div>
        )}
      </div>

      {/* Recommended Products */}
      {data.category && (
        <CategoryWiseProductDisplay
          category={data.category}
          heading={"Recommended for you"}
        />
      )}
    </div>
  );
};

export default ProductDetails;
