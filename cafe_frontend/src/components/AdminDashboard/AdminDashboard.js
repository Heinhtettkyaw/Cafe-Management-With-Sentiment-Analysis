// src/components/AdminDashboard/AdminDashboard.js
import React, { useState } from 'react';
import ManageMenu from './ManageMenu';
import ManageOrders from './ManageOrders';
import ViewUsers from './ViewUsers';
import ManageFeedback from './ManageFeedback'; // Import ManageFeedback component
import { useNavigate } from 'react-router-dom';

const AdminDashboard = ({ token }) => {
    const [activeTab, setActiveTab] = useState('menu');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        navigate('/');
    };

    const renderActiveTab = () => {
        switch (activeTab) {
            case 'menu':
                return <ManageMenu token={token} />;
            case 'orders':
                return <ManageOrders token={token} />;
            case 'users':
                return <ViewUsers token={token} />;
            case 'feedback':
                return <ManageFeedback token={token} />;
            default:
                return <ManageMenu token={token} />;
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
            <div className="mb-4">
                <button onClick={() => setActiveTab('menu')} className="mr-4 px-4 py-2 bg-blue-500 text-white rounded">Menu Items</button>
                <button onClick={() => setActiveTab('orders')} className="mr-4 px-4 py-2 bg-blue-500 text-white rounded">Orders</button>
                <button onClick={() => setActiveTab('users')} className="mr-4 px-4 py-2 bg-blue-500 text-white rounded">Users</button>
                <button onClick={() => setActiveTab('feedback')} className="px-4 py-2 bg-yellow-500 text-white rounded">Customer Feedback</button>
            </div>

            <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded mt-4">
                Logout
            </button>

            <div>{renderActiveTab()}</div>
        </div>
    );
};

export default AdminDashboard;
