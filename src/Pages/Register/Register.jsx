import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import GoogleLogin from '../../Components/SocialLogin/GoogleLogin';
import useAuth from '../../Hook/useAuth';
import { toast } from 'react-toastify';
import { uploadImage } from '../../Utils';
import axios from 'axios';

const Register = () => {

    const { createUser, updateUserProfile } = useAuth()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const handleRegister = async (data) => {

        try {
            const name = data.name
            const email = data.email;
            const password = data.password;
            const imageData = data.image[0]
            // console.log(imageData)

            const result = await createUser(email, password)
            const user = result.user;

            //uploadImage by imagebb 
            const imageURL = await uploadImage(imageData)
            // console.log(imageURL)

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
            // console.log(er)
        }

    }

    return (
        <div className='flex flex-col justify-center items-center min-h-screen'>
            <div className='space-y-2 pb-5 text-center'>
                <h2 className='text-4xl font-bold text-secondary text-start'> Create an Account </h2>
                <p className='text-secondary'>Register with ContestHub</p>
            </div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <form onSubmit={handleSubmit(handleRegister)}>
                        <fieldset className="fieldset">

                            {/* Name field */}
                            <label className="label">Name</label>
                            <input border-secondary type="text" {...register('name')} className="input border-secondary" placeholder="Name" />



                            {/* image field */}
                            <label className="label">Name</label>
                            <input border-secondary type='file' {...register('image')} className="file-input border-secondary" placeholder="Your Photo" />


                            {/* Email Field */}
                            <label className="label">Email</label>
                            <input border-secondary type="email" {...register('email',{ required: 'Email is required', pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'please enter valid email address' } })} className="input border-secondary" placeholder="Email" />
                            {errors.email && <p className='text-red-600 text-sm'> {errors.email.message} </p>}

                            <label className="label">Password</label>
                            <input border-secondary type="password" {...register('password',{ required: 'Password is Required', pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, message: 'Please enter a valid Password' } })} className="input border-secondary" placeholder="Password" />
                            {errors.password && <p className='text-red-600 text-sm'> {errors.password.message} </p>}
                            <div><a className="link link-hover">Forgot password?</a></div>
                            <button className="btn btn-primary mt-4">Register</button>

                        </fieldset>
                    </form>
                    <GoogleLogin />
                    <p>Already have an Account? <Link to='/login' className='font-bold text-secondary'>Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;