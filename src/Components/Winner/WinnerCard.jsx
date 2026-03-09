import React from 'react';
import { FaStar } from 'react-icons/fa';

const WinnerCard = () => {
    // এই ফাইলের ভেতরেই ৩টি আলাদা ডেটা রাখা হলো
    const winnersData = [
        {
            id: 1,
            name: "Lamiya Jannat Ful",
            contest: "Logo Design",
            prize: "$500",
            quote: "Never Give Up",
            image: "https://img.freepik.com/premium-vector/young-man-avatar-character-due-avatar-man-vector-icon-cartoon-illustration_1186924-4438.jpg?w=740"
        },
        {
            id: 2,
            name: "Nusrat Jahan",
            contest: "Web Development",
            prize: "$750",
            quote: "Consistency is Key",
            image: "https://img.freepik.com/free-vector/hand-drawn-female-cartoon-character_23-2150499039.jpg?w=740"
        },
        {
            id: 3,
            name: "Arif Ahmed",
            contest: "UI/UX Design",
            prize: "$600",
            quote: "Design is Intelligence",
            image: "https://img.freepik.com/free-vector/man-avatar-profile-round-icon_24877-58314.jpg?w=740"
        }
    ];

    return (
        <>
            {winnersData.map((winner) => (
                <div key={winner.id} className='group bg-white dark:bg-gray-800 border-2 border-secondary/30 dark:border-secondary/40 hover:border-secondary hover:shadow-2xl transition-all duration-300 flex flex-col justify-center items-center py-8 px-6 rounded-2xl hover:-translate-y-3 relative'>

                    {/* Star Badge */}
                    <div className='absolute top-4 right-4 bg-accent/20 dark:bg-accent/30 p-3 rounded-full group-hover:bg-accent/30 dark:group-hover:bg-accent/40 transition-colors shadow-md'>
                        <FaStar className='text-accent text-lg' />
                    </div>

                    {/* Profile Image */}
                    <div className='w-24 h-24 border-4 border-secondary rounded-full overflow-hidden mb-4 shadow-lg group-hover:shadow-xl transition-shadow'>
                        <img 
                            src={winner.image} 
                            alt={winner.name} 
                            className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
                        />
                    </div>

                    {/* Content Section */}
                    <div className='text-center w-full'>
                        {/* Name */}
                        <h2 className='text-xl md:text-2xl text-primary dark:text-primary font-bold mb-2'>
                            {winner.name}
                        </h2>

                        {/* Contest Type */}
                        <p className='text-secondary dark:text-secondary font-semibold text-sm md:text-base mb-4'>
                            {winner.contest}
                        </p>

                        {/* Prize Money */}
                        <div className='bg-gradient-to-r from-secondary/10 to-accent/10 dark:from-secondary/20 dark:to-accent/20 rounded-lg py-4 mb-4 border border-secondary/20 dark:border-secondary/30'>
                            <span className='text-2xl md:text-3xl font-bold text-secondary dark:text-secondary'>
                                {winner.prize}
                            </span>
                            <p className='text-xs text-primary/70 dark:text-primary/60 font-medium mt-1'>Prize Amount</p>
                        </div>

                        {/* Motivational Quote */}
                        <p className='text-primary dark:text-primary/80 italic text-sm leading-relaxed px-2 font-medium'>
                            "{winner.quote}"
                        </p>
                    </div>

                    {/* Bottom Accent Line */}
                    <div className='w-12 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent rounded-full mt-5 group-hover:w-16 transition-all duration-300'></div>
                </div>
            ))}
        </>
    );
};

export default WinnerCard;