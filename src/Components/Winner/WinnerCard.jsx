import React from 'react';
import { FaStar } from 'react-icons/fa';

const WinnerCard = () => {
    return (
        <div className='group bg-white dark:bg-gray-800 border-2 border-secondary/30 dark:border-secondary/40 hover:border-secondary hover:shadow-2xl transition-all duration-300 flex flex-col justify-center items-center py-8 px-6 rounded-2xl hover:-translate-y-3 relative'>

            {/* Star Badge */}
            <div className='absolute top-4 right-4 bg-accent/20 dark:bg-accent/30 p-3 rounded-full group-hover:bg-accent/30 dark:group-hover:bg-accent/40 transition-colors shadow-md'>
                <FaStar className='text-accent text-lg' />
            </div>

            {/* Profile Image */}
            <div className='w-24 h-24 border-4 border-secondary rounded-full overflow-hidden mb-4 shadow-lg group-hover:shadow-xl transition-shadow'>
                <img 
                    src="https://img.freepik.com/premium-vector/young-man-avatar-character-due-avatar-man-vector-icon-cartoon-illustration_1186924-4438.jpg?semt=ais_se_enriched&w=740&q=80" 
                    alt="Winner" 
                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
                />
            </div>

            {/* Content Section */}
            <div className='text-center w-full'>
                {/* Name */}
                <h2 className='text-xl md:text-2xl text-primary dark:text-primary font-bold mb-2'>
                    Sultan Mia
                </h2>

                {/* Contest Type */}
                <p className='text-secondary dark:text-secondary font-semibold text-sm md:text-base mb-4'>
                    Logo Design
                </p>

                {/* Prize Money */}
                <div className='bg-gradient-to-r from-secondary/10 to-accent/10 dark:from-secondary/20 dark:to-accent/20 rounded-lg py-4 mb-4 border border-secondary/20 dark:border-secondary/30'>
                    <span className='text-2xl md:text-3xl font-bold text-secondary dark:text-secondary'>$500</span>
                    <p className='text-xs text-primary/70 dark:text-primary/60 font-medium mt-1'>Prize Amount</p>
                </div>

                {/* Motivational Quote */}
                <p className='text-primary dark:text-primary/80 italic text-sm leading-relaxed px-2 font-medium'>
                    "Never Give Up"
                </p>
            </div>

            {/* Bottom Accent Line */}
            <div className='w-12 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent rounded-full mt-5 group-hover:w-16 transition-all duration-300'></div>
        </div>
    );
};

export default WinnerCard;