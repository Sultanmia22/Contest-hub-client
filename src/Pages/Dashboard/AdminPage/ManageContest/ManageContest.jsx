import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
    FaCheckCircle,
    FaTimesCircle,
    FaTrash,
    FaTrophy,
} from 'react-icons/fa';
import { MdOutlineManageHistory } from 'react-icons/md';

import useAxiosSecure from '../../../../Hook/useAxiosSecure';
import Loading from '../../../../Components/LoadingPage/Loading';

const ManageContest = () => {
    const axiosSecure = useAxiosSecure();
    const [actionId, setActionId] = useState(null);

    const {
        data: pendingContests = [],
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ['pending-contest'],
        queryFn: async () => {
            const result = await axiosSecure.get('/pending-allcontest');
            return result.data;
        },
    });

    // Update contest status
    const manageContest = async (id, status) => {
        setActionId(id);

        try {
            await axiosSecure.patch(`/update-contest-status/${id}`, status);
            await refetch();

            toast.success(
                `Contest ${status.status === 'confirmed' ? 'confirmed' : 'rejected'} successfully`
            );
        } catch (error) {
            toast.error('Failed to update contest status');
        } finally {
            setActionId(null);
        }
    };

    // Delete contest
    const handleDeleteContest = async (id) => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this contest?'
        );

        if (!confirmDelete) return;

        setActionId(id);

        try {
            await axiosSecure.delete(`/contest/delete-by-admin/${id}`);
            await refetch();
            toast.success('Contest deleted successfully');
        } catch (error) {
            toast.error('Failed to delete contest');
        } finally {
            setActionId(null);
        }
    };

    const getStatusBadge = (status) => {
        const normalizedStatus = status?.toLowerCase();

        const styles = {
            pending:
                'bg-yellow-50 text-yellow-700 ring-yellow-600/20 dark:bg-yellow-900/20 dark:text-yellow-300 dark:ring-yellow-500/30',
            confirmed:
                'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-900/20 dark:text-green-300 dark:ring-green-500/30',
            rejected:
                'bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-900/20 dark:text-red-300 dark:ring-red-500/30',
        };

        return (
            <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ring-1 ${
                    styles[normalizedStatus] ||
                    'bg-gray-50 text-gray-700 ring-gray-600/20 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-500/30'
                }`}
            >
                {normalizedStatus || 'unknown'}
            </span>
        );
    };

    const formatCurrency = (value) => {
        return Number(value || 0).toLocaleString();
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-950">
                <div className="mx-auto max-w-7xl">
                    <div className="rounded-xl border border-red-200 bg-white p-8 text-center dark:border-red-900/50 dark:bg-gray-800">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Unable to load contests
                        </h2>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Please try again later.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-950 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                            Manage Contests
                        </h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 sm:text-base">
                            Review and manage contests submitted by creators.
                        </p>
                    </div>

                    <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                        <MdOutlineManageHistory className="text-blue-600 dark:text-blue-400" size={19} />
                        <span>Pending: {pendingContests.length}</span>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-transparent shadow-sm dark:border-gray-700 lg:bg-white lg:dark:bg-gray-800">
                    {pendingContests.length > 0 ? (
                        <>
                            {/* ======== MOBILE & TABLET VIEW (Card Layout) ======== */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:hidden">
                                {pendingContests.map((contest) => {
                                    const isProcessing = actionId === contest?._id;

                                    return (
                                        <div
                                            key={contest?._id}
                                            className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                                        >
                                            {/* Card Header: Image, Name & Badge */}
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={contest?.contestImage}
                                                        alt={contest?.contestName}
                                                        className="h-12 w-12 rounded-lg object-cover ring-1 ring-gray-200 dark:ring-gray-600"
                                                    />
                                                    <div>
                                                        <h3 className="line-clamp-1 font-semibold text-gray-900 dark:text-white">
                                                            {contest?.contestName}
                                                        </h3>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            By {contest?.creator || 'Unknown'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div>{getStatusBadge(contest?.status)}</div>
                                            </div>

                                            {/* Details Grid */}
                                            <div className="mt-5 grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-900/50">
                                                <div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Entry</p>
                                                    <p className="font-medium text-gray-900 dark:text-white">
                                                        ${formatCurrency(contest?.entryPrice)}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Prize</p>
                                                    <p className="flex items-center gap-1 font-medium text-yellow-600 dark:text-yellow-400">
                                                        <FaTrophy size={12} /> ${formatCurrency(contest?.prizeMoney)}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Type</p>
                                                    <p className="font-medium text-gray-900 dark:text-white">
                                                        {contest?.contestType || 'N/A'}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Deadline</p>
                                                    <p className="font-medium text-gray-900 dark:text-white">
                                                        {formatDate(contest?.deadline)}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="mt-4 flex items-center justify-end gap-2 border-t border-gray-100 pt-4 dark:border-gray-700">
                                                <button
                                                    type="button"
                                                    disabled={isProcessing}
                                                    onClick={() => manageContest(contest?._id, { status: 'confirmed' })}
                                                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-50 px-4 py-2 text-sm font-medium text-green-600 transition-colors hover:bg-green-100 disabled:opacity-50 dark:bg-green-900/20 dark:text-green-400"
                                                >
                                                    {isProcessing ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> : <FaCheckCircle />}
                                                    Confirm
                                                </button>
                                                <button
                                                    type="button"
                                                    disabled={isProcessing}
                                                    onClick={() => manageContest(contest?._id, { status: 'rejected' })}
                                                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 disabled:opacity-50 dark:bg-red-900/20 dark:text-red-400"
                                                >
                                                    {isProcessing ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> : <FaTimesCircle />}
                                                    Reject
                                                </button>
                                                <button
                                                    type="button"
                                                    disabled={isProcessing}
                                                    onClick={() => handleDeleteContest(contest?._id)}
                                                    className="flex items-center justify-center rounded-lg bg-orange-50 px-4 py-2 text-orange-600 transition-colors hover:bg-orange-100 disabled:opacity-50 dark:bg-orange-900/20 dark:text-orange-400"
                                                    title="Delete contest"
                                                >
                                                    {isProcessing ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> : <FaTrash />}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* ======== DESKTOP VIEW (Table Layout) ======== */}
                            <div className="hidden overflow-x-auto lg:block">
                                <table className="w-full min-w-[1050px]">
                                    <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/50">
                                        <tr>
                                            <th className="w-14 px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">#</th>
                                            <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Contest</th>
                                            <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Creator</th>
                                            <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Type</th>
                                            <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Entry</th>
                                            <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Prize</th>
                                            <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Users</th>
                                            <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Deadline</th>
                                            <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Status</th>
                                            <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {pendingContests.map((contest, index) => {
                                            const isProcessing = actionId === contest?._id;

                                            return (
                                                <tr key={contest?._id || index} className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/40">
                                                    <td className="px-4 py-4">
                                                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                                            {index + 1}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <img
                                                                src={contest?.contestImage}
                                                                alt={contest?.contestName}
                                                                className="h-10 w-10 rounded-lg object-cover ring-1 ring-gray-200 dark:ring-gray-600"
                                                            />
                                                            <p className="max-w-[180px] truncate text-sm font-medium text-gray-900 dark:text-white">
                                                                {contest?.contestName}
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <p className="max-w-[160px] truncate text-sm text-gray-600 dark:text-gray-300">
                                                            {contest?.creator || 'Unknown'}
                                                        </p>
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                                                            {contest?.contestType || 'N/A'}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-4 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        ${formatCurrency(contest?.entryPrice)}
                                                    </td>
                                                    <td className="px-4 py-4 text-center">
                                                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-900 dark:text-white">
                                                            <FaTrophy className="text-yellow-500" size={14} />
                                                            ${formatCurrency(contest?.prizeMoney)}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-4 text-center text-sm text-gray-700 dark:text-gray-300">
                                                        {contest?.participantsCount || 0}
                                                    </td>
                                                    <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">
                                                        {formatDate(contest?.deadline)}
                                                    </td>
                                                    <td className="px-4 py-4 text-center">
                                                        {getStatusBadge(contest?.status)}
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <button
                                                                type="button"
                                                                disabled={isProcessing}
                                                                onClick={() => manageContest(contest?._id, { status: 'confirmed' })}
                                                                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-green-600 transition-colors hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-50 dark:text-green-400 dark:hover:bg-green-900/20"
                                                                title="Confirm contest"
                                                            >
                                                                {isProcessing ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> : <FaCheckCircle size={17} />}
                                                            </button>
                                                            <button
                                                                type="button"
                                                                disabled={isProcessing}
                                                                onClick={() => manageContest(contest?._id, { status: 'rejected' })}
                                                                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:text-red-400 dark:hover:bg-red-900/20"
                                                                title="Reject contest"
                                                            >
                                                                {isProcessing ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> : <FaTimesCircle size={17} />}
                                                            </button>
                                                            <button
                                                                type="button"
                                                                disabled={isProcessing}
                                                                onClick={() => handleDeleteContest(contest?._id)}
                                                                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-orange-600 transition-colors hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-50 dark:text-orange-400 dark:hover:bg-orange-900/20"
                                                                title="Delete contest"
                                                            >
                                                                {isProcessing ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> : <FaTrash size={16} />}
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center bg-white px-4 py-16 text-center dark:bg-gray-800">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                                <MdOutlineManageHistory className="text-2xl text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                No pending contests
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                There are no contests waiting for review.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageContest;