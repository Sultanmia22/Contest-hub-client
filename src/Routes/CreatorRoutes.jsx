import React from 'react';
import UseRole from '../Hook/UseRole';
import { Navigate } from 'react-router';
import Loading from '../Components/LoadingPage/Loading';

const CreatorRoutes = ({children}) => {
    const { role, roleLoading } = UseRole()
    if (roleLoading) {
        return <Loading />
    }
    else if (role === 'creator') {
        return children
    }

    return <Navigate to='/login'></Navigate>
};

export default CreatorRoutes;