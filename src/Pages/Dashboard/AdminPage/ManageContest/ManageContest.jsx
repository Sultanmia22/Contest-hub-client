import React from 'react';

const ManageContest = () => {
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

                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr className='bg-base-100 text-primary dark:text-white font-medium text-sm '>
                                <td>blank</td>

                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img src='' />
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <td>blank</td>

                                <td>blank</td>

                                <td>blank</td>

                                <td>blank</td>

                                <td>blank</td>

                                <td>blank</td>

                                <td>blank</td>

                                <td>blank</td>

                                <td>blank</td>

                                <td>
                                    <div className="flex items-center gap-2">
                                        <button className='btn btn-xs text-primary btn-secondary'>User</button>
                                        <button className='btn btn-xs btn-primary'>Creator</button>
                                        <button className='btn btn-xs btn-error'>Admin</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageContest;