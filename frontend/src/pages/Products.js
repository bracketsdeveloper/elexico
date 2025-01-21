import React, { useEffect, useState } from 'react';
import UploadProduct from '../components/UploadProduct';
import SummaryApi from '../common';
import AdminProductCard from '../components/AdminProductCard';
import productCategory from '../helpers/productCategory'; // Import product categories

const Products = () => {
  const [openUploadProduct, setopenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); // For category filter
  const [searchTerm, setSearchTerm] = useState(''); // For search input

  // Fetch all products from API
  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response.json();
    setAllProduct(dataResponse?.data || []);
  };

  // Use effect to fetch products on component load
  useEffect(() => {
    fetchAllProduct();
  }, []);

  // Use effect to filter products based on search and category
  useEffect(() => {
  let filtered = allProduct;

  // Filter by category
  if (selectedCategory) {
    filtered = filtered.filter(product => product.category === selectedCategory);
  }

  // Filter by search term (safely handling undefined name)
  if (searchTerm) {
    filtered = filtered.filter(product => {
      const productName = product.name ? product.name.toLowerCase() : '';
      return productName.includes(searchTerm.toLowerCase());
    });
  }

  setFilteredProducts(filtered);
}, [selectedCategory, searchTerm, allProduct]);


  return (
    <div className='p-4'>
      {/* Header with Upload button */}
      <div className='bg-white py-2 px-4 flex justify-between items-center text-center'>
        <h2 className='font-bold text-lg'>All Products</h2>
        <button 
          className='border-2 border-green-600 rounded-full p-2 transition-all hover:bg-green-600' 
          onClick={() => setopenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      {/* Filters */}
      <div className='flex flex-col md:flex-row md:justify-between gap-4 py-4'>
        {/* Category Filter */}
        <select
          className='border p-2 rounded-md'
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value=''>All Categories</option>
          {productCategory.map(category => (
            <option key={category.id} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>

        {/* Search Input */}
        
      </div>

      {/* Products List */}
      <div className='flex flex-col md:flex-row md:flex-wrap gap-5 py-4 overflow-y-scroll'>
        {filteredProducts.map((product, index) => (
          <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4' key={index + "filteredProducts"}>
            <AdminProductCard data={product} fetchdata={fetchAllProduct} />
          </div>
        ))}
      </div>

      {/* Upload Product Modal */}
      {openUploadProduct && (
        <UploadProduct onClose={() => setopenUploadProduct(false)} fetchData={fetchAllProduct} />
      )}
    </div>
  );
};

export default Products;
