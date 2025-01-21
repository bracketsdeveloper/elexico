import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { Link } from 'react-router-dom';

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const categoryLoading = new Array(5).fill(null);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.categoryProduct.url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const dataResponse = await response.json();
      setCategoryProduct(dataResponse.data || []);
    } catch (error) {
      console.error('Error fetching category products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className='container mx-auto my-2 shadow-sm  rounded-xl '>
      <h1 className='text-red-500 font-semibold text-2xl flex justify-center font-sans mb-2'>Categories</h1>
      <div className='flex items-center gap-4 justify-center overflow-scroll scrollbar-none'>
        {loading ? (
          categoryLoading.map((_, index) => (
            <div
              className='h-16 w-16 md:h-24 md:w-24 border border-red-600 rounded-lg overflow-hidden bg-sky-200 animate-pulse'
              key={"categoryLoading" + index}
            ></div>
          ))
        ) : (
          categoryProduct.map((product, index) => (
            <Link
              to={`/product-category/?category=${encodeURIComponent(product?.category)}`}
              className='cursor-pointer rounded-lg'
              key={product?.category + index}
            >
              <div className='w-16 h-16 md:w-24 md:h-24 overflow-hidden rounded-full bg-sky-200 flex items-center justify-center border border-green-600'>
                <img
                  src={product?.productImage[0]}
                  alt={product?.category}
                  className='object-cover mix-blend-multiply h-full scale-125 hover:scale-[260px] transition-all'
                />
              </div>
              <p className="text-center text-sm md:text-base capitalize truncate" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px' }}>
  {product?.category}
</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryList;
