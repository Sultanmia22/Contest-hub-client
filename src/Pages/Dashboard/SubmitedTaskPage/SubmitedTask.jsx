import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { MdOutlineMail } from 'react-icons/md';
import { VscFileSymlinkFile } from 'react-icons/vsc';
import useAuth from '../../../Hook/useAuth';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import Loading from '../../../Components/LoadingPage/Loading';
import { toast } from 'react-toastify';

const SubmitedTask = () => {
    const { user } = useAuth()
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
    const handleDeclare = async (id, email) => {
        
        const result = await axiosSecure.patch(`/declare-winner?contestId=${id}&creatorEmail=${email}`,{ perticipant:user?.email})
        if(result.data.winnerDeclared === true){
            return toast.error('Winner Already Declared')
        }

        toast.success('Winner Declared Successfully!')
    }

    // console.log(taskContest)

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='flow-root'>
            <div className='mx-4 my-4 md:m-10'>
                <div className='border-b-2 border-gray-500 pb-2 space-y-1'>
                    <h2 className='text-2xl md:text-4xl font-bold text-gray-800 dark:text-white'>Submitted Tasks</h2>
                    <p className='text-gray-600 dark:text-white'>Manage contest submissions and declare winners</p>
                </div>

                <div className='my-5'>
                    <p className='text-xl md:text-2xl font-medium pb-5 text-gray-600 dark:text-white'>Total Submission({taskContest?.length})</p>
                    {
                        taskContest?.map((task, index) =>
                            <div className='mb-5'>
                                <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                                    <input type="checkbox" />
                                    <div className="collapse-title space-y-2">
                                        <h3 className='md:text-2xl font-medium'>{task?.perticipantName}</h3>
                                        <p className='text-gray-600 dark:text-white'>{task?.perticipantEmail}</p>
                                        <p className='text-sm '>{task?.perticipantContent.submitedInfo}</p>
                                    </div>

                                    <div className="collapse-content text-sm ">
                                        <div className='flex flex-col md:flex-row gap-4 md:gap-20 border-t-2 py-4'>
                                            <div className='space-y-1'>
                                                <h2 className=' md:text-xl font-semibold'>Participant Name</h2>
                                                <div className='flex items-center gap-1'>
                                                    <span><FaUser /></span>
                                                    <p className='text-sm  font-medium text-gray-600 dark:text-gray-300'>{task?.perticipantName}</p>
                                                </div>
                                            </div>

                                            <div className='space-y-1'>
                                                <h2 className=' md:text-xl font-semibold'>Email</h2>
                                                <div className='flex items-center gap-1'>
                                                    <span><MdOutlineMail /></span>
                                                    <p className='text-sm  font-medium text-gray-600 dark:text-gray-300'>{task?.perticipantEmail}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h2 className=' md:text-xl font-semibold'>Submitted Task</h2>
                                            <div className='p-4 border-2 border-gray-400 rounded-xl my-2 flex gap-1 items-center'>
                                                <p><VscFileSymlinkFile /></p>
                                                <p className='text-sm  font-medium text-gray-600 dark:text-gray-300'>{task?.perticipantContent.submitLink}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <h2 className=' md:text-xl font-semibold'>Submitted Date</h2>
                                            <p className='text-sm  font-medium text-gray-600 dark:text-gray-300'>{task?.submitedDate}</p>
                                        </div>

                                        <div className='flex justify-center items-center'>
                                            <button onClick={() => handleDeclare(task?.contestId, task?.creatorEmail)} className='btn btn-primary text-white'>Declare Winner</button>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    );
};

export default SubmitedTask;