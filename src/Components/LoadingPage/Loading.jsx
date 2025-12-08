import React from 'react';

const Loading = () => {
    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            <span className="loading loading-spinner text-secondary  md:w-[100px] md:h-[100px] "></span>
        </div>
    );
};

export default Loading;