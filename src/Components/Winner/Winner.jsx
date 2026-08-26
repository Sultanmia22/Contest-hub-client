import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import WinnerCard from './WinnerCard';

const Winner = () => {
    return (
        <section className='section-pad my-8 md:my-12 rounded-2xl border border-[var(--ch-border)] bg-[var(--ch-bg-muted)] px-4 sm:px-8 md:px-12 lg:px-16'>

            {/* Title Animation */}
            <div className='mb-10 text-center'>
                <p className='section-label'>Winners</p>
                <TypeAnimation
                    sequence={['Celebrate Recent Winners', 500, '', 500]}
                    repeat={Infinity}
                    className='section-title text-center block'
                />
            </div>

            {/* Success Stats Section */}
            <div className='card-base max-w-xl mx-auto px-6 py-8 md:px-8 md:py-10 mb-4'>
                <h2 className='text-lg md:text-xl font-semibold text-center text-[var(--ch-text)] tracking-tight mb-8'>
                    Our Success in Numbers
                </h2>

                <div className='grid grid-cols-2 gap-4 md:gap-6'>
                    {/* Winners Crowned */}
                    <div className='text-center p-5 md:p-6 rounded-xl bg-[var(--ch-bg)] border border-[var(--ch-border)]'>
                        <span className='block text-3xl md:text-4xl font-semibold tracking-tight text-[var(--ch-text)] mb-2'>250+</span>
                        <p className='text-[var(--ch-text-secondary)] font-medium text-xs md:text-sm'>Winners Crowned</p>
                    </div>

                    {/* Prizes Awarded */}
                    <div className='text-center p-5 md:p-6 rounded-xl bg-[var(--ch-bg)] border border-[var(--ch-border)]'>
                        <span className='block text-3xl md:text-4xl font-semibold tracking-tight text-[var(--ch-accent)] mb-2'>$10K+</span>
                        <p className='text-[var(--ch-text-secondary)] font-medium text-xs md:text-sm'>Prizes Awarded</p>
                    </div>
                </div>
            </div>

            {/* Winner Cards Grid */}
            <WinnerCard />
        </section>
    );
};

export default Winner;
