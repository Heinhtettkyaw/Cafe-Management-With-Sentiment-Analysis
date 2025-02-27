import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageMenu = ({ token }) => {
    const [menuItems, setMenuItems] = useState([]);
    const [newItem, setNewItem] = useState({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        available: true,
    });
    const [editingItem, setEditingItem] = useState(null);
    const [error, setError] = useState('');

    // Move fetchMenuItems here so it's accessible in all functions.
    const fetchMenuItems = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/menu', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMenuItems(response.data);
        } catch (err) {
            setError('Error fetching menu items');
            console.error(err);
        }
    };

    useEffect(() => {
        fetchMenuItems();
    }, [token]);

    const handleToggleAvailability = async (itemId) => {
        try {
            await axios.put(
                `http://localhost:8081/api/menu/admin/toggle-available/${itemId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchMenuItems();
        } catch (err) {
            setError('Error updating availability');
            console.error(err);
        }
    };

    const handleAddMenuItem = async () => {
        try {
            await axios.post('http://localhost:8081/api/menu/admin/add', newItem, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchMenuItems();
            setNewItem({
                name: '',
                description: '',
                price: '',
                imageUrl: '',
                available: true,
            });
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
            available: item.available,
        });
    };

    const handleUpdateMenuItem = async () => {
        try {
            await axios.put(
                `http://localhost:8081/api/menu/admin/update/${editingItem.id}`,
                newItem,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchMenuItems();
            setEditingItem(null);
            setNewItem({
                name: '',
                description: '',
                price: '',
                imageUrl: '',
                available: true,
            });
        } catch (err) {
            setError('Error updating menu item');
            console.error(err);
        }
    };

    const handleDeleteMenuItem = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/api/menu/admin/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchMenuItems();
        } catch (err) {
            setError('Error deleting menu item');
            console.error(err);
        }
    };

    return (
        <div className="bg-[var(--primary-bg)] rounded-lg shadow-md p-6 mt-10">
            <h2 className="text-[var(--primary-text)] text-2xl mb-4">Manage Menu Items</h2>
            {error && (
                <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-4">
                    <p>{error}</p>
                </div>
            )}
            <div className="mb-6">
                <div className="flex space-x-4">
                    {/*<label className="block text-[var(--primary-text)] mb-2">Name</label>*/}
                    <input
                        type="text"
                        placeholder="Name"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={newItem.description}
                        onChange={(e) =>
                            setNewItem({ ...newItem, description: e.target.value })
                        }
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={newItem.price}
                        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={() =>
                            editingItem ? handleUpdateMenuItem() : handleAddMenuItem()
                        }
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        {editingItem ? 'Update' : 'Add'}
                    </button>
                </div>
            </div>
            <table className="min-w-full divide-y bg-[var(--primary-bg)]">
                <thead>
                <tr>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        ID
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        Name
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        Description
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        Price
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        Status
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody className=" bg-[var(--primary-bg)] divide-y divide-gray-200 ">
                {menuItems.map((item) => (
                    <tr key={item.id} className="hover:bg-[var(--primary-bg)]">
                        <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {item.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">${item.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                <span
                    className={`px-2 py-1 rounded-full ${
                        item.available
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                    }`}
                >
                  {item.available ? 'Available' : 'Unavailable'}
                </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap space-x-2">
                            <button
                                onClick={() => handleEditMenuItem(item)}
                                className="px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteMenuItem(item.id)}
                                className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => handleToggleAvailability(item.id)}
                                className={`px-2 py-1 ${
                                    item.available ? 'bg-green-500' : 'bg-red-500'
                                } text-white rounded-md hover:bg-opacity-90 transition`}
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
