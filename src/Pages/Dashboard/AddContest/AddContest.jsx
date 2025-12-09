import React from 'react';
import { useForm } from 'react-hook-form';
import { uploadImage } from '../../../Utils';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import useAuth from '../../../Hook/useAuth';

const AddContest = () => {
    const {user} = useAuth()
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

            const addContestInfo = {
                contestName: data.contestName,
                contestImage: imageURL,
                entryPrice: data.entryPrice,
                prizeMoney: data.prizeMoney,
                contestType: data.contestType,
                description: data.description,
                taskInstruction: data.taskInstruction,
                deadline: data.deadline,
                creatorEmail: user?.email
            }

            const result = await axiosSecure.post('/add-contest',addContestInfo);
            toast.success('Created Contest Successfully')
             reset()
             navigate('/dashboard/my-contest')
        }
        catch (er) {
            console.log(er)
        }

    };

    return (
        <div className='flow-root'>
            <div className='bg-base-100 mx-4 md:w-6/12 md:mx-auto my-10 p-10 rounded-xl border-2 border-secondary shadow-lg'>
                <div className='pb-4'>
                    <h2 className='text-primary text-xl md:text-5xl font-bold'>Create New Contest</h2>
                    <p className='text-sm md:text-[16px]'>Fill in the details to launch your amazing contest</p>
                </div>
                <form onSubmit={handleSubmit(handleAddContest)}>
                    <div className='fieldset flex-1'>

                        {/* Contest Name */}
                        <label className="label text-primary text-[16px] font-medium">
                            Contest Name <span className='text-red-800'>*</span>
                        </label>
                        <input
                            type="text"
                            {...register('contestName', { required: 'Contest name is required' })}
                            className="input w-full border border-secondary focus:border-0"
                            placeholder="write your contest name"
                        />
                        {errors.contestName && <span className='text-red-500 text-sm'>{errors.contestName.message}</span>}

                        {/* Contest Image */}
                        <label className="label text-primary text-[16px] font-medium mt-4">
                            Contest Image <span className='text-red-800'>*</span>
                        </label>
                        <input
                            type="file"
                            {...register('contestImage', { required: 'Contest image is required' })}
                            className="file-input w-full border border-secondary focus:border-0"
                        />
                        {errors.contestImage && <span className='text-red-500 text-sm'>{errors.contestImage.message}</span>}

                        {/* Entry Price */}
                        <label className="label text-primary text-[16px] font-medium mt-4">
                            Entry Price <span className='text-red-800'>*</span>
                        </label>
                        <input
                            type="number"
                            {...register('entryPrice', { required: 'Entry price is required' })}
                            className="input w-full border border-secondary focus:border-0"
                            placeholder="500"
                        />
                        {errors.entryPrice && <span className='text-red-500 text-sm'>{errors.entryPrice.message}</span>}

                        {/* Total Prize Money */}
                        <label className="label text-primary text-[16px] font-medium mt-4">
                            Total Prize Money <span className='text-red-800'>*</span>
                        </label>
                        <input
                            type="number"
                            {...register('prizeMoney', { required: 'Prize money is required' })}
                            className="input w-full border border-secondary focus:border-0"
                            placeholder="5000"
                        />
                        {errors.prizeMoney && <span className='text-red-500 text-sm'>{errors.prizeMoney.message}</span>}

                        {/* Contest Type */}
                        <label className="label text-primary text-[16px] font-medium mt-4">
                            Contest Type <span className='text-red-800'>*</span>
                        </label>
                        <select
                            {...register('contestType', { required: 'Please select a contest type' })}
                            className="select w-full border border-secondary focus:border-0"
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
                        {errors.contestType && <span className='text-red-500 text-sm'>{errors.contestType.message}</span>}

                        {/* Description */}
                        <label className="label text-primary text-[16px] font-medium mt-4">
                            Description <span className='text-red-800'>*</span>
                        </label>
                        <textarea
                            {...register('description', { required: 'Description is required' })}
                            className="textarea w-full border border-secondary focus:border-0"
                            placeholder="Describe your contest details, requirements, and expectations..."
                        ></textarea>
                        {errors.description && <span className='text-red-500 text-sm'>{errors.description.message}</span>}

                        {/* Task Instructions */}
                        <label className="label text-primary text-[16px] font-medium mt-4">
                            Task Instructions <span className='text-red-800'>*</span>
                        </label>
                        <textarea
                            {...register('taskInstruction', { required: 'Task instructions are required' })}
                            className="textarea w-full border border-secondary focus:border-0"
                            placeholder="What should participants do? Provide clear step-by-step instructions..."
                        ></textarea>
                        {errors.taskInstruction && <span className='text-red-500 text-sm'>{errors.taskInstruction.message}</span>}

                        {/* Deadline */}
                        <label className="label text-primary text-[16px] font-medium mt-4">
                            Deadline <span className='text-red-800'>*</span>
                        </label>
                        <input
                            type="date"
                            {...register('deadline', { required: 'Deadline is required' })}
                            className="input w-full border border-secondary focus:border-0"
                        />
                        {errors.deadline && <span className='text-red-500 text-sm'>{errors.deadline.message}</span>}

                    </div>
                    <div className='pt-5'>
                        <button type='submit' onClick={handleSubmit(handleAddContest)} className='btn btn-primary w-full'>
                            Create Contest
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddContest;