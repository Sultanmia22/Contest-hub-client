import React from 'react';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import ContestCard from '../ContestCard/ContestCard';

const Popular = () => {
    const axiosSecure = useAxiosSecure()
     const { data: popularContest = [], isLoading } = useQuery({
        queryKey: ['popular-contest'],
        queryFn: async () => {
            const result = await axiosSecure.get(`/popular-data`)
            return result.data
        }
    })
    console.log(popularContest)
    return (
        <div className='my-20'>
            <h2 className='text-2xl md:text-5xl font-bold text-center text-primary'>Popular Contests</h2>

              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-5 gap-5 md:my-20'>
                {
                    popularContest.map((contest, index) =>
                        <ContestCard key={index} contest={contest} />
                    )
                }
            </div>
        </div>
    );
};

export default Popular;