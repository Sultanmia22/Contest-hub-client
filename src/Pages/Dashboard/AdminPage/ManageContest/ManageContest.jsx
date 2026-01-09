import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../../Hook/useAxiosSecure';
import Loading from '../../../../Components/LoadingPage/Loading';
import { toast } from 'react-toastify';
import { FaCheckCircle, FaTimesCircle, FaTrash, FaTrophy } from 'react-icons/fa';
import { MdOutlineManageHistory } from 'react-icons/md';

const ManageContest = () => {
    const axiosSecure = useAxiosSecure()
    const { data: pendingContes = [], isLoading, refetch } = useQuery({
        queryKey: ['pending-contest'],
        queryFn: async () => {
            const result = await axiosSecure.get('/pending-allcontest')
            return result.data
        }
    })

    // MANAGE CONTEST FUNTION 
    const manageContest = async (id, status) => {
        try {
            const result = await axiosSecure.patch(`/update-contest-status/${id}`, status);
            refetch()
            toast.success(`${status.status} successfully`)
        }
        catch (er) {
            // console.log(er)
        }
    }

    // DELETE CONTEST 
    const handleDeleteContest = async (id) => {
        try {
            const result = await axiosSecure.delete(`/contest/delete-by-admin/${id}`)
            toast.success('Delete Successfully!');
            refetch()
        }
        catch (er) {
            // console.log(er);
        }
    }

    // Get status styling
    const getStatusBadge = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border border-yellow-300 dark:border-yellow-600';
            case 'confirmed':
                return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-300 dark:border-green-600';
            case 'rejected':
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
                        <MdOutlineManageHistory className='text-secondary' size={40} />
                        Manage Contests
                    </h2>
                    <p className='text-base md:text-lg text-gray-700 dark:text-gray-300'>
                        Review and approve pending contests submitted by creators
                    </p>
                    <div className='flex justify-start'>
                        <div className='h-1 w-24 bg-gradient-to-r from-secondary via-accent to-secondary rounded-full'></div>
                    </div>
                </div>

                {/* Count Badge */}
                <div className='mt-6'>
                    <span className='inline-block px-6 py-2 bg-secondary/20 dark:bg-secondary/30 text-secondary dark:text-secondary font-bold rounded-full text-lg'>
                        Pending Contests: {pendingContes?.length}
                    </span>
                </div>
            </div>

            {/* Table Section */}
            <div className='max-w-7xl mx-auto'>
                <div className="overflow-x-auto rounded-2xl shadow-xl border-2 border-secondary/20 dark:border-secondary/30">
                    <table className="table w-full bg-white dark:bg-gray-800">
                        
                        {/* Head */}
                        <thead className='bg-gradient-to-r from-secondary to-secondary/80 dark:from-secondary dark:to-secondary/90 text-white font-bold text-xs md:text-sm'>
                            <tr>
                                <th className='py-4 text-center'>No.</th>
                                <th className='py-4 text-center'>Image</th>
                                <th className='py-4'>Name</th>
                                <th className='py-4'>Creator</th>
                                <th className='py-4 text-center'>Type</th>
                                <th className='py-4 text-center'>Entry</th>
                                <th className='py-4 text-center'>Prize</th>
                                <th className='py-4 text-center'>Users</th>
                                <th className='py-4'>Deadline</th>
                                <th className='py-4 text-center'>Status</th>
                                <th className='py-4 text-center'>Actions</th>
                            </tr>
                        </thead>

                        {/* Body */}
                        <tbody>
                            {
                                pendingContes.map((contest, index) =>
                                    <tr 
                                        key={index}
                                        className='border-b border-secondary/10 dark:border-secondary/20 hover:bg-secondary/5 dark:hover:bg-secondary/10 transition-colors duration-300'
                                    >
                                        {/* Number */}
                                        <td className='py-5 text-center'>
                                            <span className='inline-block w-8 h-8 rounded-full bg-secondary/20 dark:bg-secondary/30 text-primary dark:text-white font-bold flex items-center justify-center text-sm'>
                                                {index + 1}
                                            </span>
                                        </td>

                                        {/* Image */}
                                        <td className='py-5 text-center'>
                                            <div className='flex justify-center'>
                                                <img 
                                                    src={contest?.contestImage} 
                                                    alt={contest?.contestName}
                                                    className='w-12 h-12 rounded-lg object-cover border-2 border-secondary/30 shadow-md'
                                                />
                                            </div>
                                        </td>

                                        {/* Contest Name */}
                                        <td className='py-5'>
                                            <p className='font-semibold text-primary dark:text-white text-sm md:text-base'>
                                                {contest?.contestName}
                                            </p>
                                        </td>

                                        {/* Creator */}
                                        <td className='py-5'>
                                            <p className='text-gray-700 dark:text-gray-300 text-sm md:text-base'>
                                                {contest?.creator}
                                            </p>
                                        </td>

                                        {/* Type */}
                                        <td className='py-5 text-center'>
                                            <span className='inline-block px-3 py-1 bg-secondary/20 dark:bg-secondary/30 text-secondary dark:text-secondary font-semibold text-xs rounded-full'>
                                                {contest?.contestType}
                                            </span>
                                        </td>

                                        {/* Entry Price */}
                                        <td className='py-5 text-center'>
                                            <p className='font-semibold text-primary dark:text-white text-sm'>
                                                ${contest?.entryPrice}
                                            </p>
                                        </td>

                                        {/* Prize Money */}
                                        <td className='py-5 text-center'>
                                            <div className='flex items-center justify-center gap-1'>
                                                <FaTrophy className='text-accent text-sm' />
                                                <p className='font-semibold text-secondary text-sm'>
                                                    ${contest?.prizeMoney}
                                                </p>
                                            </div>
                                        </td>

                                        {/* Participants */}
                                        <td className='py-5 text-center'>
                                            <p className='font-semibold text-primary dark:text-white text-sm'>
                                                {contest?.participantsCount}
                                            </p>
                                        </td>

                                        {/* Deadline */}
                                        <td className='py-5'>
                                            <p className='text-gray-700 dark:text-gray-300 text-xs md:text-sm'>
                                                {new Date(contest?.deadline).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </td>

                                        {/* Status */}
                                        <td className='py-5 text-center'>
                                            <span className={`inline-block px-3 py-2 rounded-full text-xs font-semibold ${getStatusBadge(contest?.status)}`}>
                                                {contest?.status === 'pending' && '⏳ Pending'}
                                                {contest?.status === 'confirmed' && '✅ Confirmed'}
                                                {contest?.status === 'rejected' && '❌ Rejected'}
                                                {!['pending', 'confirmed', 'rejected'].includes(contest?.status) && contest?.status}
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className='py-5'>
                                            <div className='flex justify-center gap-2 flex-wrap'>
                                                {/* Confirm Button */}
                                                <button 
                                                    onClick={() => manageContest(contest?._id, { status: 'confirmed' })}
                                                    className='p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300 hover:bg-green-200 hover:shadow-lg transition-all duration-300 flex items-center justify-center tooltip'
                                                    data-tip="Confirm Contest"
                                                    title="Confirm Contest"
                                                >
                                                    <FaCheckCircle size={16} />
                                                </button>

                                                {/* Reject Button */}
                                                <button 
                                                    onClick={() => manageContest(contest?._id, { status: 'rejected' })}
                                                    className='p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 hover:bg-red-200 hover:shadow-lg transition-all duration-300 flex items-center justify-center tooltip'
                                                    data-tip="Reject Contest"
                                                    title="Reject Contest"
                                                >
                                                    <FaTimesCircle size={16} />
                                                </button>

                                                {/* Delete Button */}
                                                <button 
                                                    onClick={() => handleDeleteContest(contest?._id)}
                                                    className='p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300 hover:bg-orange-200 hover:shadow-lg transition-all duration-300 flex items-center justify-center tooltip'
                                                    data-tip="Delete Contest"
                                                    title="Delete Contest"
                                                >
                                                    <FaTrash size={16} />
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
                {pendingContes.length === 0 && (
                    <div className='text-center py-16'>
                        <MdOutlineManageHistory className='text-6xl text-secondary/30 mx-auto mb-4' />
                        <p className='text-gray-600 dark:text-gray-400 text-lg font-medium'>
                            No pending contests to review.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageContest;