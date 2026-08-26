import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaUsersGear, FaUser, FaPencil, FaCrown } from 'react-icons/fa6';
import { toast } from 'react-toastify';

import useAxiosSecure from '../../../../Hook/useAxiosSecure';
import Loading from '../../../../Components/LoadingPage/Loading';

const ManageUser = () => {
    const axiosSecure = useAxiosSecure();
    const [updatingUser, setUpdatingUser] = useState(null);

    const {
        data: users = [],
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const result = await axiosSecure.get('/manage-user');
            return result.data;
        },
    });

    // Update user role
    const manageUser = async (id, role) => {
        if (!id || !role) return;

        setUpdatingUser(id);

        try {
            await axiosSecure.patch(`/change-role/${id}`, role);
            await refetch();
            toast.success('User role updated successfully');
        } catch (error) {
            toast.error('Failed to update user role');
        } finally {
            setUpdatingUser(null);
        }
    };

    const getRoleBadge = (role) => {
        const normalizedRole = role?.toLowerCase();

        const roleStyles = {
            user: 'bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-900/20 dark:text-blue-300 dark:ring-blue-500/30',
            creator: 'bg-purple-50 text-purple-700 ring-purple-600/20 dark:bg-purple-900/20 dark:text-purple-300 dark:ring-purple-500/30',
            admin: 'bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-900/20 dark:text-red-300 dark:ring-red-500/30',
        };

        return (
            <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ring-1 ${
                    roleStyles[normalizedRole] ||
                    'bg-gray-50 text-gray-700 ring-gray-600/20 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-500/30'
                }`}
            >
                {normalizedRole || 'user'}
            </span>
        );
    };

    const getActionButtonClass = (role, currentRole) => {
        const isActive = role === currentRole;

        const styles = {
            user: isActive
                ? 'bg-blue-600 text-white'
                : 'text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20',
            creator: isActive
                ? 'bg-purple-600 text-white'
                : 'text-purple-600 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/20',
            admin: isActive
                ? 'bg-red-600 text-white'
                : 'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20',
        };

        return `inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${styles[role]}`;
    };

    // Reusable Action Buttons Component to avoid code duplication
    const renderActionButtons = (rowUser, currentRole, isUpdating) => (
        <div className="flex items-center gap-2">
            <button
                type="button"
                disabled={isUpdating || currentRole === 'user'}
                onClick={() => manageUser(rowUser?._id, { role: 'user' })}
                className={getActionButtonClass('user', currentRole)}
                title="Set as User"
            >
                {isUpdating && currentRole !== 'user' ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : (
                    <FaUser size={15} />
                )}
            </button>

            <button
                type="button"
                disabled={isUpdating || currentRole === 'creator'}
                onClick={() => manageUser(rowUser?._id, { role: 'creator' })}
                className={getActionButtonClass('creator', currentRole)}
                title="Set as Creator"
            >
                {isUpdating && currentRole !== 'creator' ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : (
                    <FaPencil size={15} />
                )}
            </button>

            <button
                type="button"
                disabled={isUpdating || currentRole === 'admin'}
                onClick={() => manageUser(rowUser?._id, { role: 'admin' })}
                className={getActionButtonClass('admin', currentRole)}
                title="Set as Admin"
            >
                {isUpdating && currentRole !== 'admin' ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : (
                    <FaCrown size={15} />
                )}
            </button>
        </div>
    );

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-950">
                <div className="mx-auto max-w-7xl">
                    <div className="rounded-xl border border-red-200 bg-white p-8 text-center dark:border-red-900/50 dark:bg-gray-800">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Unable to load users
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
                            Manage Users
                        </h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 sm:text-base">
                            Manage user roles and permissions across the platform.
                        </p>
                    </div>

                    <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 shadow-sm">
                        <FaUsersGear className="text-blue-600 dark:text-blue-400" />
                        <span>Total Users: {users.length}</span>
                    </div>
                </div>

                {users.length > 0 ? (
                    <>
                        {/* 1. Mobile & Small Tablet View (Card Layout) */}
                        <div className="grid grid-cols-1 gap-4 md:hidden">
                            {users.map((rowUser) => {
                                const currentRole = rowUser?.role?.toLowerCase();
                                const isUpdating = updatingUser === rowUser?._id;

                                return (
                                    <div
                                        key={rowUser?._id}
                                        className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={rowUser?.image || 'https://via.placeholder.com/40'}
                                                    alt={rowUser?.name || 'User'}
                                                    className="h-12 w-12 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-700"
                                                />
                                                <div>
                                                    <p className="font-semibold text-gray-900 dark:text-white text-base truncate max-w-[150px]">
                                                        {rowUser?.name || 'Unnamed user'}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[150px]">
                                                        {rowUser?.email || 'No email'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div>{getRoleBadge(rowUser?.role)}</div>
                                        </div>

                                        <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-3 dark:border-gray-700">
                                            <span className="text-sm text-gray-500 dark:text-gray-400">Change Role:</span>
                                            {renderActionButtons(rowUser, currentRole, isUpdating)}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* 2. Desktop View (Table Layout) */}
                        <div className="hidden md:block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[720px]">
                                    <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/50">
                                        <tr>
                                            <th className="w-16 px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:px-6">#</th>
                                            <th className="w-20 px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:px-6">User</th>
                                            <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:px-6">Name</th>
                                            <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:px-6">Email</th>
                                            <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:px-6">Current Role</th>
                                            <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:px-6">Change Role</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {users.map((rowUser, index) => {
                                            const currentRole = rowUser?.role?.toLowerCase();
                                            const isUpdating = updatingUser === rowUser?._id;

                                            return (
                                                <tr key={rowUser?._id || index} className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/40">
                                                    <td className="px-4 py-4 sm:px-6">
                                                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                                            {index + 1}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-4 sm:px-6">
                                                        <img
                                                            src={rowUser?.image || 'https://via.placeholder.com/40'}
                                                            alt={rowUser?.name || 'User'}
                                                            className="h-10 w-10 rounded-full object-cover ring-1 ring-gray-200 dark:ring-gray-600"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-4 sm:px-6">
                                                        <p className="max-w-[160px] truncate text-sm font-medium text-gray-900 dark:text-white">
                                                            {rowUser?.name || 'Unnamed user'}
                                                        </p>
                                                    </td>
                                                    <td className="px-4 py-4 sm:px-6">
                                                        <p className="max-w-[240px] truncate text-sm text-gray-600 dark:text-gray-300">
                                                            {rowUser?.email || 'No email'}
                                                        </p>
                                                    </td>
                                                    <td className="px-4 py-4 text-center sm:px-6">
                                                        {getRoleBadge(rowUser?.role)}
                                                    </td>
                                                    <td className="px-4 py-4 sm:px-6">
                                                        <div className="flex items-center justify-center gap-2">
                                                            {renderActionButtons(rowUser, currentRole, isUpdating)}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center px-4 py-16 text-center rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                            <FaUsersGear className="text-2xl text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            No users found
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            There are no registered users in the system yet.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageUser;