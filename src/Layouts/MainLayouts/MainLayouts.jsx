import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../Components/Footer/Footer';

const MainLayouts = () => {
    return (
        <div>
           <Navbar/>

          <div className='w-11/12 mx-auto'> 
             <Outlet/> 
          </div>

           <Footer/>
        </div>
    );
};

export default MainLayouts;