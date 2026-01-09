import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../Hook/useAuth';
import { useNavigate } from 'react-router';


const GoogleLogin = () => {

    const {googleSignIn} = useAuth()

    const navigate = useNavigate()

    const handleGoogleLogin = async () => {
        const result = await googleSignIn()   
        navigate('/')   
    }

    return (
        <div>
            <button onClick={handleGoogleLogin} className='btn btn-secondary w-full text-base-100 dark:text-gray-50'> <span><FcGoogle size={24}/></span> Continue with Google </button>
        </div>
    );
};

export default GoogleLogin;