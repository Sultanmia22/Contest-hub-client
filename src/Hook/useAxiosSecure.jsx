import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL
})

const useAxiosSecure = () => {
    const { user, loading ,userSignOut} = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        // Add request interceptor
        const requestInterceptor = axiosInstance.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${user.accessToken}`
            return config
        }
        )

        // Add response interceptor
        const responseInterceptor = axiosInstance.interceptors.response.use(
            res => res,
            err => {
                if (err?.response?.status === 401 || err?.response?.status === 403) {
                    userSignOut()
                        .then(() => {
                            console.log('Logged out successfully.')
                        })
                        .catch(console.error)
                    navigate('/login')
                }
                return Promise.reject(err)
            }
        )

        // Cleanup to prevent multiple interceptors on re-renders
      return () => {
        axiosInstance.interceptors.request.eject(requestInterceptor)
        axiosInstance.interceptors.response.eject(responseInterceptor)
      }


    }, [user,navigate,userSignOut])
    

    return axiosInstance
};

export default useAxiosSecure;