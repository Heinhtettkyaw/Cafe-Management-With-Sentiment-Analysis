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

        if (!feedbackMessage || !rating) {
            setError('Please provide feedback message and rating.');
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:8081/api/feedback/submit',
                { username: localStorage.getItem('username'), feedbackMessage, rating },
                { headers: { Authorization: `Bearer ${token}` } }
            );

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
            <h2 className="text-2xl font-bold mb-2">Submit Feedback</h2>

            {error && <div className="text-red-500">{error}</div>}
            {successMessage && <div className="text-green-500">{successMessage}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Feedback Message</label>
                    <textarea
                        value={feedbackMessage}
                        onChange={(e) => setFeedbackMessage(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    ></textarea>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Rating (1 to 5)</label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md"
                >
                    Submit Feedback
                </button>
            </form>
        </div>
    );
};

export default SubmitFeedback;
