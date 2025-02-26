import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewUsers = ({ token }) => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/admin/users', {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                setUsers(response.data);
            } catch (err) {
                setError('Error fetching users');
                console.error(err);
            }
        };
        fetchUsers();
    }, [token]);

    return (
        <div className="bg-[var(--primary-bg)] rounded-lg shadow-md p-6 mt-10">
            <h2 className="text-[var(--primary-text)] text-2xl mb-4">View Users</h2>
            {error && (
                <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-4">
                    <p>{error}</p>
                </div>
            )}
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Username
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Full Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Gender
                    </th>
                </tr>
                </thead>
                <tbody className="bg-[var(--primary-bg)] divide-y divide-gray-200 dark:divide-gray-700">
                {users.map((user) => (
                    <tr key={user.id} className="hover:bg-[var(--primary-bg)]">
                        <td className="px-6 py-4 whitespace-nowrap">
                            {user.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {user.username}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {user.fullName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {user.phone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {user.gender}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewUsers;