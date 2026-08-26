import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { toast } from 'react-toastify';
import { FaRegEdit, FaUsers, FaTrophy, FaPlus } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri';

import useAuth from '../../../Hook/useAuth';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import Loading from '../../../Components/LoadingPage/Loading';

const MyContest = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Tab State
    const [activeTab, setActiveTab] = useState('all');

    const { data: contests = [], isLoading, refetch } = useQuery({
        queryKey: ['my-contest', user?.email],
        queryFn: async () => {
            const result = await axiosSecure.get(`/my-contest?email=${user?.email}`);
            return result.data;
        },
        enabled: !!user?.email,
    });

    // DELETE CONTEST FUNCTION 
    const handleDeleteContest = async (id) => {
        if (!window.confirm('Are you sure you want to delete this contest?')) return;
        
        try {
            await axiosSecure.delete(`/delete-contest/${id}`);
            refetch();
            toast.success('Contest deleted successfully');
        } catch (error) {
            toast.error('Failed to delete contest');
        }
    };

    // Filter contests based on active tab
    const filteredContests = contests.filter((contest) => {
        if (activeTab === 'all') return true;
        return contest.status?.toLowerCase() === activeTab.toLowerCase();
    });

    // Render status badge as JSX element
    const getStatusBadge = (status) => {
        const baseClasses = 'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium capitalize';
        let colorClasses = '';

        switch(status?.toLowerCase()) {
            case 'pending':
                colorClasses = 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/20 dark:bg-yellow-900/20 dark:text-yellow-300 dark:ring-yellow-500/30';
                break;
            case 'active':
                colorClasses = 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20 dark:bg-blue-900/20 dark:text-blue-300 dark:ring-blue-500/30';
                break;
            case 'completed':
                colorClasses = 'bg-green-50 text-green-700 ring-1 ring-green-600/20 dark:bg-green-900/20 dark:text-green-300 dark:ring-green-500/30';
                break;
            default:
                colorClasses = 'bg-gray-50 text-gray-700 ring-1 ring-gray-600/20 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-500/30';
        }

        return (
            <span className={`${baseClasses} ${colorClasses}`}>
                {status || 'Pending'}
            </span>
        );
    };

    if (isLoading) {
        return <Loading />;
    }

    // Tabs Config
    const tabs = [
        { id: 'all', label: 'All Contests', count: contests.length },
        { id: 'pending', label: 'Pending', count: contests.filter(c => c.status?.toLowerCase() === 'pending').length },
        { id: 'active', label: 'Active', count: contests.filter(c => c.status?.toLowerCase() === 'active').length },
        { id: 'completed', label: 'Completed', count: contests.filter(c => c.status?.toLowerCase() === 'completed').length },
    ];

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-950">
            <div className="mx-auto max-w-6xl">
                
                {/* Header Section */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                            My Contests
                        </h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Manage your created contests and track their performance
                        </p>
                    </div>
                    
                    <Link
                        to="/dashboard/add-contest"
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                    >
                        <FaPlus size={16} />
                        Create Contest
                    </Link>
                </div>

                {/* Stats Overview */}
                <div className="mb-8 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                <FaTrophy size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Total Contests</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{contests.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400">
                                <FaUsers size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {contests.filter(c => c.status?.toLowerCase() === 'pending').length}
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
                                <p className="text-sm text-gray-500 dark:text-gray-400">Active</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {contests.filter(c => c.status?.toLowerCase() === 'active').length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table Card Container */}
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    
                    {/* Navigation Tabs Header */}
                    <div className="flex border-b border-gray-200 px-6 pt-4 gap-6 overflow-x-auto dark:border-gray-700">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 pb-3.5 text-sm font-semibold transition-colors relative border-b-2 whitespace-nowrap ${
                                    activeTab === tab.id
                                        ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                                }`}
                            >
                                {tab.label}
                                <span className={`rounded-full px-2 py-0.5 text-xs font-medium transition-colors ${
                                    activeTab === tab.id
                                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                                }`}>
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Table Section */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white w-16">#</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Contest Name</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white">Participants</th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white">Prize</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
                                </tr>
                            </thead>
                            
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredContests.map((contest, index) => (
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
                                        
                                        <td className="px-6 py-4 text-center">
                                            {getStatusBadge(contest.status)}
                                        </td>
                                        
                                        <td className="px-6 py-4 text-center">
                                            <div className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300">
                                                <FaUsers size={14} className="text-gray-400" />
                                                {contest.participantsCount || 0}
                                            </div>
                                        </td>
                                        
                                        <td className="px-6 py-4 text-right">
                                            <span className="font-semibold text-gray-900 dark:text-white">
                                                ${(contest.prizeMoney || 0).toLocaleString()}
                                            </span>
                                        </td>
                                        
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <Link
                                                    to={contest.status?.toLowerCase() === 'pending' ? `/dashboard/edit-contest/${contest._id}` : '#'}
                                                    className={`inline-flex items-center justify-center rounded-lg p-2 transition-colors ${
                                                        contest.status?.toLowerCase() === 'pending'
                                                            ? 'text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20'
                                                            : 'cursor-not-allowed text-gray-400 dark:text-gray-600'
                                                    }`}
                                                    title={contest.status?.toLowerCase() !== 'pending' ? 'Only pending contests can be edited' : 'Edit contest'}
                                                    onClick={(e) => {
                                                        if (contest.status?.toLowerCase() !== 'pending') {
                                                            e.preventDefault();
                                                            toast.info('Only pending contests can be edited');
                                                        }
                                                    }}
                                                >
                                                    <FaRegEdit size={18} />
                                                </Link>

                                                <button
                                                    onClick={() => handleDeleteContest(contest._id)}
                                                    className={`inline-flex items-center justify-center rounded-lg p-2 transition-colors ${
                                                        contest.status?.toLowerCase() === 'pending'
                                                            ? 'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20'
                                                            : 'cursor-not-allowed text-gray-400 dark:text-gray-600'
                                                    }`}
                                                    title={contest.status?.toLowerCase() !== 'pending' ? 'Only pending contests can be deleted' : 'Delete contest'}
                                                    disabled={contest.status?.toLowerCase() !== 'pending'}
                                                >
                                                    <RiDeleteBinLine size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Empty State */}
                    {filteredContests.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-16 px-4">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                                <FaTrophy className="text-2xl text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                {activeTab === 'all' ? 'No contests yet' : `No ${activeTab} contests`}
                            </h3>
                            <p className="text-center text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-6">
                                {activeTab === 'all'
                                    ? "You haven't created any contests yet. Start by creating your first contest to attract participants."
                                    : `There are currently no contests in "${activeTab}" status.`
                                }
                            </p>
                            {activeTab === 'all' && (
                                <Link
                                    to="/dashboard/add-contest"
                                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                                >
                                    <FaPlus size={16} />
                                    Create Your First Contest
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyContest;