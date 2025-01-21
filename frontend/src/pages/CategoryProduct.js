import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import productCategory from '../helpers/productCategory';
import VerticalProductCard from '../components/VerticalProductCard';
import SummaryApi from '../common';
import displayINRCurrency from '../helpers/displayCurrency';
import addToCart from '../helpers/addToCart';
import { useSelector } from 'react-redux';
import Context from '../context';
import { toast } from 'react-toastify';

const CategoryProduct = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListArray = urlSearch.getAll("category");

  const urlCategoryListObject = {};
  urlCategoryListArray.forEach(el => {
    urlCategoryListObject[el] = true;
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState(urlCategoryListArray);

  const { fetchUserAddToCart, setCartProductCount } = useContext(Context);
  const user = useSelector((state) => state?.user?.user);  // Get user info from Redux store

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.filterProduct.url, {
        method: SummaryApi.filterProduct.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: filterCategoryList,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const dataResponse = await response.json();
      setData(dataResponse?.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target;
    setSelectCategory(prev => ({
      ...prev,
      [value]: checked,
    }));
  };

  const handleAddToCart = async (e, productId) => {
    e.preventDefault();

    if (user?._id) {
      // User is logged in, add to cart via API
      try {
        const response = await fetch(SummaryApi.addToCart.url, {
          method: SummaryApi.addToCart.method,
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId }),
        });

        const data = await response.json();
        if (data.success) {
          toast.success('Product added to cart');
          fetchUserAddToCart();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error('Error adding product to cart');
        console.error('Error:', error);
      }
    } else {
      // User is not logged in, add to localStorage
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const existingItem = cartItems.find((item) => item.productId === productId);

      if (existingItem) {
        toast.error('Already exists in Cart');
        return;
      }

      cartItems.push({ productId, quantity: 1 });
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      setCartProductCount(cartItems.length);  // Update cart count
      toast.success('Product added to cart');
    }
  };

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).filter(categoryKeyName => selectCategory[categoryKeyName]);
    setFilterCategoryList(arrayOfCategory);

    // Update URL
    const searchParams = new URLSearchParams();
    arrayOfCategory.forEach(category => searchParams.append('category', category)); // Ensure 'category' matches backend
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  }, [selectCategory, navigate, location.pathname]);

  useEffect(() => {
    if (filterCategoryList.length > 0) {
      fetchData();
    } else {
      setData([]); // Reset data if no categories are selected
    }
  }, [filterCategoryList]);

  return (
    <div className="container mx-auto px-4 py-8 my-6 bg-green-50 rounded-lg shadow-md">
      {/* desktop version */}
      <div className="lg:grid grid-cols-[200px,1fr] gap-8 mb-5 w-full">
        {/* left side - Filters */}
        <div className="bg-white hidden md:block p-4 min-h-[calc(100vh-150px)] rounded-lg shadow-md border border-green-200">
          <div>
            <h3 className="uppercase font-medium text-green-700 border-b border-green-300 pb-2 text-lg">Sort by</h3>
            <form className="text-sm flex flex-col gap-2 py-4">
              <div className="flex items-center gap-3">
                <input type="radio" name="sort" id="price-low-high" />
                <label htmlFor="price-low-high">Price - Low to High</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="radio" name="sort" id="price-high-low" />
                <label htmlFor="price-high-low">Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* filter */}
          <div>
            <h3 className="uppercase font-medium text-green-700 border-b border-green-300 pb-2 text-lg">Category</h3>
            <form className="text-sm flex flex-col gap-2 py-4">
              {productCategory.map((category, index) => (
                <div className="flex items-center gap-3" key={category.value}>
                  <input
                    type="checkbox"
                    name="category"
                    checked={selectCategory[category.value] || false}
                    id={category.value}
                    value={category.value}
                    onChange={handleSelectCategory}
                  />
                  <label htmlFor={category.value}>{category.label}</label>
                </div>
              ))}
            </form>
          </div>
        </div>

        {/* right side - Product Cards */}
        <div className="w-full mb-5">
          {loading && (
            <div className="grid grid-cols-1 h-full gap-4 my-10 mx-3">
              {Array(1).fill(0).map((_, idx) => (
                <div key={idx} className="p-4 border rounded shadow-lg bg-white animate-pulse">
                  <div className="h-48 bg-gray-300 rounded mb-4"></div>
                  <div className="h-10 bg-gray-300 rounded mb-2"></div>
                  <div className="h-10 bg-gray-300 rounded mb-2"></div>
                  <div className="h-10 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          )}
          {!loading && data.length === 0 && <p className="text-center text-green-600">No products found.</p>}
          {data.length > 0 && !loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data.map((product, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden p-4">
                  <div className="h-48 w-full flex items-center justify-center">
                    <img
                      src={product.productImage[0]}
                      alt={product.productName}
                      className="h-full w-auto object-contain"
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-green-900 font-semibold text-lg truncate">{product.productName}</h3>
                    <p className="text-green-600">{product.category}</p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-red-600 font-semibold">{displayINRCurrency(product.selling)}</p>
                      <p className="text-gray-500 line-through">{displayINRCurrency(product.price) }</p>
                    </div>
                    <button
                      className="text-sm bg-green-600 py-1 text-white rounded-full hover:bg-green-700 mt-3"
                      onClick={(e) => handleAddToCart(e, product?._id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
