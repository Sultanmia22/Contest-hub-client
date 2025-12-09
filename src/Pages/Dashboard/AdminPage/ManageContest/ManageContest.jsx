import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../../Hook/useAxiosSecure';
import Loading from '../../../../Components/LoadingPage/Loading';

const ManageContest = () => {
    const axiosSecure = useAxiosSecure()
    const { data: pendingContes = [], isLoading } = useQuery({
        queryKey: ['pending-contest'],
        queryFn: async () => {
            const result = await axiosSecure.get('/pending-allcontest')
            return result.data
        }
    })

/*     const {contestName,contestImage,entryPrice,prizeMoney,contestType,description,taskInstruction,deadline,creatorEmail,status,participantsCount,winner,createdAt
} = pendingContes; */
    console.log(pendingContes)

    if(isLoading){
        return <Loading/>
    }

    return (
        <div className='flow-root '>
            <div className='mx-4 my-4 md:m-10'>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className='bg-primary text-white text-sm'>
                            <tr>
                                <th>No.</th>

                                <th>Image</th>

                                <th>Name</th>

                                <th>Creator</th>

                                <th>Type</th>

                                <th>Price</th>

                                <th>Prize</th>

                                <th>Participants</th>

                                <th>Deadline</th>

                                <th>Status</th>

                                <th>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                pendingContes.map((contest, index) =>
                                    <tr className='bg-base-100 text-primary dark:text-white font-medium text-sm '>
                                        <td>{index + 1}</td>

                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img src={contest?.contestImage} />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td>{contest?.contestName}</td>

                                        <td>{contest?.creator}</td>

                                        <td>{contest?.contestType}</td>

                                        <td>{contest?.entryPrice}</td>

                                        <td>{contest?.prizeMoney}</td>

                                        <td>{contest?.participantsCount}</td>

                                        <td>{contest?.deadline}</td>

                                        <td>{contest?.status}</td>

                                        <td>
                                            <div className="flex items-center gap-2">
                                                <button className='btn btn-xs text-primary btn-secondary'>Confirm </button>
                                                <button className='btn btn-xs btn-primary'>Reject </button>
                                                <button className='btn btn-xs btn-error'>Delete</button>
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

export default ManageContest;