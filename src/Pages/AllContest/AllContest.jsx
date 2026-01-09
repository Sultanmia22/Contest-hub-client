import React, { use, useState } from 'react';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/LoadingPage/Loading';
import ContestCard from '../../Components/ContestCard/ContestCard';
import { NavLink } from 'react-router';
import { FiFilter } from 'react-icons/fi';

const AllContest = () => {
    const axiosSecure = useAxiosSecure()
    const [contestType, setContestType] = useState('All')
    const [activeTab, setActiveTab] = useState('All')
    const [page, setPage] = useState(1);

    // GET CONTEST
    const { data = {}, isLoading } = useQuery({
        queryKey: ['all-contest', contestType, page],
        queryFn: async () => {
            const result = await axiosSecure.get(
                `/all/contest?contestType=${contestType}&page=${page}`
            );
            return result.data;
        }
    });

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
        setContestType(type)
        setActiveTab(type)
    }

    const { contests = [], totalPages } = data;

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='flow-root'>
            {/* Header Section */}
            <div className='bg-gradient-to-r from-primary to-primary/90 dark:from-gray-900 dark:to-gray-900/90 px-6 md:px-8 py-10 md:py-14 my-4 md:my-8 rounded-2xl shadow-lg border border-secondary/20 dark:border-secondary/30'>
                <h1 className='text-2xl md:text-5xl font-bold text-white mb-2'>
                    All Contests
                </h1>
                <p className='text-sm md:text-lg text-gray-200 dark:text-gray-300'>
                    Discover and participate in amazing contests
                </p>
            </div>

            {/* Filter Section */}
            <div className='mb-8 md:mb-12'>
                <div className='flex items-center gap-3 mb-4'>
                    <FiFilter className='text-secondary text-xl' />
                    <h3 className='text-lg font-semibold text-primary dark:text-primary'>Filter by Type</h3>
                </div>
                
                <div className='flex items-center gap-3 flex-wrap bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-secondary/20 dark:border-secondary/30'>
                    {/* All Button */}
                    <button 
                        onClick={() => handleTabContest('All')} 
                        className={`${
                            activeTab === 'All' 
                                ? 'bg-secondary text-white shadow-lg' 
                                : 'bg-secondary/10 text-secondary hover:bg-secondary/20'
                        } btn btn-xs md:btn-sm font-semibold rounded-lg transition-all duration-300 border-0`}
                    >
                        All
                    </button>

                    {/* Type Buttons */}
                    {
                        contestTypes.map((type, index) =>
                            <NavLink 
                                onClick={() => handleTabContest(type)} 
                                key={index} 
                                className={`${
                                    activeTab === type 
                                        ? 'bg-secondary text-white shadow-lg' 
                                        : 'bg-secondary/10 text-secondary hover:bg-secondary/20'
                                } btn btn-xs md:btn-sm font-semibold rounded-lg transition-all duration-300 border-0`}
                            > 
                                {type} 
                            </NavLink>
                        )
                    }
                </div>
            </div>

            {/* Contest Cards Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-6 my-8 md:my-16'>
                {
                    contests.map((contest, index) =>
                        <ContestCard key={index} contest={contest} />
                    )
                }
            </div>

            {/* Pagination */}
            <div className="flex gap-2 justify-center my-8 md:my-16 flex-wrap">
                {[...Array(totalPages).keys()].map(num => (
                    <button
                        key={num}
                        onClick={() => setPage(num + 1)}
                        className={`${
                            page === num + 1 
                                ? 'bg-secondary text-white shadow-lg font-semibold' 
                                : 'bg-white dark:bg-gray-800 text-primary dark:text-primary border-2 border-secondary/30 dark:border-secondary/40 hover:border-secondary hover:shadow-md'
                        } btn btn-sm rounded-lg transition-all duration-300`}
                    >
                        {num + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AllContest;