import React, { use, useState } from 'react';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/LoadingPage/Loading';
import ContestCard from '../../Components/ContestCard/ContestCard';
import { NavLink } from 'react-router';

const AllContest = () => {
    const axiosSecure = useAxiosSecure()
    const [contestType, setContestType] = useState('All')
    const [activeTab, setActiveTab] = useState('All')

    // GET CONTEST
    const { data: contests = [], isLoading } = useQuery({
        queryKey: ['all-contest', contestType],
        queryFn: async () => {
            const result = await axiosSecure.get(`/all/contest?contestType=${contestType}`)
            return result.data
        }
    })

    // GET ALL TYPE 
    const { data: contestTypes = [] } = useQuery({
        queryKey: ['all-type'],
        queryFn: async () => {
            const result = await axiosSecure.get('/all-type');
            return result.data
        }

    })

    // Handle tab contest 
    const handleTabContest = (type) => {
        setContestType(type.contestType)
        setActiveTab(type.contestType)
    }

    // console.log(contestTypes)


    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='flow-root'>
            <div className='bg-primary px-5 py-8 my-4 rounded-xl'>
                <h1 className='text-xl md:text-4xl font-bold text-white'>All Contests</h1>
                <p className='text-sm md:text-[18px] text-white'>Discover and participate in amazing contests</p>
            </div>

            <div className='flex items-center gap-3 flex-wrap'>
                <button onClick={() => handleTabContest({ contestType: 'All' })} className={`${activeTab === 'All' && 'bg-primary'} text-[#FFFFFF] btn btn-xs md:btn-md btn-secondary`}>All</button>
                {
                    contestTypes.map((type, index) =>

                        <NavLink onClick={() => handleTabContest(type)} key={index} className={`${activeTab === type.contestType && 'bg-primary'} text-[#FFFFFF] btn btn-xs md:btn-md btn-secondary`}> {type.contestType} </NavLink>
                    )
                }

            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-5 gap-5 md:my-20'>
                {
                    contests.map((contest, index) =>
                        <ContestCard key={index} contest={contest} />
                    )
                }
            </div>


        </div>
    );
};

export default AllContest;