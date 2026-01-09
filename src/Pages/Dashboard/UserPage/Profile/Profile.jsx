import React, { useState } from 'react';
import useAuth from '../../../../Hook/useAuth';
import { uploadImage } from '../../../../Utils';
import axios from 'axios';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../../Hook/useAxiosSecure';
import { FaRegEdit, FaCamera } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../Components/LoadingPage/Loading';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

const COLORS = ['#0D9488', '#F59E0B'];

const Profile = () => {
    const { user, updateUserProfile, loading } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [edits, setEdits] = useState(false)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    // get info 
    const { data: profileInfo = {}, isLoading } = useQuery({
        queryKey: ['profileInfo', user?.email],
        queryFn: async () => {
            const result = await axiosSecure.get(`/profileInfo?email=${user?.email}`);
            return result.data
        }
    })

    console.log(profileInfo)

    // Change photo url
    const handleChangePhoto = async (imageData) => {
        const imageURL = await uploadImage(imageData)
        await updateUserProfile({ displayName: user?.displayName, photoURL: imageURL })
        await axiosSecure.patch(`/update-profileImg?userEmail=${user?.email}`, { imageURL: imageURL })
        toast.success('Image change Successfully!')
    }

    // show edit field 
    const handleShowEdit = () => {
        setEdits(true)
    }

    // hide edit field 
    const handleCancelEdit = (e) => {
        e.preventDefault()
        setEdits(false)
    }

    // update infomatrion 
    const handleUpdateInfo = async (data) => {
        const name = data.name
        const bio = data.bio;
        const address = data.address;
        await updateUserProfile({ displayName: name, photoURL: user?.photoURL });
        const result = await axiosSecure.patch(`/updateinfo?email=${user?.email}`, { name: name, bio: bio, address: address });
        toast.success('Update Successfully');
        setEdits(false);
    }

    // participant data 
    const { data: participantCount = [] } = useQuery({
        queryKey: ['participant-count', user?.email],
        queryFn: async () => {
            const result = await axiosSecure.get(`/total-participant?email=${user?.email}`)
            return result.data
        }
    })

    // participant data 
    const { data: winCount = [] } = useQuery({
        queryKey: ['win-count', user?.email],
        queryFn: async () => {
            const result = await axiosSecure.get(`/total-win?email=${user?.email}`)
            return result.data
        }
    })

    const won = winCount?.length || 0;
    const participated = participantCount?.length || 0;
    const lost = participated - won;

    const data = [
        { name: 'Won', value: won },
        { name: 'Lost', value: lost },
    ];

    if (loading) {
        return <Loading />
    }

    return (
        <div className='flow-root px-4 md:px-8 bg-white dark:bg-gray-900 min-h-screen py-12'>
            
            {/* Title Section */}
            <div className='my-8 space-y-4 text-center mb-12'>
                <h2 className='text-3xl md:text-5xl text-primary dark:text-white font-bold'>My Profile</h2>
                <p className='text-base md:text-lg text-gray-700 dark:text-gray-300'>
                    Manage your profile and track your achievements
                </p>
                <div className='flex justify-center'>
                    <div className='h-1 w-24 bg-gradient-to-r from-secondary via-accent to-secondary rounded-full'></div>
                </div>
            </div>

            {/* Profile Card */}
            <div className='bg-white dark:bg-gray-800 shadow-2xl rounded-3xl border-2 border-secondary/10 dark:border-secondary/20 overflow-hidden max-w-4xl mx-auto mb-16'>
                <div className='flex flex-col md:flex-row'>
                    
                    {/* Left Side - Photo Section */}
                    <div className='w-full md:w-1/3 bg-gradient-to-br from-secondary to-secondary/80 dark:from-secondary dark:to-secondary/90 flex flex-col justify-center items-center py-12 md:py-0'>
                        <div className='relative group'>
                            <img 
                                src={user?.photoURL} 
                                alt="Profile" 
                                className='w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300' 
                            />
                            <div className='absolute inset-0 rounded-2xl bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                                <FaCamera className='text-white text-3xl' />
                            </div>
                        </div>
                        
                        <label className="btn bg-white text-secondary hover:bg-gray-100 rounded-full mt-6 font-semibold shadow-lg">
                            <FaCamera size={18} />
                            Change Photo
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => handleChangePhoto(e.target.files[0])}
                            />
                        </label>
                    </div>

                    {/* Right Side - Info Section */}
                    <div className='flex-1 p-8 md:p-12 flex flex-col justify-between'>
                        
                        {edits === true ? (
                            <form onSubmit={handleSubmit(handleUpdateInfo)} className='space-y-6'>
                                {/* Name Field */}
                                <div>
                                    <label className="block text-lg font-bold text-primary dark:text-white mb-3">Name</label>
                                    <input 
                                        defaultValue={user?.displayName} 
                                        {...register('name')} 
                                        type="text" 
                                        className="w-full px-4 py-3 border-2 border-secondary/30 dark:border-secondary/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-700 dark:text-white text-primary" 
                                        placeholder="Enter Your Name" 
                                    />
                                </div>

                                {/* Bio Field */}
                                <div>
                                    <label className="block text-lg font-bold text-primary dark:text-white mb-3">Bio</label>
                                    <textarea 
                                        defaultValue={profileInfo.bio} 
                                        {...register('bio')} 
                                        rows="4"
                                        className="w-full px-4 py-3 border-2 border-secondary/30 dark:border-secondary/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-700 dark:text-white text-primary" 
                                        placeholder="Write Your Bio" 
                                    />
                                </div>

                                {/* Address Field */}
                                <div>
                                    <label className="block text-lg font-bold text-primary dark:text-white mb-3">Address</label>
                                    <input 
                                        defaultValue={profileInfo.address} 
                                        {...register('address')} 
                                        type="text" 
                                        className="w-full px-4 py-3 border-2 border-secondary/30 dark:border-secondary/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-700 dark:text-white text-primary" 
                                        placeholder="Write Your Address" 
                                    />
                                </div>

                                {/* Action Buttons */}
                                <div className='flex gap-4 pt-6'>
                                    <button 
                                        type='submit'
                                        className='flex-1 btn bg-gradient-to-r from-secondary to-secondary/80 text-white font-bold rounded-lg hover:shadow-lg transition-all'
                                    >
                                        Save Changes
                                    </button>
                                    <button 
                                        onClick={handleCancelEdit} 
                                        className='flex-1 btn bg-gray-300 dark:bg-gray-700 text-primary dark:text-white font-bold rounded-lg hover:shadow-lg transition-all'
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className='space-y-6'>
                                {/* User Info */}
                                <div>
                                    <h2 className='text-2xl md:text-3xl font-bold text-primary dark:text-white mb-2'>
                                        {user?.displayName}
                                    </h2>
                                    <p className='text-gray-700 dark:text-gray-400 text-lg'>
                                        {user?.email}
                                    </p>
                                </div>

                                {/* Bio Section */}
                                <div className='border-t-2 border-secondary/20 dark:border-secondary/30 pt-6'>
                                    <p className='text-lg font-bold text-primary dark:text-white mb-2'>Bio</p>
                                    <p className='text-gray-700 dark:text-gray-300'>
                                        {profileInfo.bio || 'Contest enthusiast and creative thinker'}
                                    </p>
                                </div>

                                {/* Address Section */}
                                <div className='border-t-2 border-secondary/20 dark:border-secondary/30 pt-6'>
                                    <p className='text-lg font-bold text-primary dark:text-white mb-2'>Address</p>
                                    <p className='text-gray-700 dark:text-gray-300'>
                                        {profileInfo.address || 'Dhaka, Bangladesh'}
                                    </p>
                                </div>

                                {/* Edit Button */}
                                <button 
                                    onClick={handleShowEdit} 
                                    className='mt-6 btn bg-gradient-to-r from-secondary to-secondary/80 text-white font-bold rounded-lg hover:shadow-lg transition-all flex items-center gap-2 w-full md:w-auto'
                                >
                                    <FaRegEdit />
                                    Edit Profile
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Statistics Section */}
            <div className='mt-16'>
                <h2 className='text-3xl md:text-4xl font-bold text-center text-primary dark:text-white mb-12'>
                    Performance Analytics
                </h2>

                <div className='bg-gradient-to-br from-secondary/5 to-secondary/10 dark:from-secondary/20 dark:to-secondary/10 rounded-3xl p-8 md:p-12 border-2 border-secondary/20 dark:border-secondary/30 max-w-4xl mx-auto'>
                    
                    {/* Stats Cards */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-12'>
                        {/* Total Participant */}
                        <div className='bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border-2 border-secondary/10 dark:border-secondary/20 hover:shadow-xl transition-all duration-300'>
                            <p className='text-gray-700 dark:text-gray-400 font-semibold text-sm mb-3'>Total Participated</p>
                            <h3 className='text-5xl md:text-6xl font-bold text-secondary mb-2'>
                                {participantCount?.length}
                            </h3>
                            <p className='text-gray-600 dark:text-gray-400 text-sm'>contests</p>
                        </div>

                        {/* Total Win */}
                        <div className='bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border-2 border-accent/10 dark:border-accent/20 hover:shadow-xl transition-all duration-300'>
                            <p className='text-gray-700 dark:text-gray-400 font-semibold text-sm mb-3'>Total Wins</p>
                            <h3 className='text-5xl md:text-6xl font-bold text-accent mb-2'>
                                {winCount?.length}
                            </h3>
                            <p className='text-gray-600 dark:text-gray-400 text-sm'>victories</p>
                        </div>
                    </div>

                    {/* Chart Section */}
                    <div className='bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border-2 border-secondary/10 dark:border-secondary/20'>
                        <h3 className='text-xl font-bold text-primary dark:text-white text-center mb-8'>Win/Loss Distribution</h3>
                        
                        <div className='w-full max-w-[500px] h-[300px] mx-auto'>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data}
                                        dataKey="value"
                                        startAngle={180}
                                        endAngle={0}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius="80%"
                                        label={({ name, value }) => `${name}: ${value}`}
                                        isAnimationActive={true}
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Legend */}
                        <div className='flex justify-center gap-8 mt-8'>
                            <div className='flex items-center gap-2'>
                                <div className='w-4 h-4 rounded-full' style={{backgroundColor: COLORS[0]}}></div>
                                <span className='text-gray-700 dark:text-gray-300 font-medium'>Won: {won}</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <div className='w-4 h-4 rounded-full' style={{backgroundColor: COLORS[1]}}></div>
                                <span className='text-gray-700 dark:text-gray-300 font-medium'>Lost: {lost}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;