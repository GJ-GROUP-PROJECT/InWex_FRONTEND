import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from "../../components/ProductCard";

const InventoryPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');

                // Debug logging
                console.log('=== InventoryPage Debug ===');
                console.log('Token from localStorage:', token);
                console.log('Token exists:', !!token);
                console.log('Token type:', typeof token);
                console.log('Token length:', token?.length);

                if (!token) {
                    setError('No authentication token found. Please login again.');
                    setLoading(false);
                    return;
                }

                console.log('Making request with headers:', {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${token}`
                });

                const response = await axios.get('/api/products/get-products', {
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": `Bearer ${token}`
                    },
                });

                // Debug logging
                console.log('Full response:', response);
                console.log('Response data:', response.data);
                console.log('Is response.data an array?', Array.isArray(response.data));

                // Handle different response structures
                let productsData;
                if (Array.isArray(response.data)) {
                    productsData = response.data;
                } else if (response.data && Array.isArray(response.data.products)) {
                    productsData = response.data.products;
                } else if (response.data && Array.isArray(response.data.data)) {
                    productsData = response.data.data;
                } else {
                    console.error('Unexpected response structure:', response.data);
                    productsData = [];
                }

                setProducts(productsData);
                setError(null);
            } catch (err) {
                console.error('=== Error Details ===');
                console.error('Full Error:', err);
                console.error('Status:', err.response?.status);
                console.error('Status Text:', err.response?.statusText);
                console.error('Response Data:', err.response?.data);
                console.error('Request Headers:', err.config?.headers);
                console.error('Request URL:', err.config?.url);

                if (err.response?.status === 401) {
                    console.error('Authentication failed - token might be invalid or expired');
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    setError('Session expired. Please login again.');
                    // You might want to redirect to login here
                    // window.location.href = '/login';
                } else {
                    setError('Failed to load products');
                }
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="p-6 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-gray-600">Loading products...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <div className="text-red-500 text-xl mb-2">⚠️</div>
                            <p className="text-red-600">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Retry
                            </button>
                            {error.includes('login') && (
                                <button
                                    onClick={() => window.location.href = '/login'}
                                    className="mt-2 ml-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                                >
                                    Go to Login
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Additional safety check
    const safeProducts = Array.isArray(products) ? products : [];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Product Inventory</h1>
                    <div className="text-sm text-gray-500">
                        {safeProducts.length} product{safeProducts.length !== 1 ? 's' : ''} found
                    </div>
                </div>

                {safeProducts.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">📦</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                        <p className="text-gray-500">Start by adding some products to your inventory.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {safeProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default InventoryPage;