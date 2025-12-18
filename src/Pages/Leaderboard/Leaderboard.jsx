import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../Hook/useAxiosSecure';

const Leaderboard = () => {
    const axiosSecure = useAxiosSecure()
    const { data: datas = [] } = useQuery({
        queryKey: ['leaderboad'],
        queryFn: async () => {
            const result = await axiosSecure.get('/leaderboard')
            return result.data
        }
    })

    console.log(datas)

    return (
        <div className='flow-root '>
            <div className='bg-gray-900 px-30 mt-10 rounded-2xl py-10'>
                {/* title */}
                <div className='text-center space-y-2'>
                    <h2 className='text-2xl md:text-5xl font-semibold text-white'>Leaderboard</h2>
                    <p className='text-gray-300'>Dynamic Rankings by Contest Wins</p>
                </div>

                <div className='mx-4 my-4 md:m-10'>



                    {/* MOBILE RESPONSIVE WRAPPER */}

                    <div className="overflow-x-auto w-full">



                        {/* FIXED MIN WIDTH FOR MOBILE */}

                        <table className="table table-zebra w-full min-w-[600px]">

                            {/* head */}

                            <thead className='bg-secondary text-white text-sm'>

                                <tr>
                                    <th>No.</th>

                                    <th> Name</th>

                                    <th>email</th>

                                    <th>Wins</th>



                                </tr>

                            </thead>
                            <tbody>
                                {
                                    datas.map((data, index) =>
                                        <tr className='bg-base-100 text-primary dark:text-white font-medium text-sm '>

                                            <th>{index + 1}</th>

                                            <td>{data.name}</td>

                                            <td>{data._id}</td>

                                            <td> {data.wins} </td>
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

export default Leaderboard;