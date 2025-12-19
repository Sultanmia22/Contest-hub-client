import React from 'react';
import { FaClock, FaEnvelope, FaFacebook, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPaperPlane, FaPhone, FaTwitter } from 'react-icons/fa';

const Contact = () => {
    return (
       <div className="min-h-screen bg-primary my-5">
    

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-xl max-w-2xl mx-auto">We'd love to hear from you. Whether you have a question, feedback, or just want to say hello, feel free to reach out.</p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-secondary rounded-lg shadow-md p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h3>
                
                <form>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Your Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium py-3 px-6 rounded-lg hover:shadow-lg transition duration-300 flex items-center"
                  >
                    <span>Send Message</span>
                    <FaPaperPlane className="ml-2" />
                  </button>
                </form>
              </div>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-purple-100 p-3 rounded-full mr-4">
                      <FaEnvelope className="text-purple-600 text-xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Email</h4>
                      <p className="text-gray-600">contact@contesthub.com</p>
                      <p className="text-gray-600">support@contesthub.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-purple-100 p-3 rounded-full mr-4">
                      <FaPhone className="text-purple-600 text-xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Phone</h4>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                      <p className="text-gray-600">+1 (555) 987-6543</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-purple-100 p-3 rounded-full mr-4">
                      <FaMapMarkerAlt className="text-purple-600 text-xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Address</h4>
                      <p className="text-gray-600">123 Contest Street</p>
                      <p className="text-gray-600">Creative City, CC 12345</p>
                      <p className="text-gray-600">United States</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Office Hours</h3>
                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <FaClock className="text-purple-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-600 mb-2">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600 mb-2">Saturday: 10:00 AM - 4:00 PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-blue-600 p-3 rounded-full text-white hover:bg-blue-700 transition">
                    <FaFacebook />
                  </a>
                  <a href="#" className="bg-blue-400 p-3 rounded-full text-white hover:bg-blue-500 transition">
                    <FaTwitter />
                  </a>
                  <a href="#" className="bg-blue-700 p-3 rounded-full text-white hover:bg-blue-800 transition">
                    <FaLinkedin />
                  </a>
                  <a href="#" className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full text-white hover:from-purple-600 hover:to-pink-600 transition">
                    <FaInstagram />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Find answers to common questions about ContestHub</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">How do I create a contest on ContestHub?</h3>
              <p className="text-gray-600">Simply sign up as a Contest Creator, navigate to your dashboard, and click on "Create New Contest". Follow the step-by-step guide to set up your contest details, rules, and prizes.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Is there a fee to participate in contests?</h3>
              <p className="text-gray-600">Some contests may have an entry fee, which is clearly mentioned on the contest page. The fee contributes to the prize pool and platform maintenance.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">How are winners selected?</h3>
              <p className="text-gray-600">Winners are selected based on the criteria specified by the contest creator. This may include voting from the community, judging by a panel, or a combination of both.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">How do I receive my prize if I win?</h3>
              <p className="text-gray-600">Prizes are typically distributed through the payment method you have on file. For physical prizes, we'll contact you for shipping information.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
    );
};

export default Contact;