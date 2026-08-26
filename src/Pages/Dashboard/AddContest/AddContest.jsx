import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { FiAward, FiUpload, FiDollarSign, FiCalendar, FiFileText } from 'react-icons/fi';

import { uploadImage } from '../../../Utils';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import useAuth from '../../../Hook/useAuth';

const AddContest = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm();

    const handleAddContest = async (data) => {
        try {
            const imageData = data.contestImage[0];
            if (!imageData) {
                toast.error('Please select an image');
                return;
            }

            const imageURL = await uploadImage(imageData);
            const taskInstruction = data.taskInstruction
                .split('\n')
                .map(line => line.trim())
                .filter(line => line.length > 0);

            const addContestInfo = {
                contestName: data.contestName,
                contestImage: imageURL,
                entryPrice: Number(data.entryPrice),
                prizeMoney: Number(data.prizeMoney),
                contestType: data.contestType,
                description: data.description,
                taskInstruction: taskInstruction,
                deadline: new Date(data.deadline),
                creatorEmail: user?.email,
                creator: user?.displayName,
            };

            await axiosSecure.post('/add-contest', addContestInfo);
            toast.success('Contest created successfully!');
            reset();
            navigate('/dashboard/my-contest');
        } catch (error) {
            toast.error(error?.message || 'Failed to create contest');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-950">
            <div className="mx-auto max-w-4xl">
                
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                        Create New Contest
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Provide clear details and requirements to launch your contest
                    </p>
                </div>

                {/* Form Container */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-8">
                    <form onSubmit={handleSubmit(handleAddContest)} className="space-y-6">
                        
                        {/* Section: Basic Information */}
                        <div className="border-b border-gray-200 pb-6 dark:border-gray-700">
                            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                Basic Information
                            </h2>

                            <div className="grid gap-6 sm:grid-cols-2">
                                {/* Contest Name */}
                                <div className="sm:col-span-2">
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Contest Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Modern Logo Design for Tech Startup"
                                        {...register('contestName', { required: 'Contest name is required' })}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                                    />
                                    {errors.contestName && (
                                        <p className="mt-1 text-sm text-red-500">{errors.contestName.message}</p>
                                    )}
                                </div>

                                {/* Contest Type */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Contest Category <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        {...register('contestType', { required: 'Please select a category' })}
                                        defaultValue=""
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                                    >
                                        <option value="" disabled>Select category</option>
                                        <option value="Image Design">Image Design</option>
                                        <option value="Article Writing">Article Writing</option>
                                        <option value="Business Ideas">Business Ideas</option>
                                        <option value="Gaming Reviews">Gaming Reviews</option>
                                        <option value="Photography">Photography</option>
                                        <option value="Logo Design">Logo Design</option>
                                        <option value="Content Creation">Content Creation</option>
                                    </select>
                                    {errors.contestType && (
                                        <p className="mt-1 text-sm text-red-500">{errors.contestType.message}</p>
                                    )}
                                </div>

                                {/* Deadline */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Submission Deadline <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        min={new Date().toISOString().split('T')[0]}
                                        {...register('deadline', { required: 'Deadline is required' })}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                                    />
                                    {errors.deadline && (
                                        <p className="mt-1 text-sm text-red-500">{errors.deadline.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Section: Banner Image */}
                        <div className="border-b border-gray-200 pb-6 dark:border-gray-700">
                            <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                Contest Banner
                            </h2>
                            <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">
                                Upload a high-resolution image to represent your contest.
                            </p>

                            <div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    {...register('contestImage', { required: 'Contest banner is required' })}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100 dark:text-gray-400 dark:file:bg-blue-900/30 dark:file:text-blue-400 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900"
                                />
                                {errors.contestImage && (
                                    <p className="mt-1 text-sm text-red-500">{errors.contestImage.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Section: Financials */}
                        <div className="border-b border-gray-200 pb-6 dark:border-gray-700">
                            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                Prize & Entry Details
                            </h2>

                            <div className="grid gap-6 sm:grid-cols-2">
                                {/* Entry Price */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Entry Fee ($) <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                                        <input
                                            type="number"
                                            min="0"
                                            placeholder="50"
                                            {...register('entryPrice', { 
                                                required: 'Entry fee is required',
                                                min: { value: 0, message: 'Price cannot be negative' }
                                            })}
                                            className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-8 pr-4 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                                        />
                                    </div>
                                    {errors.entryPrice && (
                                        <p className="mt-1 text-sm text-red-500">{errors.entryPrice.message}</p>
                                    )}
                                </div>

                                {/* Prize Money */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Total Prize Pool ($) <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                                        <input
                                            type="number"
                                            min="1"
                                            placeholder="500"
                                            {...register('prizeMoney', { 
                                                required: 'Prize money is required',
                                                min: { value: 1, message: 'Prize must be greater than 0' }
                                            })}
                                            className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-8 pr-4 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                                        />
                                    </div>
                                    {errors.prizeMoney && (
                                        <p className="mt-1 text-sm text-red-500">{errors.prizeMoney.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Section: Description & Instructions */}
                        <div className="space-y-6">
                            <div>
                                <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                    Contest Brief
                                </h2>
                                
                                {/* Description */}
                                <div className="mb-6">
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Detailed Description <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        rows="4"
                                        placeholder="Explain the background, goals, and expectations for this contest..."
                                        {...register('description', { required: 'Description is required' })}
                                        className="w-full rounded-lg border border-gray-300 bg-white p-4 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                                    ></textarea>
                                    {errors.description && (
                                        <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
                                    )}
                                </div>

                                {/* Task Instructions */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Task Instructions <span className="text-red-500">*</span>
                                    </label>
                                    <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                                        Write each instruction or requirement on a new line.
                                    </p>
                                    <textarea
                                        rows="5"
                                        placeholder="1. Submit designs in PNG or SVG format&#10;2. Include source files (AI, PSD, or Figma link)&#10;3. Use the attached brand color palette"
                                        {...register('taskInstruction', { required: 'Task instructions are required' })}
                                        className="w-full rounded-lg border border-gray-300 bg-white p-4 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white font-mono"
                                    ></textarea>
                                    {errors.taskInstruction && (
                                        <p className="mt-1 text-sm text-red-500">{errors.taskInstruction.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-4 border-t border-gray-200 pt-6 dark:border-gray-700">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                            
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700"
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                        Creating Contest...
                                    </>
                                ) : (
                                    <>
                                        <FiAward className="text-base" />
                                        Publish Contest
                                    </>
                                )}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddContest;