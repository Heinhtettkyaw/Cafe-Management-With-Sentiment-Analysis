// src/components/CustomerDashboard/BrowseMenu.js
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
            <h2 className="text-2xl font-bold mb-2">Browse Menu</h2>
            {error && <div className="text-red-500">{error}</div>}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    {menuItems
                            .map(item => (
                    <div key={item.id} className="bg-white p-4 shadow rounded">
                        <h3 className="text-xl font-semibold">{item.name}</h3>
                        <p>{item.description}</p>
                        <p className="font-bold">${item.price}</p>
                        {!item.available && <p className="text-red-500">Unavailable</p>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BrowseMenu;
