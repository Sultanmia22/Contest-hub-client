import React, { useState } from 'react';
import useAuth from '../../../../Hook/useAuth';
import { uploadImage } from '../../../../Utils';
import axios from 'axios';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../../Hook/useAxiosSecure';
import { FaRegEdit } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../Components/LoadingPage/Loading';

const Profile = () => {
    const { user, updateUserProfile,loading } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [edits, setEdits] = useState(false)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
       
    } = useForm()

    // get info 
    const {data: profileInfo = {} ,isLoading} = useQuery({
        queryKey: ['profileInfo',user?.email],
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
         await updateUserProfile({ displayName: name, photoURL: user?.photoURL});
        const result =  await axiosSecure.patch(`/updateinfo?email=${user?.email}`,{name:name,bio:bio,address:address});
        toast.success('Update Successfully');
        setEdits(false);
    }

    if(loading){
        return <Loading/>
    }

    return (
        <div className='flow-root mx-5'>
            <div>
                {/* title */}
                <div className='my-5 space-y-2 text-center'>
                    <h2 className='text-2xl md:text-5xl text-gray-800 font-bold dark:text-gray-100'>My Profile</h2>
                    <p className='text-sm md:text-[18px] text-gray-700 dark:text-gray-400'>Manage your profile and track your achievements</p>
                </div>

                {/* Profile card */}
                <div className='profile-card bg-base-100 shadow-lg flex flex-col md:flex-row gap-5 md:w-6/11 mx-auto md:h-[500px] rounded-2xl'>

                    {/* Left side  */}
                    <div className='profile-left  md:w-[300px] bg-primary min-h-full flex flex-col justify-center items-center rounded-2xl md:rounded-none md:rounded-l-2xl py-10'>
                        <div className=''>
                            <img src={user?.photoURL} alt="" className='w-30 h-30 mx-auto p-1 border-white border rounded-xl' />
                        </div>
                        <div className='mt-4'>
                            <label className="btn bg-secondary text-white rounded-full">
                                Change Photo
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => handleChangePhoto(e.target.files[0])}
                                />
                            </label>
                        </div>
                    </div>


                    <div className='profile-right flex-1 p-5'>

                        {
                            edits === true ?

                                <div className='flex flex-col justify-between'>
                                    <form onSubmit={handleSubmit(handleUpdateInfo)}>
                                        <fieldset className='fieldset'>
                                            <label className="text-xl font-medium text-gray-600 dark:text-gray-100">Name</label>
                                            <input defaultValue={user?.displayName} {...register('name')} type="text" className="input border-2 w-full" placeholder="Enter Your Name" />

                                            <label className="text-xl font-medium  text-gray-600 dark:text-gray-100">Bio</label>
                                            <textarea defaultValue={profileInfo.bio} {...register('bio')} type="text" className="input border-2 w-full" placeholder="Writte Your BIO" />

                                            <label className="text-xl font-medium  text-gray-600 dark:text-gray-100">Address</label>
                                            <input defaultValue={profileInfo.address} {...register('address')} type="text" className="input border-2 w-full" placeholder="Writte Your Address" />
                                        </fieldset>
                                        <div className='flex items-center gap-5 mt-3'>
                                            <button className='btn bg-green-300'>Submit</button>
                                            <button onClick={handleCancelEdit} className='btn bg-red-300'>Cancel</button>
                                        </div>
                                    </form>
                                    {/*  <div className='flex justify-end items-end'>
                                        <button className='btn bg-red-300'>Cancel</button>
                                    </div> */}
                                </div>
                                :

                                <div>
                                    <div className='mb-4'>
                                        <h2 className='text-xl md:text-3xl font-medium md:font-bold'>{user?.displayName}</h2>
                                        <p>{user?.email}</p>
                                    </div>

                                    <div className='mb-4'>
                                        <p className='text-xl  font-bold'>BIO</p>
                                        <p>Contest enthusiast and creative thinker</p>
                                    </div>

                                    <div className='mb-4'>
                                        <p className='text-xl  font-bold'>Address</p>
                                        <p>Dhaka, Bangladesh</p>
                                    </div>

                                    <div>
                                        <button onClick={handleShowEdit} className='flex items-center gap-0.5 btn btn-primary'> <FaRegEdit /> Edit Info</button>
                                    </div>
                                </div>
                        }

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;