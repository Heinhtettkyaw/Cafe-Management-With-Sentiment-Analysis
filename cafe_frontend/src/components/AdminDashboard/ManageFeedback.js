import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageFeedback = ({ token }) => {
    const [feedbackList, setFeedbackList] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
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
        fetchFeedback();
    }, [token]);

    return (
        <div className="bg-[var(--primary-bg)]  rounded-lg shadow-md p-6 mt-10">
            <h2 className="text-[var(--primary-text)] text-2xl mb-4">Customer Feedback</h2>
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
                        Feedback
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rating
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sentiment
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                    </th>
                </tr>
                </thead>
                <tbody className="bg-[var(--primary-bg)]  divide-y divide-gray-200 dark:divide-gray-700">
                {feedbackList.map((feedback) => (
                    <tr key={feedback.id} className="hover:bg-[var(--primary-bg)] ">
                        <td className="px-6 py-4 whitespace-nowrap">
                            {feedback.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {feedback.username}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {feedback.feedbackMessage}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, index) => (
                                    <svg
                                        key={index}
                                        className={`w-4 h-4 ${index < feedback.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M9.029 13.872l3.403 3.403a1 1 0 11-1.414 1.414l-3.403-3.403a1 1 0 010-1.414l3.403-3.403a1 1 0 011.414 0l3.403 3.403a1 1 0 010 1.414l-3.403 3.403a1 1 0 01-1.414-1.414L9.029 13.872z" />
                                    </svg>
                                ))}
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {feedback.sentiment}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {new Date(feedback.createdAt).toLocaleString()}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageFeedback;