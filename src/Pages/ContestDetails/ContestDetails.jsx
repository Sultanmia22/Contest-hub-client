import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../Hook/useAxiosSecure';

const ContestDetails = () => {

    const {detailsId} = useParams();
    const axiosSecure = useAxiosSecure()

    const {data: detailsContest,isLoading} = useQuery({
        queryKey: ['details-contest',detailsId],
        queryFn: async() => {
            const result = await axiosSecure.get(`/deltails/contest/${detailsId}`);
            return result.data;
        }
    })

    return (
        <div>
           <h2></h2>
        </div>
    );
};

export default ContestDetails;