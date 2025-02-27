import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

const SentimentAnalysisPage = ({ token }) => {
    const [feedbackData, setFeedbackData] = useState([]);
    const [positiveCount, setPositiveCount] = useState(0);
    const [negativeCount, setNegativeCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:8081/api/feedback/all', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const feedbackList = response.data;
                const positive = feedbackList.filter(feedback => feedback.sentiment === 'Positive').length;
                const negative = feedbackList.filter(feedback => feedback.sentiment === 'Negative').length;

                setFeedbackData(feedbackList);
                setPositiveCount(positive);
                setNegativeCount(negative);
                setLoading(false);
            } catch (err) {
                setError('Failed to retrieve feedback data');
                setLoading(false);
                console.error('Error fetching feedback data:', err);
            }
        };

        fetchData();
    }, [token]);

    const data = {
        labels: ['Positive', 'Negative'],
        datasets: [{
            data: [positiveCount, negativeCount],
            backgroundColor: ['#4CAF50', '#F44336'],
            hoverOffset: 8,
            borderWidth: 1,
            borderColor: '#fff'
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    font: {
                        size: 14 // Use text color variable
                    }
                }
            }
        },
        animation: { tension: 1, duration: 1000 }
    };

    return (
        <div className="container mx-auto p-8 max-w-4xl">
            {error && (
                <div className="bg-red-100 text-red-700 p-4 rounded mb-4 dark:bg-red-800 dark:text-red-300">
                    ❌ {error}
                </div>
            )}

            <h2 className="text-3xl font-bold mb-6 text-center text-[var(--primary-text)]">
                Feedback Sentiment Analysis
            </h2>

            {loading ? (
                <div className="flex justify-center items-center mt-12">
                    <svg className="animate-spin h-10 w-10 text-blue-500 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v1a7 7 0 00-7 7h1z"></path>
                    </svg>
                </div>
            ) : (
                <>
                    <div className="rounded-lg shadow-lg p-6 bg-[var(--primary-bg)] mb-8">
                        <Pie
                            data={data}
                            options={options}
                            height={400}
                            style={{ borderRadius: 12 }}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-green-50 p-4 rounded shadow dark:bg-green-900 dark:text-white">
                            <h3 className="text-lg font-medium mb-2">Positive Feedback</h3>
                            <div className="text-2xl font-bold">{positiveCount}</div>
                            <p className="text-gray-600 dark:text-gray-400">{((positiveCount / feedbackData.length) * 100).toFixed(0)}% of total feedback</p>
                        </div>

                        <div className="bg-red-50 p-4 rounded shadow dark:bg-red-900 dark:text-white">
                            <h3 className="text-lg font-medium mb-2">Negative Feedback</h3>
                            <div className="text-2xl font-bold">{negativeCount}</div>
                            <p className="text-gray-600 dark:text-gray-400">{((negativeCount / feedbackData.length) * 100).toFixed(0)}% of total feedback</p>
                        </div>

                        <div className="col-span-full bg-yellow-50 p-4 rounded shadow dark:bg-yellow-900 dark:text-white">
                            <h3 className="text-lg font-medium mb-2">Overall Statistics</h3>
                            <ul className="space-y-2">
                                <li className="flex justify-between items-center">
                                    <span>Total Feedback</span>
                                    <span className="font-bold">{feedbackData.length}</span>
                                </li>
                                <li className="flex justify-between items-center">
                                    <span>Positive Rate</span>
                                    <span className="text-green-600 font-bold dark:text-green-400">
                    {((positiveCount / (positiveCount + negativeCount)) * 100).toFixed(1)}%
                  </span>
                                </li>
                                <li className="flex justify-between items-center">
                                    <span>Negative Rate</span>
                                    <span className="text-red-600 font-bold dark:text-red-400">
                    {((negativeCount / (positiveCount + negativeCount)) * 100).toFixed(1)}%
                  </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default SentimentAnalysisPage;