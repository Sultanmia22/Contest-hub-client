import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../../Hook/useAxiosSecure';
import Loading from '../../../../Components/LoadingPage/Loading';
import { toast } from 'react-toastify';

const ManageContest = () => {
    const axiosSecure = useAxiosSecure()
    const { data: pendingContes = [], isLoading, refetch } = useQuery({
        queryKey: ['pending-contest'],
        queryFn: async () => {
            const result = await axiosSecure.get('/pending-allcontest')
            return result.data
        }
    })

    // MANAGE CONTEST FUNTION 
    const manageContest = async (id, status) => {
        try {
            const result = await axiosSecure.patch(`/update-contest-status/${id}`, status);
            refetch()
            toast.success(`${status.status} successfully`)
        }
        catch (er) {
            console.log(er)
        }
    }

    // DELETE CONTEST 
    const handleDeleteContest = async (id) => {
        try {
            const result = await axiosSecure.delete(`/contest/delete-by-admin/${id}`)
            toast.success('Delete Successfully!');
            refetch()
        }
        catch(er){
            console.log(er);
        }
    }

    if (isLoading) {
        return <Loading />
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
                                                <button onClick={() => manageContest(contest?._id, { status: 'confirmed' })} className='btn btn-xs text-primary btn-secondary'>Confirm </button>
                                                <button onClick={() => manageContest(contest?._id, { status: 'rejected' })} className='btn btn-xs btn-primary'>Reject </button>
                                                <button onClick={()=> handleDeleteContest(contest?._id) } className='btn btn-xs btn-error'>Delete</button>
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