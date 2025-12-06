import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '../Firebase/Firebase.config';
const AuthProvider = ({children}) => {

    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)

    // create user 
    const createUser = (email,password) => {
        return createUserWithEmailAndPassword(auth,email,password)
    }

    //login user 
    const loginUsers = (email,password) => {
        return signInWithEmailAndPassword(auth,email,password)
    }

    // log out user
    const userSignOut = () => {
        return signOut(auth)
    }

    // user observe on auth 
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })

        return () => {
            return unsubscribe()
        }
    },[])

    const authInfo = {
        createUser,
        loginUsers,
        user,
        loading,
        userSignOut
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;