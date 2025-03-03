// src/pages/CustomerLanding.js
import { FaCoffee, FaUtensils, FaRegClock } from 'react-icons/fa';
import { GiTakeMyMoney } from 'react-icons/gi'

const CustomerLanding = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-yellow-300 to-white">
            <header className="py-6 px-4 shadow-md">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <h1 className="text-3xl font-extrabold text-gray-800">
                        <FaCoffee className="inline-block mr-2 text-4xl text-brown-600" />
                        KyawGyiCafé
                    </h1>
                    <nav className="hidden md:flex space-x-6">
                        <a href="#features" className="text-gray-600 hover:text-gray-800 transition">
                            Features
                        </a>
                        <a href="#testimonials" className="text-gray-600 hover:text-gray-800 transition">
                            Testimonials
                        </a>
                    </nav>
                    <button
                        className="hidden md:block px-6 py-3 bg-brown-600 text-white rounded-full hover:bg-brown-700 transition"
                        onClick={() => window.location.href = '/login'}
                    >
                        Login
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-12">
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                    {/* Hero Section */}
                    <div className="space-y-8">
                        <h1 className="text-5xl font-extrabold text-gray-800">
                            Enjoy Your Favorite Brew <br /> Anytime, Anywhere
                        </h1>
                        <p className="text-gray-600 max-w-md">
                            Experience the perfect blend of convenience and quality with our café management system.
                        </p>
                        <div className="flex space-x-4">
                            <button
                                className="bg-brown-600 text-white px-8 py-4 rounded-full hover:bg-brown-700 transition"
                                onClick={() => window.location.href = '/login'}
                            >
                                Start Ordering
                            </button>
                            {/*<button*/}
                            {/*    className="bg-white text-gray-600 border border-gray-300 px-6 py-3 rounded-full hover:border-gray-400 transition"*/}
                            {/*    onClick={() => window.location.href = '/login'}*/}
                            {/*>*/}
                            {/*    Create Account*/}
                            {/*</button>*/}
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="relative">
                        <div
                            className="bg-cover bg-center rounded-2xl shadow-2xl"
                            style={{
                                backgroundImage: 'url(/cafe-hero.jpg)',
                                width: '100%',
                                height: '350px',
                            }}
                        >
                            <div className="absolute inset-0 bg-black opacity-10"></div>
                            <div className="absolute inset-0 flex items-center justify-center text-white">
                                <div className="max-w-md space-y-4">
                                    <h2 className="text-3xl font-bold">Savor the Moment</h2>
                                    <p className="text-lg">Order ahead - Enjoy your brew instantly</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="mt-20 pb-12 border-b border-gray-200">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                        Why Choose KyawGyiCafé?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
                            <FaUtensils className="text-brown-600 text-3xl mb-4" />
                            <h3 className="font-semibold text-gray-800 mb-2">Contactless Ordering</h3>
                            <p className="text-gray-600">Order from your favorite café directly from your phone</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
                            <FaRegClock className="text-brown-600 text-3xl mb-4" />
                            <h3 className="font-semibold text-gray-800 mb-2">Real-Time Tracking</h3>
                            <p className="text-gray-600">See your order progress in real time</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
                            <GiTakeMyMoney className="text-brown-600 text-3xl mb-4" />
                            <h3 className="font-semibold text-gray-800 mb-2">Seamless Payments</h3>
                            <p className="text-gray-600">Pay effortlessly with multiple options</p>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section id="testimonials" className="mt-20 pb-12">
                    <div className="max-w-md mx-auto md:max-w-lg">
                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <div className="flex items-center mb-6">
                                <img
                                    src="/customer-avatar.jpg"
                                    alt="Avatar"
                                    className="w-12 h-12 rounded-full mr-4"
                                />
                                <div>
                                    <h4 className="text-lg font-medium text-gray-800">Sarah M.</h4>
                                    <p className="text-sm text-gray-500">Regular Customer</p>
                                </div>
                            </div>
                            <p className="text-gray-600 italic">
                                "Finally a system that makes my morning coffee ritual stress-free!"
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Floating Action Button */}
            <div className="fixed bottom-8 right-8 md:hidden">
                <button
                    className="w-14 h-14 bg-brown-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition"
                    onClick={() => window.location.href = '/login'}
                >
                    →
                </button>
            </div>

            <footer className="bg-white py-6 mt-12">
                <div className="max-w-7xl mx-auto text-center text-gray-500">
                    <p>© 2025 KyawGyiCafé. All rights reserved.</p>
                    <div className="flex justify-center space-x-4 mt-4">
                        <a href="#" className="text-gray-600 hover:text-gray-800 transition">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-800 transition">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default CustomerLanding;