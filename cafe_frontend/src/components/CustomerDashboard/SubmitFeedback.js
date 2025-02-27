// src/components/CustomerDashboard/SubmitFeedback.js
import React, { useState } from 'react';
import axios from 'axios';

const SubmitFeedback = ({ token }) => {
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [rating, setRating] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!feedbackMessage) {
            setError('Please provide a feedback message and rating.');
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:8081/api/feedback/submit',
                { username: localStorage.getItem('username'), feedbackMessage, rating },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // setSuccessMessage(response.data.message + ". Sentiment: " + response.data.sentiment);
            setSuccessMessage(response.data.message);
            setFeedbackMessage('');
            setRating('');
            setError('');
        } catch (err) {
            setError('Error submitting feedback');
            console.error(err);
        }
    };

    return (
        <div>
            {successMessage && (
                <div className="bg-green-100 text-green-800 p-4 rounded mb-4">
                    {successMessage}
                </div>
            )}

            {error && (
                <div className="bg-red-100 text-red-800 p-4 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Feedback Message</label>
                    <textarea
                        value={feedbackMessage}
                        onChange={(e) => setFeedbackMessage(e.target.value)}
                        required
                        className="w-full px-3 py-2 border bg-[var(--primary-bg)] rounded-lg focus:ring focus:ring-blue-300"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Rating (1-5)</label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}

                        className="w-full px-3 py-2 border bg-[var(--primary-bg)] rounded-lg focus:ring focus:ring-blue-300"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                >
                    Submit Feedback
                </button>
            </form>
        </div>
    );
};

export default SubmitFeedback;
