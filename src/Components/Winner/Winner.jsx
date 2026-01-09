import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import WinnerCard from './WinnerCard';

const Winner = () => {
    return (
        <div className='py-16 my-20 bg-gradient-to-b from-secondary via-secondary/90 to-secondary/80 px-4 md:px-30 rounded-2xl shadow-xl'>

            {/* Title Animation */}
            <div className='mb-12'>
                <TypeAnimation
                    sequence={['Celebrate Recent Winners', 500, '', 500]}
                    repeat={Infinity}
                    className='text-white text-center block font-bold text-3xl md:text-5xl drop-shadow-lg'
                />
                <div className='flex justify-center mt-4'>
                    <div className='h-1.5 w-24 bg-gradient-to-r from-accent via-accent/80 to-transparent rounded-full'></div>
                </div>
            </div>

            {/* Success Stats Section */}
            <div className='bg-white dark:bg-gray-800 max-w-[700px] mx-auto p-8 my-8 rounded-2xl shadow-lg border border-secondary/30 dark:border-secondary/40'>
                <h2 className='text-2xl md:text-3xl font-bold text-center text-primary dark:text-primary mb-8'>
                    Our Success in Numbers
                </h2>

                <div className='grid grid-cols-2 gap-6 md:gap-8'>
                    {/* Winners Crowned */}
                    <div className='text-center p-6 md:p-8 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/20 dark:to-primary/10 border border-primary/20 dark:border-primary/40 hover:shadow-lg transition-all duration-300 group'>
                        <div className='inline-block p-4 bg-primary/10 dark:bg-primary/30 rounded-lg mb-4 group-hover:scale-110 transition-transform'>
                            <span className='text-4xl md:text-5xl font-bold text-primary dark:text-primary'>250+</span>
                        </div>
                        <p className='text-primary dark:text-primary font-semibold text-sm md:text-base'>Winners Crowned</p>
                    </div>

                    {/* Prizes Awarded */}
                    <div className='text-center p-6 md:p-8 rounded-xl bg-gradient-to-br from-secondary/5 to-secondary/10 dark:from-secondary/20 dark:to-secondary/10 border border-secondary/20 dark:border-secondary/40 hover:shadow-lg transition-all duration-300 group'>
                        <div className='inline-block p-4 bg-secondary/10 dark:bg-secondary/30 rounded-lg mb-4 group-hover:scale-110 transition-transform'>
                            <span className='text-4xl md:text-5xl font-bold text-secondary dark:text-secondary'>$10K+</span>
                        </div>
                        <p className='text-secondary dark:text-secondary font-semibold text-sm md:text-base'>Prizes Awarded</p>
                    </div>
                </div>
            </div>

            {/* Winner Cards Grid */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-4'>
                <WinnerCard />
                <WinnerCard />
                <WinnerCard />
            </div>
        </div>
    );
};

export default Winner;