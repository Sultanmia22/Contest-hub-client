import React from 'react';

const WinnerCard = () => {
    return (
        <div className='bg-secondary flex flex-col justify-center items-center py-5 rounded-xl'>

            <div>
                <img src="https://img.freepik.com/premium-vector/young-man-avatar-character-due-avatar-man-vector-icon-cartoon-illustration_1186924-4438.jpg?semt=ais_se_enriched&w=740&q=80" alt="" className='w-20 h-20 mx-auto'/>
            </div>
            
            <div className='text-center'>
                <h2 className='text-2xl text-primary font-semibold'>Sultan Mia</h2>
                <p className='text-primary text-xl font-medium'>Logo Design</p>
                <span className='text-primary font-medium'>$500</span>
            </div>

        </div>
    );
};

export default WinnerCard;