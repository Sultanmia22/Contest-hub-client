import React from 'react';
import useAxiosSecure from '../../../../Hook/useAxiosSecure';
import useAuth from '../../../../Hook/useAuth';
import { useQuery } from '@tanstack/react-query';
import { FaCheckCircle, FaClock, FaUsers, FaTrophy } from 'react-icons/fa';

const MyParticipated = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()

    // GET MY PERTICIPANT CONTEST 
    const { data: perticipantContest = [], isLoading, refetch } = useQuery({
        queryKey: ['my-perticipantInfo', user?.email],
        queryFn: async () => {
            const result = await axiosSecure.get(`/my-perticipantContest?perticipantEmail=${user?.email}`);
            return result.data
        }
    })

    console.log(perticipantContest)

    // Status badge styling
    const getStatusBadge = (status) => {
        switch (status) {
            case 'submitted':
                return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-600';
            case 'won':
                return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-300 dark:border-green-600';
            case 'pending':
                return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border border-yellow-300 dark:border-yellow-600';
            default:
                return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600';
        }
    };

    return (
        <div className='flow-root'>
            {/* Header Section */}
            <div className='bg-gradient-to-r from-secondary via-secondary/90 to-secondary/80 dark:from-secondary dark:to-secondary/90 my-5 mx-5 p-10 md:p-14 rounded-2xl space-y-4 shadow-xl border-2 border-secondary/20'>
                <h2 className='text-2xl md:text-5xl text-white font-bold'>My Participated Contests</h2>
                <p className='text-sm md:text-lg text-white/90'>
                    Track all your contest participation, manage payments, and monitor your performance in real-time.
                </p>
            </div>

            {/* Table Section */}
            <div className='flow-root'>
                <div className='mx-4 my-6 md:m-8'>

                    {/* MOBILE RESPONSIVE WRAPPER */}
                    <div className="overflow-x-auto w-full rounded-2xl shadow-xl border-2 border-secondary/20 dark:border-secondary/30">

                        {/* TABLE */}
                        <table className="table table-zebra w-full min-w-[600px] bg-white dark:bg-gray-800">

                            {/* Head */}
                            <thead className='bg-gradient-to-r from-secondary to-secondary/80 dark:from-secondary dark:to-secondary/90 text-white font-bold text-sm md:text-base'>
                                <tr>
                                    <th className='py-4 text-center'>No.</th>
                                    <th className='py-4'>Contest Name</th>
                                    <th className='py-4'>Status</th>
                                    <th className='py-4 text-center'>Participants</th>
                                    <th className='py-4 text-center'>Prize Pool</th>
                                </tr>
                            </thead>

                            {/* Body */}
                            <tbody>
                                {
                                    perticipantContest?.map((contest, index) =>
                                        <tr
                                            key={index}
                                            className='border-b border-secondary/10 dark:border-secondary/20 hover:bg-secondary/5 dark:hover:bg-secondary/10 transition-colors duration-300'
                                        >
                                            {/* Number */}
                                            <th className='py-5 text-center'>
                                                <span className='inline-block w-8 h-8 rounded-full bg-secondary/20 dark:bg-secondary/30 text-primary dark:text-white font-bold flex items-center justify-center text-sm'>
                                                    {index + 1}
                                                </span>
                                            </th>

                                            {/* Contest Name */}
                                            <td className='py-5'>
                                                <div className='font-semibold text-primary dark:text-white text-sm md:text-base'>
                                                    {contest.contestName}
                                                </div>
                                            </td>

                                            {/* Status */}
                                            <td className='py-5'>
                                                <div className='space-y-2'>
                                                    {contest.perticipants.map((c, idx) => (
                                                        <span
                                                            key={idx}
                                                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(c.status)}`}
                                                        >
                                                            {c.status === 'submitted' && '✓ Submitted'}
                                                            {c.status === 'won' && '🏆 Won'}
                                                            {c.status === 'pending' && '⏳ Pending'}
                                                            {!['submitted', 'won', 'pending'].includes(c.status) && c.status}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>

                                            {/* Participants */}
                                            <td className='py-5'>
                                                <div className='flex items-center justify-center gap-2 font-semibold text-primary dark:text-white'>
                                                    <FaUsers size={16} className='text-secondary' />
                                                    <span>{contest.participantsCount}</span>
                                                </div>
                                            </td>

                                            {/* Prize */}
                                            <td className='py-5'>
                                                <div className='flex items-center justify-center'>
                                                    <div className='inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-secondary to-secondary/80 dark:from-secondary dark:to-secondary/90 text-white font-bold text-sm md:text-base shadow-md'>
                                                        ${contest.prizeMoney}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>

                    {/* Empty State */}
                    {perticipantContest.length === 0 && (
                        <div className='text-center py-16'>
                            <FaTrophy className='text-6xl text-secondary/30 mx-auto mb-4' />
                            <p className='text-gray-600 dark:text-gray-400 text-lg font-medium'>
                                No contests participated yet. Start exploring contests!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyParticipated;