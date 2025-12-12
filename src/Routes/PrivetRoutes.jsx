import React from 'react';
import useAuth from '../Hook/useAuth';
import Loading from '../Components/LoadingPage/Loading';
import { Navigate } from 'react-router';

const PrivetRoutes = ({children}) => {
    const {user,loading} = useAuth();
    if(loading){
        return <Loading/>
    }
    else if(user){
        return children
    }

    return <Navigate to='/login'></Navigate>
};

export default PrivetRoutes;