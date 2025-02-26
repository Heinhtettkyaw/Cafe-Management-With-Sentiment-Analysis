// src/components/CustomerDashboard/ViewOrders.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewOrders = ({ token }) => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchOrders();
    }, [token]);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/orders/myorders', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setOrders(response.data);
        } catch (err) {
            setError('Error fetching your orders');
            console.error(err);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-2">My Orders</h2>
            {error && <div className="text-red-500">{error}</div>}
            <table className="min-w-full border">
                <thead>
                <tr className="text-[var(--primary-text)]">
                    <th className="p-2 border">Order ID</th>
                    <th className="p-2 border">Total Amount</th>
                    <th className="p-2 border">Status</th>
                </tr>
                </thead>
                <tbody>
                {orders.map(order => (
                    <tr key={order.id}>
                        <td className="p-2 border">{order.id}</td>
                        <td className="p-2 border">${order.totalAmount}</td>
                        <td className="p-2 border">{order.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewOrders;
