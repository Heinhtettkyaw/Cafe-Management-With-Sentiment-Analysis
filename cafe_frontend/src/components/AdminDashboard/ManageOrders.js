import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageOrders = ({ token }) => {
    const [orders, setOrders] = useState([]);
    const [orderEditMode, setOrderEditMode] = useState({});
    const [error, setError] = useState('');

    // Define fetchOrders outside of useEffect so it can be reused.
    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/orders/admin/all', {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            setOrders(response.data);
            const initialEditMode = {};
            response.data.forEach(order => {
                initialEditMode[order.id] = order.status === 'PENDING';
            });
            setOrderEditMode(initialEditMode);
        } catch (err) {
            setError('Error fetching orders');
            console.error(err);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [token]);

    const handleUpdateOrderStatus = async (orderId, newStatus) => {
        try {
            await axios.put(
                `http://localhost:8081/api/orders/admin/update/${orderId}`,
                { status: newStatus },
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            setOrderEditMode(prev => ({ ...prev, [orderId]: false }));
            // Now fetchOrders is accessible here.
            fetchOrders();
        } catch (err) {
            setError('Error updating order status');
            console.error(err);
        }
    };

    return (
        <div className="bg-[var(--primary-bg)]  rounded-lg shadow-md p-6 mt-10">
            <h2 className="text-[var(--primary-text)] text-2xl mb-4">Manage Orders</h2>
            {error && (
                <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-4">
                    <p>{error}</p>
                </div>
            )}
            <table className="min-w-fullbg-[var(--primary-bg)]  divide-y">
                <thead>
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Items
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody className="bg-[var(--primary-bg)]  divide-y divide-gray-200 dark:divide-gray-700">
                {orders.map(order => {
                    const itemNames = order.items
                        ? order.items.map(item => item.menuItem?.name).join(', ')
                        : '';
                    return (
                        <tr key={order.id} className="hover:bg-[var(--primary-bg)] ">
                            <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{order.user?.username}</td>
                            <td className="px-6 py-4 whitespace-nowrap">${order.totalAmount}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                  <span
                      className={`px-2 py-1 rounded-full ${
                          order.status === 'COMPLETED'
                              ? 'bg-green-500 text-white'
                              : order.status === 'CANCELED'
                                  ? 'bg-red-500 text-white'
                                  : 'bg-yellow-500 text-white'
                      }`}
                  >
                    {order.status}
                  </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{itemNames}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {orderEditMode[order.id] ? (
                                    <>
                                        <button
                                            onClick={() => handleUpdateOrderStatus(order.id, 'COMPLETED')}
                                            className="px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                                        >
                                            Complete
                                        </button>
                                        <button
                                            onClick={() => handleUpdateOrderStatus(order.id, 'CANCELED')}
                                            className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() =>
                                            setOrderEditMode(prev => ({ ...prev, [order.id]: true }))
                                        }
                                        className="px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                                    >
                                        Edit
                                    </button>
                                )}
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default ManageOrders;
