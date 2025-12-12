import React from 'react';

const MyParticipated = () => {
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
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr className='bg-base-100 text-primary dark:text-white font-medium text-sm '>
                                    <th>blank</th>
                                    <td>blank</td>
                                    <td>blank</td>
                                    <td>blank</td>
                                    <td>blank</td>
                                    <td>blank</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyParticipated;