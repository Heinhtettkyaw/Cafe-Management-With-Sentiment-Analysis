import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

const BestSellingProducts = ({ token }) => {
    const [productData, setProductData] = useState([]);
    const [productCounts, setProductCounts] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    'http://localhost:8081/api/orders/best-selling-products',
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                const counts = response.data;
                setProductCounts(counts);
                setProductData(
                    Object.entries(counts).map(([product, value]) => ({
                        label: product,
                        value: value,
                    }))
                );
                setLoading(false);
            } catch (err) {
                setError('Failed to retrieve sales data');
                setLoading(false);
                console.error('Error fetching best-selling products:', err);
            }
        };

        fetchData();
    }, [token]);

    const data = {
        labels: productData.map((item) => item.label),
        datasets: [
            {
                data: productData.map((item) => item.value),
                backgroundColor: [
                    // 'var(--accent-color)',
                    '#FFA726',
                    '#FF6D00',
                    '#EF5350',
                    '#AB47BC',
                    '#5C6BC0',
                    '#29B6F6',
                    '#26A69A',
                ],
                hoverOffset: 8,
                borderWidth: 1,
                borderColor: '#fff',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    font: { size: 14 },
                    // color: 'var(--text-color)',
                },
            },
        },
        animation: { duration: 1000 },
    };

    return (
        <div className="container mx-auto p-8 max-w-4xl">
            {error && (
                <div className="bg-red-100 text-red-700 p-4 rounded mb-4 dark:bg-red-800 dark:text-red-300">
                    ❌ {error}
                </div>
            )}

            <h2 className="text-3xl font-bold mb-6 text-center text-[var(--primary-text)]">
                Best Selling Products
            </h2>

            {loading ? (
                <div className="flex justify-center items-center mt-12">
                    <svg className="animate-spin h-10 w-10 text-blue-500 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v1a7 7 0 00-7 7h1z"></path>
                    </svg>
                </div>
            ) : (
                <>
                    <div className="rounded-lg shadow-lg p-6 bg-[var(--primary-bg)] mb-8">
                        <Pie data={data} options={options} height={400} />
                    </div>

                    <div className="bg-[var(--primary-bg)] rounded-lg shadow p-6">
                        <h3 className="text-lg font-medium mb-4">Top Products by Sales</h3>
                        <table className="w-full">
                            <thead className="bg-[var(--primary-bg)]">
                            <tr>
                                <th className="px-4 py-2 text-left text-[var(--primary-text)]">Product</th>
                                <th className="px-4 py-2 text-left text-[var(--primary-text)]">Orders</th>
                            </tr>
                            </thead>
                            <tbody>
                            {productData.map((product) => (
                                <tr
                                    key={product.label}
                                    className="hover:bg-[var(--primary-bg)] transition"
                                >
                                    <td className="px-4 py-2">{product.label}</td>
                                    <td className="px-4 py-2 font-medium">
                                        {product.value} orders
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default BestSellingProducts;