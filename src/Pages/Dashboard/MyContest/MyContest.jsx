import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri';
import useAuth from '../../../Hook/useAuth';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import Loading from '../../../Components/LoadingPage/Loading';
import { Link } from 'react-router';

const MyContest = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: contests = [], isLoading } = useQuery({
        queryKey: ['my-contest', user?.email],
        queryFn: async () => {
            const result = await axiosSecure.get(`/my-contest?email=${user?.email}`)
            return result.data;
        }
    })

    if (isLoading) {
        return <Loading />
    }

    const { contestName, contestImage, entryPrice, prizeMoney, contestType, description, taskInstruction, deadline, creatorEmail, status, participantsCount, winner, createdAt } = contests;

    return (
        <div className='flow-root'>
            <div className='mx-4 my-4 md:m-10'>

                {/* MOBILE RESPONSIVE WRAPPER */}
                <div className="overflow-x-auto w-full">

                    {/* FIXED MIN WIDTH FOR MOBILE */}
                    <table className="table table-zebra w-full min-w-[600px]">

                        {/* head */}
                        <thead className='bg-primary text-white text-sm'>
                            <tr>
                                <th>No.</th>
                                <th>Contest Name</th>
                                <th>Status</th>
                                <th>Participants</th>
                                <th>Prize</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {
                                contests.map((contest, index) =>
                                    <tr className='bg-base-100 text-primary font-medium text-sm '>
                                        <th>{index+1}</th>
                                        <td>{contest.contestName}</td>
                                        <td>{contest.status}</td>
                                        <td>{contest.participantsCount}</td>
                                        <td>{contest.prizeMoney}</td>

                                        <td className='flex flex-row gap-2'>
                                            <Link to={`/dashboard/edit-cotest/${contest?._id}`} className='btn btn-xs btn-primary'>
                                                <FaRegEdit size={14} />
                                            </Link>

                                            <button className='btn btn-xs btn-error'>
                                                <RiDeleteBinLine size={14} />
                                            </button>
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

export default MyContest;