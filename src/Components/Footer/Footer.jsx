import React from 'react';
import { FaFacebook, FaLinkedinIn, FaPhoneAlt } from 'react-icons/fa';
import { FaLocationDot, FaSquareInstagram, FaXTwitter } from 'react-icons/fa6';
import { IoLogoYoutube } from 'react-icons/io';
import { MdEmail } from 'react-icons/md';

const Footer = () => {
    return (
        <div className='bg-primary dark:bg-gray-900'>
            {/* Main Footer */}
            <footer className="footer sm:footer-horizontal text-neutral-content p-10 md:p-16 gap-8 md:gap-16">
                
                {/* Brand Section */}
                <nav className='flex flex-col gap-4'>
                    <div className='flex items-center gap-2 mb-2'>
                        <div className='w-10 h-10 bg-secondary rounded-lg flex items-center justify-center'>
                            <span className='text-white font-bold text-lg'>C</span>
                        </div>
                        <a className="text-2xl text-white font-bold">
                            Contest<span className='text-accent'>H</span>ub
                        </a>
                    </div>
                    <p className='text-sm text-gray-300 dark:text-gray-400 max-w-xs'>A CREATIVE CONTEST SHOWCASE PLATFORM</p>
                    
                    {/* Social Icons */}
                    <div className='flex gap-3 mt-4'>
                        <a target='_blank' rel='noreferrer' href="https://www.facebook.com/sm.emon.564" className='p-3 bg-secondary/20 hover:bg-secondary rounded-lg transition-all duration-300 text-secondary hover:text-white'>
                            <FaFacebook size={18} />
                        </a>
                        <a target='_blank' rel='noreferrer' href="https://www.youtube.com/" className='p-3 bg-secondary/20 hover:bg-secondary rounded-lg transition-all duration-300 text-secondary hover:text-white'>
                            <IoLogoYoutube size={18} />
                        </a>
                        <a target='_blank' rel='noreferrer' href="https://www.instagram.com/" className='p-3 bg-secondary/20 hover:bg-secondary rounded-lg transition-all duration-300 text-secondary hover:text-white'>
                            <FaSquareInstagram size={18} />
                        </a>
                        <a target='_blank' rel='noreferrer' href="https://x.com/" className='p-3 bg-secondary/20 hover:bg-secondary rounded-lg transition-all duration-300 text-secondary hover:text-white'>
                            <FaXTwitter size={18} />
                        </a>
                        <a target='_blank' rel='noreferrer' href="https://www.linkedin.com/" className='p-3 bg-secondary/20 hover:bg-secondary rounded-lg transition-all duration-300 text-secondary hover:text-white'>
                            <FaLinkedinIn size={18} />
                        </a>
                    </div>
                </nav>

                {/* Contact Info Section */}
                <nav className='flex flex-col gap-5'>
                    <h6 className="footer-title text-white text-lg font-bold">Contact Info</h6>
                    
                    <div className='flex items-start gap-3 hover:translate-x-1 transition-transform duration-300'>
                        <span className='text-secondary mt-1 flex-shrink-0'>
                            <FaLocationDot size={18} />
                        </span>
                        <p className='text-gray-300 dark:text-gray-400'>Dhaka, Bangladesh</p>
                    </div>
                    
                    <div className='flex items-start gap-3 hover:translate-x-1 transition-transform duration-300'>
                        <span className='text-secondary mt-1 flex-shrink-0'>
                            <FaPhoneAlt size={18} />
                        </span>
                        <a href='tel:01746931945' className='text-gray-300 dark:text-gray-400 hover:text-accent transition-colors'>
                            01746931945
                        </a>
                    </div>

                    <div className='flex items-start gap-3 hover:translate-x-1 transition-transform duration-300'>
                        <span className='text-secondary mt-1 flex-shrink-0'>
                            <MdEmail size={18} />
                        </span>
                        <a href='mailto:contesthub32@gmail.com' className='text-gray-300 dark:text-gray-400 hover:text-accent transition-colors'>
                            contesthub32@gmail.com
                        </a>
                    </div>
                </nav>

                {/* Social Links Section */}
                <nav className='flex flex-col gap-5'>
                    <h6 className="footer-title text-white text-lg font-bold">Social Links</h6>
                    
                    <div className='flex items-center gap-3 hover:translate-x-1 transition-transform duration-300'>
                        <span className='text-secondary'>
                            <FaFacebook size={18} />
                        </span>
                        <a target='_blank' rel='noreferrer' className='text-gray-300 dark:text-gray-400 hover:text-accent hover:underline transition-colors' href="https://www.facebook.com/sm.emon.564">
                            Facebook
                        </a>
                    </div>

                    <div className='flex items-center gap-3 hover:translate-x-1 transition-transform duration-300'>
                        <span className='text-secondary'>
                            <IoLogoYoutube size={18} />
                        </span>
                        <a target='_blank' rel='noreferrer' className='text-gray-300 dark:text-gray-400 hover:text-accent hover:underline transition-colors' href="https://www.youtube.com/">
                            Youtube
                        </a>
                    </div>

                    <div className='flex items-center gap-3 hover:translate-x-1 transition-transform duration-300'>
                        <span className='text-secondary'>
                            <FaSquareInstagram size={18} />
                        </span>
                        <a target='_blank' rel='noreferrer' className='text-gray-300 dark:text-gray-400 hover:text-accent hover:underline transition-colors' href="https://www.instagram.com/">
                            Instagram
                        </a>
                    </div>

                    <div className='flex items-center gap-3 hover:translate-x-1 transition-transform duration-300'>
                        <span className='text-secondary'>
                            <FaXTwitter size={18} />
                        </span>
                        <a target='_blank' rel='noreferrer' className='text-gray-300 dark:text-gray-400 hover:text-accent hover:underline transition-colors' href="https://x.com/">
                            Twitter
                        </a>
                    </div>

                    <div className='flex items-center gap-3 hover:translate-x-1 transition-transform duration-300'>
                        <span className='text-secondary'>
                            <FaLinkedinIn size={18} />
                        </span>
                        <a target='_blank' rel='noreferrer' className='text-gray-300 dark:text-gray-400 hover:text-accent hover:underline transition-colors' href="https://www.linkedin.com/">
                            Linkedin
                        </a>
                    </div>
                </nav>
            </footer>

            {/* Divider */}
            <div className='h-px bg-gradient-to-r from-secondary/30 via-secondary to-secondary/30 mx-10'></div>

            {/* Copyright */}
            <div className='py-8 text-center border-t border-secondary/20'>
                <p className='text-gray-300 dark:text-gray-400 text-sm'>
                    © 2025 CONTEST<span className='text-accent font-semibold'>H</span>UB. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Footer;