import React from 'react';
import { CiCalendarDate } from 'react-icons/ci';
import { FaUserFriends } from 'react-icons/fa';
import { FiAward } from 'react-icons/fi';
import { MdOutlineDateRange } from 'react-icons/md';
import { Link } from 'react-router';

const ContestCard = ({ contest }) => {
    console.log(contest)
    return (
        <div>
            {/* Card Container */}
            <div>

                {/* Card */}
                <div className='bg-base-100 rounded-t-lg'>
                    <div className="card-image">
                        <img src={contest.contestImage} alt="" className='rounded-t-lg' />
                    </div>
                    <div className="card-body">
                        <div>
                            <h2 className='text-lg font-bold text-gray-900 dark:text-white mb-2'>{contest.contestName}</h2>
                            <p className='text-gray-600 dark:text-gray-300 text-sm mb-4 '>{contest.description.slice(0,50)}...</p>
                        </div>

                        <div className='flex flex-col justify-between gap-3'>
                            <div className='flex items-center gap-2'>
                                <FaUserFriends className='text-primary ' />
                                <p className='text-gray-700  font-medium'>{contest.participantsCount} Participants</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <FiAward className='text-secondary ' />
                                <p className='text-gray-700  font-medium'>Prize: ${contest.prizeMoney}</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <MdOutlineDateRange className='text-error ' />
                                <p className='text-gray-700  font-medium'>{
                                    Math.max(
                                        0,
                                        Math.ceil((new Date(contest.deadline) - new Date()) / (1000 * 60 * 60 * 24)))}
                                    days
                                </p>
                            </div>

                            <div>
                                <Link to={`/contest/details/${contest._id}`} className='btn btn-primary w-full'>View Details</Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ContestCard;