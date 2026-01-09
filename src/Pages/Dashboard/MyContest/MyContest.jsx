import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaRegEdit, FaUsers, FaTrophy } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri';
import useAuth from '../../../Hook/useAuth';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import Loading from '../../../Components/LoadingPage/Loading';
import { Link } from 'react-router';
import { toast } from 'react-toastify';

const MyContest = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: contests = [], isLoading, refetch } = useQuery({
        queryKey: ['my-contest', user?.email],
        queryFn: async () => {
            const result = await axiosSecure.get(`/my-contest?email=${user?.email}`)
            return result.data;
        }
    })

    // DELETE CONTEST FUNCTION 
    const handleDeleteContest = async (id) => {
        try {
            const result = await axiosSecure.delete(`/delete-contest/${id}`)
            refetch()
            toast.success('Delete Successfully!')
        }
        catch (er) {
            // console.log(er)
        }
    }

    // Get status styling
    const getStatusBadge = (status) => {
        switch(status) {
            case 'pending':
                return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border border-yellow-300 dark:border-yellow-600';
            case 'active':
                return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-600';
            case 'completed':
                return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-300 dark:border-green-600';
            default:
                return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600';
        }
    };

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='flow-root'>
            
            {/* Header Section */}
            <div className='bg-gradient-to-r from-secondary via-secondary/90 to-secondary/80 dark:from-secondary dark:to-secondary/90 mx-4 md:mx-10 my-6 p-8 md:p-10 rounded-2xl shadow-lg border-2 border-secondary/20'>
                <h2 className='text-2xl md:text-4xl text-white font-bold mb-2'>My Created Contests</h2>
                <p className='text-white/90 text-sm md:text-base'>Manage and track all your contests</p>
            </div>

            {/* Table Section */}
            <div className='mx-4 md:mx-10 my-8'>

                {/* MOBILE RESPONSIVE WRAPPER */}
                <div className="overflow-x-auto w-full rounded-2xl shadow-xl border-2 border-secondary/20 dark:border-secondary/30">

                    {/* TABLE */}
                    <table className="table table-zebra w-full min-w-[600px] bg-white dark:bg-gray-800">

                        {/* Head */}
                        <thead className='bg-gradient-to-r from-secondary to-secondary/80 dark:from-secondary dark:to-secondary/90 text-white font-bold text-sm md:text-base'>
                            <tr>
                                <th className='py-4 text-center'>No.</th>
                                <th className='py-4'>Contest Name</th>
                                <th className='py-4 text-center'>Status</th>
                                <th className='py-4 text-center'>Participants</th>
                                <th className='py-4 text-center'>Prize</th>
                                <th className='py-4 text-center'>Action</th>
                            </tr>
                        </thead>

                        {/* Body */}
                        <tbody>
                            {
                                contests.map((contest, index) =>
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

                                        {/* Contest Name */}
                                        <td className='py-5'>
                                            <div className='font-semibold text-primary dark:text-white text-sm md:text-base'>
                                                {contest.contestName}
                                            </div>
                                        </td>

                                        {/* Status */}
                                        <td className='py-5 text-center'>
                                            <span className={`inline-block px-4 py-2 rounded-full text-xs font-semibold ${getStatusBadge(contest.status)}`}>
                                                {contest.status === 'pending' && '⏳ Pending'}
                                                {contest.status === 'active' && '🔴 Active'}
                                                {contest.status === 'completed' && '✅ Completed'}
                                                {!['pending', 'active', 'completed'].includes(contest.status) && contest.status}
                                            </span>
                                        </td>

                                        {/* Participants */}
                                        <td className='py-5 text-center'>
                                            <div className='flex items-center justify-center gap-2 font-semibold text-primary dark:text-white'>
                                                <FaUsers size={16} className='text-secondary' />
                                                <span>{contest.participantsCount}</span>
                                            </div>
                                        </td>

                                        {/* Prize */}
                                        <td className='py-5 text-center'>
                                            <div className='flex items-center justify-center gap-2 font-semibold text-secondary'>
                                                <FaTrophy size={16} />
                                                <span>${contest.prizeMoney}</span>
                                            </div>
                                        </td>

                                        {/* Action */}
                                        <td className='py-5'>
                                            <div className='flex justify-center gap-3'>
                                                {/* Edit Button */}
                                                <Link 
                                                    disabled={contest.status !== 'pending'} 
                                                    to={`/dashboard/edit-cotest/${contest?._id}`}
                                                    className={`p-3 rounded-lg transition-all duration-300 flex items-center justify-center ${
                                                        contest.status === 'pending'
                                                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 hover:bg-blue-200 hover:shadow-lg'
                                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-50'
                                                    }`}
                                                    title={contest.status !== 'pending' ? 'Can only edit pending contests' : 'Edit contest'}
                                                >
                                                    <FaRegEdit size={18} />
                                                </Link>

                                                {/* Delete Button */}
                                                <button 
                                                    disabled={contest.status !== 'pending'} 
                                                    onClick={() => handleDeleteContest(contest._id)}
                                                    className={`p-3 rounded-lg transition-all duration-300 flex items-center justify-center ${
                                                        contest.status === 'pending'
                                                            ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 hover:bg-red-200 hover:shadow-lg'
                                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-50'
                                                    }`}
                                                    title={contest.status !== 'pending' ? 'Can only delete pending contests' : 'Delete contest'}
                                                >
                                                    <RiDeleteBinLine size={18} />
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
                {contests.length === 0 && (
                    <div className='text-center py-16'>
                        <FaTrophy className='text-6xl text-secondary/30 mx-auto mb-4' />
                        <p className='text-gray-600 dark:text-gray-400 text-lg font-medium'>
                            No contests created yet. Create your first contest!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyContest;