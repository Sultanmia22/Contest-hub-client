import React from 'react';
import { GoGift, GoTrophy } from 'react-icons/go';
import { FaMedal, FaCalendarAlt } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../Hook/useAuth';
import useAxiosSecure from '../../../../Hook/useAxiosSecure';
import Loading from '../../../../Components/LoadingPage/Loading';

const WinningContest = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: winningData = [], isLoading } = useQuery({
        queryKey: ['winning-contest', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const result = await axiosSecure.get(`/winning-contests?winningEmail=${user?.email}`);
            return result.data;
        },
    });

    const totalPrize = winningData.reduce((acc, curr) => acc + Number(curr.prizeMoney || 0), 0);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-950">
            <div className="mx-auto max-w-6xl">
                
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                        My Winning Contests
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Celebrate your victories and track your achievements
                    </p>
                </div>

                {/* Stats Overview */}
                <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Total Wins Card */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                <GoTrophy size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Total Wins</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {winningData.length}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Total Prize Card */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                                <GoGift size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Total Earnings</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                    ${totalPrize}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Achievement Level Card */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400">
                                <FaMedal size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Achievement Level</p>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {winningData.length >= 5 ? 'Champion' : winningData.length >= 3 ? 'Expert' : winningData.length >= 1 ? 'Rising Star' : 'Beginner'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Winning Contests List */}
                <div className="space-y-4">
                    {winningData.map((contest) => (
                        <div
                            key={contest._id}
                            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700/50"
                        >
                            <div className="flex flex-col gap-6 md:flex-row">
                                {/* Image */}
                                <div className="shrink-0">
                                    <img
                                        src={contest?.contestImage}
                                        alt={contest?.contestName}
                                        className="h-32 w-full rounded-lg object-cover md:h-24 md:w-32"
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex flex-1 flex-col justify-between">
                                    <div>
                                        <div className="flex flex-wrap items-start justify-between gap-2">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                {contest?.contestName}
                                            </h3>
                                            <span className="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-2.5 py-1 text-xs font-medium text-yellow-700 ring-1 ring-yellow-600/20 dark:bg-yellow-900/20 dark:text-yellow-300 dark:ring-yellow-500/30">
                                                <FaMedal size={12} />
                                                1st Place
                                            </span>
                                        </div>

                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                            {contest?.contestType}
                                        </p>

                                        <div className="mt-3 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                            <FaCalendarAlt size={14} className="text-gray-400" />
                                            <span>
                                                {contest?.deadline
                                                    ? new Date(contest.deadline).toLocaleDateString('en-US', {
                                                          year: 'numeric',
                                                          month: 'short',
                                                          day: 'numeric',
                                                      })
                                                    : 'N/A'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Prize Section */}
                                <div className="flex flex-col items-start justify-center border-t border-gray-100 pt-4 dark:border-gray-700 md:items-end md:border-l md:border-t-0 md:pl-6 md:pt-0">
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Prize Won</p>
                                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                        ${contest?.prizeMoney || 0}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {winningData.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                            <GoTrophy className="text-2xl text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            No wins yet
                        </h3>
                        <p className="mt-1 max-w-sm text-sm text-gray-500 dark:text-gray-400">
                            Keep participating in contests. Your first victory could be just around the corner!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WinningContest;