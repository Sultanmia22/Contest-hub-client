import React from 'react';

const WinnerCard = () => {
    return (
        <div className='bg-base-100 border-2 border-primary flex flex-col justify-center items-center py-5 rounded-xl'>

            <div className='w-20 h-20 border-2 border-primary rounded-full'>
                <img src="https://img.freepik.com/premium-vector/young-man-avatar-character-due-avatar-man-vector-icon-cartoon-illustration_1186924-4438.jpg?semt=ais_se_enriched&w=740&q=80" alt="" className='w-20 h-20 mx-auto p-2 rounded-full'/>
            </div>
            
            <div className='text-center'>
                <h2 className='text-2xl text-gray-900 dark:text-white font-semibold'>Sultan Mia</h2>
                <p className='text-gray-900 dark:text-white text-xl font-medium'>Logo Design</p>
                <span className='text-gray-900 dark:text-white font-medium'>$500</span>
                
            </div>
            <p className='text-end'>Never Give up</p>

        </div>
    );
};

export default WinnerCard;