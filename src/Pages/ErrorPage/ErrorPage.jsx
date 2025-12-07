import React from 'react';
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            <div>
                <img src="https://i.ibb.co.com/JRLb1Gsm/404-page-removebg-preview.png" alt="" />
                <p className='text-4xl text-primary mb-4 font-bold text-center'> Opps Page Not Found </p>
            </div>
            <div>
                <Link to='/' className='btn btn-primary'>Go Back Home</Link>
            </div>
        </div>
    );
};

export default ErrorPage;