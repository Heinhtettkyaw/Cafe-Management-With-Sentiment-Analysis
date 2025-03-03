import React, { useState, useEffect } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title
} from 'chart.js';
import axios from 'axios';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title
);

const SentimentAnalysisPage = ({ token }) => {
    const [feedbackData, setFeedbackData] = useState([]);
    const [positiveCount, setPositiveCount] = useState(0);
    const [negativeCount, setNegativeCount] = useState(0);
    const [timeSeriesData, setTimeSeriesData] = useState({});
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
                const positive = feedbackList.filter(f => f.sentiment === 'Positive').length;
                const negative = feedbackList.filter(f => f.sentiment === 'Negative').length;

                // Process time series data
                const dailyCounts = {};
                feedbackList.forEach(feedback => {
                    const date = new Date(feedback.createdAt).toISOString().split('T')[0];
                    dailyCounts[date] = dailyCounts[date] || { positive: 0, negative: 0 };
                    if (feedback.sentiment === 'Positive') {
                        dailyCounts[date].positive += 1;
                    } else {
                        dailyCounts[date].negative += 1;
                    }
                });

                const labels = Object.keys(dailyCounts).sort();
                const positiveData = labels.map(date => dailyCounts[date].positive);
                const negativeData = labels.map(date => dailyCounts[date].negative);

                setTimeSeriesData({
                    labels,
                    datasets: [
                        {
                            label: 'Positive',
                            data: positiveData,
                            borderColor: '#4CAF50',
                            backgroundColor: 'rgba(76, 175, 80, 0.2)',
                        },
                        {
                            label: 'Negative',
                            data: negativeData,
                            borderColor: '#F44336',
                            backgroundColor: 'rgba(244, 67, 54, 0.2)',
                        }
                    ]
                });

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

    const pieData = {
        labels: ['Positive', 'Negative'],
        datasets: [{
            data: [positiveCount, negativeCount],
            backgroundColor: ['#4CAF50', '#F44336'],
            hoverOffset: 8,
            borderWidth: 1,
            borderColor: '#fff'
        }]
    };

    const pieOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    font: {
                        size: 14
                    }
                }
            }
        },
        animation: { duration: 1000 }
    };

    const lineOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Sentiment Trend Over Time',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Number of Feedbacks',
                },
                beginAtZero: true,
            }
        }
    };

    return (
        <div className="p-4">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    ❌ {error}
                </div>
            )}

            <h2 className="text-2xl font-bold mb-6">Sentiment Analysis</h2>

            {/* Pie Chart Section */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Sentiment Distribution</h3>
                <div className="max-w-md mx-auto">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
                        </div>
                    ) : (
                        <Pie data={pieData} options={pieOptions} />
                    )}
                </div>
            </div>

            {/* Line Chart Section */}
            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Sentiment Trend</h3>
                <div className="max-w-2xl mx-auto">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
                        </div>
                    ) : (
                        <Line data={timeSeriesData} options={lineOptions} />
                    )}
                </div>
            </div>

            {/* Statistics Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h4 className="text-lg font-medium mb-2">Positive Feedback</h4>
                    <div className="text-3xl font-bold text-green-500">
                        {positiveCount}
                        <span className="text-gray-500 text-sm ml-2">
              ({((positiveCount / feedbackData.length) * 100).toFixed(0)}%)
            </span>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h4 className="text-lg font-medium mb-2">Negative Feedback</h4>
                    <div className="text-3xl font-bold text-red-500">
                        {negativeCount}
                        <span className="text-gray-500 text-sm ml-2">
              ({((negativeCount / feedbackData.length) * 100).toFixed(0)}%)
            </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SentimentAnalysisPage;