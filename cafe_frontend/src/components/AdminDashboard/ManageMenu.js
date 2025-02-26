// src/components/AdminDashboard/ManageMenu.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageMenu = ({ token }) => {
    const [menuItems, setMenuItems] = useState([]);
    const [newItem, setNewItem] = useState({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        available: true
    });
    const [editingItem, setEditingItem] = useState(null); // Track the item being edited
    const [error, setError] = useState('');

    useEffect(() => {
        fetchMenuItems();
    }, [token]);

    const fetchMenuItems = async () => {
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
    const handleToggleAvailability = async (itemId) => {
        try {
            await axios.put(
                `http://localhost:8081/api/menu/admin/toggle-available/${itemId}`,
                {},
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            fetchMenuItems(); // Refresh after toggling
        } catch (err) {
            setError('Error updating availability');
            console.error(err);
        }
    };

    const handleAddMenuItem = async () => {
        try {
            await axios.post('http://localhost:8081/api/menu/admin/add', newItem, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchMenuItems();
            setNewItem({ name: '', description: '', price: '', imageUrl: '', available: true });
        } catch (err) {
            setError('Error adding menu item');
            console.error(err);
        }
    };

    const handleEditMenuItem = (item) => {
        setEditingItem(item);
        setNewItem({
            name: item.name,
            description: item.description,
            price: item.price,
            imageUrl: item.imageUrl,
            available: item.available
        });
    };

    const handleUpdateMenuItem = async () => {
        try {
            await axios.put(`http://localhost:8081/api/menu/admin/update/${editingItem.id}`, newItem, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchMenuItems();
            setEditingItem(null); // Close the edit form
            setNewItem({ name: '', description: '', price: '', imageUrl: '', available: true });
        } catch (err) {
            setError('Error updating menu item');
            console.error(err);
        }
    };

    const handleDeleteMenuItem = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/api/menu/admin/delete/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchMenuItems();
        } catch (err) {
            setError('Error deleting menu item');
            console.error(err);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-2">Manage Menu Items</h2>
            {error && <div className="text-red-500">{error}</div>}

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    className="border p-2 mr-2"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    className="border p-2 mr-2"
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                    className="border p-2 mr-2"
                />
                {/*<input*/}
                {/*    type="text"*/}
                {/*    placeholder="Image URL"*/}
                {/*    value={newItem.imageUrl}*/}
                {/*    onChange={(e) => setNewItem({ ...newItem, imageUrl: e.target.value })}*/}
                {/*    className="border p-2 mr-2"*/}
                {/*/>*/}
                <button onClick={editingItem ? handleUpdateMenuItem : handleAddMenuItem} className="px-4 py-2 bg-green-500 text-white rounded">
                    {editingItem ? 'Update Item' : 'Add Item'}
                </button>
            </div>

            <table className="min-w-full border">
                <thead>
                <tr className="bg-gray-200">
                    <th className="p-2 border">ID</th>
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Description</th>
                    <th className="p-2 border">Price</th>
                    <th className="p-2 border">Status</th>
                    <th className="p-2 border">Actions</th>
                </tr>
                </thead>
                <tbody>
                {menuItems.map((item) => (
                    <tr key={item.id}>
                        <td className="p-2 border">{item.id}</td>
                        <td className="p-2 border">{item.name}</td>
                        <td className="p-2 border">{item.description}</td>
                        <td className="p-2 border">${item.price}</td>
                        <td className="p-2 border">
                                <span className={item.available ? 'text-green-500' : 'text-red-500'}>
                                    {item.available ? 'Available' : 'Unavailable'}
                                </span>
                        </td>
                        <td className="p-2 border">
                            <button onClick={() => handleEditMenuItem(item)} className="px-2 py-1 bg-yellow-500 text-white rounded mr-2">
                                Edit
                            </button>
                            <button onClick={() => handleDeleteMenuItem(item.id)} className="mr-2 px-2 py-1 bg-red-500 text-white rounded">
                                Delete
                            </button>
                            <button
                                onClick={() => handleToggleAvailability(item.id)}
                                className={`px-2 py-1 ${item.available ? 'bg-red-500' : 'bg-green-500'} text-white rounded`}
                            >
                                {item.available ? 'Make Unavailable' : 'Make Available'}
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageMenu;
