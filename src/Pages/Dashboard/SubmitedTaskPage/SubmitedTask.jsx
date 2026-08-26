import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaUser, FaCheckCircle, FaChevronDown } from 'react-icons/fa';
import { MdOutlineMail } from 'react-icons/md';
import { VscFileSymlinkFile } from 'react-icons/vsc';
import useAuth from '../../../Hook/useAuth';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import Loading from '../../../Components/LoadingPage/Loading';
import { toast } from 'react-toastify';
import { FiCalendar, FiLink } from 'react-icons/fi';

const SubmitedTask = () => {
    const { user, loading: authLoading } = useAuth();
    const axiosSecure = useAxiosSecure();

    // get participant and task data
    const { data: taskContest = [], isLoading, refetch } = useQuery({
        queryKey: ['submitInfo', user?.email],
        queryFn: async () => {
            const result = await axiosSecure.get(`/all-submit-task?creatorEmail=${user?.email}`);
            return result.data;
        },
        enabled: !!user?.email,
    });

    // Handle Declare winner
    const handleDeclare = async (id, email, participantEmail) => {
        try {
            const result = await axiosSecure.patch(`/declare-winner?contestId=${id}&creatorEmail=${email}`, { 
                participant: participantEmail 
            });
            
            if (result.data?.winnerDeclared === true) {
                toast.error('Winner already declared');
                return;
            }
            
            toast.success('Winner declared successfully!');
            refetch();
        } catch (error) {
            toast.error('Failed to declare winner');
        }
    };

    if (authLoading || isLoading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-950">
            <div className="mx-auto max-w-5xl">
                
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                        Submitted Tasks
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Review participant submissions and declare contest winners
                    </p>
                </div>

                {/* Stats Badge */}
                <div className="mb-6">
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-700 ring-1 ring-blue-600/20 dark:bg-blue-900/30 dark:text-blue-300 dark:ring-blue-500/30">
                        Total Submissions: {taskContest?.length || 0}
                    </span>
                </div>

                {/* Tasks List */}
                <div className="space-y-4">
                    {taskContest?.map((task, index) => (
                        <div 
                            key={task?._id || index} 
                            className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 overflow-hidden"
                        >
                            {/* Accordion using DaisyUI collapse - clean style */}
                            <div className="collapse collapse-arrow">
                                <input type="checkbox" className="peer" /> 
                                
                                {/* Collapse Title / Header */}
                                <div className="collapse-title peer-checked:bg-gray-50 dark:peer-checked:bg-gray-700/50 cursor-pointer p-6 transition-colors">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                {task?.perticipantName || 'Unknown Participant'}
                                            </h3>
                                            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 dark:bg-green-900/20 dark:text-green-300">
                                                Submitted
                                            </span>
                                        </div>
                                        
                                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                            <MdOutlineMail size={16} />
                                            <span className="truncate">{task?.perticipantEmail}</span>
                                        </div>
                                        
                                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mt-1">
                                            {task?.perticipantContent?.submitedInfo || 'No submission details provided.'}
                                        </p>
                                    </div>
                                </div>

                                {/* Collapse Content */}
                                <div className="collapse-content peer-checked:block hidden bg-gray-50/50 dark:bg-gray-900/30">
                                    <div className="p-6 border-t border-gray-200 dark:border-gray-700 space-y-6">
                                        
                                        {/* Info Grid */}
                                        <div className="grid gap-6 sm:grid-cols-2">
                                            {/* Participant Name */}
                                            <div>
                                                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                    Participant Name
                                                </label>
                                                <div className="rounded-lg bg-white p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                                                    <div className="flex items-center gap-2">
                                                        <FaUser className="text-gray-400" size={16} />
                                                        <span className="font-medium text-gray-900 dark:text-white">
                                                            {task?.perticipantName}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Email */}
                                            <div>
                                                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                    Email Address
                                                </label>
                                                <div className="rounded-lg bg-white p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                                                    <div className="flex items-center gap-2">
                                                        <MdOutlineMail className="text-gray-400" size={16} />
                                                        <span className="text-sm text-gray-900 dark:text-white break-all">
                                                            {task?.perticipantEmail}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Submission Details */}
                                        <div>
                                            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                Submission Details
                                            </label>
                                            <div className="rounded-lg bg-white p-4 border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                                                <p className="text-sm leading-relaxed text-gray-800 dark:text-gray-200">
                                                    {task?.perticipantContent?.submitedInfo || 'No details provided'}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Submitted Link */}
                                        <div>
                                            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                Submitted Link
                                            </label>
                                            <div className="rounded-lg bg-white p-4 border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                                                <a 
                                                    href={task?.perticipantContent?.submitLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-400 break-all"
                                                >
                                                    <FiLink size={16} />
                                                    {task?.perticipantContent?.submitLink}
                                                </a>
                                            </div>
                                        </div>

                                        {/* Submitted Date */}
                                        <div>
                                            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                Submitted Date
                                            </label>
                                            <div className="rounded-lg bg-white p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                                                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                                    <FiCalendar size={16} className="text-gray-400" />
                                                    <span>
                                                        {task?.submitedDate 
                                                            ? new Date(task.submitedDate).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })
                                                            : 'Unknown date'
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div className="border-t border-gray-200 dark:border-gray-700" />

                                        {/* Action Button */}
                                        <div className="flex justify-end">
                                            <button 
                                                onClick={() => handleDeclare(
                                                    task?.contestId, 
                                                    task?.creatorEmail, 
                                                    task?.perticipantEmail
                                                )}
                                                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:bg-blue-600 dark:hover:bg-blue-700"
                                            >
                                                <FaCheckCircle size={16} />
                                                Declare Winner
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {taskContest.length === 0 && (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white py-16 text-center dark:border-gray-700 dark:bg-gray-800">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                            <VscFileSymlinkFile className="text-2xl text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            No submissions yet
                        </h3>
                        <p className="mt-1 max-w-sm text-sm text-gray-500 dark:text-gray-400">
                            Submissions will appear here once participants submit their tasks.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubmitedTask;