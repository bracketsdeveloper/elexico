// frontend/src/components/SearchProduct.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SummaryApi from '../common';
import VerticalProductCard from '../components/VerticalProductCard';

const SearchProduct = () => {
    const location = useLocation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const query = new URLSearchParams(location.search).get('q');
    console.log('Query:', query);

    const fetchProduct = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${SummaryApi.searchProduct.url}?q=${query}`);
            const dataResponse = await response.json();
            console.log('Response:', dataResponse);
            setData(dataResponse.data || []);
        } catch (error) {
            console.error('Error fetching products:', error);
            setData([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (query) {
            fetchProduct();
        }
    }, [query]);

    return (
        <div className="container mx-auto px-4 py-6 bg-gray-900 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-red-600 mb-6 text-center">Search Results</h2>
            {
                loading && (
                    <p className="text-lg text-center text-red-600">Loading...</p>
                )
            }
            <p className="text-red-500 mb-4 text-center">Search Results: {data.length}</p>
            {
                data.length === 0 && !loading && (
                    <p className="bg-gray-800 text-lg text-center text-red-500 p-4 border border-red-600 rounded-lg">
                        No Data Found...
                    </p>
                )
            }
            {
                data.length !== 0 && !loading && (
                    <VerticalProductCard loading={loading} data={data} />
                )
            }
        </div>
    );
};

export default SearchProduct;
