import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FaUser, FaCheckCircle } from 'react-icons/fa';
import { MdOutlineMail } from 'react-icons/md';
import { VscFileSymlinkFile } from 'react-icons/vsc';
import useAuth from '../../../Hook/useAuth';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import Loading from '../../../Components/LoadingPage/Loading';
import { toast } from 'react-toastify';
import { FiCalendar, FiLink } from 'react-icons/fi';

const SubmitedTask = () => {
    const { user, Loading } = useAuth()
    const axiosSecure = useAxiosSecure()

    // get perticipant and task data
    const { data: taskContest = [], isLoading } = useQuery({
        queryKey: ['submitInfo', user?.email],
        queryFn: async () => {
            const result = await axiosSecure.get(`/all-submit-task?creatorEmail=${user?.email}`)
            return result.data
        }
    })

    // Handle Declare winner
    const handleDeclare = async (id, email, perticipantEmail) => {
        const result = await axiosSecure.patch(`/declare-winner?contestId=${id}&creatorEmail=${email}`, { perticipant: perticipantEmail })
        if (result.data.winnerDeclared === true) {
            return toast.error('Winner Already Declared')
        }
        toast.success('Winner Declared Successfully!')
    }

    console.log(taskContest)

    if (Loading) {
        return <Loading />
    }

    return (
        <div className='flow-root bg-white dark:bg-gray-900 min-h-screen py-12 px-4 md:px-8'>
            
            {/* Header Section */}
            <div className='max-w-5xl mx-auto mb-12'>
                <div className='space-y-4 border-b-2 border-secondary/20 dark:border-secondary/30 pb-6'>
                    <h2 className='text-3xl md:text-5xl font-bold text-primary dark:text-white'>
                        Submitted Tasks
                    </h2>
                    <p className='text-gray-700 dark:text-gray-300 text-lg'>
                        Manage contest submissions and declare winners
                    </p>
                    <div className='flex justify-start'>
                        <div className='h-1 w-24 bg-gradient-to-r from-secondary via-accent to-secondary rounded-full'></div>
                    </div>
                </div>

                {/* Count Badge */}
                <div className='mt-6'>
                    <span className='inline-block px-6 py-2 bg-secondary/20 dark:bg-secondary/30 text-secondary dark:text-secondary font-bold rounded-full text-lg'>
                        Total Submissions: {taskContest?.length}
                    </span>
                </div>
            </div>

            {/* Tasks List */}
            <div className='max-w-5xl mx-auto space-y-6'>
                {
                    taskContest?.map((task, index) =>
                        <div key={index} className='mb-6'>
                            <div className="collapse collapse-arrow bg-white dark:bg-gray-800 border-2 border-secondary/10 dark:border-secondary/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <input type="checkbox" />
                                
                                {/* Collapse Title */}
                                <div className="collapse-title space-y-3 p-6 md:p-8">
                                    <h3 className='text-xl md:text-2xl font-bold text-primary dark:text-white hover:text-secondary transition-colors'>
                                        {task?.perticipantName}
                                    </h3>
                                    <div className='flex items-center gap-2'>
                                        <MdOutlineMail className='text-secondary text-lg' />
                                        <p className='text-gray-700 dark:text-gray-300 text-sm md:text-base'>
                                            {task?.perticipantEmail}
                                        </p>
                                    </div>
                                    <p className='text-gray-600 dark:text-gray-400 text-sm md:text-base line-clamp-2'>
                                        {task?.perticipantContent?.submitedInfo}
                                    </p>
                                </div>

                                {/* Collapse Content */}
                                <div className="collapse-content text-sm border-t-2 border-secondary/10 dark:border-secondary/20 p-6 md:p-8 bg-gradient-to-br from-secondary/5 to-transparent dark:from-secondary/10">
                                    
                                    {/* Participant Info Row */}
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
                                        {/* Name */}
                                        <div className='space-y-3'>
                                            <h4 className='font-bold text-primary dark:text-white md:text-lg flex items-center gap-2'>
                                                <FaUser className='text-secondary' />
                                                Participant Name
                                            </h4>
                                            <div className='bg-white dark:bg-gray-700 p-4 rounded-lg border-l-4 border-secondary'>
                                                <p className='text-primary dark:text-white font-medium'>
                                                    {task?.perticipantName}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className='space-y-3'>
                                            <h4 className='font-bold text-primary dark:text-white md:text-lg flex items-center gap-2'>
                                                <MdOutlineMail className='text-secondary' />
                                                Email Address
                                            </h4>
                                            <div className='bg-white dark:bg-gray-700 p-4 rounded-lg border-l-4 border-secondary'>
                                                <p className='text-primary dark:text-white font-medium text-sm md:text-base break-all'>
                                                    {task?.perticipantEmail}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Submission Info */}
                                    <div className='space-y-3 mb-8'>
                                        <h4 className='font-bold text-primary dark:text-white md:text-lg'>
                                            Submission Details
                                        </h4>
                                        <div className='bg-white dark:bg-gray-700 p-4 rounded-lg border-l-4 border-secondary'>
                                            <p className='text-primary dark:text-white font-medium text-sm md:text-base leading-relaxed'>
                                                {task?.perticipantContent?.submitedInfo}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Submission Link */}
                                    <div className='space-y-3 mb-8'>
                                        <h4 className='font-bold text-primary dark:text-white md:text-lg flex items-center gap-2'>
                                            <FiLink className='text-secondary' />
                                            Submitted Link
                                        </h4>
                                        <div className='bg-white dark:bg-gray-700 p-4 rounded-lg border-l-4 border-secondary flex items-start gap-3'>
                                            <VscFileSymlinkFile className='text-secondary text-lg flex-shrink-0 mt-1' />
                                            <a 
                                                href={task?.perticipantContent?.submitLink}
                                                target='_blank'
                                                rel='noreferrer'
                                                className='text-secondary dark:text-secondary hover:underline break-all text-sm md:text-base font-medium'
                                            >
                                                {task?.perticipantContent?.submitLink}
                                            </a>
                                        </div>
                                    </div>

                                    {/* Submitted Date */}
                                    <div className='space-y-3 mb-8'>
                                        <h4 className='font-bold text-primary dark:text-white md:text-lg flex items-center gap-2'>
                                            <FiCalendar className='text-secondary' />
                                            Submitted Date
                                        </h4>
                                        <div className='bg-white dark:bg-gray-700 p-4 rounded-lg border-l-4 border-secondary'>
                                            <p className='text-primary dark:text-white font-medium text-sm md:text-base'>
                                                {new Date(task?.submitedDate).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className='flex justify-center pt-4'>
                                        <button 
                                            onClick={() => handleDeclare(task?.contestId, task?.creatorEmail, task?.perticipantEmail)}
                                            className='bg-gradient-to-r from-secondary to-secondary/80 hover:shadow-xl text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 flex items-center gap-2 text-lg'
                                        >
                                            <FaCheckCircle size={20} />
                                            Declare Winner
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>

            {/* Empty State */}
            {taskContest.length === 0 && (
                <div className='text-center py-16 max-w-5xl mx-auto'>
                    <VscFileSymlinkFile className='text-6xl text-secondary/30 mx-auto mb-4' />
                    <p className='text-gray-600 dark:text-gray-400 text-lg font-medium'>
                        No submitted tasks yet. Submissions will appear here.
                    </p>
                </div>
            )}
        </div>
    );
};

export default SubmitedTask;