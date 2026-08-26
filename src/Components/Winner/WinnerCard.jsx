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
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 mb-0'>
            {winnersData.map((winner) => (
                <article
                    key={winner.id}
                    className='card-base relative flex flex-col items-center px-6 py-8'
                >

                    {/* Star Badge */}
                    <div className='absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-[var(--ch-border)] bg-[var(--ch-bg)]'>
                        <FaStar className='text-[var(--ch-accent)] text-xs' />
                    </div>

                    {/* Profile Image */}
                    <div className='w-20 h-20 rounded-full overflow-hidden mb-5 ring-1 ring-[var(--ch-border)]'>
                        <img
                            src={winner.image}
                            alt={winner.name}
                            className='w-full h-full object-cover'
                        />
                    </div>

                    {/* Content Section */}
                    <div className='text-center w-full'>
                        {/* Name */}
                        <h2 className='text-base md:text-lg text-[var(--ch-text)] font-semibold tracking-tight mb-1'>
                            {winner.name}
                        </h2>

                        {/* Contest Type */}
                        <p className='text-[var(--ch-accent)] font-medium text-sm mb-5'>
                            {winner.contest}
                        </p>

                        {/* Prize Money */}
                        <div className='rounded-lg py-3.5 mb-5 border border-[var(--ch-border)] bg-[var(--ch-bg)]'>
                            <span className='text-xl md:text-2xl font-semibold tracking-tight text-[var(--ch-text)]'>
                                {winner.prize}
                            </span>
                            <p className='text-[11px] text-[var(--ch-text-muted)] font-medium mt-1 uppercase tracking-wider'>Prize Amount</p>
                        </div>

                        {/* Motivational Quote */}
                        <p className='text-[var(--ch-text-secondary)] italic text-sm leading-relaxed px-1'>
                            "{winner.quote}"
                        </p>
                    </div>
                </article>
            ))}
        </div>
    );
};

export default WinnerCard;
