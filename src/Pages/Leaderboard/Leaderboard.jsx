import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import { FaMedal } from 'react-icons/fa';
import { MdLeaderboard } from 'react-icons/md';

const Leaderboard = () => {
    const axiosSecure = useAxiosSecure()
    const { data: datas = [] } = useQuery({
        queryKey: ['leaderboad'],
        queryFn: async () => {
            const result = await axiosSecure.get('/leaderboard')
            return result.data
        }
    })

    console.log(datas)

    // Get medal color based on rank
    const getMedalColor = (index) => {
        if (index === 0) return 'text-yellow-500';
        if (index === 1) return 'text-gray-400';
        if (index === 2) return 'text-orange-600';
        return 'text-primary dark:text-primary';
    }

    return (
        <div className='flow-root'>
            <div className='my-10 rounded-3xl py-12 md:py-20 min-h-[600px] bg-gradient-to-b from-primary/5 to-secondary/5 dark:from-gray-800 dark:to-gray-900'>
                
                {/* Title Section */}
                <div className='text-center space-y-4 mb-12 md:mb-16'>
                    <div className='flex items-center justify-center gap-3 mb-4'>
                        <MdLeaderboard className='text-secondary text-4xl md:text-5xl animate-pulse' />
                    </div>
                    <h2 className='text-3xl md:text-6xl font-bold text-white dark:text-white'>
                        Leaderboard
                    </h2>
                    <p className='text-base md:text-lg text-gray-300 dark:text-gray-100'>
                        Dynamic Rankings by Contest Wins
                    </p>
                    <div className='flex justify-center'>
                        <div className='h-1 w-24 bg-gradient-to-r from-secondary via-accent to-secondary rounded-full'></div>
                    </div>
                </div>

                {/* Table Container */}
                <div className='mx-4 md:mx-8 lg:mx-10'>
                    <div className="overflow-x-auto w-full rounded-2xl shadow-xl border-2 border-secondary/20 dark:border-secondary/30">
                        <table className="table table-zebra w-full min-w-[600px] bg-white dark:bg-gray-800">
                            
                            {/* Table Head */}
                            <thead className='bg-gradient-to-r from-secondary to-secondary/80 dark:from-secondary dark:to-secondary/90 text-white dark:text-white text-sm md:text-base font-bold'>
                                <tr>
                                    <th className='text-center py-4 text-white dark:text-white'>Rank</th>
                                    <th className='py-4 text-white dark:text-white'>Name</th>
                                    <th className='py-4 text-white dark:text-white'>Email</th>
                                    <th className='text-center py-4 text-white dark:text-white'>Wins</th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody>
                                {
                                    datas.map((data, index) =>
                                        <tr 
                                            key={index}
                                            className={`border-b border-secondary/10 dark:border-secondary/20 hover:bg-secondary/10 dark:hover:bg-secondary/10 transition-colors duration-300 ${
                                                index === 0 ? 'bg-yellow-100 dark:bg-yellow-900/10' : 
                                                index === 1 ? 'bg-gray-200 dark:bg-gray-700/30' : 
                                                index === 2 ? 'bg-orange-100 dark:bg-orange-900/10' : 
                                                'bg-white dark:bg-gray-800'
                                            }`}
                                        >
                                            {/* Rank Column */}
                                            <th className='text-center py-5'>
                                                <div className='flex items-center justify-center gap-2'>
                                                    {index < 3 ? (
                                                        <FaMedal className={`${getMedalColor(index)} text-xl md:text-2xl`} />
                                                    ) : (
                                                        <span className='w-8 h-8 flex items-center justify-center rounded-full bg-secondary/30 dark:bg-secondary/30 text-primary dark:text-primary font-bold text-sm'>
                                                            {index + 1}
                                                        </span>
                                                    )}
                                                </div>
                                            </th>

                                            {/* Name Column */}
                                            <td className='py-5'>
                                                <div className='font-bold text-primary dark:text-white text-sm md:text-base'>
                                                    {data.name}
                                                </div>
                                            </td>

                                            {/* Email Column */}
                                            <td className='py-5'>
                                                <div className='text-primary dark:text-gray-300 text-sm md:text-base truncate'>
                                                    {data._id}
                                                </div>
                                            </td>

                                            {/* Wins Column */}
                                            <td className='text-center py-5'>
                                                <div className='inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-secondary to-secondary/80 dark:from-secondary dark:to-secondary/90 text-white dark:text-white font-bold text-sm md:text-base shadow-md'>
                                                    {data.wins}
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Empty State */}
                {datas.length === 0 && (
                    <div className='text-center py-12'>
                        <p className='text-gray-700 dark:text-gray-300 text-lg'>No leaderboard data available yet</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Leaderboard;