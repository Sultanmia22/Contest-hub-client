import React from 'react';
import { Link } from 'react-router';
import useAxiosSecure from '../../../../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../Components/LoadingPage/Loading';
import { FaUsersGear, FaUser, FaPencil, FaCrown } from 'react-icons/fa6';

const ManageUser = () => {

    const axiosSecure = useAxiosSecure();

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const result = await axiosSecure.get('/manage-user');
            return result.data
        }
    })

    // MANAGE USER FUNTION 
    const manageUser = async (id, role) => {
        try {
            const result = await axiosSecure.patch(`/change-role/${id}`, role);
            refetch()
        }
        catch (er) {
            // console.log(er)
        }
    }

    // Get role color styling
    const getRoleBadge = (role) => {
        switch (role) {
            case 'user':
                return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-600';
            case 'creator':
                return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-600';
            case 'admin':
                return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-600';
            default:
                return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600';
        }
    };

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='flow-root bg-white dark:bg-gray-900 min-h-screen py-12 px-4 md:px-8'>
            
            {/* Header Section */}
            <div className='max-w-7xl mx-auto mb-12'>
                <div className='space-y-4'>
                    <h2 className='text-3xl md:text-5xl font-bold text-primary dark:text-white flex items-center gap-3'>
                        <FaUsersGear className='text-secondary' size={40} />
                        Manage Users
                    </h2>
                    <p className='text-base md:text-lg text-gray-700 dark:text-gray-300'>
                        Control user roles and permissions across the platform
                    </p>
                    <div className='flex justify-start'>
                        <div className='h-1 w-24 bg-gradient-to-r from-secondary via-accent to-secondary rounded-full'></div>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className='max-w-7xl mx-auto'>
                <div className="overflow-x-auto rounded-2xl shadow-xl border-2 border-secondary/20 dark:border-secondary/30">
                    <table className="table w-full bg-white dark:bg-gray-800">
                        
                        {/* Head */}
                        <thead className='bg-gradient-to-r from-secondary to-secondary/80 dark:from-secondary dark:to-secondary/90 text-white font-bold text-sm md:text-base'>
                            <tr>
                                <th className='py-4 text-center'>No.</th>
                                <th className='py-4 text-center'>Avatar</th>
                                <th className='py-4'>Name</th>
                                <th className='py-4'>Email</th>
                                <th className='py-4 text-center'>Current Role</th>
                                <th className='py-4 text-center'>Actions</th>
                            </tr>
                        </thead>

                        {/* Body */}
                        <tbody>
                            {
                                users.map((user, index) =>
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

                                        {/* Avatar */}
                                        <td className='py-5 text-center'>
                                            <div className='flex justify-center'>
                                                <img 
                                                    src={user?.image} 
                                                    alt={user?.name}
                                                    className='w-12 h-12 rounded-full object-cover border-2 border-secondary/30 shadow-md'
                                                />
                                            </div>
                                        </td>

                                        {/* Name */}
                                        <td className='py-5'>
                                            <p className='font-semibold text-primary dark:text-white text-sm md:text-base'>
                                                {user?.name}
                                            </p>
                                        </td>

                                        {/* Email */}
                                        <td className='py-5'>
                                            <p className='text-gray-700 dark:text-gray-300 text-sm md:text-base truncate'>
                                                {user?.email}
                                            </p>
                                        </td>

                                        {/* Current Role */}
                                        <td className='py-5 text-center'>
                                            <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getRoleBadge(user?.role)}`}>
                                                {user?.role === 'user' && '👤 User'}
                                                {user?.role === 'creator' && '✏️ Creator'}
                                                {user?.role === 'admin' && '👑 Admin'}
                                                {!['user', 'creator', 'admin'].includes(user?.role) && user?.role}
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className='py-5'>
                                            <div className='flex justify-center gap-2 flex-wrap'>
                                                {/* User Button */}
                                                <button 
                                                    onClick={() => manageUser(user?._id, { role: 'user' })}
                                                    className={`p-2 rounded-lg transition-all duration-300 flex items-center justify-center tooltip ${
                                                        user?.role === 'user'
                                                            ? 'bg-blue-500 text-white shadow-lg'
                                                            : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 hover:bg-blue-200 hover:shadow-lg'
                                                    }`}
                                                    data-tip="Set as User"
                                                    title="Set as User"
                                                >
                                                    <FaUser size={16} />
                                                </button>

                                                {/* Creator Button */}
                                                <button 
                                                    onClick={() => manageUser(user?._id, { role: 'creator' })}
                                                    className={`p-2 rounded-lg transition-all duration-300 flex items-center justify-center tooltip ${
                                                        user?.role === 'creator'
                                                            ? 'bg-purple-500 text-white shadow-lg'
                                                            : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 hover:bg-purple-200 hover:shadow-lg'
                                                    }`}
                                                    data-tip="Set as Creator"
                                                    title="Set as Creator"
                                                >
                                                    <FaPencil size={16} />
                                                </button>

                                                {/* Admin Button */}
                                                <button 
                                                    onClick={() => manageUser(user?._id, { role: 'admin' })}
                                                    className={`p-2 rounded-lg transition-all duration-300 flex items-center justify-center tooltip ${
                                                        user?.role === 'admin'
                                                            ? 'bg-red-500 text-white shadow-lg'
                                                            : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 hover:bg-red-200 hover:shadow-lg'
                                                    }`}
                                                    data-tip="Set as Admin"
                                                    title="Set as Admin"
                                                >
                                                    <FaCrown size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {users.length === 0 && (
                    <div className='text-center py-16'>
                        <FaUsersGear className='text-6xl text-secondary/30 mx-auto mb-4' />
                        <p className='text-gray-600 dark:text-gray-400 text-lg font-medium'>
                            No users found.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageUser;