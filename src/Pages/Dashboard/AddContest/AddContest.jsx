import React from 'react';
import { useForm } from 'react-hook-form';
import { uploadImage } from '../../../Utils';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import useAuth from '../../../Hook/useAuth';
import { FiUpload, FiAward } from 'react-icons/fi';

const AddContest = () => {
    const { user } = useAuth()
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const handleAddContest = async (data) => {
        try {
            const imageData = data.contestImage[0]
            const imageURL = await uploadImage(imageData)
            const taskInstruction = data.taskInstruction
                .split('\n')
                .map(line => line.trim())

            const addContestInfo = {
                contestName: data.contestName,
                contestImage: imageURL,
                entryPrice: data.entryPrice,
                prizeMoney: data.prizeMoney,
                contestType: data.contestType,
                description: data.description,
                taskInstruction: taskInstruction,
                deadline: new Date(data.deadline),
                creatorEmail: user?.email,
                creator: user?.displayName,
            }

            const result = await axiosSecure.post('/add-contest', addContestInfo);
            toast.success('Created Contest Successfully')
            reset()
            navigate('/dashboard/my-contest')
        }
        catch (er) {
            // console.log(er)
        }
    };

    return (
        <div className='flow-root bg-white dark:bg-gray-900 min-h-screen py-12 px-4'>
            
            {/* Header */}
            <div className='max-w-3xl mx-auto mb-12'>
                <div className='text-center space-y-4'>
                    <h2 className='text-3xl md:text-5xl font-bold text-primary dark:text-white flex items-center justify-center gap-3'>
                        <FiAward className='text-secondary' size={40} />
                        Create New Contest
                    </h2>
                    <p className='text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto'>
                        Fill in the details to launch your amazing contest and attract talented creators
                    </p>
                    <div className='flex justify-center'>
                        <div className='h-1 w-24 bg-gradient-to-r from-secondary via-accent to-secondary rounded-full'></div>
                    </div>
                </div>
            </div>

            {/* Form Container */}
            <div className='bg-white dark:bg-gray-800 max-w-3xl mx-auto p-8 md:p-12 rounded-3xl shadow-xl border-2 border-secondary/10 dark:border-secondary/20'>
                
                <form onSubmit={handleSubmit(handleAddContest)} className='space-y-8'>
                    
                    {/* Contest Name */}
                    <div className='space-y-3'>
                        <label className="block text-lg font-bold text-primary dark:text-white">
                            Contest Name <span className='text-red-500'>*</span>
                        </label>
                        <input
                            type="text"
                            {...register('contestName', { required: 'Contest name is required' })}
                            className="w-full px-4 py-3 border-2 border-secondary/30 dark:border-secondary/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-700 dark:text-white text-primary"
                            placeholder="Enter your contest name"
                        />
                        {errors.contestName && <span className='text-red-500 text-sm font-medium'>{errors.contestName.message}</span>}
                    </div>

                    {/* Contest Image */}
                    <div className='space-y-3'>
                        <label className="block text-lg font-bold text-primary dark:text-white">
                            Contest Image <span className='text-red-500'>*</span>
                        </label>
                        <div className='relative'>
                            <input
                                type="file"
                                {...register('contestImage', { required: 'Contest image is required' })}
                                className="w-full px-4 py-3 border-2 border-dashed border-secondary/40 dark:border-secondary/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-700 dark:text-white text-primary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-secondary file:text-white file:font-semibold hover:file:bg-secondary/90"
                            />
                            <FiUpload className='absolute right-4 top-3.5 text-secondary text-xl pointer-events-none' />
                        </div>
                        {errors.contestImage && <span className='text-red-500 text-sm font-medium'>{errors.contestImage.message}</span>}
                    </div>

                    {/* Two Column Layout */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        
                        {/* Entry Price */}
                        <div className='space-y-3'>
                            <label className="block text-lg font-bold text-primary dark:text-white">
                                Entry Price ($) <span className='text-red-500'>*</span>
                            </label>
                            <input
                                type="number"
                                {...register('entryPrice', { required: 'Entry price is required' })}
                                className="w-full px-4 py-3 border-2 border-secondary/30 dark:border-secondary/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-700 dark:text-white text-primary"
                                placeholder="500"
                            />
                            {errors.entryPrice && <span className='text-red-500 text-sm font-medium'>{errors.entryPrice.message}</span>}
                        </div>

                        {/* Total Prize Money */}
                        <div className='space-y-3'>
                            <label className="block text-lg font-bold text-primary dark:text-white">
                                Total Prize Money ($) <span className='text-red-500'>*</span>
                            </label>
                            <input
                                type="number"
                                {...register('prizeMoney', { required: 'Prize money is required' })}
                                className="w-full px-4 py-3 border-2 border-secondary/30 dark:border-secondary/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-700 dark:text-white text-primary"
                                placeholder="5000"
                            />
                            {errors.prizeMoney && <span className='text-red-500 text-sm font-medium'>{errors.prizeMoney.message}</span>}
                        </div>
                    </div>

                    {/* Contest Type */}
                    <div className='space-y-3'>
                        <label className="block text-lg font-bold text-primary dark:text-white">
                            Contest Type <span className='text-red-500'>*</span>
                        </label>
                        <select
                            {...register('contestType', { required: 'Please select a contest type' })}
                            className="w-full px-4 py-3 border-2 border-secondary/30 dark:border-secondary/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-700 dark:text-white text-primary"
                            defaultValue=""
                        >
                            <option value="">Select type</option>
                            <option value="Image Design">Image Design</option>
                            <option value="Article Writing">Article Writing</option>
                            <option value="Business Ideas">Business Ideas</option>
                            <option value="Gaming Reviews">Gaming Reviews</option>
                            <option value="Photography">Photography</option>
                            <option value="Logo Design">Logo Design</option>
                            <option value="Content Creation">Content Creation</option>
                        </select>
                        {errors.contestType && <span className='text-red-500 text-sm font-medium'>{errors.contestType.message}</span>}
                    </div>

                    {/* Deadline */}
                    <div className='space-y-3'>
                        <label className="block text-lg font-bold text-primary dark:text-white">
                            Deadline <span className='text-red-500'>*</span>
                        </label>
                        <input
                            type="date"
                            {...register('deadline', { required: 'Deadline is required' })}
                            className="w-full px-4 py-3 border-2 border-secondary/30 dark:border-secondary/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-700 dark:text-white text-primary"
                        />
                        {errors.deadline && <span className='text-red-500 text-sm font-medium'>{errors.deadline.message}</span>}
                    </div>

                    {/* Description */}
                    <div className='space-y-3'>
                        <label className="block text-lg font-bold text-primary dark:text-white">
                            Description <span className='text-red-500'>*</span>
                        </label>
                        <textarea
                            {...register('description', { required: 'Description is required' })}
                            className="w-full px-4 py-3 border-2 border-secondary/30 dark:border-secondary/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-700 dark:text-white text-primary resize-none"
                            rows="5"
                            placeholder="Describe your contest details, requirements, and expectations..."
                        ></textarea>
                        {errors.description && <span className='text-red-500 text-sm font-medium'>{errors.description.message}</span>}
                    </div>

                    {/* Task Instructions */}
                    <div className='space-y-3'>
                        <label className="block text-lg font-bold text-primary dark:text-white">
                            Task Instructions <span className='text-red-500'>*</span>
                        </label>
                        <textarea
                            {...register('taskInstruction', { required: 'Task instructions are required' })}
                            className="w-full px-4 py-3 border-2 border-secondary/30 dark:border-secondary/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-700 dark:text-white text-primary resize-none"
                            rows="5"
                            placeholder="What should participants do? Provide clear step-by-step instructions (one per line)..."
                        ></textarea>
                        {errors.taskInstruction && <span className='text-red-500 text-sm font-medium'>{errors.taskInstruction.message}</span>}
                    </div>

                    {/* Submit Button */}
                    <div className='pt-8'>
                        <button 
                            type='submit' 
                            className='w-full bg-gradient-to-r from-secondary to-secondary/80 hover:shadow-xl text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 text-lg flex items-center justify-center gap-2'
                        >
                            <FiAward size={24} />
                            Create Contest
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddContest;