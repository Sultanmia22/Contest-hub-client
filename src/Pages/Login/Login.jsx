import React from 'react';
import { useForm } from 'react-hook-form';
import GoogleLogin from '../../Components/SocialLogin/GoogleLogin';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../Hook/useAuth';
import { toast } from 'react-toastify';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';

const Login = () => {

    const { loginUsers } = useAuth()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const handleLogin = async (data) => {
        try {
            const email = data.email;
            const password = data.password;

            const result = await loginUsers(email, password);
            const user = result.user;

            toast.success('Login Successfully!')
            navigate('/')
        }
        catch (er) {
            // console.log(er)
            toast.error(er.message)
        }
    }

    return (
        <div className='flex flex-col justify-center items-center min-h-screen bg-white dark:bg-gray-900 px-4 py-12'>
            
            {/* Header Section */}
            <div className='space-y-4 pb-8 text-center mb-8 max-w-md'>
                <h2 className='text-4xl md:text-5xl font-bold text-primary dark:text-white'>
                    Welcome Back
                </h2>
                <p className='text-gray-700 dark:text-gray-300 text-lg'>
                    Login to your ContestHub account
                </p>
                <div className='flex justify-center'>
                    <div className='h-1 w-16 bg-gradient-to-r from-secondary via-accent to-secondary rounded-full'></div>
                </div>
            </div>

            {/* Login Card */}
            <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-3xl shadow-2xl border-2 border-secondary/10 dark:border-secondary/20 overflow-hidden">
                
                {/* Card Header */}
                <div className='bg-gradient-to-r from-secondary to-secondary/80 dark:from-secondary dark:to-secondary/90 p-8 text-center'>
                    <h3 className='text-2xl font-bold text-white'>Sign In</h3>
                    <p className='text-white/90 mt-2'>Enter your credentials to continue</p>
                </div>

                {/* Card Body */}
                <div className="p-8 space-y-6">
                    <form onSubmit={handleSubmit(handleLogin)} className='space-y-6'>
                        
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
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Invalid email address'
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
                                    type="password" 
                                    {...register('password', { 
                                        required: 'Password is required',
                                        minLength: {
                                            value: 6,
                                            message: 'Password must be at least 6 characters'
                                        }
                                    })} 
                                    className="w-full pl-12 pr-4 py-3 border-2 border-secondary/30 dark:border-secondary/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-700 dark:text-white text-primary" 
                                    placeholder="Enter your password" 
                                />
                            </div>
                            {errors.password && <span className='text-red-500 text-sm font-medium'>{errors.password.message}</span>}
                        </div>

                        {/* Forgot Password Link */}
                        <div className='flex justify-end'>
                            <Link to='/forgot-password' className='text-secondary hover:text-secondary/80 text-sm font-semibold transition-colors'>
                                Forgot password?
                            </Link>
                        </div>

                        {/* Login Button */}
                        <button 
                            type='submit'
                            className='w-full bg-gradient-to-r from-secondary to-secondary/80 hover:shadow-xl text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-lg'
                        >
                            Sign In
                            <FiArrowRight size={20} />
                        </button>
                    </form>

                    {/* Divider */}
                    <div className='relative my-8'>
                        <div className='absolute inset-0 flex items-center'>
                            <div className='w-full border-t-2 border-secondary/20 dark:border-secondary/30'></div>
                        </div>
                        <div className='relative flex justify-center text-sm'>
                            <span className='px-4 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-medium'>Or continue with</span>
                        </div>
                    </div>

                    {/* Google Login */}
                    <div className='bg-secondary/5 dark:bg-secondary/10 p-4 rounded-lg'>
                        <GoogleLogin />
                    </div>

                    {/* Sign Up Link */}
                    <div className='text-center pt-4 border-t-2 border-secondary/10 dark:border-secondary/20'>
                        <p className='text-gray-700 dark:text-gray-300'>
                            Don't have an account? 
                            <Link 
                                to='/register' 
                                className='font-bold text-secondary hover:text-secondary/80 ml-2 transition-colors'
                            >
                                Create one
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;