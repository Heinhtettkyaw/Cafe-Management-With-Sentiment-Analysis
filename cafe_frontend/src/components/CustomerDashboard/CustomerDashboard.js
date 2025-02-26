// src/components/CustomerDashboard/CustomerDashboard.js
import React, { useState } from 'react';
import BrowseMenu from './BrowseMenu';
import PlaceOrder from './PlaceOrder';
import ViewOrders from './ViewOrders';
import Profile from "./Profile";
import SubmitFeedback from './SubmitFeedback';
import { useNavigate } from 'react-router-dom';

const CustomerDashboard = ({ token }) => {
    const [activeTab, setActiveTab] = useState('browse');
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear the token from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');

        // Redirect the user to the login page
        navigate('/');
    };

    const renderActiveTab = () => {
        switch (activeTab) {
            case 'browse':
                return <BrowseMenu token={token} />;
            case 'place':
                return <PlaceOrder token={token} />;
            case 'orders':
                return <ViewOrders token={token} />;
            case 'profile':
                return <Profile token={token}/>;
            case 'feedback':
                return <SubmitFeedback token={token} />;

            default:
                return <BrowseMenu token={token} />;
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Customer Dashboard</h1>
            <div className="mb-4">
                <button onClick={() => setActiveTab('browse')} className="mr-4 px-4 py-2 bg-blue-500 text-white rounded">Browse Menu</button>
                <button onClick={() => setActiveTab('place')} className="mr-4 px-4 py-2 bg-blue-500 text-white rounded">Place Order</button>
                <button onClick={() => setActiveTab('orders')} className="mr-4 px-4 py-2 bg-blue-500 text-white rounded">My Orders</button>
                <button onClick={() => setActiveTab('profile')} className="mr-4 px-4 py-2 bg-blue-500 text-white rounded">My profile</button>
                <button onClick={() => setActiveTab('feedback')} className="px-4 py-2 bg-yellow-500 text-white rounded">Submit Feedback</button>

            </div>

            <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded mt-4">
                Logout
            </button>

            <div>{renderActiveTab()}</div>
        </div>
    );
};

export default CustomerDashboard;
