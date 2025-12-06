import React, { use } from 'react';
import { AuthContext } from '../Auth/AuthContext';

const useAuth = () => {
   const useAuth = use(AuthContext)
   return useAuth
};

export default useAuth;