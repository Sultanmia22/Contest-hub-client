import React from 'react';
import UseRole from '../../../Hook/UseRole';
import useAuth from '../../../Hook/useAuth';
import Loading from '../../../Components/LoadingPage/Loading';
import { Navigate } from 'react-router';

const DaynamicNavigate = () => {
    const { loading } = useAuth()
    const { role, roleLoading } = UseRole()
    console.log(role)
    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (role === 'creator') {
        return <Navigate to='/dashboard/add-contest'></Navigate>
    }

    if (role === 'admin') {
        return <Navigate to='/dashboard/manage_users'></Navigate>
    }

    if (role === 'user') {
        return <Navigate to='/dashboard/my_participated_contests'></Navigate>
    }
};

export default DaynamicNavigate;