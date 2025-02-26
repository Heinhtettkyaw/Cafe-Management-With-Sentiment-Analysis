// src/components/AdminDashboard/ManageFeedback.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageFeedback = ({ token }) => {
    const [feedbackList, setFeedbackList] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchFeedback();
    }, [token]);

    const fetchFeedback = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/feedback/all', {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            setFeedbackList(response.data);
        } catch (err) {
            setError('Error fetching feedback');
            console.error(err);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-2">Customer Feedback</h2>
            {error && <div className="text-red-500">{error}</div>}

            <table className="min-w-full border">
                <thead>
                <tr className="bg-gray-200">
                    <th className="p-2 border">ID</th>
                    <th className="p-2 border">Username</th>
                    <th className="p-2 border">Feedback</th>
                    <th className="p-2 border">Rating</th>
                    <th className="p-2 border">Date</th>
                </tr>
                </thead>
                <tbody>
                {feedbackList.map((feedback) => (
                    <tr key={feedback.id}>
                        <td className="p-2 border">{feedback.id}</td>
                        <td className="p-2 border">{feedback.username}</td>
                        <td className="p-2 border">{feedback.feedbackMessage}</td>
                        <td className="p-2 border">{feedback.rating}</td>
                        <td className="p-2 border">{new Date(feedback.createdAt).toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageFeedback;
