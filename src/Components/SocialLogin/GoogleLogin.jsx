import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../Hook/useAuth';

const GoogleLogin = () => {

    const {googleSignIn} = useAuth()

    const handleGoogleLogin = async () => {
        const result = await googleSignIn()       
    }

    return (
        <div>
            <button onClick={handleGoogleLogin} className='btn btn-secondary w-full text-base-100'> <span><FcGoogle size={24}/></span> Continue with Google </button>
        </div>
    );
};

export default GoogleLogin;