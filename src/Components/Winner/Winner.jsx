import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import WinnerCard from './WinnerCard';

const Winner = () => {
    return (
        <div className='py-10 my-40 bg-secondary px-4 md:px-30 rounded-xl'>

            <TypeAnimation
                    sequence={['Celebrate Recent Winners', 500, '',500]}
                    
                    repeat={Infinity}
                    className='text-primary text-center block font-bold text-2xl md:text-5xl'
                />

            <div className='bg-base-100 max-w-[600px] mx-auto p-6 my-5 rounded-xl'>
                <h2 className='text-xl font-bold  text-center my-2'> Our Success in Numbers </h2>
                
                <div className='flex justify-between items-center'>
                    <div className='text-center'>
                        <span className='text-2xl font-bold'>250+</span>
                        <p>Winners Crowned</p>
                    </div>
                    <div className='text-center'>
                        <span className='text-2xl font-bold'>$10,000+</span>
                        <p>Prizes Awarded</p>
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                <WinnerCard/>
                <WinnerCard/>
                <WinnerCard/>
            </div>
        </div>
    );
};

export default Winner;