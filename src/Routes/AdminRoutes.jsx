import React from 'react';
import UseRole from '../Hook/UseRole';
import Loading from '../Components/LoadingPage/Loading';
import { Navigate } from 'react-router';

const AdminRoutes = ({children}) => {
    const{role,roleLoading} = UseRole()  
    if(roleLoading){
        return <Loading/>
    }
    else if(role === 'admin'){
        return children
    }
    
    return <Navigate to='/login'></Navigate>
};

export default AdminRoutes;