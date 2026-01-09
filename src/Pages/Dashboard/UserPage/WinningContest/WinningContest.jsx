import React from 'react';
import { GoGift, GoTrophy } from 'react-icons/go';
import UseRole from '../../../../Hook/UseRole';
import useAuth from '../../../../Hook/useAuth';
import useAxiosSecure from '../../../../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../Components/LoadingPage/Loading';
import { FaMedal, FaCalendarAlt } from 'react-icons/fa';

const WinningContest = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: winningData = [], isLoading } = useQuery({
        queryKey: ['winning-contest', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const result = await axiosSecure.get(`/winning-contests?winningEmail=${user?.email}`)
            return result.data
        }
    })
    
    const allPrizeData = winningData.map(data => Number(data.prizeMoney));
    const totalPrize = allPrizeData.reduce((acc, num) => acc + num, 0)

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='flow-root mx-4 md:mx-8'>
            
            {/* Header Section */}
            <div className='my-8 md:my-12 space-y-4'>
                <h2 className='text-3xl md:text-5xl text-primary dark:text-white font-bold'>
                    My Winning Contests
                </h2>
                <p className='text-base md:text-lg text-gray-700 dark:text-gray-300'>
                    Celebrate your victories and showcase your design excellence across multiple competitions.
                </p>
                <div className='h-1 w-24 bg-gradient-to-r from-secondary via-accent to-secondary rounded-full'></div>
            </div>

            {/* Stats Section */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-12'>
                
                {/* Total Wins Card */}
                <div className='bg-gradient-to-br from-secondary/10 to-secondary/5 dark:from-secondary/20 dark:to-secondary/10 border-2 border-secondary/20 dark:border-secondary/30 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-gray-700 dark:text-gray-400 font-semibold text-sm mb-2'>Total Wins</p>
                            <h3 className='text-5xl md:text-6xl font-bold text-secondary'>
                                {winningData?.length}
                            </h3>
                        </div>
                        <div className='bg-gradient-to-br from-secondary/30 to-secondary/20 dark:from-secondary/40 dark:to-secondary/30 p-6 rounded-2xl'>
                            <GoTrophy size={48} className='text-secondary' />
                        </div>
                    </div>
                </div>

                {/* Total Prize Card */}
                <div className='bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 border-2 border-accent/20 dark:border-accent/30 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-gray-700 dark:text-gray-400 font-semibold text-sm mb-2'>Total Prize Money</p>
                            <h3 className='text-4xl md:text-5xl font-bold text-accent'>
                                ${totalPrize}
                            </h3>
                        </div>
                        <div className='bg-gradient-to-br from-accent/30 to-accent/20 dark:from-accent/40 dark:to-accent/30 p-6 rounded-2xl'>
                            <GoGift size={48} className='text-accent' />
                        </div>
                    </div>
                </div>
            </div>

            {/* Winning Contests Grid */}
            <div className='space-y-6'>
                {
                    winningData.map((data, index) =>
                        <div key={index} className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-secondary/10 dark:border-secondary/20'>
                            
                            <div className='flex flex-col md:flex-row gap-6 p-6 md:p-8'>
                                
                                {/* Image Section */}
                                <div className='md:w-48 flex-shrink-0'>
                                    <img
                                        src={data?.contestImage}
                                        alt={data?.contestName}
                                        className='w-full h-48 rounded-xl object-cover shadow-md group-hover:scale-105 transition-transform duration-300'
                                    />
                                </div>

                                {/* Content Section */}
                                <div className='flex-1 flex flex-col justify-between'>
                                    
                                    {/* Top Content */}
                                    <div>
                                        <h2 className='text-2xl md:text-3xl font-bold text-primary dark:text-white mb-4'>
                                            {data?.contestName}
                                        </h2>
                                        
                                        {/* Type Badge */}
                                        <div className='mb-4'>
                                            <span className='inline-block px-4 py-2 bg-secondary/20 dark:bg-secondary/30 text-secondary dark:text-secondary font-semibold rounded-full text-sm'>
                                                {data?.contestType}
                                            </span>
                                        </div>

                                        {/* Creator Info */}
                                        <div className='flex items-center gap-3 mb-4'>
                                            <img 
                                                src='https://i.ibb.co.com/Y4nSkysH/Sample-User-Icon.png'
                                                alt='creator'
                                                className='w-8 h-8 rounded-full border-2 border-secondary/30' 
                                            />
                                            <span className='text-gray-700 dark:text-gray-300 font-medium'>
                                                By {data?.creator}
                                            </span>
                                        </div>

                                        {/* Medal Badge */}
                                        <div className='inline-block px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-300 to-yellow-200 dark:from-yellow-600 dark:to-yellow-500 font-bold text-gray-900 shadow-md flex items-center gap-2'>
                                            <FaMedal size={18} />
                                            🥇 1st Place
                                        </div>
                                    </div>

                                </div>

                                {/* Right Section - Prize & Date */}
                                <div className='flex flex-col justify-between items-start md:items-end gap-4 md:gap-0 md:min-w-[200px]'>
                                    
                                    {/* Prize */}
                                    <div className='text-right w-full md:w-auto'>
                                        <p className='text-xs text-gray-600 dark:text-gray-400 mb-1 font-medium'>Prize Won</p>
                                        <p className='text-3xl md:text-4xl font-bold text-secondary'>
                                            ${data?.prizeMoney}
                                        </p>
                                    </div>

                                    {/* Date */}
                                    <div className='flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm'>
                                        <FaCalendarAlt size={16} className='text-secondary' />
                                        <span className='text-xs md:text-sm'>
                                            {new Date(data?.deadline).toLocaleDateString('en-US', { 
                                                year: 'numeric', 
                                                month: 'short', 
                                                day: 'numeric' 
                                            })}
                                        </span>
                                    </div>

                                </div>

                            </div>

                            {/* Bottom Accent Bar */}
                            <div className='h-1 bg-gradient-to-r from-secondary via-accent to-secondary/50'></div>

                        </div>
                    )
                }
            </div>

            {/* Empty State */}
            {winningData.length === 0 && (
                <div className='text-center py-16'>
                    <FaMedal className='text-6xl text-secondary/30 mx-auto mb-4' />
                    <p className='text-gray-600 dark:text-gray-400 text-lg font-medium'>
                        No winning contests yet. Keep participating and winning!
                    </p>
                </div>
            )}

        </div>
    );
};

export default WinningContest;