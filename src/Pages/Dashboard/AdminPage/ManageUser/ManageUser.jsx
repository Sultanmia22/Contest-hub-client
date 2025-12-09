import React from 'react';

import { Link } from 'react-router';
import useAxiosSecure from '../../../../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../Components/LoadingPage/Loading';

const ManageUser = () => {

    const axiosSecure = useAxiosSecure();

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const result = await axiosSecure.get('/manage-user');
            return result.data
        }
    })

    // MANAGE USER FUNTION 
    const manageUser = async (id,role) => {
        try{
             const result = await axiosSecure.patch(`/change-role/${id}`,role);
             refetch()
        }
        catch(er){
            console.log(er)
        }
    }



    if (isLoading) {
        return <Loading />
    }
    console.log(users)
    return (
        <div className='flow-root '>
            <div className='mx-4 my-4 md:m-10'>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className='bg-primary text-white text-sm'>
                            <tr>
                                <th>No.</th>

                                <th>Avatar</th>

                                <th>Name</th>

                                <th>Email</th>

                                <th>Role</th>

                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, index) =>
                                    <tr>
                                        <th>
                                            {index + 1}
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img src={user?.image} />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {user?.name}
                                        </td>
                                        <td> {user?.email} </td>
                                        <th>
                                            {user?.role}
                                        </th>

                                        <td>
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => manageUser(user?._id,'user')} className='btn btn-xs text-primary btn-secondary'>User</button>
                                                <button onClick={() => manageUser(user?._id,'creator')} className='btn btn-xs btn-primary'>Creator</button>
                                                <button onClick={() => manageUser(user?._id,'admin')} className='btn btn-xs btn-error'>Admin</button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUser;