import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaUsers, FaTrophy, FaCheckCircle, FaClock, FaHourglassHalf } from 'react-icons/fa';
import useAxiosSecure from '../../../../Hook/useAxiosSecure';
import useAuth from '../../../../Hook/useAuth';

const MyParticipated = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // GET MY PARTICIPANT CONTEST 
    const { 
        data: participantContest = [], 
        isLoading, 
        isError 
    } = useQuery({
        queryKey: ['my-participantInfo', user?.email],
        queryFn: async () => {
            const result = await axiosSecure.get(`/my-perticipantContest?perticipantEmail=${user?.email}`);
            return result.data;
        },
        enabled: !!user?.email,
    });

    // Status badge styling
    const getStatusBadge = (status) => {
        const baseClasses = 'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium';
        
        switch (status?.toLowerCase()) {
            case 'submitted':
                return `${baseClasses} bg-blue-50 text-blue-700 ring-1 ring-blue-600/20 dark:bg-blue-900/20 dark:text-blue-300 dark:ring-blue-500/30`;
            case 'won':
                return `${baseClasses} bg-green-50 text-green-700 ring-1 ring-green-600/20 dark:bg-green-900/20 dark:text-green-300 dark:ring-green-500/30`;
            case 'pending':
                return `${baseClasses} bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/20 dark:bg-yellow-900/20 dark:text-yellow-300 dark:ring-yellow-500/30`;
            default:
                return `${baseClasses} bg-gray-50 text-gray-700 ring-1 ring-gray-600/20 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-500/30`;
        }
    };

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'submitted':
                return <FaCheckCircle size={12} />;
            case 'won':
                return <FaTrophy size={12} />;
            case 'pending':
                return <FaHourglassHalf size={12} />;
            default:
                return <FaClock size={12} />;
        }
    };

    if (isLoading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Loading contests...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex min-h-[400px] items-center justify-center px-4">
                <div className="text-center">
                    <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaTrophy className="text-red-500 text-2xl" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Failed to load</h3>
                    <p className="text-gray-500 dark:text-gray-400">Could not fetch your contest data.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-950">
            <div className="mx-auto max-w-6xl">
                
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                        My Participated Contests
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Track your contest entries, submission status, and results
                    </p>
                </div>

                {/* Stats Overview */}
                <div className="mb-8 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                <FaUsers size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Total Entries</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {participantContest.length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                                <FaTrophy size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Won</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {participantContest.filter(c => 
                                        c.perticipants?.some(p => p.status === 'won')
                                    ).length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400">
                                <FaHourglassHalf size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {participantContest.filter(c => 
                                        c.perticipants?.some(p => p.status === 'pending')
                                    ).length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white w-16">
                                        #
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                        Contest Name
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white">
                                        Participants
                                    </th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white">
                                        Prize
                                    </th>
                                </tr>
                            </thead>
                            
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {participantContest.map((contest, index) => (
                                    <tr 
                                        key={contest._id || index}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                                {index + 1}
                                            </span>
                                        </td>
                                        
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900 dark:text-white">
                                                {contest.contestName}
                                            </div>
                                        </td>
                                        
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-2">
                                                {contest.perticipants?.map((p, idx) => (
                                                    <span 
                                                        key={idx} 
                                                        className={getStatusBadge(p.status)}
                                                    >
                                                        {getStatusIcon(p.status)}
                                                        <span className="capitalize">{p.status}</span>
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        
                                        <td className="px-6 py-4 text-center">
                                            <div className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300">
                                                <FaUsers size={14} className="text-gray-400" />
                                                {contest.participantsCount || 0}
                                            </div>
                                        </td>
                                        
                                        <td className="px-6 py-4 text-right">
                                            <span className="inline-flex items-center rounded-lg bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700 ring-1 ring-blue-600/20 dark:bg-blue-900/20 dark:text-blue-300 dark:ring-blue-500/30">
                                                ${contest.prizeMoney || 0}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Empty State */}
                    {participantContest.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-16 px-4">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                                <FaTrophy className="text-2xl text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                No contests yet
                            </h3>
                            <p className="text-center text-sm text-gray-500 dark:text-gray-400 max-w-sm">
                                You haven't participated in any contests yet. Browse available contests and join one to get started.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyParticipated;