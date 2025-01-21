import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { Link } from 'react-router-dom'

const CategoryList = () => {
    const [categoryProduct, setCategoryProduct] = useState([])
    const [loading, setLoading] = useState(false)
    const categoryLoading = new Array(13).fill(null)

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
        <div className='container mx-auto p-4 md:hidden'>
            <div className='flex flex-col gap-4'>
                {
                    loading ? (
                        categoryLoading.map((el, index) => (
                            <div className='w-full h-1/2 bg-white animate-pulse mb-4' key={"categoryLoading" + index} />
                        ))
                    ) : (
                        categoryProduct.map((product, index) => (
                            <Link to={"/product-category/?category=${encodeURIComponent(product?.category)}" + product?.category} className='w-full h-1/2 mb-4' key={product?.category + index}>
                                <div className='w-full h-full rounded overflow-hidden bg-white flex flex-col items-center justify-center border border-green-600'>
                                    <img src={product?.productImage[0]} alt={product?.category} className='w-full h-3/4 object-cover mix-blend-multiply' />
                                    <p className='text-center text-sm md:text-base capitalize w-full'>{product?.category}</p>
                                </div>
                            </Link>
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default CategoryList
