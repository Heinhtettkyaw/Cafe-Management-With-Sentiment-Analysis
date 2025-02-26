// src/components/AdminDashboard/ViewUsers.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewUsers = ({ token }) => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUsers();
    }, [token]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/admin/users', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setUsers(response.data);
        } catch (err) {
            setError('Error fetching users');
            console.error(err);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-2">View Users</h2>
            {error && <div className="text-red-500">{error}</div>}
            <table className="min-w-full border">
                <thead>
                <tr className="bg-gray-200">
                    <th className="p-2 border">ID</th>
                    <th className="p-2 border">Username</th>
                    <th className="p-2 border">Email</th>
                    <th className="p-2 border">Full Name</th>
                    <th className="p-2 border">Phone</th>
                    <th className="p-2 border">Gender</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td className="p-2 border">{user.id}</td>
                        <td className="p-2 border">{user.username}</td>
                        <td className="p-2 border">{user.email}</td>
                        <td className="p-2 border">{user.fullName}</td>
                        <td className="p-2 border">{user.phone}</td>
                        <td className="p-2 border">{user.gender}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewUsers;
