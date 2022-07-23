import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateComponent = ({children}) => {

    const authorization = localStorage.getItem('user');
  return (authorization  ? <Outlet/> : <Navigate to='/signup'/>)
}

export default PrivateComponent