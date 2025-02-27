import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'react-feather'; // For theme toggle
import ManageMenu from './ManageMenu';
import ManageOrders from './ManageOrders';
import ViewUsers from './ViewUsers';
import ManageFeedback from './ManageFeedback';
import SentimentAnalysisPage from "./SentimentAnalysisPage";
import BestSellingProducts from "./BestSellingProducts";
import { useNavigate } from 'react-router-dom';

const AdminDashboard = ({ token }) => {
    const [activeTab, setActiveTab] = useState('menu');
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const navigate = useNavigate();

    // Dark mode management
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--primary-bg', theme === 'light' ? '#f8f9fa' : '#1a1a1a');
        root.style.setProperty('--primary-text', theme === 'light' ? '#212529' : '#e9ecef');
        root.style.setProperty('--accent-color', '#3B82F6');
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-[var(--primary-bg)] text-[var(--primary-text)] transition-all duration-300">
            {/* Sidebar */}
            <aside className="fixed top-0 left-0 z-50 w-80 h-screen bg-[var(--primary-bg)] shadow-xl pt-6 pb-4">
                <div className="px-4 mb-6 flex items-center justify-between">
                    {/*<img src="/logo.png" alt="Admin Logo" className="h-12 w-auto" />*/}
                    <h2 className="text-[var(--primary-text)] text-2xl mb-4">Admin Dashboard</h2>
                    <button onClick={toggleTheme} className="p-2 rounded-full hover:[var(--primary-bg)]">
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                    <button
                        onClick={handleLogout}
                        className="p-2 rounded-full hover:bg-red-600 text-red-500 hover:text-white transition"
                    >Logout</button>
                </div>

                <nav className="space-y-2 px-4">
                    <button
                        onClick={() => setActiveTab('menu')}
                        className={`flex items-center p-3 rounded-lg ${activeTab === 'menu' ? 'bg-[var(--accent-color)] text-white' : 'hover:bg-[var(--primary-bg)]'}`}
                    >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Menu Items
                    </button>

                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`flex items-center p-3 rounded-lg ${activeTab === 'orders' ? 'bg-[var(--accent-color)] text-white' : 'hover:bg-[var(--primary-bg)]'}`}
                    >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.41.771A24.972 24.972 0 0114.354 1M21 12a9 9 0 11-18 0 9 9 0 0118 0zM3 3h.001M21 3h-.001M3 3C2.447 3 2 3.448 2 4v14c0 .552.447 1 1 1h18c.553 0 1-.448 1-1V4c0-.552-.447-1-1-1h-.001z" />
                        </svg>
                        Orders
                    </button>

                    <button
                        onClick={() => setActiveTab('users')}
                        className={`flex items-center p-3 rounded-lg ${activeTab === 'users' ? 'bg-[var(--accent-color)] text-white' : 'hover:bg-[var(--primary-bg)]'}`}
                    >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-3 9 9 0 01-3 12 9 9 0 019 3h3V21z" />
                        </svg>
                        Users
                    </button>

                    <button
                        onClick={() => setActiveTab('feedback')}
                        className={`flex items-center p-3 rounded-lg ${activeTab === 'feedback' ? 'bg-[var(--accent-color)] text-white' : 'hover:bg-[var(--primary-bg)]'}`}
                    >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-5 0a5 5 0 1110 0 5 5 0 01-10 0z" />
                        </svg>
                        Feedback
                    </button>
                    <button
                        onClick={() => setActiveTab('sentiment')}
                        className={`flex items-center p-3 rounded-lg ${activeTab === 'sentiment' ? 'bg-[var(--accent-color)] text-white' : 'hover:bg-[var(--primary-bg)]'}`}
                    >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-5 0a5 5 0 1110 0 5 5 0 01-10 0z" />
                        </svg>
                        Sentiment Analysis
                    </button>
                    <button
                        onClick={() => setActiveTab('bestselling')}
                        className={`flex items-center p-3 rounded-lg ${activeTab === 'bestselling' ? 'bg-[var(--accent-color)] text-white' : 'hover:bg-[var(--primary-bg)]'}`}
                    >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-5 0a5 5 0 1110 0 5 5 0 01-10 0z" />
                        </svg>
                        Best Selling Products Analysis
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="ml-64 px-8 py-10">

                <div className="p-6 bg-[var(--primary-bg)] rounded-2xl shadow-lg">
                    {/*<h1 className="text-2xl font-bold mb-4">Dashboard</h1>*/}
                    {activeTab === 'menu' && <ManageMenu token={token} />}
                    {activeTab === 'orders' && <ManageOrders token={token} />}
                    {activeTab === 'users' && <ViewUsers token={token} />}
                    {activeTab === 'feedback' && <ManageFeedback token={token} />}
                    {activeTab === 'sentiment' && <SentimentAnalysisPage token={token} />}
                    {activeTab === 'bestselling' && <BestSellingProducts token={token} />}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;