import React from 'react';
import UseRole from '../Hook/UseRole';
import { Navigate } from 'react-router';
import Loading from '../Components/LoadingPage/Loading';
import useAuth from '../Hook/useAuth';

const CreatorRoutes = ({children}) => {
    const {loading} = useAuth()
    const { role, roleLoading } = UseRole()
    if ( loading ||roleLoading) {
        return <Loading />
    }
    else if (role === 'creator') {
        return children
    }

    return <Navigate to='/login'></Navigate>
};

export default CreatorRoutes;