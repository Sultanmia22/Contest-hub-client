import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';

import GoogleLogin from '../../Components/SocialLogin/GoogleLogin';
import useAuth from '../../Hook/useAuth';

const Login = () => {
    const { loginUsers } = useAuth();
    const navigate = useNavigate();

    const [role, setRole] = useState('');

    const demoEmailRef = useRef(null);
    const demoPasswordRef = useRef(null);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm();

    const { data: demoEmails } = useQuery({
        queryKey: ['email', role],
        queryFn: async () => {
            const res = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/demoEmail?email=${role}`
            );

            return res.data;
        },
        enabled: !!role,
    });

    useEffect(() => {
        if (demoEmails?.email) {
            setValue('email', demoEmails.email);
            demoEmailRef.current?.close();
        }
    }, [demoEmails, setValue]);

    const handleOpenDemoEmail = () => {
        demoEmailRef.current?.showModal();
    };

    const handleOpenDemoPassword = () => {
        demoPasswordRef.current?.showModal();
    };

    const handleGetUserEmail = (selectedRole) => {
        setRole(selectedRole);
    };

    const handleGetDemoPassword = (password) => {
        setValue('password', password);
        demoPasswordRef.current?.close();
    };

    const handleLogin = async (data) => {
        try {
            await loginUsers(data.email, data.password);

            toast.success('Login successful');
            navigate('/');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10 dark:bg-gray-950">
            <div className="mx-auto flex min-h-[80vh] w-full max-w-md flex-col justify-center">
                
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                        Welcome back
                    </h1>

                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Sign in to your ContestHub account
                    </p>
                </div>

                {/* Demo Buttons */}
                <div className="mb-4 flex gap-3">
                    <button
                        type="button"
                        onClick={handleOpenDemoEmail}
                        className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        Demo email
                    </button>

                    <button
                        type="button"
                        onClick={handleOpenDemoPassword}
                        className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        Demo password
                    </button>
                </div>

                {/* Login Card */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-8">
                    <form
                        onSubmit={handleSubmit(handleLogin)}
                        className="space-y-5"
                    >
                        {/* Email */}
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
                                    className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                                />
                            </div>

                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
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
                                    type="password"
                                    placeholder="Enter your password"
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 6,
                                            message:
                                                'Password must be at least 6 characters',
                                        },
                                    })}
                                    className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                                />
                            </div>

                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Forgot Password */}
                        <div className="flex justify-end">
                            <Link
                                to="/forgot-password"
                                className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isSubmitting ? 'Signing in...' : 'Sign in'}
                            <FiArrowRight />
                        </button>
                    </form>

                    {/* Divider */}
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

                    {/* Google Login */}
                    <GoogleLogin />

                    {/* Register Link */}
                    <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                        Don&apos;t have an account?{' '}
                        <Link
                            to="/register"
                            className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
                        >
                            Create one
                        </Link>
                    </p>
                </div>
            </div>

            {/* Demo Email Modal */}
            <dialog ref={demoEmailRef} className="modal">
                <div className="modal-box rounded-2xl bg-white dark:bg-gray-800">
                    <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                        Choose a demo account
                    </h3>

                    <div className="grid gap-3">
                        <button
                            type="button"
                            onClick={() => handleGetUserEmail('user')}
                            className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                            User email
                        </button>

                        <button
                            type="button"
                            onClick={() => handleGetUserEmail('creator')}
                            className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                            Creator email
                        </button>

                        <button
                            type="button"
                            onClick={() => handleGetUserEmail('admin')}
                            className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                            Admin email
                        </button>
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700">
                                Close
                            </button>
                        </form>
                    </div>
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            {/* Demo Password Modal */}
            <dialog ref={demoPasswordRef} className="modal">
                <div className="modal-box rounded-2xl bg-white dark:bg-gray-800">
                    <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                        Choose a demo password
                    </h3>

                    <div className="grid gap-3">
                        <button
                            type="button"
                            onClick={() =>
                                handleGetDemoPassword('Emon1234@#')
                            }
                            className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                            User password
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                handleGetDemoPassword('Emon1234@#')
                            }
                            className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                            Creator password
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                handleGetDemoPassword('Emon1234@#')
                            }
                            className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                            Admin password
                        </button>
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700">
                                Close
                            </button>
                        </form>
                    </div>
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default Login;