import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaUsersGear, FaUser, FaPencil, FaCrown } from 'react-icons/fa6';
import useAxiosSecure from '../../../../Hook/useAxiosSecure';
import Loading from '../../../../Components/LoadingPage/Loading';
import { toast } from 'react-toastify';

const ManageUser = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const result = await axiosSecure.get('/manage-user');
            return result.data;
        }
    });

    // MANAGE USER FUNCTION 
    const manageUser = async (id, role) => {
        try {
            await axiosSecure.patch(`/change-role/${id}`, role);
            refetch();
            toast.success('Role updated successfully');
        } catch (error) {
            toast.error('Failed to update role');
        }
    };

    // FIXED: Render role badge as JSX element instead of returning plain string
    const getRoleBadge = (role) => {
        const baseClasses = 'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium capitalize';
        let colorClasses = '';

        switch (role?.toLowerCase()) {
            case 'user':
                colorClasses = 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20 dark:bg-blue-900/20 dark:text-blue-300 dark:ring-blue-500/30';
                break;
            case 'creator':
                colorClasses = 'bg-purple-50 text-purple-700 ring-1 ring-purple-600/20 dark:bg-purple-900/20 dark:text-purple-300 dark:ring-purple-500/30';
                break;
            case 'admin':
                colorClasses = 'bg-red-50 text-red-700 ring-1 ring-red-600/20 dark:bg-red-900/20 dark:text-red-300 dark:ring-red-500/30';
                break;
            default:
                colorClasses = 'bg-gray-50 text-gray-700 ring-1 ring-gray-600/20 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-500/30';
        }

        return (
            <span className={`${baseClasses} ${colorClasses}`}>
                {role || 'user'}
            </span>
        );
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-950">
            <div className="mx-auto max-w-7xl">
                
                {/* Header Section */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                            Manage Users
                        </h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Control user roles and permissions across the platform
                        </p>
                    </div>
                    
                    <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 ring-1 ring-blue-600/20 dark:bg-blue-900/30 dark:text-blue-300 dark:ring-blue-500/30">
                        <FaUsersGear size={18} />
                        Total Users: {users.length}
                    </div>
                </div>

                {/* Table Section */}
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white w-16">#</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white w-20">User</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Name</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Email</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white">Role</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {users.map((user, index) => (
                                    <tr 
                                        key={user._id || index}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                                {index + 1}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <img 
                                                src={user?.image || 'https://via.placeholder.com/40'} 
                                                alt={user?.name}
                                                className="h-10 w-10 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-700"
                                            />
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900 dark:text-white">
                                                {user?.name}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-600 dark:text-gray-300 truncate max-w-xs">
                                                {user?.email}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-center">
                                            {getRoleBadge(user?.role)}
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button 
                                                    onClick={() => manageUser(user?._id, { role: 'user' })}
                                                    className={`inline-flex items-center justify-center rounded-lg p-2 transition-colors ${
                                                        user?.role === 'user'
                                                            ? 'bg-blue-600 text-white dark:bg-blue-600'
                                                            : 'text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20'
                                                    }`}
                                                    title="Set as User"
                                                >
                                                    <FaUser size={16} />
                                                </button>

                                                <button 
                                                    onClick={() => manageUser(user?._id, { role: 'creator' })}
                                                    className={`inline-flex items-center justify-center rounded-lg p-2 transition-colors ${
                                                        user?.role === 'creator'
                                                            ? 'bg-purple-600 text-white dark:bg-purple-600'
                                                            : 'text-purple-600 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/20'
                                                    }`}
                                                    title="Set as Creator"
                                                >
                                                    <FaPencil size={16} />
                                                </button>

                                                <button 
                                                    onClick={() => manageUser(user?._id, { role: 'admin' })}
                                                    className={`inline-flex items-center justify-center rounded-lg p-2 transition-colors ${
                                                        user?.role === 'admin'
                                                            ? 'bg-red-600 text-white dark:bg-red-600'
                                                            : 'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20'
                                                    }`}
                                                    title="Set as Admin"
                                                >
                                                    <FaCrown size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Empty State */}
                    {users.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
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
        </div>
    );
};

export default ManageUser;