import React from 'react';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const UseRole = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const {data:role,isLoading} = useQuery({
        queryKey: ['role',user?.email],
        queryFn: async () => {
            const result = await axiosSecure.get(`/role-check?email=${user?.email}`)
            return result.data
        }       
    })

    return {role:role?.role,roleLoading:isLoading}
};

export default UseRole;