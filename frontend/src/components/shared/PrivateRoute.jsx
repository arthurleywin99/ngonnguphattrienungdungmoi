import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.userSignin)

  return userInfo ? children : <Navigate to='/signin' />
}

export default PrivateRoute
