import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import { Outlet } from 'react-router';

const AuthLayouts = () => {
    return (
        <div>
            <Navbar/>
           
            <div><Outlet/></div>

        </div>
    );
};

export default AuthLayouts;