import React from 'react';
import { CiCalendarDate } from 'react-icons/ci';
import { FaUserFriends } from 'react-icons/fa';
import { FiAward } from 'react-icons/fi';
import { MdOutlineDateRange } from 'react-icons/md';
import { Link } from 'react-router';

const ContestCard = ({ contest }) => {
    // console.log(contest)
    return (
        <div>
            {/* Card Container */}
            <div>

                {/* Card */}
                <div data-aos="flip-down" className='bg-base-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group'>
                    {/* Image Container with Overlay */}
                    <div className="relative card-image overflow-hidden h-60 w-full">
                        <img 
                            src={contest.contestImage} 
                            alt={contest.contestName}
                            className='h-full w-full object-cover group-hover:scale-110 transition-transform duration-300 rounded-t-2xl'
                        />
                        {/* Gradient Overlay */}
                        <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                    </div>

                    {/* Card Body */}
                    <div className="card-body p-5 md:p-6">
                        {/* Title & Description */}
                        <div className='mb-4'>
                            <h2 className='text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2'>
                                {contest.contestName}
                            </h2>
                            <p className='text-gray-600 dark:text-gray-300 text-sm leading-relaxed'>
                                {contest.description.slice(0, 50)}...
                            </p>
                        </div>

                        {/* Stats Section */}
                        <div className='space-y-3 mb-4 py-4 border-y border-gray-200 dark:border-gray-700'>
                            {/* Participants */}
                            <div className='flex items-center gap-3 group/stat'>
                                <div className='p-2 rounded-lg bg-primary/10 group-hover/stat:bg-primary/20 transition-colors'>
                                    <FaUserFriends className='text-primary text-lg' />
                                </div>
                                <div className='flex-1'>
                                    <p className='text-xs text-gray-500 dark:text-gray-400'>Participants</p>
                                    <p className='text-gray-900 dark:text-white font-semibold'>
                                        {contest.participantsCount}
                                    </p>
                                </div>
                            </div>

                            {/* Prize Money */}
                            <div className='flex items-center gap-3 group/stat'>
                                <div className='p-2 rounded-lg bg-secondary/10 group-hover/stat:bg-secondary/20 transition-colors'>
                                    <FiAward className='text-secondary text-lg' />
                                </div>
                                <div className='flex-1'>
                                    <p className='text-xs text-gray-500 dark:text-gray-400'>Prize Pool</p>
                                    <p className='text-gray-900 dark:text-white font-semibold'>
                                        ${contest.prizeMoney}
                                    </p>
                                </div>
                            </div>

                            {/* Days Remaining */}
                            <div className='flex items-center gap-3 group/stat'>
                                <div className='p-2 rounded-lg bg-accent/10 group-hover/stat:bg-accent/20 transition-colors'>
                                    <MdOutlineDateRange className='text-accent text-lg' />
                                </div>
                                <div className='flex-1'>
                                    <p className='text-xs text-gray-500 dark:text-gray-400'>Days Left</p>
                                    <p className='text-gray-900 dark:text-white font-semibold'>
                                        {Math.max(
                                            0,
                                            Math.floor((new Date(contest.deadline) - new Date()) / (1000 * 60 * 60 * 24))
                                        )} days
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Button */}
                        <div>
                            <Link 
                                to={`/contest/details/${contest._id}`} 
                                className='btn btn-primary w-full rounded-lg font-semibold hover:scale-105 transition-transform duration-200 bg-primary dark:bg-primary text-white dark:text-gray-900 hover:bg-primary/90 dark:hover:bg-primary/90 border-0'
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ContestCard;