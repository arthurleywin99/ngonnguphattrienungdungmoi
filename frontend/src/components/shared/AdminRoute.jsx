import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function AdminRoute({ children }) {
  const { userInfo } = useSelector((state) => state.userSignin)

  return userInfo && userInfo.isAdmin ? children : <Navigate to='/signin' />
}

export default AdminRoute
