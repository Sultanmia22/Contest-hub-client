import React from 'react';
import { useForm } from 'react-hook-form';
import GoogleLogin from '../../Components/SocialLogin/GoogleLogin';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../Hook/useAuth';
import { toast } from 'react-toastify';

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
        <div className='flex flex-col justify-center items-center min-h-screen'>
            <div className='space-y-2 pb-5 text-center'>
                <h2 className='text-4xl font-bold text-secondary text-center'> Welcome to ContestHub </h2>
                <p className='text-secondary'>Login with ContestHub</p>
            </div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <fieldset className="fieldset">

                            {/* Email Field */}
                            <label className="label">Email</label>
                            <input border-secondary type="email" {...register('email')} className="input border-secondary" placeholder="Email" />

                            {/* Password Field */}
                            <label className="label">Password</label>
                            <input border-secondary type="password" {...register('password')} className="input border-secondary" placeholder="Password" />

                            <div><a className="link link-hover">Forgot password?</a></div>
                            <button className="btn btn-primary mt-4">Login</button>

                        </fieldset>
                    </form>
                    <GoogleLogin />
                    <p>Don't have an Account? <Link to='/register' className='font-bold text-secondary'>register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;