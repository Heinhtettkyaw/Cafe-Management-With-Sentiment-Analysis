// src/pages/CustomerLanding.js
import { FaCoffee, FaUtensils, FaRegClock } from 'react-icons/fa';
import { GiTakeMyMoney } from 'react-icons/gi';

const CustomerLanding = () => {
    return (
    <div className="min-h-screen bg-gradient-to-b from-amber-300 to-white">
        <header className="py-6 px-4 shadow-md">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <h1 className="text-3xl font-extrabold text-gray-800">
                    {/* Changed icon color to amber-600 */}
                    <FaCoffee className="inline-block mr-2 text-4xl text-amber-600" />
                    KyawGyiCafé
                </h1>
                <nav className="hidden md:flex space-x-6">
                    <a href="#features" className="text-gray-600 hover:text-gray-800 transition">
                        Highlights
                    </a>
                    <a href="#testimonials" className="text-gray-600 hover:text-gray-800 transition">
                        Reviews
                    </a>
                </nav>
                {/* Updated button color: bg-amber-600 -> hover:bg-amber-700 */}
                <button
                    className="hidden md:block px-6 py-3 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition"
                    onClick={() => window.location.href = '/login'}
                >
                    Login
                </button>
            </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-12">
            {/* Hero Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="space-y-8">
                    <h1 className="text-5xl font-extrabold text-gray-800">
                        Discover the Perfect Cup <br /> at KyawGyiCafé
                    </h1>
                    <p className="text-gray-600 max-w-md">
                        Whether you're craving a smooth latte, a bold espresso, or a sweet treat, we craft every cup with passion. Enjoy a delightful café experience—wherever you are.
                    </p>
                    <div className="flex space-x-4">
                        {/* Updated button color: bg-amber-600 -> hover:bg-amber-700 */}
                        <button
                            className="bg-amber-600 text-white px-8 py-4 rounded-full hover:bg-amber-700 transition"
                            onClick={() => window.location.href = '/login'}
                        >
                            Start Ordering
                        </button>
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
                                <h2 className="text-3xl font-bold">Savor Every Sip</h2>
                                <p className="text-lg">"Coffee is a language in itself." - Jackie Chan</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="mt-20 pb-12 border-b border-gray-200">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                    Our Highlights
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Changed icons to amber-600 */}
                    <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
                        <FaUtensils className="text-amber-600 text-3xl mb-4" />
                        <h3 className="font-semibold text-gray-800 mb-2">Seamless Ordering</h3>
                        <p className="text-gray-600">
                            Order your favorite brews and bites with a few simple clicks—no hassle, just pure indulgence.
                        </p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
                        <FaRegClock className="text-amber-600 text-3xl mb-4" />
                        <h3 className="font-semibold text-gray-800 mb-2">Real-Time Updates</h3>
                        <p className="text-gray-600">
                            Track your order progress instantly, so you know exactly when your treats will be ready.
                        </p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
                        <GiTakeMyMoney className="text-amber-600 text-3xl mb-4" />
                        <h3 className="font-semibold text-gray-800 mb-2">Flexible Payments</h3>
                        <p className="text-gray-600">
                            Choose from multiple payment options, ensuring a quick and effortless checkout experience.
                        </p>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="mt-20 pb-12">
                <div className="max-w-md mx-auto md:max-w-lg">
                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                        <div className="flex items-center mb-6">
                            <img
                                src="customer-avatar.jpg"
                                alt="Avatar"
                                className="w-12 h-12 rounded-full mr-4"
                            />
                            <div>
                                <h4 className="text-lg font-medium text-gray-800">Jessica A.</h4>
                                <p className="text-sm text-gray-500">Daily Regular</p>
                            </div>
                        </div>
                        <p className="text-gray-600 italic">
                            “KyawGyiCafé has completely transformed my morning routine. Their caramel latte is the perfect balance of flavor and sweetness—I can’t get enough!”
                        </p>
                    </div>
                </div>
            </section>
        </main>

        {/* Floating Action Button (for mobile) */}
        <div className="fixed bottom-8 right-8 md:hidden">
            {/* Updated button color: bg-amber-600 -> hover:bg-amber-700 */}
            <button
                className="w-14 h-14 bg-amber-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition"
                onClick={() => window.location.href = '/login'}
            >
                →
            </button>
        </div>

        <footer className="bg-white py-6 mt-12">
            <div className="max-w-7xl mx-auto text-center text-gray-500">
                <p>© 2025 KyawGyiCafé. All rights reserved.</p>
                <div className="flex justify-center space-x-4 mt-4">
                </div>
            </div>
        </footer>
    </div>
);
};

export default CustomerLanding;
