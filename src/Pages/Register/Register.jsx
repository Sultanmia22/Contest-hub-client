import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiEye, FiEyeOff, FiMail, FiLock, FiUser, FiArrowRight, FiCamera } from 'react-icons/fi';

import GoogleLogin from '../../Components/SocialLogin/GoogleLogin';
import useAuth from '../../Hook/useAuth';
import { uploadImage } from '../../Utils';

const Register = () => {
    const { createUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const imageFile = watch('image');

    useEffect(() => {
        if (imageFile && imageFile[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(imageFile[0]);
        }
    }, [imageFile]);

    const handleRegister = async (data) => {
        setIsLoading(true);
        try {
            const { name, email, password } = data;
            const imageData = data.image[0];

            if (!imageData) {
                toast.error('Please select a profile photo');
                setIsLoading(false);
                return;
            }

            // Create user
            const result = await createUser(email, password);
            
            // Upload image
            const imageURL = await uploadImage(imageData);

            // Update profile
            await updateUserProfile({
                displayName: name,
                photoURL: imageURL,
            });

            // Save to database
            const userInfo = {
                name,
                email,
                image: imageURL,
            };
            
            await axios.post(`${import.meta.env.VITE_SERVER_URL}/user`, userInfo);

            toast.success('Account created successfully!');
            navigate('/');
        } catch (error) {
            toast.error(error.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10 dark:bg-gray-950">
            <div className="mx-auto flex min-h-[80vh] w-full max-w-md flex-col justify-center">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                        Create account
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Join ContestHub to participate in contests
                    </p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-8">
                    <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">
                        
                        {/* Name Field */}
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Full name
                            </label>
                            <div className="relative">
                                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    {...register('name', { 
                                        required: 'Name is required',
                                        minLength: {
                                            value: 2,
                                            message: 'Name must be at least 2 characters'
                                        }
                                    })}
                                    className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                                />
                            </div>
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Profile photo
                            </label>
                            
                            <div className="flex items-center gap-4">
                                {imagePreview ? (
                                    <div className="relative">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="h-16 w-16 rounded-lg object-cover ring-2 ring-gray-200 dark:ring-gray-700"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setImagePreview(null);
                                                // Reset file input would need a ref in real implementation
                                            }}
                                            className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs hover:bg-red-600"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                                        <FiCamera className="text-gray-400" size={20} />
                                    </div>
                                )}
                                
                                <label className="flex-1 cursor-pointer">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        {...register('image', { required: 'Profile photo is required' })}
                                        className="hidden"
                                    />
                                    <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-center transition-colors hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-900/50 dark:hover:bg-gray-700">
                                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                            {imagePreview ? 'Change photo' : 'Upload photo'}
                                        </span>
                                    </div>
                                </label>
                            </div>
                            {errors.image && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.image.message}
                                </p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Email address
                            </label>
                            <div className="relative">
                                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Invalid email address',
                                        },
                                    })}
                                    className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    id="password"
                                    type={showPass ? 'text' : 'password'}
                                    placeholder="Create a strong password"
                                    {...register('password', {
                                        required: 'Password is required',
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                            message: 'Min 8 chars with uppercase, lowercase, number & symbol',
                                        },
                                    })}
                                    className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-10 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                    {showPass ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isLoading ? 'Creating account...' : 'Create account'}
                            {!isLoading && <FiArrowRight />}
                        </button>
                    </form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200 dark:border-gray-700" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-3 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <GoogleLogin />

                    <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;