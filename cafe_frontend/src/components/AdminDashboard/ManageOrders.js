// src/components/AdminDashboard/ManageOrders.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageOrders = ({ token }) => {
    const [orders, setOrders] = useState([]);
    const [orderEditMode, setOrderEditMode] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        fetchOrders();
    }, [token]);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/orders/admin/all', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setOrders(response.data);

            // Initialize edit mode: if an order is pending, default edit mode is true; otherwise false.
            const initialEditMode = {};
            response.data.forEach(order => {
                initialEditMode[order.id] = (order.status === 'PENDING');
            });
            setOrderEditMode(initialEditMode);
        } catch (err) {
            setError('Error fetching orders');
            console.error(err);
        }
    };

    const handleUpdateOrderStatus = async (orderId, newStatus) => {
        try {
            await axios.put(
                `http://localhost:8081/api/orders/admin/update/${orderId}`,
                { status: newStatus },
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            // After updating, set edit mode to false so that only the Edit button shows.
            setOrderEditMode(prev => ({ ...prev, [orderId]: false }));
            fetchOrders();
        } catch (err) {
            setError('Error updating order status');
            console.error(err);
        }
    };

    const handleEdit = (orderId) => {
        // Switch the order row back to "edit mode" so admin can see the Complete/Cancel buttons again.
        setOrderEditMode(prev => ({ ...prev, [orderId]: true }));
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-2">Manage Orders</h2>
            {error && <div className="text-red-500">{error}</div>}
            <table className="min-w-full border">
                <thead>
                <tr className="bg-gray-200">
                    <th className="p-2 border">Order ID</th>
                    <th className="p-2 border">User</th>
                    <th className="p-2 border">Total Amount</th>
                    <th className="p-2 border">Status</th>
                    <th className="p-2 border">Item Names</th>
                    <th className="p-2 border">Actions</th>
                </tr>
                </thead>
                <tbody>
                {orders.map(order => {
                    // Combine item names from order.items. Adjust according to your data structure.
                    const itemNames = order.items
                        ? order.items.map(item => item.menuItem?.name).join(', ')
                        : '';
                    return (
                        <tr key={order.id}>
                            <td className="p-2 border">{order.id}</td>
                            <td className="p-2 border">{order.user?.username}</td>
                            <td className="p-2 border">${order.totalAmount}</td>
                            <td className="p-2 border">{order.status}</td>
                            <td className="p-2 border">{itemNames}</td>
                            <td className="p-2 border">
                                {orderEditMode[order.id] ? (
                                    <>
                                        <button
                                            onClick={() => handleUpdateOrderStatus(order.id, 'COMPLETED')}
                                            className="px-2 py-1 bg-green-500 text-white rounded mr-2"
                                        >
                                            Complete
                                        </button>
                                        <button
                                            onClick={() => handleUpdateOrderStatus(order.id, 'CANCELED')}
                                            className="px-2 py-1 bg-red-500 text-white rounded"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => handleEdit(order.id)}
                                        className="px-2 py-1 bg-yellow-500 text-white rounded"
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
