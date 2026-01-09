import React from 'react';
import { FaCheckCircle, FaGlobe, FaHeart, FaLightbulb, FaRocket, FaShieldAlt, FaTrophy, FaUsers } from 'react-icons/fa';

const About = () => {
    return (
        <div className="bg-white dark:bg-gray-900 py-16 md:py-24 px-4 md:px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
                
                {/* Section Header */}
                <div className="text-center mb-16 md:mb-20">
                    <h2 className="text-4xl md:text-6xl font-bold text-primary dark:text-white mb-6">
                        About ContestHub
                    </h2>
                    <div className="flex justify-center gap-2">
                        <div className="h-1.5 w-8 bg-secondary rounded-full"></div>
                        <div className="h-1.5 w-8 bg-accent rounded-full"></div>
                        <div className="h-1.5 w-8 bg-secondary rounded-full"></div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid md:grid-cols-2 gap-12 mb-20">
                    {/* Text Section */}
                    <div className="flex flex-col justify-center">
                        <h3 className="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-6">
                            Our Mission
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                            ContestHub is a modern contest management platform designed to connect creative minds with exciting opportunities. We believe that everyone has talent worth showcasing, and our platform provides the perfect stage for creators to shine.
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                            Whether you're a designer, writer, gamer, or innovator, ContestHub offers a space where you can compete, learn, and grow. Join our community today and unlock your potential!
                        </p>
                    </div>

                    {/* Image Section */}
                    <div className="flex justify-center items-center">
                        <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl group">
                            <img
                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                                alt="ContestHub Team"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-20">
                    {/* Stat 1 */}
                    <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 dark:from-secondary/20 dark:to-secondary/10 p-8 rounded-2xl border-2 border-secondary/20 dark:border-secondary/30 hover:shadow-lg transition-all duration-300 text-center group">
                        <div className="bg-gradient-to-br from-secondary to-secondary/80 rounded-full p-5 w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                            <FaTrophy className="text-white text-4xl" />
                        </div>
                        <h4 className="text-4xl md:text-5xl font-bold text-secondary mb-2">500+</h4>
                        <p className="text-primary dark:text-gray-300 font-semibold text-lg">Contests Hosted</p>
                    </div>

                    {/* Stat 2 */}
                    <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 dark:from-secondary/20 dark:to-secondary/10 p-8 rounded-2xl border-2 border-secondary/20 dark:border-secondary/30 hover:shadow-lg transition-all duration-300 text-center group">
                        <div className="bg-gradient-to-br from-secondary to-secondary/80 rounded-full p-5 w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                            <FaUsers className="text-white text-4xl" />
                        </div>
                        <h4 className="text-4xl md:text-5xl font-bold text-secondary mb-2">10K+</h4>
                        <p className="text-primary dark:text-gray-300 font-semibold text-lg">Active Users</p>
                    </div>

                    {/* Stat 3 */}
                    <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 dark:from-secondary/20 dark:to-secondary/10 p-8 rounded-2xl border-2 border-secondary/20 dark:border-secondary/30 hover:shadow-lg transition-all duration-300 text-center group">
                        <div className="bg-gradient-to-br from-secondary to-secondary/80 rounded-full p-5 w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                            <FaLightbulb className="text-white text-4xl" />
                        </div>
                        <h4 className="text-4xl md:text-5xl font-bold text-secondary mb-2">25K+</h4>
                        <p className="text-primary dark:text-gray-300 font-semibold text-lg">Creative Submissions</p>
                    </div>

                    {/* Stat 4 */}
                    <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 dark:from-secondary/20 dark:to-secondary/10 p-8 rounded-2xl border-2 border-secondary/20 dark:border-secondary/30 hover:shadow-lg transition-all duration-300 text-center group">
                        <div className="bg-gradient-to-br from-secondary to-secondary/80 rounded-full p-5 w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                            <FaGlobe className="text-white text-4xl" />
                        </div>
                        <h4 className="text-4xl md:text-5xl font-bold text-secondary mb-2">50+</h4>
                        <p className="text-primary dark:text-gray-300 font-semibold text-lg">Countries</p>
                    </div>
                </div>

                {/* Features Section */}
                <div className="mb-20">
                    <h3 className="text-3xl md:text-5xl font-bold text-primary dark:text-white text-center mb-12">
                        Why Choose ContestHub?
                    </h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-gradient-to-br from-white dark:from-gray-800 to-white dark:to-gray-700 p-8 rounded-2xl shadow-lg hover:shadow-2xl border-2 border-secondary/10 dark:border-secondary/20 transition-all duration-300 group hover:-translate-y-2">
                            <div className="bg-gradient-to-br from-secondary/20 to-secondary/10 dark:from-secondary/30 dark:to-secondary/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <FaCheckCircle className="text-secondary text-3xl" />
                            </div>
                            <h4 className="text-2xl font-bold text-primary dark:text-white mb-4">Verified Contests</h4>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                All contests are carefully reviewed by our admin team to ensure fairness and legitimacy.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-gradient-to-br from-white dark:from-gray-800 to-white dark:to-gray-700 p-8 rounded-2xl shadow-lg hover:shadow-2xl border-2 border-secondary/10 dark:border-secondary/20 transition-all duration-300 group hover:-translate-y-2">
                            <div className="bg-gradient-to-br from-secondary/20 to-secondary/10 dark:from-secondary/30 dark:to-secondary/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <FaShieldAlt className="text-secondary text-3xl" />
                            </div>
                            <h4 className="text-2xl font-bold text-primary dark:text-white mb-4">Secure Payments</h4>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                Our payment system is secure and reliable, ensuring your transactions are always protected.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-gradient-to-br from-white dark:from-gray-800 to-white dark:to-gray-700 p-8 rounded-2xl shadow-lg hover:shadow-2xl border-2 border-secondary/10 dark:border-secondary/20 transition-all duration-300 group hover:-translate-y-2">
                            <div className="bg-gradient-to-br from-secondary/20 to-secondary/10 dark:from-secondary/30 dark:to-secondary/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <FaRocket className="text-secondary text-3xl" />
                            </div>
                            <h4 className="text-2xl font-bold text-primary dark:text-white mb-4">Grow Your Skills</h4>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                Participate in contests to challenge yourself, learn new techniques, and build your portfolio.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-secondary to-secondary/80 dark:from-secondary dark:to-secondary/90 rounded-3xl p-12 md:p-16 text-center shadow-2xl border-2 border-accent/20">
                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Ready to Showcase Your Talent?
                    </h3>
                    <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                        Join ContestHub today and start participating in exciting contests!
                    </p>
                    <button className="bg-white text-secondary font-bold py-4 px-10 rounded-full hover:scale-105 hover:shadow-xl transition-all duration-300 text-lg">
                        Get Started Now
                    </button>
                </div>

                {/* Footer */}
                <div className="text-center mt-16">
                    <p className="text-gray-700 dark:text-gray-300 text-lg flex items-center justify-center gap-2">
                        Made with <FaHeart className="text-red-500 text-xl animate-pulse" /> by the ContestHub Team
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;