import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import GoogleLogin from '../../Components/SocialLogin/GoogleLogin';
import useAuth from '../../Hook/useAuth';
import { toast } from 'react-toastify';
import { uploadImage } from '../../Utils';
import axios from 'axios';
import { FiEye, FiMail, FiLock, FiUser, FiArrowRight, FiUpload } from 'react-icons/fi';
import { FaRegEyeSlash } from 'react-icons/fa';

const Register = () => {

    const { createUser, updateUserProfile } = useAuth()
    const navigate = useNavigate()
    const [showPass, setShowPass] = useState(false)
    const [imagePreview, setImagePreview] = useState(null)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const imageFile = watch('image');

    React.useEffect(() => {
        if (imageFile && imageFile[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(imageFile[0]);
        }
    }, [imageFile]);

    const handleRegister = async (data) => {
        try {
            const name = data.name
            const email = data.email;
            const password = data.password;
            const imageData = data.image[0]

            // Validate all fields
            if (!name || !email || !password || !imageData) {
                toast.error('Please fill in all fields including image');
                return;
            }

            const result = await createUser(email, password)
            const user = result.user;

            //uploadImage by imagebb 
            const imageURL = await uploadImage(imageData)

            //update profile 
            const profileInfo = {
                displayName: name,
                photoURL: imageURL
            }
            const profile = await updateUserProfile(profileInfo)

            // Insert Data in database 
            const userInfo = {
                name: name,
                email: email,
                image: imageURL,
            }
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user`, userInfo);

            toast.success('Registration Successfully!');
            navigate('/')
        }
        catch (er) {
            toast.error(er.message || 'Registration failed');
        }
    }

    return (
        <div className='flex flex-col justify-center items-center min-h-screen bg-white dark:bg-gray-900 px-4 py-12'>
            
            {/* Header Section */}
            <div className='space-y-4 pb-8 text-center mb-8 max-w-md'>
                <h2 className='text-4xl md:text-5xl font-bold text-primary dark:text-white'>
                    Create Account
                </h2>
                <p className='text-gray-700 dark:text-gray-300 text-lg'>
                    Join ContestHub and showcase your talent
                </p>
                <div className='flex justify-center'>
                    <div className='h-1 w-16 bg-gradient-to-r from-secondary via-accent to-secondary rounded-full'></div>
                </div>
            </div>

            {/* Register Card */}
            <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-3xl shadow-2xl border-2 border-secondary/10 dark:border-secondary/20 overflow-hidden">
                
                {/* Card Header */}
                <div className='bg-gradient-to-r from-secondary to-secondary/80 dark:from-secondary dark:to-secondary/90 p-8 text-center'>
                    <h3 className='text-2xl font-bold text-white'>Sign Up</h3>
                    <p className='text-white/90 mt-2'>Create your ContestHub account</p>
                </div>

                {/* Card Body */}
                <div className="p-8 space-y-6">
                    <form onSubmit={handleSubmit(handleRegister)} className='space-y-6'>
                        
                        {/* Name Field */}
                        <div className='space-y-3'>
                            <label className="block text-lg font-bold text-primary dark:text-white">
                                Full Name
                            </label>
                            <div className='relative'>
                                <FiUser className='absolute left-4 top-4 text-secondary text-xl' />
                                <input 
                                    type="text" 
                                    {...register('name', { required: 'Name is required' })} 
                                    className="w-full pl-12 pr-4 py-3 border-2 border-secondary/30 dark:border-secondary/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-700 dark:text-white text-primary" 
                                    placeholder="Your full name" 
                                />
                            </div>
                            {errors.name && <span className='text-red-500 text-sm font-medium'>{errors.name.message}</span>}
                        </div>

                        {/* Image Field */}
                        <div className='space-y-3'>
                            <label className="block text-lg font-bold text-primary dark:text-white">
                                Profile Photo
                            </label>
                            
                            {/* Image Preview */}
                            {imagePreview && (
                                <div className='mb-4'>
                                    <img 
                                        src={imagePreview} 
                                        alt="Preview" 
                                        className='w-24 h-24 rounded-lg object-cover border-2 border-secondary/30 mx-auto shadow-md'
                                    />
                                </div>
                            )}
                            
                            <label className='relative cursor-pointer'>
                                <input 
                                    type='file' 
                                    {...register('image', { required: 'Image is required' })} 
                                    className="hidden"
                                    accept="image/*"
                                />
                                <div className='w-full px-4 py-3 border-2 border-dashed border-secondary/40 dark:border-secondary/50 rounded-lg hover:border-secondary transition-colors flex items-center justify-center gap-2 bg-secondary/5 dark:bg-secondary/10'>
                                    <FiUpload className='text-secondary text-xl' />
                                    <span className='text-primary dark:text-white font-medium'>Choose photo</span>
                                </div>
                            </label>
                            {errors.image && <span className='text-red-500 text-sm font-medium'>{errors.image.message}</span>}
                        </div>

                        {/* Email Field */}
                        <div className='space-y-3'>
                            <label className="block text-lg font-bold text-primary dark:text-white">
                                Email Address
                            </label>
                            <div className='relative'>
                                <FiMail className='absolute left-4 top-4 text-secondary text-xl' />
                                <input 
                                    type="email" 
                                    {...register('email', { 
                                        required: 'Email is required',
                                        pattern: { 
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
                                            message: 'Please enter a valid email address' 
                                        } 
                                    })} 
                                    className="w-full pl-12 pr-4 py-3 border-2 border-secondary/30 dark:border-secondary/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-700 dark:text-white text-primary" 
                                    placeholder="your@email.com" 
                                />
                            </div>
                            {errors.email && <span className='text-red-500 text-sm font-medium'>{errors.email.message}</span>}
                        </div>

                        {/* Password Field */}
                        <div className='space-y-3'>
                            <label className="block text-lg font-bold text-primary dark:text-white">
                                Password
                            </label>
                            <div className='relative'>
                                <FiLock className='absolute left-4 top-4 text-secondary text-xl' />
                                <input 
                                    type={showPass ? 'text' : 'password'} 
                                    {...register('password', { 
                                        required: 'Password is required',
                                        pattern: { 
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
                                            message: 'Password must be 8+ chars with uppercase, lowercase, number & symbol' 
                                        } 
                                    })} 
                                    className="w-full pl-12 pr-12 py-3 border-2 border-secondary/30 dark:border-secondary/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-700 dark:text-white text-primary" 
                                    placeholder="Create a strong password" 
                                />
                                <button
                                    type='button'
                                    onClick={() => setShowPass(!showPass)}
                                    className='absolute right-4 top-4 text-secondary hover:text-secondary/80 transition-colors'
                                >
                                    {showPass ? <FaRegEyeSlash size={20} /> : <FiEye size={20} />}
                                </button>
                            </div>
                            {errors.password && <span className='text-red-500 text-sm font-medium'>{errors.password.message}</span>}
                        </div>

                        {/* Register Button */}
                        <button 
                            type='submit'
                            className='w-full bg-gradient-to-r from-secondary to-secondary/80 hover:shadow-xl text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-lg'
                        >
                            Create Account
                            <FiArrowRight size={20} />
                        </button>
                    </form>

                    {/* Divider */}
                    <div className='relative my-8'>
                        <div className='absolute inset-0 flex items-center'>
                            <div className='w-full border-t-2 border-secondary/20 dark:border-secondary/30'></div>
                        </div>
                        <div className='relative flex justify-center text-sm'>
                            <span className='px-4 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-medium'>Or sign up with</span>
                        </div>
                    </div>

                    {/* Google Login */}
                    <div className='bg-secondary/5 dark:bg-secondary/10 p-4 rounded-lg'>
                        <GoogleLogin />
                    </div>

                    {/* Login Link */}
                    <div className='text-center pt-4 border-t-2 border-secondary/10 dark:border-secondary/20'>
                        <p className='text-gray-700 dark:text-gray-300'>
                            Already have an account? 
                            <Link 
                                to='/login' 
                                className='font-bold text-secondary hover:text-secondary/80 ml-2 transition-colors'
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;