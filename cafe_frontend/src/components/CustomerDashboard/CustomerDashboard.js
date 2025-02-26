// src/components/CustomerDashboard/CustomerDashboard.js
import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'react-feather';
import BrowseMenu from './BrowseMenu';
import PlaceOrder from './PlaceOrder';
import ViewOrders from './ViewOrders';
import Profile from './Profile';
import SubmitFeedback from './SubmitFeedback';
import { useNavigate } from 'react-router-dom';

const CustomerDashboard = ({ token }) => {
    const [activeTab, setActiveTab] = useState('browse');
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const navigate = useNavigate();

    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--primary-bg', theme === 'light' ? '#f8f9fa' : '#1a1a1a');
        root.style.setProperty('--primary-text', theme === 'light' ? '#212529' : '#e9ecef');
        root.style.setProperty('--accent-color', '#3B82F6');
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-[var(--primary-bg)] text-[var(--primary-text)] transition-all duration-300">
            <header className="bg-[var(--primary-bg)] shadow-lg px-4 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Customer Dashboard</h1>
                    <div className="flex space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:[var(--primary-bg)]"
                        >
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">
                <nav className="mb-6">
                    <button
                        onClick={() => setActiveTab('browse')}
                        className={`py-2 px-4 mr-2 rounded-lg ${activeTab === 'browse' ? 'bg-[var(--accent-color)] text-white' : 'hover:[var(--primary-bg)]'}`}
                    >
                        Browse Menu
                    </button>
                    <button
                        onClick={() => setActiveTab('place')}
                        className={`py-2 px-4 mr-2 rounded-lg ${activeTab === 'place' ? 'bg-[var(--accent-color)] text-white' : 'hover:[var(--primary-bg)]'}`}
                    >
                        Place Order
                    </button>
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`py-2 px-4 mr-2 rounded-lg ${activeTab === 'orders' ? 'bg-[var(--accent-color)] text-white' : 'hover:[var(--primary-bg)]'}`}
                    >
                        My Orders
                    </button>
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`py-2 px-4 mr-2 rounded-lg ${activeTab === 'profile' ? 'bg-[var(--accent-color)] text-white' : 'hover:[var(--primary-bg)]0'}`}
                    >
                        My Profile
                    </button>
                    <button
                        onClick={() => setActiveTab('feedback')}
                        className={`py-2 px-4 mr-2 rounded-lg ${activeTab === 'feedback' ? 'bg-yellow-500 text-white' : 'hover:bg-yellow-300'}`}
                    >
                        Submit Feedback
                    </button>
                </nav>

                <div className="bg-[var(--primary-bg)] p-6 rounded-lg shadow">
                    {activeTab === 'browse' && <BrowseMenu token={token} />}
                    {activeTab === 'place' && <PlaceOrder token={token} />}
                    {activeTab === 'orders' && <ViewOrders token={token} />}
                    {activeTab === 'profile' && <Profile token={token} />}
                    {activeTab === 'feedback' && <SubmitFeedback token={token} />}
                </div>
            </main>
        </div>
    );
};

export default CustomerDashboard;