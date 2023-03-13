import { Navigate , Outlet } from "react-router-dom";
import React from 'react'
import { useAuthStatus } from '../hooks/useAuthStatus'
import Spinner from "./Spinner";

const PrivetRoute = () => {
    
    const {loggedIn , checkingStatus} = useAuthStatus()
    console.log(loggedIn)
    if (checkingStatus){
        return <Spinner/>
    }
  return loggedIn ? <Outlet/> : <Navigate to= '/sign-in'/>
}

export default PrivetRoute