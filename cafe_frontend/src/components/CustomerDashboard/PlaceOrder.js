import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlaceOrder = ({ token }) => {
    const [menuItems, setMenuItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [error, setError] = useState('');

    // Fetch menu items on token change
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

    // Add item to order or increment quantity
    const addToOrder = (item) => {
        const existing = selectedItems.find(i => i.id === item.id);
        if (existing) {
            setSelectedItems(selectedItems.map(i =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ));
        } else {
            setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
        }
    };

    // Decrement quantity or remove item
    const handleDecrement = (itemId) => {
        setSelectedItems(prevItems =>
            prevItems.map(item => {
                if (item.id === itemId) {
                    if (item.quantity > 1) {
                        return { ...item, quantity: item.quantity - 1 };
                    }
                    return null; // Remove item when quantity reaches 1
                }
                return item;
            }).filter(item => item !== null)
        );
    };

    // Increment quantity
    const handleIncrement = (itemId) => {
        setSelectedItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    // Place order with calculated total
    const placeOrder = async () => {
        const totalAmount = selectedItems.reduce((sum, item) =>
            sum + (item.price * item.quantity), 0
        );
        const orderData = {
            totalAmount,
            items: selectedItems.map(item => ({
                menuItem: { id: item.id },
                quantity: item.quantity,
                price: item.price
            }))
        };
        try {
            await axios.post('http://localhost:8081/api/orders/place', orderData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            alert('Order placed successfully!');
            setSelectedItems([]);
        } catch (err) {
            setError('Error placing order');
            console.error(err);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-2">Place Order</h2>
            {error && <div className="text-red-500">{error}</div>}

            {/* Menu items section remains the same */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {menuItems.filter(item => item.available)
                    .map(item => (
                        <div key={item.id} className="bg-white p-4 shadow rounded">
                            <h3 className="text-xl font-semibold">{item.name}</h3>
                            <p>{item.description}</p>
                            <p className="font-bold">${item.price}</p>
                            <button
                                onClick={() => addToOrder(item)}
                                className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
                            >
                                Add to Order
                            </button>
                        </div>
                    ))}
            </div>

            {/* Updated order summary with quantity controls */}
            {selectedItems.length > 0 && (
                <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2">Your Order</h3>
                    <ul>
                        {selectedItems.map(item => (
                            <li key={item.id} className="border p-2 mb-2">
                                {item.name} -
                                <div className="flex space-x-2 items-center">
                                    <button
                                        onClick={() => handleDecrement(item.id)}
                                        className="bg-red-500 px-2 py-1 rounded text-white"
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() => handleIncrement(item.id)}
                                        className="bg-green-500 px-2 py-1 rounded text-white"
                                    >
                                        +
                                    </button>
                                </div>
                                - ${item.price * item.quantity}
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={placeOrder}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Place Order
                    </button>
                </div>
            )}
        </div>
    );
};

export default PlaceOrder;