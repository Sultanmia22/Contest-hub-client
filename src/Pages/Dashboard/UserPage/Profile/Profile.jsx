import React, { useState } from 'react';
import useAuth from '../../../../Hook/useAuth';
import { uploadImage } from '../../../../Utils';
import useAxiosSecure from '../../../../Hook/useAxiosSecure';
import { toast } from 'react-toastify';
import { FaRegEdit, FaCamera, FaEnvelope, FaMapMarkerAlt, FaTrophy, FaChartPie } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../Components/LoadingPage/Loading';
import { Cell, Pie, PieChart, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#2563EB', '#EF4444']; // Blue for won, Red for lost

const Profile = () => {
    const { user, updateUserProfile, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isEditing, setIsEditing] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    // Get profile info
    const { data: profileInfo = {}, isLoading: profileLoading } = useQuery({
        queryKey: ['profileInfo', user?.email],
        queryFn: async () => {
            const result = await axiosSecure.get(`/profileInfo?email=${user?.email}`);
            return result.data;
        },
        enabled: !!user?.email,
    });

    // Get participant count
    const { data: participantCount = [] } = useQuery({
        queryKey: ['participant-count', user?.email],
        queryFn: async () => {
            const result = await axiosSecure.get(`/total-participant?email=${user?.email}`);
            return result.data;
        },
        enabled: !!user?.email,
    });

    // Get win count
    const { data: winCount = [] } = useQuery({
        queryKey: ['win-count', user?.email],
        queryFn: async () => {
            const result = await axiosSecure.get(`/total-win?email=${user?.email}`);
            return result.data;
        },
        enabled: !!user?.email,
    });

    const won = winCount?.length || 0;
    const participated = participantCount?.length || 0;
    const lost = Math.max(0, participated - won);

    const chartData = [
        { name: 'Won', value: won },
        { name: 'Lost', value: lost },
    ];

    // Change photo
    const handleChangePhoto = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const imageURL = await uploadImage(file);
            await updateUserProfile({ displayName: user?.displayName, photoURL: imageURL });
            await axiosSecure.patch(`/update-profileImg?userEmail=${user?.email}`, { imageURL });
            toast.success('Profile photo updated successfully');
        } catch (error) {
            toast.error('Failed to update photo');
        }
    };

    // Toggle edit mode
    const toggleEdit = () => setIsEditing(!isEditing);
    const cancelEdit = (e) => {
        e.preventDefault();
        setIsEditing(false);
    };

    // Update info
    const onSubmit = async (data) => {
        try {
            await updateUserProfile({ 
                displayName: data.name, 
                photoURL: user?.photoURL 
            });
            
            await axiosSecure.patch(`/updateinfo?email=${user?.email}`, {
                name: data.name,
                bio: data.bio,
                address: data.address,
            });
            
            toast.success('Profile updated successfully');
            setIsEditing(false);
        } catch (error) {
            toast.error('Failed to update profile');
        }
    };

    if (loading || profileLoading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                        Profile Settings
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Manage your personal information and view your contest statistics
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    
                    {/* Left Column - Avatar & Quick Stats */}
                    <div className="space-y-6 lg:col-span-1">
                        {/* Avatar Card */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <div className="flex flex-col items-center">
                                <div className="relative mb-4">
                                    <img
                                        src={user?.photoURL || 'https://via.placeholder.com/150'}
                                        alt="Profile"
                                        className="h-32 w-32 rounded-full object-cover border-4 border-gray-100 dark:border-gray-700"
                                    />
                                    <label className="absolute bottom-0 right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors">
                                        <FaCamera size={16} />
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleChangePhoto}
                                        />
                                    </label>
                                </div>
                                
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white text-center">
                                    {user?.displayName}
                                </h2>
                                <p className="mt-1 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                    <FaEnvelope size={14} />
                                    {user?.email}
                                </p>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-200 pt-6 dark:border-gray-700">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {participated}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Contests</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                        {won}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Wins</p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Info */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                Location
                            </h3>
                            <div className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                                <FaMapMarkerAlt className="mt-1 flex-shrink-0 text-gray-400" />
                                <span>{profileInfo?.address || 'No address provided'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Details & Form */}
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* Profile Information */}
                        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700 flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Personal Information
                                </h3>
                                {!isEditing && (
                                    <button
                                        onClick={toggleEdit}
                                        className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                    >
                                        <FaRegEdit size={14} />
                                        Edit
                                    </button>
                                )}
                            </div>

                            <div className="p-6">
                                {isEditing ? (
                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                        <div className="grid gap-6 sm:grid-cols-2">
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Full Name
                                                </label>
                                                <input
                                                    defaultValue={user?.displayName}
                                                    {...register('name', { required: 'Name is required' })}
                                                    type="text"
                                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                                                />
                                                {errors.name && (
                                                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Address
                                                </label>
                                                <input
                                                    defaultValue={profileInfo?.address}
                                                    {...register('address')}
                                                    type="text"
                                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                                                    placeholder="Enter your address"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Bio
                                            </label>
                                            <textarea
                                                defaultValue={profileInfo?.bio}
                                                {...register('bio')}
                                                rows={4}
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                                                placeholder="Tell us about yourself"
                                            />
                                        </div>

                                        <div className="flex gap-3 pt-2">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700"
                                            >
                                                {isSubmitting ? 'Saving...' : 'Save Changes'}
                                            </button>
                                            <button
                                                onClick={cancelEdit}
                                                className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="grid gap-6 sm:grid-cols-2">
                                            <div>
                                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</p>
                                                <p className="mt-1 text-base text-gray-900 dark:text-white">{user?.displayName}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</p>
                                                <p className="mt-1 text-base text-gray-900 dark:text-white">
                                                    {profileInfo?.address || 'Not provided'}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Bio</p>
                                            <p className="mt-1 text-base text-gray-900 dark:text-white leading-relaxed">
                                                {profileInfo?.bio || 'No bio added yet.'}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Performance Chart */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <div className="mb-6 flex items-center gap-2">
                                <FaChartPie className="text-blue-600 dark:text-blue-400" />
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Contest Performance
                                </h3>
                            </div>

                            <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
                                <div className="h-64 w-full max-w-xs">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={chartData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={80}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {chartData.map((entry, index) => (
                                                    <Cell 
                                                        key={`cell-${index}`} 
                                                        fill={COLORS[index % COLORS.length]} 
                                                    />
                                                ))}
                                            </Pie>
                                            <Tooltip 
                                                contentStyle={{ 
                                                    backgroundColor: '#fff', 
                                                    border: '1px solid #e5e7eb',
                                                    borderRadius: '8px',
                                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                                }}
                                            />
                                            <Legend verticalAlign="bottom" height={36}/>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="grid w-full gap-4 sm:grid-cols-2 md:w-auto">
                                    <div className="rounded-xl bg-blue-50 p-4 dark:bg-blue-900/20">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
                                                <FaTrophy size={18} />
                                            </div>
                                            <div>
                                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{won}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Wins</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-xl bg-red-50 p-4 dark:bg-red-900/20">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white">
                                                <FaChartPie size={18} />
                                            </div>
                                            <div>
                                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{lost}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Losses</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;