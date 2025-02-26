import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BrowseMenu = ({ token }) => {
    const [menuItems, setMenuItems] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchMenu();
    }, [token]);

    const fetchMenu = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/menu', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setMenuItems(response.data);
        } catch (err) {
            setError('Error fetching menu items');
            console.error(err);
        }
    };

    return (
        <div>
            {error && <div className="bg-red-100 text-red-800 p-4 rounded mb-4">{error}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems.map(item => (
                    <div
                        key={item.id}
                        className="bg-[var(--primary-bg)] rounded-lg shadow p-4 hover:bg-[var(--primary-bg)] transition"
                    >
                        <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">{item.description}</p>
                        <p className="text-xl font-medium bg-[var(--primary-bg)] mb-2">${item.price}</p>
                        {!item.available && (
                            <span className="bg-red-200 text-red-800 px-2 py-1 rounded-full text-xs">
                Unavailable
              </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BrowseMenu;