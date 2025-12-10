import React from 'react';
import { CiCalendarDate } from 'react-icons/ci';
import { FaUserFriends } from 'react-icons/fa';
import { FiAward } from 'react-icons/fi';
import { MdOutlineDateRange } from 'react-icons/md';
import { Link } from 'react-router';

const ContestCard = () => {
    return (
        <div>
            {/* Card Container */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-5 gap-5 md:my-20'>

                {/* Card */}
                <div className='bg-base-100 rounded-t-lg'>
                    <div className="card-image">
                        <img src="https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" className='rounded-t-lg' />
                    </div>
                    <div className="card-body">
                        <div>
                            <h2 className='text-lg font-bold text-gray-900 dark:text-white mb-2'>Modern Logo Design Challenge</h2>
                            <p className='text-gray-600 dark:text-gray-300 text-sm mb-4 '>Design a modern, creative logo for a tech startup...</p>
                        </div>

                        <div className='flex flex-col justify-between gap-3'>
                            <div className='flex items-center gap-2'>
                                <FaUserFriends className='text-primary ' />
                                <p className='text-gray-700  font-medium'>342 Participants</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <FiAward className='text-secondary ' />
                                <p className='text-gray-700  font-medium'>Prize: $5000</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <MdOutlineDateRange className='text-error ' />
                                <p className='text-gray-700  font-medium'>21 days left</p>
                            </div>

                            <div>
                                <Link className='btn btn-primary w-full'>View Details</Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ContestCard;