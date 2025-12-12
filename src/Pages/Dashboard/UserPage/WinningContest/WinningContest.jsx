import React from 'react';
import { GoGift, GoTrophy } from 'react-icons/go';

const WinningContest = () => {
    return (
        <div className='flow-root mx-5'>
            <div className=' my-5  rounded-xl space-y-2 '>
                <h2 className='text-2xl md:text-5xl text-gray-800 font-bold'>My Winning Contests</h2>
                <p className='text-sm md:text-[18px] text-gray-700'>Celebrate your victories and showcase your design excellence across multiple competitions..</p>
            </div>


            <div className='flex flex-col md:flex-row items-center gap-5'>
                <div className='md:w-[400px] bg-base-300 shadow flex  flex-col-reverse md:flex-row md:text-center justify-between items-center p-6 rounded-xl dark:border-secondary'>
                    <div className='text-center md:text-start'>
                        <h3 className='text-2xl font-bold text-gray-800 dark:text-white'>Total Wins</h3>
                        <p className='text-xl font-bold text-gray-600 dark:text-gray-100'> 4 </p>
                    </div>
                    <div><GoTrophy size={28} className='text-yellow-500' /></div>
                </div>

                <div className='md:w-[400px] bg-base-300 shadow flex  flex-col-reverse md:flex-row md:text-center justify-between items-center p-6 rounded-xl dark:border-secondary'>
                    <div className='text-center md:text-start'>
                        <h3 className='text-2xl font-bold text-gray-800 dark:text-white'>Total Prize Money</h3>
                        <p className='text-xl font-bold text-gray-600 dark:text-gray-100'> $1343 </p>
                    </div>
                    <div><GoGift size={28} className='text-yellow-500' /></div>
                </div>
            </div>

            {/* <div className='my-5 md:w-[500px]'>
               
                <div className='bg-base-100'>
                    <div> <img src='https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt="" /> </div>

                    <div className='card-body'>
                        <div className='flex justify-between'>
                            <h2>Summer Photography Challenge</h2>
                           <span> <GoTrophy size={28} className='text-yellow-500' /></span>
                        </div>
                    </div>
                </div>
            </div> */}
           <div className='my-5'>
             <div class="bg-white rounded-xl shadow-md p-4 flex flex-col md:flex-row gap-4">
                <img
                    src="https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    class="w-full md:w-32 h-40 md:h-32 rounded-lg object-cover"
                />
                <div class="flex-1 flex flex-col justify-between">

                    <div>
                        <h2 class="text-xl font-bold mb-1">Photography Contest 2025</h2>
                        <span class="text-sm opacity-70  px-2 py-1 bg-green-300 rounded-full">Photography</span>

                        <div class="flex items-center gap-2 mt-2 text-sm">
                            <img src="https://thumbs.dreamstime.com/b/portrait-cheerful-smiling-young-man-folded-arms-joyful-handsome-men-crossed-hands-studio-shot-isolated-gray-195089624.jpg"
                                class="w-6 h-6 rounded-full" />
                            <span>By Sultan</span>
                        </div>

                        <span class="mt-2 inline-block px-3 py-1 rounded-lg text-sm bg-yellow-400 font-semibold">
                            🥇 1st Place
                        </span>
                    </div>

                </div>
                <div class="text-right flex flex-col justify-between md:items-end items-start gap-3 md:gap-0">

                    <div>
                        <p class="text-green-600 font-semibold text-lg">
                            $343
                        </p>
                        <p class="text-xs opacity-60">11/13/2025</p>
                    </div>

                    <button class="btn btn-sm bg-[#003B73] text-white w-full md:w-auto">
                        View Submission
                    </button>
                </div>

            </div>
           </div>


        </div>
    );
};

export default WinningContest;