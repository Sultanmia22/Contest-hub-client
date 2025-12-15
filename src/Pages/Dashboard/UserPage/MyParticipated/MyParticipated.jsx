import React from 'react';
import useAxiosSecure from '../../../../Hook/useAxiosSecure';
import useAuth from '../../../../Hook/useAuth';
import { useQuery } from '@tanstack/react-query';

const MyParticipated = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()

    // GET MY PERTICIPANT CONTEST 
    const { data: perticipantContest = [], isLoading, refetch } = useQuery({
        queryKey: ['my-perticipantInfo', user?.email],
        queryFn: async () => {
            const result = await axiosSecure.get(`/my-perticipantContest?perticipantEmail=${user?.email}`);
            return result.data
        }
    })

    console.log(perticipantContest)

    return (
        <div className='flow-root'>
            <div className='bg-gradient-to-r from-[#003B73] to-[#0074B7] my-5 mx-5 p-10 rounded-xl space-y-2 '>
                <h2 className='text-xl md:text-5xl text-white font-bold'>My Participated Contests</h2>
                <p className='text-sm md:text-[18px] text-white'>Track all your contest participation, manage payments, and monitor your performance in real-time.</p>
            </div>

            <div className='flow-root'>
                <div className='mx-4 my-4 md:m-5'>

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
                                    
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    perticipantContest?.map((contest, index) =>
                                        <tr className='bg-base-100 text-primary dark:text-white font-medium text-sm '>
                                            <th>{index +1}</th>
                                            <td>{contest.contestName}</td>
                                            <td>{contest.perticipants.map(c => 
                                                c.status
                                            )}</td>
                                            <td>{contest.participantsCount}</td>
                                            <td>${contest.prizeMoney}</td>
                                            
                                        </tr>
                                    )
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyParticipated;