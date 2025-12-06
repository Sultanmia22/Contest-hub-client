import React from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase/Firebase.config';
const AuthProvider = ({children}) => {

    // create user 
    const createUser = (email,password) => {
        return createUserWithEmailAndPassword(auth,email,password)
    }

    //login user 
    const loginUsers = (email,password) => {
        return signInWithEmailAndPassword(auth,email,password)
    }

    const authInfo = {
        createUser,
        loginUsers
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;