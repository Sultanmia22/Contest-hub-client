import React from 'react';
import { FaClock, FaEnvelope, FaFacebook, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPaperPlane, FaPhone, FaTwitter } from 'react-icons/fa';

const Contact = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 my-5">

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-secondary via-secondary/90 to-secondary/80 dark:from-secondary dark:to-secondary/90 text-white py-16 md:py-24">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-6xl font-bold mb-6">Get in Touch</h2>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto text-white/90">
                        We'd love to hear from you. Whether you have a question, feedback, or just want to say hello, feel free to reach out.
                    </p>
                </div>
            </section>

            {/* Contact Content */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 border-2 border-secondary/10 dark:border-secondary/20">
                                <h3 className="text-3xl font-bold text-primary dark:text-white mb-8">Send us a Message</h3>

                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-primary dark:text-white font-semibold mb-3">Your Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                className="w-full px-4 py-3 border-2 border-secondary/20 dark:border-secondary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent bg-white dark:bg-gray-700 text-primary dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-primary dark:text-white font-semibold mb-3">Your Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                className="w-full px-4 py-3 border-2 border-secondary/20 dark:border-secondary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent bg-white dark:bg-gray-700 text-primary dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="subject" className="block text-primary dark:text-white font-semibold mb-3">Subject</label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            className="w-full px-4 py-3 border-2 border-secondary/20 dark:border-secondary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent bg-white dark:bg-gray-700 text-primary dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                                            placeholder="How can we help?"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-primary dark:text-white font-semibold mb-3">Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows="5"
                                            className="w-full px-4 py-3 border-2 border-secondary/20 dark:border-secondary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent bg-white dark:bg-gray-700 text-primary dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                                            placeholder="Your message here..."
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-secondary to-secondary/80 hover:shadow-lg text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-lg"
                                    >
                                        <span>Send Message</span>
                                        <FaPaperPlane />
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-6">
                            {/* Contact Info Card */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border-2 border-secondary/10 dark:border-secondary/20">
                                <h3 className="text-2xl font-bold text-primary dark:text-white mb-8">Contact Information</h3>

                                <div className="space-y-6">
                                    {/* Email */}
                                    <div className="flex items-start gap-4">
                                        <div className="bg-gradient-to-br from-secondary/20 to-secondary/10 dark:from-secondary/30 dark:to-secondary/20 p-4 rounded-xl flex-shrink-0">
                                            <FaEnvelope className="text-secondary text-2xl" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-primary dark:text-white text-lg mb-2">Email</h4>
                                            <p className="text-gray-700 dark:text-gray-300">contact@contesthub.com</p>
                                            <p className="text-gray-700 dark:text-gray-300">support@contesthub.com</p>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex items-start gap-4">
                                        <div className="bg-gradient-to-br from-secondary/20 to-secondary/10 dark:from-secondary/30 dark:to-secondary/20 p-4 rounded-xl flex-shrink-0">
                                            <FaPhone className="text-secondary text-2xl" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-primary dark:text-white text-lg mb-2">Phone</h4>
                                            <p className="text-gray-700 dark:text-gray-300">+1 (555) 123-4567</p>
                                            <p className="text-gray-700 dark:text-gray-300">+1 (555) 987-6543</p>
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div className="flex items-start gap-4">
                                        <div className="bg-gradient-to-br from-secondary/20 to-secondary/10 dark:from-secondary/30 dark:to-secondary/20 p-4 rounded-xl flex-shrink-0">
                                            <FaMapMarkerAlt className="text-secondary text-2xl" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-primary dark:text-white text-lg mb-2">Address</h4>
                                            <p className="text-gray-700 dark:text-gray-300">123 Contest Street</p>
                                            <p className="text-gray-700 dark:text-gray-300">Creative City, CC 12345</p>
                                            <p className="text-gray-700 dark:text-gray-300">United States</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Office Hours Card */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border-2 border-secondary/10 dark:border-secondary/20">
                                <h3 className="text-2xl font-bold text-primary dark:text-white mb-6">Office Hours</h3>
                                <div className="flex items-start gap-4">
                                    <div className="bg-gradient-to-br from-secondary/20 to-secondary/10 dark:from-secondary/30 dark:to-secondary/20 p-4 rounded-xl flex-shrink-0">
                                        <FaClock className="text-secondary text-2xl" />
                                    </div>
                                    <div className="space-y-3">
                                        <p className="text-gray-700 dark:text-gray-300 font-medium">Monday - Friday: 9:00 AM - 6:00 PM</p>
                                        <p className="text-gray-700 dark:text-gray-300 font-medium">Saturday: 10:00 AM - 4:00 PM</p>
                                        <p className="text-gray-700 dark:text-gray-300 font-medium">Sunday: Closed</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links Card */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border-2 border-secondary/10 dark:border-secondary/20">
                                <h3 className="text-2xl font-bold text-primary dark:text-white mb-6">Follow Us</h3>
                                <div className="flex gap-4 flex-wrap">
                                    <a href="#" className="bg-gradient-to-br from-secondary to-secondary/80 p-4 rounded-xl text-white hover:shadow-lg transition-all duration-300 hover:scale-110">
                                        <FaFacebook size={24} />
                                    </a>
                                    <a href="#" className="bg-gradient-to-br from-accent to-accent/80 p-4 rounded-xl text-white hover:shadow-lg transition-all duration-300 hover:scale-110">
                                        <FaTwitter size={24} />
                                    </a>
                                    <a href="#" className="bg-gradient-to-br from-secondary to-secondary/80 p-4 rounded-xl text-white hover:shadow-lg transition-all duration-300 hover:scale-110">
                                        <FaLinkedin size={24} />
                                    </a>
                                    <a href="#" className="bg-gradient-to-br from-accent to-secondary p-4 rounded-xl text-white hover:shadow-lg transition-all duration-300 hover:scale-110">
                                        <FaInstagram size={24} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/5 to-secondary/10 dark:from-gray-800 dark:to-gray-900">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-primary dark:text-white mb-6">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-lg">
                            Find answers to common questions about ContestHub
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* FAQ Card 1 */}
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border-2 border-secondary/10 dark:border-secondary/20 hover:border-secondary">
                            <h3 className="text-xl font-bold text-primary dark:text-white mb-4">
                                How do I create a contest on ContestHub?
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                Simply sign up as a Contest Creator, navigate to your dashboard, and click on "Create New Contest". Follow the step-by-step guide to set up your contest details, rules, and prizes.
                            </p>
                        </div>

                        {/* FAQ Card 2 */}
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border-2 border-secondary/10 dark:border-secondary/20 hover:border-secondary">
                            <h3 className="text-xl font-bold text-primary dark:text-white mb-4">
                                Is there a fee to participate in contests?
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                Some contests may have an entry fee, which is clearly mentioned on the contest page. The fee contributes to the prize pool and platform maintenance.
                            </p>
                        </div>

                        {/* FAQ Card 3 */}
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border-2 border-secondary/10 dark:border-secondary/20 hover:border-secondary">
                            <h3 className="text-xl font-bold text-primary dark:text-white mb-4">
                                How are winners selected?
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                Winners are selected based on the criteria specified by the contest creator. This may include voting from the community, judging by a panel, or a combination of both.
                            </p>
                        </div>

                        {/* FAQ Card 4 */}
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border-2 border-secondary/10 dark:border-secondary/20 hover:border-secondary">
                            <h3 className="text-xl font-bold text-primary dark:text-white mb-4">
                                How do I receive my prize if I win?
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                Prizes are typically distributed through the payment method you have on file. For physical prizes, we'll contact you for shipping information.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Contact;