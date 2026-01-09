import React, { useEffect, useState } from 'react';
import { FiArrowDown } from 'react-icons/fi';

const Works = () => {
    const [workData, setWorkData] = useState([])

    useEffect(() => {
        fetch('/workData.json')
            .then(res => res.json())
            .then(data => {
                setWorkData(data)
            })
    }, [])

    return (
        <div className='bg-primary dark:bg-gray-900 px-4 md:px-30 py-12 md:py-20 rounded-2xl mb-10 md:mb-20 shadow-xl'>
            {/* Title Section */}
            <div className='mb-16'>
                <h2 className='text-3xl md:text-5xl font-bold text-center text-secondary mb-4'>
                    How It Works
                </h2>
                <div className='flex justify-center'>
                    <div className='h-1.5 w-24 bg-gradient-to-r from-secondary via-accent to-secondary rounded-full'></div>
                </div>
            </div>

            {/* Steps Container */}
            <div className='relative'>
                {/* Vertical Line */}
                <div className='hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-secondary via-accent to-secondary rounded-full'></div>

                {/* Steps Grid */}
                <div className='grid grid-cols-1 gap-8 md:gap-12'>
                    {
                        workData.map((step, idx) =>
                            <div 
                                key={idx} 
                                className={`flex flex-col md:flex-row ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6 md:gap-0 group`}
                            >
                                {/* Content Box */}
                                <div className='w-full md:w-5/12 text-center md:text-start'>
                                    <div className='bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-secondary/30 dark:border-secondary/40 group-hover:border-secondary group-hover:-translate-y-2'>
                                        <h3 className="text-xl md:text-2xl font-bold text-primary dark:text-primary mb-3">
                                            {step.title}
                                        </h3>
                                        <p className='text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed'>
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>

                                {/* Step Number Circle */}
                                <div className='w-full md:w-2/12 flex justify-center'>
                                    <div className='relative z-10'>
                                        <div className='w-20 h-20 bg-gradient-to-br from-secondary to-secondary/80 dark:from-secondary dark:to-secondary/90 text-white rounded-full flex items-center justify-center text-3xl font-bold shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 border-4 border-primary dark:border-gray-900'>
                                            {step.num}
                                        </div>
                                    </div>
                                </div>

                                {/* Empty Space */}
                                <div className='hidden md:block w-5/12'></div>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* Bottom Decoration */}
            <div className='flex justify-center mt-16'>
                <div className='animate-bounce'>
                    <FiArrowDown className='text-secondary text-3xl' />
                </div>
            </div>
        </div>
    );
};

export default Works;