import React from 'react';
import { FaFacebook, FaLinkedinIn, FaPhoneAlt } from 'react-icons/fa';
import { FaLocationDot, FaSquareInstagram, FaXTwitter } from 'react-icons/fa6';
import { IoLogoYoutube } from 'react-icons/io';
import { MdEmail } from 'react-icons/md';

const Footer = () => {
    return (
      <div className='bg-primary'>
            <footer className="footer sm:footer-horizontal  text-neutral-content p-10">
                <nav>
                    <a className=" text-xl text-white font-bold">Contest<span className='text-yellow-400'>H</span>ub</a>
                    <p>A CREATIVE CONTEST SHOWCASE PLATFORM</p>
                </nav>

                <nav>
                    <h6 className="footer-title">contact info</h6>
                    <div className='flex items-center gap-1'>
                        <span><FaLocationDot /></span>
                        <p> Dhaka,Bangladesh </p>
                    </div>
                    <div className='flex items-center gap-1'>
                        <span><FaPhoneAlt /></span>
                        <p> 01746931945 </p>
                    </div>

                    <div className='flex items-center gap-1'>
                        <span><MdEmail /></span>
                        <p> contesthub32@gmail.com </p>
                    </div>

                </nav>
                <nav>
                    <h6 className="footer-title">social links</h6>
                   <div className='flex items-center gap-1'>
                        <span><FaFacebook /></span>
                        <p> <a target='_blank' className='hover:underline' href="https://www.facebook.com/sm.emon.564">Facebook</a> </p>
                    </div>

                    <div className='flex items-center gap-1'>
                        <span><IoLogoYoutube /></span>
                        <p> <a target='_blank' className='hover:underline' href="https://www.youtube.com/">Youtube </a> </p>
                    </div>

                      <div className='flex items-center gap-1'>
                        <span><FaSquareInstagram /></span>
                        <p> <a target='_blank' className='hover:underline' href="https://www.instagram.com/">Instagram</a> </p>
                    </div>

                       <div className='flex items-center gap-1'>
                        <span><FaXTwitter /></span>
                        <p> <a target='_blank' className='hover:underline' href="https://x.com/">Twitter</a> </p>
                    </div>

                      <div className='flex items-center gap-1'>
                        <span><FaLinkedinIn /></span>
                        <p> <a target='_blank' className='hover:underline' href="https://www.linkedin.com/">Linkedin</a> </p>
                    </div>

                </nav>

            </footer>
            <div className=' h-[1px] bg-base-300 mx-10'></div>
            <p className='text-center text-white py-5'>© 2025 CONTEST<span className='text-yellow-400'>H</span>UB. All rights reserved.</p>
        </div>
    );
};

export default Footer;