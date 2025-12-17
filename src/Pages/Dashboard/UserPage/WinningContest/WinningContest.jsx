import React from 'react';
import { GoGift, GoTrophy } from 'react-icons/go';
import UseRole from '../../../../Hook/UseRole';
import useAuth from '../../../../Hook/useAuth';
import useAxiosSecure from '../../../../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../Components/LoadingPage/Loading';

const WinningContest = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: winningData = [], isLoading } = useQuery({
        queryKey: ['winning-contest', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const result = await axiosSecure.get(`/winning-contests?winningEmail=${user?.email}`)
            return result.data
        }
    })
    
   const allPrizeData = winningData.map(data => Number(data.prizeMoney));
    const totalPrize = allPrizeData.reduce((acc, num) => acc + num,0)
    


    if (isLoading) {
        return <Loading />
    }



    return (
        <div className='flow-root mx-5'>
            <div className=' my-5  rounded-xl space-y-2 '>
                <h2 className='text-2xl md:text-5xl text-gray-800 font-bold dark:text-gray-100'>My Winning Contests</h2>
                <p className='text-sm md:text-[18px] text-gray-700 dark:text-gray-400'>Celebrate your victories and showcase your design excellence across multiple competitions..</p>
            </div>


            <div className='flex flex-col md:flex-row items-center gap-5'>
                <div className='md:w-[400px] bg-base-300 shadow flex  flex-col-reverse md:flex-row md:text-center justify-between items-center p-6 rounded-xl dark:border-secondary'>
                    <div className='text-center md:text-start'>
                        <h3 className='text-2xl font-bold text-gray-800 dark:text-white'>Total Wins</h3>
                        <p className='text-xl font-bold text-gray-600 dark:text-gray-100'> {winningData?.length} </p>
                    </div>
                    <div><GoTrophy size={28} className='text-yellow-500' /></div>
                </div>

                <div className='md:w-[400px] bg-base-300 shadow flex  flex-col-reverse md:flex-row md:text-center justify-between items-center p-6 rounded-xl dark:border-secondary'>
                    <div className='text-center md:text-start'>
                        <h3 className='text-2xl font-bold text-gray-800 dark:text-white'>Total Prize Money</h3>
                        <p className='text-xl font-bold text-gray-600 dark:text-gray-100'> ${totalPrize} </p>
                    </div>
                    <div><GoGift size={28} className='text-yellow-500' /></div>
                </div>
            </div>

            {
                winningData.map((data, index) =>

                    <div className='my-5'>
                        <div class="bg-base-100 rounded-xl shadow-md p-4 flex flex-col md:flex-row gap-4">
                            <img
                                src={data?.contestImage}
                                class="w-full md:w-32 h-40 md:h-32 rounded-lg object-cover"
                            />
                            <div class="flex-1 flex flex-col justify-between">

                                <div>
                                    <h2 class="text-xl font-bold mb-1 dark:text-white">{data?.contestName}</h2>
                                    <span class="text-sm opacity-70  px-2 py-1 bg-green-300 rounded-full dark:text-gray-800">{data?.contestType}</span>

                                    <div class="flex items-center gap-2 mt-2 text-sm">
                                        <img src='https://i.ibb.co.com/Y4nSkysH/Sample-User-Icon.png'
                                            className="w-6 h-6 rounded-full dark:bg-amber-200" />
                                        <span>By {data?.creator}</span>
                                    </div>

                                    <span class="mt-2 inline-block px-3 py-1 rounded-lg text-sm bg-yellow-400 font-semibold">
                                        🥇 1st Place
                                    </span>
                                </div>

                            </div>
                            <div class="text-right flex flex-col justify-between md:items-end items-start gap-3 md:gap-0">

                                <div>
                                    <p class="text-green-600 font-semibold text-lg">
                                        ${data?.prizeMoney}
                                    </p>
                                    <p class="text-xs opacity-60">{new Date(data?.deadline).toLocaleString()}</p>
                                </div>

                            </div>

                        </div>
                    </div>
                )
            }

        </div>
    );
};

export default WinningContest;