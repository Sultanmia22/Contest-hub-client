import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import { FaMedal, FaTrophy, FaCrown, FaUser } from 'react-icons/fa';
import { MdEmail, MdLeaderboard } from 'react-icons/md';

const Leaderboard = () => {
    const axiosSecure = useAxiosSecure();

    const { data: datas = [], isLoading } = useQuery({
        queryKey: ['leaderboard'],
        queryFn: async () => {
            const result = await axiosSecure.get('/leaderboard');
            return result.data;
        }
    });

    if (isLoading) {
        return (
            <div className="min-h-[600px] flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">Loading leaderboard...</p>
                </div>
            </div>
        );
    }

    const topThree = datas.slice(0, 3);
    const restOfList = datas.slice(3);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg">
                        <MdLeaderboard className="text-white text-3xl" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        Leaderboard
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Top performers ranked by contest wins
                    </p>
                </div>

                {datas.length === 0 ? (
                    <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <FaTrophy className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                            No data available
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            Be the first to win a contest and appear on the leaderboard!
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Top 3 Podium */}
                        {topThree.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                                {/* 2nd Place */}
                                {topThree[1] && (
                                    <div className="md:order-1 order-2">
                                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border-t-4 border-slate-400 hover:shadow-lg transition-shadow duration-300 text-center h-full flex flex-col items-center justify-center">
                                            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
                                                <FaMedal className="text-slate-400 text-2xl" />
                                            </div>
                                            <div className="text-2xl font-bold text-slate-600 dark:text-slate-300 mb-1">2nd Place</div>
                                            <div className="font-semibold text-gray-900 dark:text-white text-lg mb-1 truncate w-full px-2">
                                                {topThree[1].name}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400 mb-3 truncate w-full px-4">
                                                {topThree[1]._id}
                                            </div>
                                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-full">
                                                <FaTrophy className="text-slate-500 text-sm" />
                                                <span className="font-bold text-slate-700 dark:text-slate-300">{topThree[1].wins} wins</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* 1st Place */}
                                {topThree[0] && (
                                    <div className="md:order-2 order-1 md:-mt-4">
                                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border-t-4 border-yellow-400 hover:shadow-xl transition-shadow duration-300 text-center">
                                            <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-4 mx-auto ring-4 ring-yellow-50 dark:ring-yellow-900/20">
                                                <FaCrown className="text-yellow-500 text-3xl" />
                                            </div>
                                            <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">1st Place</div>
                                            <div className="font-bold text-gray-900 dark:text-white text-xl mb-1 truncate w-full px-2">
                                                {topThree[0].name}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 truncate w-full px-4">
                                                {topThree[0]._id}
                                            </div>
                                            <div className="inline-flex items-center gap-2 px-5 py-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                                                <FaTrophy className="text-yellow-600 text-sm" />
                                                <span className="font-bold text-yellow-700 dark:text-yellow-400 text-lg">{topThree[0].wins} wins</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* 3rd Place */}
                                {topThree[2] && (
                                    <div className="md:order-3 order-3">
                                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border-t-4 border-orange-400 hover:shadow-lg transition-shadow duration-300 text-center h-full flex flex-col items-center justify-center">
                                            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4">
                                                <FaMedal className="text-orange-500 text-2xl" />
                                            </div>
                                            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">3rd Place</div>
                                            <div className="font-semibold text-gray-900 dark:text-white text-lg mb-1 truncate w-full px-2">
                                                {topThree[2].name}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400 mb-3 truncate w-full px-4">
                                                {topThree[2]._id}
                                            </div>
                                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                                                <FaTrophy className="text-orange-600 text-sm" />
                                                <span className="font-bold text-orange-700 dark:text-orange-400">{topThree[2].wins} wins</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Rest of the List */}
                        {restOfList.length > 0 && (
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-24">
                                                    Rank
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                    User
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                                                    Email
                                                </th>
                                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-32">
                                                    Wins
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {restOfList.map((data, index) => {
                                                const actualRank = index + 4;

                                                return (
                                                    <tr
                                                        key={actualRank}
                                                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                                                    >
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-semibold text-sm">
                                                                {actualRank}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                                                    <FaUser className="text-blue-600 dark:text-blue-400 text-sm" />
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                                        {data.name}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                                                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                                <MdEmail className="mr-2 text-gray-400" size={16} />
                                                                <span className="truncate max-w-xs">{data._id}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                                                                {data.wins}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                            Showing top {datas.length} performers
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Leaderboard;