import React from 'react';
import { FaCheckCircle, FaGlobe, FaHeart, FaLightbulb, FaRocket, FaShieldAlt, FaTrophy, FaUsers } from 'react-icons/fa';

const About = () => {
    return (
        <div className="bg-primary dark:bg-gray-800 py-16 px-4 md:px-8 lg:px-16 my-10">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold  text-white mb-4">About ContestHub</h2>
                    <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
                </div>

                {/* Main Content */}
                <div className="grid md:grid-cols-2 gap-12 mb-16">
                    <div>
                        <h3 className="text-2xl font-semibold text-white mb-4">Our Mission</h3>
                        <p className="text-white mb-6">
                            ContestHub is a modern contest management platform designed to connect creative minds with exciting opportunities. We believe that everyone has talent worth showcasing, and our platform provides the perfect stage for creators to shine.
                        </p>
                        <p className="text-white">
                            Whether you're a designer, writer, gamer, or innovator, ContestHub offers a space where you can compete, learn, and grow. Join our community today and unlock your potential!
                        </p>
                    </div>
                    <div className="flex justify-center items-center">
                        <img
                            src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            alt="ContestHub Team"
                            className="rounded-lg shadow-lg w-full h-auto max-h-96 object-cover"
                        />
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                    <div className="text-center">
                        <div className="bg-indigo-100 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                            <FaTrophy className="text-indigo-600 text-3xl" />
                        </div>
                        <h4 className="text-3xl font-bold text-white">500+</h4>
                        <p className="text-white">Contests Hosted</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-indigo-100 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                            <FaUsers className="text-indigo-600 text-3xl" />
                        </div>
                        <h4 className="text-3xl font-bold text-white">10K+</h4>
                        <p className="text-white">Active Users</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-indigo-100 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                            <FaLightbulb className="text-indigo-600 text-3xl" />
                        </div>
                        <h4 className="text-3xl font-bold text-white">25K+</h4>
                        <p className="text-white">Creative Submissions</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-indigo-100 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                            <FaGlobe className="text-indigo-600 text-3xl" />
                        </div>
                        <h4 className="text-3xl font-bold text-white">50+</h4>
                        <p className="text-white">Countries</p>
                    </div>
                </div>

                {/* Features Section */}
                <div className="mb-16">
                    <h3 className="text-2xl font-semibold text-white text-center mb-8">Why Choose ContestHub?</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-secondary p-6 rounded-lg shadow-md">
                            <FaCheckCircle className="text-indigo-600 text-3xl mb-4" />
                            <h4 className="text-xl font-semibold text-white mb-2">Verified Contests</h4>
                            <p className="text-white">All contests are carefully reviewed by our admin team to ensure fairness and legitimacy.</p>
                        </div>
                        <div className="bg-secondary p-6 rounded-lg shadow-md">
                            <FaShieldAlt className="text-indigo-600 text-3xl mb-4" />
                            <h4 className="text-xl font-semibold text-white mb-2">Secure Payments</h4>
                            <p className="text-white">Our payment system is secure and reliable, ensuring your transactions are always protected.</p>
                        </div>
                        <div className="bg-secondary p-6 rounded-lg shadow-md">
                            <FaRocket className="text-indigo-600 text-3xl mb-4" />
                            <h4 className="text-xl font-semibold text-white mb-2">Grow Your Skills</h4>
                            <p className="text-white">Participate in contests to challenge yourself, learn new techniques, and build your portfolio.</p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-indigo-600 rounded-lg p-8 text-center text-white">
                    <h3 className="text-2xl font-semibold mb-4">Ready to Showcase Your Talent?</h3>
                    <p className="mb-6">Join ContestHub today and start participating in exciting contests!</p>
                    <button className="bg-secondary text-indigo-600 font-semibold py-2 px-6 rounded-full hover:bg-gray-100 transition duration-300">
                        Get Started Now
                    </button>
                </div>

                {/* Footer */}
                <div className="text-center mt-12 text-white">
                    <p>Made with <FaHeart className="text-red-500 inline" /> by the ContestHub Team</p>
                </div>
            </div>
        </div>
    );
};

export default About;