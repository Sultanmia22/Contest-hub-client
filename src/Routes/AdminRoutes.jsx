import React from 'react';
import UseRole from '../Hook/UseRole';
import Loading from '../Components/LoadingPage/Loading';
import { Navigate } from 'react-router';
import useAuth from '../Hook/useAuth';

const AdminRoutes = ({children}) => {
    const {Loading} = useAuth()
    const{role,roleLoading} = UseRole()  
    if( Loading || roleLoading){
        return <Loading/>
    }
    else if(role === 'admin'){
        return children
    }
    
    return <Navigate to='/login'></Navigate>
};

export default AdminRoutes;