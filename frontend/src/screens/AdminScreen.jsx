import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminAsideBar from '../components/shared/AdminAsideBar'

function AdminScreen() {
  return (
    <div className='grid grid-cols-[300px_1fr]'>
      <AdminAsideBar />
      <Outlet />
    </div>
  )
}

export default AdminScreen
